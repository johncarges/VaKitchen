from fastapi import HTTPException, APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timedelta
from jose import JWTError, jwt

from schemas import users, tokens
from utils import pwd_utils
from oauth2 import create_access_token, verify_access_token, get_current_active_user, get_current_user
import database


router = APIRouter(tags=['Authentication'])



SECRET_KEY = '2dbb0cc4c96761d5f551d1b81215c9a38e12d1fb6c20b112562d7a973e8b8a52'
ALGORITHM = 'HS256'
EXP_TIME_MINUTES = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')


# def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=30)):
#     to_encode = data.copy()

#     expire = datetime.utcnow() + expires_delta
#     to_encode.update({'exp':expire})

#     token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

#     return token

# def verify_access_token(token: str, credentials_exception):

#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         print(payload)

#         id: str = payload.get("user_id")

#         if id is None:
#             raise credentials_exception
        
#         # token_data = tokens.TokenData(id=id) #validate token schema

#     except JWTError:
#         raise credentials_exception
    
#     return id
    
# def get_current_user(token: str = Depends(oauth2_scheme)) -> users.User:
#     credentials_exception = HTTPException(status_code=403, 
#                                           detail="Could not validate credentials",
#                                           headers={"WWW-Authenticate":"Bearer"})
    
#     user_id = verify_access_token(token, credentials_exception)
#     user = database.select_one('sql/users/get_user_by_id.sql', {'id':user_id})
#     if not user:
#         raise credentials_exception
#     return user

# def get_current_active_user(user: users.User = Depends(get_current_user)):
#     if user.get('disabled'):
#         raise HTTPException(status_code=400, detail="Inactive user")
#     return user

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
def login(form_data: OAuth2PasswordRequestForm = Depends()) -> tokens.LoginResponse:
    
    user = database.select_one('sql/auth/check_credentials.sql', {'email':form_data.username}) # Form requires username
    
    if not user:
        raise HTTPException(status_code=403, detail='Invalid Credentials')
    
    if not pwd_utils.verify(form_data.password, user['password_hash']):
        raise HTTPException(status_code=403, detail='Invalid Credentials')
    
    print(f'USER ID: {user["id"]}')

    access_token = create_access_token(data={"sub":str(user['id'])}, expires_delta=timedelta(minutes=EXP_TIME_MINUTES))

    del user['password_hash']

    return tokens.LoginResponse(token=access_token, user=users.UserResponse(**user))
    # return tokens.Token(access_token=access_token, token_type="bearer")

@router.get('/checkuser', status_code=200)
def check_user(user: users.User = Depends(get_current_active_user)):
    return user