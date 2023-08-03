from fastapi import Depends, FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer
from sqlalchemy.orm import configure_mappers
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.core.config import Settings, get_settings
from app.db.database import Base, engine
from app.security.verify_token import VerifyToken

configure_mappers()

Base.metadata.create_all(bind=engine)

settings: Settings = get_settings()
token_auth_scheme = HTTPBearer()

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


@app.get("/api/public")
def public():
    """No access token required to access this route"""

    result = {
        "status": "success",
        "msg": (
            "Hello from a public endpoint! You don't need to be "
            "authenticated to see this."
        ),
    }
    return result


@app.get("/api/private")
def private(response: Response, token: str = Depends(token_auth_scheme)):
    """A valid access token is required to access this route"""

    result = VerifyToken(token.credentials).verify()

    if result.get("status"):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return result

    return result


@app.get("/api/private-scoped")
def private_scoped(response: Response, token: str = Depends(token_auth_scheme)):
    """A valid access token and an appropriate scope are required to access
    this route
    """

    result = VerifyToken(token.credentials, scopes="read:messages").verify()

    if result.get("status"):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return result

    return result
