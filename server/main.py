from fastapi import FastAPI, HTTPException, Response
from pydantic import BaseModel
from typing import Optional
import psycopg2
from pathlib import Path
import time
from fastapi.middleware.cors import CORSMiddleware

import database

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



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

class ItemSave(BaseModel):
    user_id: int
    item_id: int


@app.get('/')
def root():
    return {"Hello": "World"}



@app.get('/items', status_code=200, tags=['Items'])
def get_items(limit: int = 10):
    
    response = database.select_multiple('sql/items/get_items.sql', {'limit':limit})

    return response

@app.post('/items', status_code=201, tags=['Items'])
def create_item(item: ItemPost):

    response = database.insert('sql/items/post_item.sql',item.model_dump())

    return response


@app.get('/items/{item_id}', tags=['Items'])
def get_item(item_id: int):

    response = database.select_one('sql/items/get_item.sql',{'id':item_id})

    if not response:
        raise HTTPException(status_code=404, detail=f"Item with id {item_id} not found")

    return response


@app.delete('/items/{item_id}', tags=['Items'])
def delete_item(item_id: int):

    deleted_item = database.delete('sql/items/delete_item.sql', {'id':item_id})

    if not deleted_item:
        raise HTTPException(status_code=404, detail=f'Item with id: {item_id} was not found')

    return Response(status_code=204)

@app.patch("/items/{item_id}", tags=['Items'])
def update_item(item_id: int, item: ItemUpdate):
    print(item.model_dump(exclude_unset=True))
    updated_item = database.update('sql/items/update_item.sql', {'id':item_id, **item.model_dump(exclude_unset=True)})

    if not updated_item:
        raise HTTPException(status_code=404, detail=f'Item with id: {item_id} was not found')

    return {'data': updated_item}

#
# Saved Items
#

@app.get("/saved_items", tags=['Saved Items'])
def get_saved_items(user_id: int=1 ):

    items = database.select_multiple('sql/item_saves/get_saved_items.sql',{'user_id':user_id})

    return items

@app.post("/saved_items",  status_code=201, tags=['Saved Items'])
def add_saved_items(item_save: ItemSave):

    response = database.insert('sql/item_saves/save_item.sql',item_save.model_dump())

    if not response:
        raise HTTPException(status_code=404, detail=f'Item with id: {item_save.item_id} was not found')
    
    return response

@app.delete("/saved_items", status_code=204, tags=['Saved Items'])
def delete_save(item_save: ItemSave):

    deleted_item = database.delete('sql/item_saves/delete_save.sql',item_save.model_dump())

    if not deleted_item:
        raise HTTPException(status_code=404, detail=f'Item with id: {item_save.item_id} was not found')
    
    return Response(status_code=204)


#
# Plans
#

@app.get("/plans", status_code=200, tags=['Plans'])
def get_current_plans():

    response = database.select_multiple('sql/plans/current_plans.sql')

    if not response:
        raise HTTPException(status_code=404, detail="Could not load current plans")
    
    return response
