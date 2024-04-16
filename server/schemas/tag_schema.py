from pydantic import BaseModel
from enum import Enum

class TagType(str, Enum):
    preparation = 'preparation'
    meal = 'meal'


class Tag(BaseModel):
    id: int
    name: str
    type: TagType
