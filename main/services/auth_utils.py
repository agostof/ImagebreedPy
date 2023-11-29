from fastapi import APIRouter, Security, Request
from pydantic import BaseModel
from requests.models import PreparedRequest
from fastapi_resource_server import JwtDecodeOptions, OidcResourceServer
import secrets

from main.services.app_settings import settings

class User(BaseModel):
    username: str
    given_name: str
    family_name: str
    email: str

class AuthUtilsClass():
    router = APIRouter(prefix="/breeders")

    decode_options = JwtDecodeOptions(
        verify_signature=True, leeway=0,
        require_exp=True, require_iat=True, require_iss=True, require_sub=True, 
        verify_exp=True, verify_iat=True, verify_iss=True, verify_sub=True, 
        require_aud=False, require_at_hash=False, require_jti=False, require_nbf=False,
        verify_aud=False, verify_at_hash=False, verify_jti=False, verify_nbf=False,
        )

    auth_scheme = OidcResourceServer(
        settings.oidc_issuer,
        scheme_name="Keycloak",
        jwt_decode_options=decode_options,
    )

    def getCurrentUser(self, claims: dict = Security(auth_scheme)):
        claims.update(username=claims["preferred_username"])
        user = User.model_validate(claims)
        return user

    def getAccessToken(self, request: Request):
        authorization: str = request.headers.get("Authorization")
        return authorization

    def getOAuthLoginURL(self, redirectURI: str):
        req = PreparedRequest()
        authURL = self.auth_scheme.well_known["authorization_endpoint"]
        queryParams = {
            "client_id" : settings.oidc_client_id,
            "scope" : "openid",
            "response_type" : "token",
            "redirect_uri" : redirectURI,
            "nonce": secrets.token_urlsafe()
            }
        req.prepare_url(authURL, queryParams)
        print(req.url)
        return req.url

AuthUtils = AuthUtilsClass()