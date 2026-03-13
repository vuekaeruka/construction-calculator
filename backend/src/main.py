from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from src.routes import *

app = FastAPI(title="Construction Calculator API", prefix='/api')

app.include_router(router=clients_router, prefix='/clients', tags=['clients'])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)