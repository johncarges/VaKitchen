from fastapi import FastAPI, HTTPException, Response, APIRouter
from pydantic import BaseModel
from typing import Optional

from schemas import item_save_schema
import oauth2
import database

ItemSave = item_save_schema.ItemSave

router = APIRouter(tags=['Saved Items'])

@router.get("/saved_items")
def get_saved_items(user_id: int=1 ):

    items = database.select_multiple('sql/item_saves/get_saved_items.sql',{'user_id':user_id})

    return items

@router.get("/saved_item_ids")
def get_saved_item_ids(user_id: int=1):
    """Used to retreive only id's for saved items (to cross-check with larger set of items)"""

    items = database.select_multiple('sql/item_saves/get_saved_item_ids.sql',{'user_id':user_id})

    return [item["id"] for item in items]



@router.post("/saved_items",  status_code=201)
def add_saved_items(item_save: ItemSave):

    print(item_save)

    try:
        response = database.insert('sql/item_saves/save_item.sql',item_save.model_dump())

    except Exception as e:
        print(e)
        raise HTTPException(status_code=422, detail='Item already saved')

    if not response:
        raise HTTPException(status_code=404, detail=f'Item with id: {item_save.item_id} was not found')
    
    return response

@router.delete("/saved_items", status_code=204)
def delete_save(item_save: ItemSave):

    deleted_item = database.delete('sql/item_saves/delete_save.sql',item_save.model_dump())

    if not deleted_item:
        raise HTTPException(status_code=404, detail=f'Item with id: {item_save.item_id} was not found')
    
    return Response(status_code=204)

