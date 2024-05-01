from main.services.app_settings import settings
from boto3 import client
import datetime
from pathlib import Path
import os
from multiprocessing import Pool, cpu_count
from botocore.exceptions import ClientError
import sys
from argparse import ArgumentParser

parser = ArgumentParser(
    prog='Download Multiple S3 Files',
    description='Script to download multiple files from an S3 bucket as a parallel processed background subprocess.'
)
parser.add_argument('bucket')
parser.add_argument('task_db_id')
parser.add_argument('keys', nargs='*')

s3_client = client(
            's3',
            region_name=settings.aws_region,
            aws_access_key_id=settings.aws_access_key_id,
            aws_secret_access_key=settings.aws_secret_access_key,
        )

def download_image_from_bucket(key: str, exists_ok=True, s3_client=s3_client):
    # Implementation for downloading a file from a bucket to local storage in settings.image_storage
    datestamp = str(datetime.date.today()).replace(' ', '_').replace(':', '-').replace('.', '-')
    out_path = Path(settings.image_storage_dir) / f"s3_download_{datestamp}"
    out_path.mkdir(parents=True, exist_ok=True)
    if not out_path.is_dir():
        raise NotADirectoryError()
    out_path = out_path / os.path.basename(key)
    if not exists_ok and os.path.exists(out_path):
        return {'message': f'File already exists at specified path {out_path}'}
    try: 
        s3_client.download_file(Bucket=args.bucket, Key=key, Filename=out_path)
        return {'local_path': out_path}
    except ClientError as e:
        return {'message': e}

def parallel_download(arg_list):
    with Pool(processes=cpu_count()) as pool:
        pool.starmap(download_image_from_bucket, arg_list)

def main(args):
    try:
        parallel_download(arg_list=args.keys)
        return {'task': {args.task_db_id: args.keys}}
    except TypeError as e:
        print(e)



if __name__ == '__main__':
    
    args = parser.parse_args()
    upload_response = main(args)

    # Implement a task status table to db?
    #
    
