from fastapi import APIRouter, Depends, Response, status

from app.security.auth0 import VerifyToken
from app.security.verify_token import token_auth_scheme

router = APIRouter(prefix="/debug", tags=["debug"])


@router.get("/public")
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


@router.get("/private")
def private(response: Response, token: str = Depends(token_auth_scheme)):
    """A valid access token is required to access this route"""

    result = VerifyToken(token.credentials).verify()

    if result.get("status"):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return result

    return result


@router.get("/private-scoped")
def private_scoped(response: Response, token: str = Depends(token_auth_scheme)):
    """A valid access token and an appropriate scope are required to access
    this route
    """

    result = VerifyToken(token.credentials, scopes="read:messages").verify()

    if result.get("status"):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return result

    return result
