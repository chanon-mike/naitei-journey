from typing import Dict


class Payload(Dict):
    iss: str
    sub: str
    aud: str
    iat: str
    exp: str
    azp: str
    gty: str
