from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter

import psycopg2
from psycopg2.extras import RealDictCursor
from pathlib import Path
import time
from dotenv import dotenv_values

"""
    DATABASE connection functionality
"""

def db_connect():
    
    while True:
        try:
            password = dotenv_values(".env")['ELEPHANT_SQL_PASSWORD']
            conn = psycopg2.connect(database='qkhkanck', 
                            user='qkhkanck', 
                            host='baasu.db.elephantsql.com', 
                            password=password)
            
            # Local option: 
            # conn = psycopg2.connect(database='Vakitchen',
            #                 user='postgres',
            #                 host='localhost',
            #                 password='asdf1234',
            #                 port=5433)

            cursor = conn.cursor(cursor_factory=RealDictCursor)
            
            break
        except Exception as error:
            print("Connection failed")
            print("Error: ", error)
            time.sleep(2)
    return conn, cursor

def read_sql_query(sql_path: str) -> str:
    return Path(sql_path).read_text()

def select_one(sql_path:str, params: dict):
    conn, cursor = db_connect()
    

    sql = read_sql_query(sql_path=sql_path)

    cursor.execute(query=sql, vars=params)
    response = cursor.fetchone()
    cursor.close()
    conn.close()

    return response

def select_multiple(sql_path: str = None, params: dict = None, sql_string: str = None):
    """Takes either path to sql file (with variable params) or full sql string (as in get_items route)"""
    
    conn, cursor = db_connect()
    
    if sql_string:
        cursor.execute(query=sql_string)
    else:
        sql = read_sql_query(sql_path=sql_path)
        cursor.execute(query=sql, vars=params)
    
    response = cursor.fetchall()

    cursor.close()
    conn.close()

    return response

def insert(sql_path: str, params:dict):
    conn, cursor = db_connect()
    
    sql = read_sql_query(sql_path=sql_path)
    try:
        cursor.execute(sql, params)
    except Exception as e:
        print(e)
        raise e
    
    response = cursor.fetchone()
    conn.commit()
    
    cursor.close()
    conn.close()
    
    return response

def update(sql_path: str, params: dict):
    conn, cursor = db_connect()

    sql = read_sql_query(sql_path=sql_path)

    cursor.execute(query=sql, vars=params)
    response = cursor.fetchone()
    
    conn.commit()

    cursor.close()
    conn.close()

    return response

def delete(sql_path: str, params: dict):
    conn, cursor = db_connect()

    sql = read_sql_query(sql_path=sql_path)

    cursor.execute(query=sql, vars=params)
    response = cursor.fetchone()

    conn.commit()

    cursor.close()
    conn.close()

    return response




def clear_table(sql_path: str):
    conn, cursor = db_connect()

    sql = read_sql_query(sql_path=sql_path)

    cursor.execute(query=sql)

    conn.commit()

    cursor.close()
    conn.close()

