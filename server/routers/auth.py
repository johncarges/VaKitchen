from fastapi import HTTPException, APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timedelta
from jose import JWTError, jwt

from schemas import user_schema, token_schema
from utils import pwd_utils
from oauth2 import create_access_token, verify_access_token, get_current_active_user, get_current_user
import database


router = APIRouter(tags=['Authentication'])


@router.post('/signup', status_code=201)
def signup(new_user: user_schema.UserSignup):
    existing_user = database.select_one('sql/auth/email_already_in_use.sql',{'email':new_user.email})
    if existing_user:
        raise HTTPException(status_code=409, detail='Account with this email already exists')
    
    is_current_plan = database.select_one('sql/plans/check_current.sql',{'id':new_user.plan_id})
    if not is_current_plan:
        raise HTTPException(status_code=400, detail='Not a current plan')

    db_user = new_user.model_dump()
    db_user['password_hash'] = pwd_utils.hash(new_user.password)
    del db_user['password']

    try:
        user = database.insert('sql/auth/create_user.sql',db_user)
        access_token = create_access_token(data={"sub":str(user['id'])})
    except Exception as e:
        return e
    
    return token_schema.LoginResponse(token=access_token, user=user_schema.UserResponse(**user))

    # return user



@router.post('/login',status_code=200)
def login(form_data: OAuth2PasswordRequestForm = Depends()) -> token_schema.LoginResponse:
    
    user = database.select_one('sql/auth/check_credentials.sql', {'email':form_data.username}) # Form requires username
    
    if not user:
        raise HTTPException(status_code=403, detail='Invalid Credentials')
    
    if not pwd_utils.verify(form_data.password, user['password_hash']):
        raise HTTPException(status_code=403, detail='Invalid Credentials')
    
    print(f'USER ID: {user["id"]}')

    access_token = create_access_token(data={"sub":str(user['id'])})

    del user['password_hash']

    return token_schema.LoginResponse(token=access_token, user=user_schema.UserResponse(**user))
    # return tokens.Token(access_token=access_token, token_type="bearer")

@router.get('/checkuser', status_code=200)
def check_user(user: user_schema.User = Depends(get_current_active_user)):
    return user

