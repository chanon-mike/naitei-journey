from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import configure_mappers
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.config import Settings, get_settings
from app.db.base import Base
from app.db.database import engine
from app.routers import category, debug, job, user


configure_mappers()
Base.metadata.create_all(bind=engine)

settings: Settings = get_settings()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGIN,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request, exc):
    message = str(exc.detail)
    return JSONResponse({"message": message}, status_code=exc.status_code)


app.include_router(user.router)
app.include_router(job.router)
app.include_router(category.router)
app.include_router(debug.router)
