from fastapi import FastAPI, HTTPException, Response, APIRouter, Query
from pydantic import BaseModel
from typing import Optional
from enum import Enum

from schemas import item_schema
import database

router = APIRouter(prefix='/items', tags=['Items'])

class SortOption(Enum):
    recently_added= 'recently-added'
    popular = 'popular'
    points = 'points'


@router.get('/', status_code=200)
def get_items(limit: int = 10, 
              user_id: int = None,
              saved: bool=Query(False), 
              meal: list[str]=Query(None), 
              preparation: list[str]=Query(None), 
              sort_type: SortOption=Query(None)):

    used_where = False
    if user_id:
        sql_string = f"""
            SELECT *, EXISTS (
            SELECT item_saves.id from item_saves
            WHERE item_saves.user_id = {user_id}
            AND item_saves.item_id = items.id
            ) as saved from items
        """
    else:
        sql_string = """SELECT * FROM items"""
    if meal:
        sql_string += f"\nWHERE EXISTS (SELECT item_tags.id from item_tags JOIN tags ON tags.id = item_tags.tag_id WHERE item_tags.item_id = items.id and tags.name = '{meal[0].lower()}')"
        used_where = True
        for tag in meal[1:]:
            sql_string += f"\nOR EXISTS (SELECT item_tags.id from item_tags JOIN tags ON tags.id = item_tags.tag_id WHERE item_tags.item_id = items.id and tags.name = '{tag.lower()}')"
    if preparation:
        sql_string += '\nAND ' if used_where else "\nWHERE "
        used_where = True
        sql_string += f"\nEXISTS (SELECT item_tags.id from item_tags JOIN tags ON tags.id = item_tags.tag_id WHERE item_tags.item_id = items.id and tags.name = '{preparation[0].lower()}')"
        for tag in preparation[1:]:
            sql_string += f"\nOR EXISTS (SELECT item_tags.id from item_tags JOIN tags ON tags.id = item_tags.tag_id WHERE item_tags.item_id = items.id and tags.name = '{tag.lower()}')"
    if saved and user_id:
        sql_string += "\nAnd " if used_where else "\nWHERE "
        sql_string += f"""EXISTS (SELECT id from item_saves WHERE item_saves.item_id = items.id AND item_saves.user_id = {user_id})"""
    print(f'filter string: {sql_string}')
    

    response = database.select_multiple(sql_string=sql_string)
    # response = database.select_multiple('sql/items/get_items.sql', {'limit':limit})

    return response

@router.post('/', status_code=201, response_model=item_schema.ItemSchema)
def create_item(item: item_schema.ItemPost):

    response = database.insert('sql/items/post_item.sql',item.model_dump())

    return response


@router.get('/{item_id}', response_model=item_schema.ItemSchema)
def get_item(item_id: int, user_id: int = None):

    response = database.select_one('sql/items/get_item.sql',{'id':item_id})

    if not response:
        raise HTTPException(status_code=404, detail=f"Item with id {item_id} not found")

    if user_id:
        saved = database.select_one('sql/item_saves/check_item_saved.sql',{'item_id':item_id, 'user_id':user_id})['saved']
        response['saved'] = bool(saved)
    return response


@router.delete('/{item_id}')
def delete_item(item_id: int):

    deleted_item = database.delete('sql/items/delete_item.sql', {'id':item_id})

    if not deleted_item:
        raise HTTPException(status_code=404, detail=f'Item with id: {item_id} was not found')

    return Response(status_code=204)

@router.patch("/{item_id}", response_model=item_schema.ItemUpdate)
def update_item(item_id: int, item: item_schema.ItemUpdate):
    print(item.model_dump(exclude_unset=True))
    updated_item = database.update('sql/items/update_item.sql', {'id':item_id, **item.model_dump(exclude_unset=True)})

    if not updated_item:
        raise HTTPException(status_code=404, detail=f'Item with id: {item_id} was not found')

    return updated_item
