from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles

from src.utils.sheduler import start_scheduler
from src.routes import *

@asynccontextmanager
async def lifespan(app: FastAPI):
    start_scheduler()
    yield

app = FastAPI(title="Construction Calculator API", lifespan=lifespan)

app.include_router(router=clients_router, prefix="/api")
app.include_router(router=auth_router, prefix="/api")
app.include_router(router=users_router, prefix="/api")
app.include_router(router=material_categories_router, prefix="/api")
app.include_router(router=material_router, prefix="/api")
app.include_router(router=calculations_router, prefix="/api")
app.include_router(router=email_router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/login/index.html")

current_dir = os.path.dirname(os.path.abspath(__file__))
frontend_path = os.path.abspath(os.path.join(current_dir, "../../frontend"))

if os.path.exists(frontend_path):
    app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")
else:
    print(f"ВНИМАНИЕ: Папка 'frontend' не найдена по пути: {frontend_path}")