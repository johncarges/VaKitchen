from fastapi import FastAPI, HTTPException, Response, APIRouter
from pydantic import BaseModel
from typing import Optional

from schemas import tag_schema
import database


router = APIRouter(tags=['Tags'])

@router.get("/tags", status_code=200)
def all_tags():

    all_tags = database.select_multiple('sql/tags/get_all_tags.sql')
    
    types = [tag_type for tag_type in tag_schema.TagType]

    if not (all_tags and types):
        raise HTTPException(status_code=404, detail="Could not load current tags")
    
    response = {tag_type.title(): [tag['name'].title() for tag in all_tags if tag['type']== tag_type] for tag_type in types}


    return response


