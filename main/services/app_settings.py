DIRECTORY = 'main/site_root/imagebreed.org/'

from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    oidc_issuer: str
    oidc_client_id: str
    db_uri: str
    brapi_base_url: str
    image_storage_dir: str
    image_archive_dir: str
    
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')

settings = Settings()