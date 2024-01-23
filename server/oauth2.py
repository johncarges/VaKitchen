from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
from jose import JWTError, jwt

from schemas import tokens, users
import database

SECRET_KEY = '2dbb0cc4c96761d5f551d1b81215c9a38e12d1fb6c20b112562d7a973e8b8a52'
ALGORITHM = 'HS256'
EXP_TIME_MINUTES = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')


def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=30)):
    to_encode = data.copy()

    expire = datetime.utcnow() + expires_delta
    to_encode.update({'exp':expire})

    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return token

def verify_access_token(token: str, credentials_exception):

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        id: str = payload.get("sub")

        if id is None:
            raise credentials_exception
        
        # token_data = tokens.TokenData(id=id) #validate token schema

    except JWTError as e:
        print(e)
        raise credentials_exception
    
    return id
    
def get_current_user(token: str = Depends(oauth2_scheme)) -> users.User:
    credentials_exception = HTTPException(status_code=403, 
                                          detail="Could not validate credentials",
                                          headers={"WWW-Authenticate":"Bearer"})
    
    user_id = verify_access_token(token, credentials_exception)
    user = database.select_one('sql/users/get_user_by_id.sql', {'id':user_id})
    if not user:
        raise credentials_exception
    return user

def get_current_active_user(user: users.User = Depends(get_current_user)):
    if user.get('disabled'):
        raise HTTPException(status_code=400, detail="Inactive user")
    return user