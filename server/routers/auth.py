from fastapi import HTTPException, APIRouter
from pydantic import BaseModel
from typing import Optional

from schemas import users
from utils import pwd_utils
import oauth2
import database


router = APIRouter(tags=['Authentication'])


@router.post('/signup', status_code=201)
def signup(new_user: users.UserSignup):
    
    existing_user = database.select_one('sql/auth/email_already_in_use.sql',{'email':new_user.email})
    if existing_user:
        raise HTTPException(status_code=409, detail='Account with this email already exists')
    
    is_current_plan = database.select_one('sql/plans/check_current.sql',{'id':new_user.plan_id})
    if not is_current_plan:
        raise HTTPException(status_code=400, detail='Not a current plan')

    db_user = new_user.model_dump()
    db_user['password_hash'] = pwd_utils.hash(new_user.password)
    del db_user['password']
    print(db_user)

    try:
        user = database.insert('sql/auth/create_user.sql',db_user)
    except Exception as e:
        print(f'error: {e}')
        return e

    return user




@router.post('/login',status_code=200)
def login(user_credentials: users.UserLogin):
    
    user = database.select_one('sql/auth/check_credentials.sql', {'email':user_credentials.email})
    if not user:
        raise HTTPException(status_code=403, detail='Invalid Credentials')
    
    if not pwd_utils.verify(user_credentials.password, user['password_hash']):
        raise HTTPException(status_code=403, detail='Invalid Credentials')
    
    access_token = oauth2.create_access_token(data={"user_id":user['id']})
    
    return {"access_token":access_token, "token_type":"bearer"}