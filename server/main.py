from fastapi import FastAPI, HTTPException, Response
from pydantic import BaseModel
from typing import Optional
import psycopg2
from pathlib import Path
import time

import database

app = FastAPI()


class ItemSchema(BaseModel):
    id: int
    name: str 
    price: int = 0 # $1.00 -> price = 100
    description: str = None
    is_avaialable: bool = True

class ItemPost(BaseModel):
    name: str
    price: int = 0
    description: str = None
    is_available: bool = True

class ItemUpdate(BaseModel):
    name: Optional[str]
    price: Optional[int]
    description: Optional[str]
    is_available: Optional[bool]


@app.get('/')
def root():
    return {"Hello": "World"}



@app.get('/items', tags=['Items'])
def get_items(limit: int = 10):
    
    response = database.select_multiple('sql/items/get_items.sql', {'limit':limit})

    return response

@app.post('/items', tags=['Items'])
def create_item(item: ItemPost):

    response = database.insert('sql/items/post_item.sql',item.model_dump())

    return response


@app.get('/items/{item_id}', tags=['Items'])
def get_item(item_id: int):

    response = database.select_one('sql/items/get_item.sql',{'id':item_id})

    return response


@app.delete('/items/{item_id}', tags=['Items'])
def delete_item(item_id: int):

    deleted_item = database.delete('sql/items/delete_item.sql', {'id':item_id})

    if not deleted_item:
        raise HTTPException(status_code=404, detail=f'Item with id: {item_id} was not found')

    return Response(status_code=204)

@app.patch("/items/{id}", tags=['Items'])
def update_item(id: int, item: ItemUpdate):
    print(item.model_dump(exclude_unset=True))
    updated_item = database.update('sql/items/update_item.sql', {'id':id, **item.model_dump(exclude_unset=True)})
    return {'data': updated_item}