from pydantic import BaseModel

class Plan(BaseModel):
    id: int
    name: str
    monthly_cost: int
    monthly_points: int
    is_current: bool

class UserPlan(BaseModel):
    id: int
    name: str
    monthly_cost: int
    monthly_points: int