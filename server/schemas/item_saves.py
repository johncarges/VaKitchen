from pydantic import BaseModel
from typing import Optional


class ItemSave(BaseModel):
    user_id: int
    item_id: int