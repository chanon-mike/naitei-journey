from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """
    Settings for the application
    """
    # AWS
    COGNITO_URL: str
    COGNITO_USER_POOL_ID: str
    COGNITO_APP_CLIENT_ID: str
    COGNITO_APP_CLIENT_SECRET: str

    # Core Settings
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    CORS_ORIGIN: str

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
