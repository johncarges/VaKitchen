from pydantic import BaseModel


class UserSignup(BaseModel):
    email: str
    password: str
    plan_id: int

class UserLogin(BaseModel):
    email: str
    password: str