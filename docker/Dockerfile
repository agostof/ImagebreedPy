FROM python:slim

MAINTAINER F. Agosto <fco@agostof.com>

RUN apt update && \ 
    apt install -y libgl1-mesa-glx libglib2.0-0 && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

COPY /requirements-locked.txt ./
RUN pip install --no-cache-dir -r /requirements-locked.txt && \
    rm /requirements-locked.txt
COPY /main /main
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 8000
ENTRYPOINT ["/entrypoint.sh"]
