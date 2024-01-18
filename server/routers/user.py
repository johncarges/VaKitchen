from fastapi import FastAPI, HTTPException, Response, APIRouter, Depends
from pydantic import BaseModel
from typing import Optional

from schemas import users, plans
import database
import oauth2

router = APIRouter(tags=['User'])


@router.get('/userplan',status_code=200, response_model=plans.UserPlan)
def get_user_plan(user_id: int = Depends(oauth2.get_current_user)):

    user_plan = database.select_one('sql/plans/get_user_plan.sql', {"user_id":user_id})

    return user_plan