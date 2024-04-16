from fastapi import FastAPI, HTTPException, Response, APIRouter
from pydantic import BaseModel
from typing import Optional

from server.schemas import plan_schema
import database


router = APIRouter()

@router.get("/plans", status_code=200, tags=['Plans'])
def get_current_plans():

    response = database.select_multiple('sql/plans/current_plans.sql')

    if not response:
        raise HTTPException(status_code=404, detail="Could not load current plans")
    
    return response
