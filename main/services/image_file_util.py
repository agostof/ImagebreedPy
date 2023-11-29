from main.services.app_settings import settings
from fastapi import UploadFile
from datetime import datetime
from pathlib import Path

def archive_zip_file(zip_file:UploadFile):
    timestamp = str(datetime.now()).replace(' ', '_').replace(':', '-').replace('.', '-')
    out_path = Path(settings.image_archive_dir) / f"archive_{timestamp}"
    out_path.mkdir(parents=True, exist_ok=True)
    if not out_path.is_dir():
        raise NotADirectoryError()
    out_file_path = out_path / zip_file.filename
    out_file_path.touch()

    content = zip_file.file.read()

    with out_file_path.open(mode='wb') as out_file:
        out_file.write(content)

    return out_file_path