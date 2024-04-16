from pydantic import BaseModel


class UserSignup(BaseModel):
    email: str
    password: str
    plan_id: int

class UserLogin(BaseModel):
    email: str
    password: str

class User(BaseModel):
    email: str
    hashed_password: str
    plan_id: int

class UserResponse(BaseModel):
    email: str
    id: int
    plan_id: int