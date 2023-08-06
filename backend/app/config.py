from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """
    Settings for the application
    """

    # Core Settings
    DATABASE_URL: str
    CORS_ORIGIN: str

    # AUTH0 Settings
    AUTH0_DOMAIN: str
    AUTH0_AUDIENCE: str

    class Config:
        """
        Tell BaseSettings the env file path
        """

        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


@lru_cache()
def get_settings(**kwargs) -> Settings:
    """
    Get settings. ready for FastAPI's Depends.

    lru_cache - cache the Settings object per arguments given.
    """
    settings = Settings(**kwargs)
    return settings
