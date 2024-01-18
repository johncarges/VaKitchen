from jose import JWTError, jwt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta

from schemas import tokens

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')

SECRET_KEY = '2dbb0cc4c96761d5f551d1b81215c9a38e12d1fb6c20b112562d7a973e8b8a52'
ALGORITHM = 'HS256'
EXP_TIME_MINUTES = 60

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=EXP_TIME_MINUTES)
    to_encode.update({'exp':expire})

    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return token

def verify_access_token(token: str, credentials_exception):

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(payload)

        id: str = payload.get("user_id")

        if id is None:
            raise credentials_exception
        
        # token_data = tokens.TokenData(id=id) #validate token schema

    except JWTError:
        raise credentials_exception
    
    return id
    
def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(status_code=403, 
                                          detail="Could not validate credentials",
                                          headers={"WWW-Authenticate":"Bearer"})
    
    return verify_access_token(token, credentials_exception)