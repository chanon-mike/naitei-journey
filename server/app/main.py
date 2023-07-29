from app.core.config import Settings, get_settings
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

settings: Settings = get_settings()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGIN,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"Hello": "World"}
