from fastapi import FastAPI, HTTPException, Response, APIRouter
from pydantic import BaseModel
from typing import Optional

from schemas import items
import database

router = APIRouter(prefix='/items', tags=['Items'])


@router.get('/', status_code=200)
def get_items(limit: int = 10):
    
    response = database.select_multiple('sql/items/get_items.sql', {'limit':limit})

    return response

@router.post('/', status_code=201, response_model=items.ItemSchema)
def create_item(item: items.ItemPost):

    response = database.insert('sql/items/post_item.sql',item.model_dump())

    return response


@router.get('/{item_id}', response_model=items.ItemSchema)
def get_item(item_id: int):

    response = database.select_one('sql/items/get_item.sql',{'id':item_id})

    if not response:
        raise HTTPException(status_code=404, detail=f"Item with id {item_id} not found")

    return response


@router.delete('/{item_id}')
def delete_item(item_id: int):

    deleted_item = database.delete('sql/items/delete_item.sql', {'id':item_id})

    if not deleted_item:
        raise HTTPException(status_code=404, detail=f'Item with id: {item_id} was not found')

    return Response(status_code=204)

@router.patch("/{item_id}", response_model=items.ItemUpdate)
def update_item(item_id: int, item: items.ItemUpdate):
    print(item.model_dump(exclude_unset=True))
    updated_item = database.update('sql/items/update_item.sql', {'id':item_id, **item.model_dump(exclude_unset=True)})

    if not updated_item:
        raise HTTPException(status_code=404, detail=f'Item with id: {item_id} was not found')

    return updated_item
