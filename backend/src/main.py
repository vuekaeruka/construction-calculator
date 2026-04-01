from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from src.utils.sheduler import start_scheduler
from src.routes import *

@asynccontextmanager
async def lifespan(app: FastAPI):
    start_scheduler()
    yield

app = FastAPI(title="Construction Calculator API", lifespan=lifespan)

app.include_router(router=clients_router)
app.include_router(router=auth_router)
app.include_router(router=users_router)
app.include_router(router=material_categories_router)
app.include_router(router=material_router)
app.include_router(router=calculations_router)
app.include_router(router=email_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)