from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter

import psycopg2
from pathlib import Path
import time

"""
    DATABASE connection functionality
"""

def db_connect():
    
    while True:
        try:
            conn = psycopg2.connect(database='Vakitchen',
                            user='postgres',
                            host='localhost',
                            password='asdf1234',
                            port=5433)

            print("Connection Successful!")
            break
        except Exception as error:
            print("Connection failed")
            print("Error: ", error)
            time.sleep(2)
    return conn

def read_sql_query(sql_path: str) -> str:
    return Path(sql_path).read_text()



def select_one(sql_path:str, params: dict):
    conn = db_connect()
    cursor = conn.cursor()

    sql = read_sql_query(sql_path=sql_path)

    cursor.execute(query=sql, vars=params)
    response = cursor.fetchone()
    print(response)
    cursor.close()
    conn.close()

    return response

def select_multiple(sql_path: str, params: dict = None):
    conn = db_connect()
    cursor = conn.cursor()

    sql = read_sql_query(sql_path=sql_path)

    cursor.execute(query=sql, vars=params)
    response = cursor.fetchall()

    cursor.close()
    conn.close()

    return response

def insert(sql_path: str, params:dict):
    conn = db_connect()
    cursor = conn.cursor()
    
    sql = read_sql_query(sql_path=sql_path)
    
    cursor.execute(sql, params)
    response = cursor.fetchone()
    conn.commit()
    
    cursor.close()
    conn.close()
    
    return response

def update(sql_path: str, params: dict):
    conn = db_connect()
    cursor = conn.cursor()

    sql = read_sql_query(sql_path=sql_path)

    cursor.execute(query=sql, vars=params)
    response = cursor.fetchone()
    
    conn.commit()

    cursor.close()
    conn.close()

    return response

def delete(sql_path: str, params: dict):
    conn = db_connect()
    cursor = conn.cursor()

    sql = read_sql_query(sql_path=sql_path)

    cursor.execute(query=sql, vars=params)
    response = cursor.fetchone()

    conn.commit()

    cursor.close()
    conn.close()

    return response