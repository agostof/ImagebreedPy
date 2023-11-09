DIRECTORY = 'main/site_root/imagebreed.org/'


from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    oidc_issuer: str
    oidc_client_id: str
    oauth_domain: str = ""
    oauth_api_audience: str = ""
    oauth_algorithms: str = ""
    
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')

@lru_cache()
def settings():
    return Settings()