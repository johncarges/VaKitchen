from pydantic import BaseModel
from typing import Optional
from .users import UserResponse

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[str] = None
    
class LoginResponse(BaseModel):
    token: str
    user: UserResponse