from pydantic import BaseModel
from typing import Optional

class ItemSchema(BaseModel):
    id: int
    name: str 
    price: int = 0 # $1.00 -> price = 100
    description: str = None
    is_avaialable: bool = True
    image_url: str = None

class ItemPost(BaseModel):
    name: str
    price: int = 0
    description: str = None
    is_available: bool = True
    image_url: str = None

class ItemUpdate(BaseModel):
    name: Optional[str]
    price: Optional[int]
    description: Optional[str]
    is_available: Optional[bool]
    image_url: Optional[str]