from fastapi import HTTPException, Request, status
from fastapi.params import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.security.auth0 import VerifyToken

token_auth_scheme = HTTPBearer()


def verify_token(token: HTTPAuthorizationCredentials = Depends(token_auth_scheme)):
    result = VerifyToken(token.credentials).verify()
    if result.get("status"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=result.get("msg", "")
        )
    return result


def get_access_token(request: Request):
    return request.headers["Authorization"].split()[1]
