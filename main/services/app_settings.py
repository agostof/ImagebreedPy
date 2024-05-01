DIRECTORY = 'main/site_root/imagebreed.org/'

from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    oidc_issuer: str
    oidc_client_id: str
    db_uri: str
    brapi_base_url: str
    image_storage_dir: str
    image_archive_dir: str
    aws_access_key_id: str
    aws_secret_access_key: str
    aws_region: str
    aws_s3_bucket: str

    
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')

settings = Settings()