from fastapi import FastAPI, HTTPException, Response
from pydantic import BaseModel
from typing import Optional
import psycopg2
from pathlib import Path
import time
from fastapi.middleware.cors import CORSMiddleware
from routers import user, auth, plan, item_save, item

import database

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def root():
    return {"Hello": "World"}

app.include_router(auth.router)
app.include_router(item.router)
app.include_router(item_save.router)
app.include_router(plan.router)
app.include_router(user.router)