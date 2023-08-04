from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.config import Settings, get_settings

settings: Settings = get_settings()

SQLALCHEMY_DATABASE_URL = f"postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.POSTGRES_NAME}/{settings.POSTGRES_DB}"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
