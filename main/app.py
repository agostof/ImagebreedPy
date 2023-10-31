import uvicorn
import os
from fastapi import FastAPI, Query, Request
from fastapi.responses import RedirectResponse, HTMLResponse, JSONResponse, FileResponse, Response, PlainTextResponse
import requests
import time
from fastapi.staticfiles import StaticFiles
import json
from fastapi.templating import Jinja2Templates
from collections import defaultdict

import main.services.utils as utils


app = FastAPI()


from main.routers import breeders
app.add_route("/breeders", breeders.router)
app.mount("/", StaticFiles(directory=utils.DIRECTORY, html=True), name="root")
templates = Jinja2Templates(directory=utils.DIRECTORY + "breeders/")

# Dump ACTION_LOG
@app.get("/dump_action_log")
async def dump_action_log():
    print("DUMP ACTION LOG")
    print("DUMP ACTION LOG", utils.ACTION_LOG)

    # ignore css and js actions from output log
    out = defaultdict(list)
    for k in utils.ACTION_LOG:
        out[k] = []
        for rec_no,item in enumerate(utils.ACTION_LOG[k]):
            print(rec_no, "DUMP ACTION LOG", item)
            if ".css" in item or ".js" in item or "image/" in item:
                continue
            out[k].append(item)
        #    if items.endswith(".css") or items.endswith(".js"):
        #        continue
        #    out[k].append(items)
            # for item in items:
            #     if item.endswith(".css") or item.endswith(".js"):
            #         continue
            #     out[k].append(item)
        
    # for k in list(ACTION_LOG.keys()):
    #     if k.endswith(".css") or k.endswith(".js"):
    #         del ACTION_LOG[k]
    return out


@app.get("/user/{path:path}")
async def user(path: str, request: Request):
    # url = f'https://imagebreed.org/ajax/user/{path}'
    url = f'{utils.UPSTREAM_HOST}/user/{path}'

    print("PLAIN USER", url)
    response = requests.get(url, params=request.query_params)
    # print(response.content)
    # time.sleep(1)
    if response.headers["Content-Type"] == "application/json":
        data = response.json()
        #print("PLAN USER JSON", data)
        return response.json()
    else:
        #print(url, request.query_params)
        #return response.text
        #return RedirectResponse(url=url)
        print("PLAIN USER NORMAL PATH", response.headers["Content-Type"] )

        return HTMLResponse(content=response.content, 
                            status_code=response.status_code)

    return JSONResponse(content=data, status_code=200, headers={"X-Requested-With": "XMLHttpRequest"})

#sgn_session_id=juiojrpcbptkxmoamcptyzwhhrvkilciztpxzgmmquvkrexzudlzlibxakrdedmoncbqnjg; Path=/;


# fja32_imuser
# SomePassword
from typing import Union
@app.get("/ajax/user/{path:path}")
async def ajax_user(path: str, in_request: Request, username: Union[str, None] = None, password: Union[str, None] = None, goto_url: Union[str, None] = None):
    is_login_session = False
    if (path == "login") or (path == "logout"):
        is_login_session = True
    if is_login_session:
        print("**********************************************************************************************")
        print("******                        LOGIN    USER                                              *****")
        print("**********************************************************************************************")
    is_xhr = in_request.headers.get("X-Requested-With") == "XMLHttpRequest"
    print(f"INQUEST HEADERS {in_request.headers} \n")
    # time.sleep(1)

    

    # url = f'https://imagebreed.org/ajax/user/{path}'
    url = f'{utils.UPSTREAM_HOST}/ajax/user/{path}'
    print(f"AJAX (XDR:{is_xhr}) USER: [{path}] -->", url)
    #is_xhr=False
    app_cookies = utils.dump_cookies(in_request)
    # time.sleep(2)

    print(f"APP_COOKIES {app_cookies}")
    #in_request.headers['host'] = UPSTREAM_HOST
    # copy headers from in_request to upstream_headers (except for host)
    upstream_headers = {k: v for k, v in in_request.headers.items() if k != 'host'}
    

    #if isinstance(app_cookies, dict) or is_login_session:
    if isinstance(app_cookies, dict) and 'sgn_session_id' in app_cookies:
        print("** TRYING TO FWD COOKIE. **")
        in_session_id = app_cookies['sgn_session_id']
        # upstream_headers = {
        #  'cookie': f'sgn_session_id={in_session_id}; user_prefs=""'
        # }
        # upstream_headers = {
        #     'X-Requested-With': 'XMLHttpRequest',
        #     'Cookie': f'sgn_session_id={in_session_id}; user_prefs=""'
        # }

        #upstream_response = requests.get(url, params=in_request.query_params, headers=upstream_headers)
        upstream_response = requests.request("GET", url, params=in_request.query_params, headers=upstream_headers, data={})

        if (path == "login"):
            print("LOGIN FWD")
            # time.sleep(5)
        #time.sleep(1)
    else:
        #app_cookies['sgn_session_id'] = ''
        if not app_cookies:
            app_cookies = {'sgn_session_id': ''}
        
        print(f"Trying default upstream. \n\tPARAMS:{in_request.query_params} \n\t COOKIES:{app_cookies}")
        upstream_response = requests.get(url, params=in_request.query_params, cookies=app_cookies)
        if (path == "login"):
            print("LOGIN DEFAULT")
            # time.sleep(5)
        #time.sleep(1)
    #response.set_cookie(key="sgn_session_id", value=session_id, httponly=True, secure=True)
    #response.cookies
    print(f"IN_REQ_COOKIES: {in_request.cookies}")

    print(f"UPSTREAM RESP HEADERS: {upstream_response.headers}")
    print(f"UPSTREAM RESP CONTENT: {upstream_response.content[:100]}")
    print(f"UPSTREAM RESP COOKIES: {upstream_response.cookies}")

    upstream_sgn_session_id = upstream_response.cookies.get("sgn_session_id")
    user_prefs = upstream_response.cookies.get("user_prefs")
    upstream_cookies = utils.dump_cookies(upstream_response)

    print(f"UPSTREAM SESSION_ID: {upstream_sgn_session_id}")
    print(f"UPSTREAM user_prefs: {user_prefs}")
    print("IS this a LOGIN SESSION?", is_login_session)
    if is_login_session:
        #upstream_sgn_session_id = upstream_response.cookies.get("sgn_session_id")
        print(f"LOGIN Section Detected {path} ... \n\t will keep UPSTREAM SESSION_ID: {upstream_sgn_session_id}")
    else:
        print(f"IGNORING {path} UPSTREAM SESSION_ID: {upstream_sgn_session_id}")
        upstream_sgn_session_id = None

    if is_xhr:
        # handle XHR request
        print("HANDLE XHR REQUEST")
        data = upstream_response.json()
        print("AJAX USER JSON", data)
        #time.sleep(1)
        print(f"AJAX USER [{path}] JSON with (XDR:{is_xhr})", data)

        out_response = JSONResponse(content=upstream_response.json(), 
                            status_code=upstream_response.status_code,
                            headers={"X-Requested-With": "XMLHttpRequest"})
        # if sgn_session_id:
        #     out_response.set_cookie(key="sgn_session_id", value=sgn_session_id)#, httponly=True, secure=True)
        #     out_response.set_cookie(key="user_prefs", value=user_prefs)
        #print(f"CREATED COOKIES: {out_response.cookies}")

        #if "sgn_session_id" in app_cookies:
        if isinstance(app_cookies, dict) and 'sgn_session_id' in app_cookies:
        #if app_cookies:
            print(f'\nWILL USE APP_REQ cookies--->{app_cookies}')
            print(f'IGNORING upstream_cookies--->{upstream_cookies}')
            utils.copy_cookies(in_request, out_response, upstream_sgn_session_id)
        elif upstream_cookies and "sgn_session_id" in upstream_cookies:
            print(f'\nWILL USE upstream_cookies--->{upstream_cookies}')
            print(f'\nIGNORING APP_REQ cookies--->{app_cookies}')
            utils.copy_cookies(upstream_cookies, out_response, upstream_sgn_session_id)
        else:
            print(f"\nIDK COOKIES.. passing from in request. {app_cookies}")
            utils.copy_cookies(in_request, out_response, upstream_sgn_session_id)
        #time.sleep(2)
        if is_login_session:
            print("SETTING upstream_sgn_session_id")
            o =  {'sgn_session_id': upstream_sgn_session_id, 'user_prefs': user_prefs}
            utils.copy_cookies(o, out_response, upstream_sgn_session_id)
        print("XDR COOKIE DUMP", out_response.raw_headers)
        
        return out_response
    
    
    if upstream_response.headers["Content-Type"] == "application/json":
        data = upstream_response.json()
        print(f"AJAX USER [{path}] JSON with (XDR:{is_xhr})", data)
        #return response.json()
        out_response = JSONResponse(content=upstream_response.json(), 
                            status_code=upstream_response.status_code)
        # if sgn_session_id:
        #     out_response.set_cookie(key="sgn_session_id", value=sgn_session_id)
        #     out_response.set_cookie(key="user_prefs", value=user_prefs)
        if app_cookies:
            utils.copy_cookies(in_request, out_response, upstream_sgn_session_id)
        elif upstream_cookies:
            utils.copy_cookies(upstream_cookies, out_response, upstream_sgn_session_id)
        if is_login_session:
            print("SETTING upstream_sgn_session_id")
            o =  {'sgn_session_id': upstream_sgn_session_id, 'user_prefs': user_prefs}
            utils.copy_cookies(o, out_response, upstream_sgn_session_id)
        print("JSON COOKIE DUMP", out_response.raw_headers)
        return out_response
    
        #return HTMLResponse(content=response.content, 
        #                    status_code=response.status_code)
    # else:
    #     #print(url, request.query_params)
    #     #return response.text
    #     #return RedirectResponse(url=url)
    #     print("AJAX USER NORMAL PATH", response.headers["Content-Type"] )

    #     return HTMLResponse(content=response.content, 
    #                         status_code=response.status_code)

@app.get("/tools/{path:path}")
async def read_ajax_api(path: str, in_request: Request):
    url = f'{utils.UPSTREAM_HOST}/tools/{path}'
    print("TOOLS HEADERS", in_request.headers)
    app_cookies = utils.dump_cookies(in_request)
    print("APP_COOKIES", app_cookies)
    
    tools_path = os.path.join("tools", path)
    print("REDIRECTING TO", tools_path)
    return await read_all(tools_path, in_request)

@app.get("/brapi/{path:path}")
@app.post("/brapi/{path:path}")
async def read_brapi(path: str, in_request: Request):
    url = f'{utils.UPSTREAM_HOST}/brapi/{path}'
    print("BRAPI HEADERS", in_request.headers)
    app_cookies = utils.dump_cookies(in_request)
    print("APP_COOKIES", app_cookies)
    method = in_request.method
    brapi_path = os.path.join("brapi", path)
    print("REDIRECTING TO", brapi_path)
    print("METHOD", method)
    return await read_all(brapi_path, in_request, request_method=method)

@app.get("/ajax/{path:path}")
async def read_ajax_api(path: str, in_request: Request):
    url = f'{utils.UPSTREAM_HOST}/ajax/{path}'
    print("AJAX CATCHALL", url, in_request.query_params)
    print("AJAX CATCHALL HEADERS", in_request.headers)
    app_cookies = utils.dump_cookies(in_request)
    print("APP_COOKIES", app_cookies)
    
    print("AJAX API", path)
    ajax_api_path = os.path.join("ajax", path)
    print("REDIRECTING TO", ajax_api_path)
    
    return await read_all(ajax_api_path, in_request)

    # response = requests.get(url, params=in_request.query_params, cookies=app_cookies)
    # out_response = JSONResponse(content=response.json(), status_code=response.status_code)
    # return out_response

from io import BytesIO
import gzip

RESPONSE_TYPES = {
        'text/html': HTMLResponse,
        'text/html; charset=UTF-8': HTMLResponse,
        'text/html; charset=utf-8': HTMLResponse,
        #'application/json': JSONResponse,
        'application/json': Response,
        'image/jpeg': Response,
        'image/gif': Response,
        'image/png': Response,
        'image/svg+xml': Response,
        'font/ttf': Response,
        'font/woff': Response,
        'font/woff2': Response,
        'text/css': PlainTextResponse,
        'text/plain': PlainTextResponse,
        'text/javascript': PlainTextResponse,
        'text/javascript; charset=UTF-8': Response,
        'application/javascript': PlainTextResponse,
        'application/javascript; charset=UTF-8': Response
        # Add more content types and response classes as needed
}
def build_response(content_type, content, status_code, headers):
    global RESPONSE_TYPES
    

    if content_type in RESPONSE_TYPES:
        response_class = RESPONSE_TYPES[content_type]
        print("BUILDING RESPONSE", content_type, status_code, headers)
        #if content_type.startswith('application/json'):
            #content = json.loads(content.decode('utf-8'))
            #print("JSON RESPONSE", json.loads(content.decode('utf-8')))
        #    out_response = response_class(content=content, media_type=content_type, status_code=status_code, headers=headers)
        # if content_type.startswith('application/json'):
        #     # Convert the bytes object to a Python object
        #     content_local = json.loads(content.decode('utf-8'))
        #     print("JSON LENGTH", len(content_local))
        #     #print("JSON RESPONSE", content_local)
        #     # Update the Content-Length header to reflect the new content length
        #     #content = json.dumps(content_local).encode('utf-8')
        #     #content_length = len(json.dumps(content_local).encode('utf-8'))
        #     #content_length = len(content)
        #     #headers['Content-Length'] = str(content_length)

        if content_type in ['text/plain', 'text/html', 'text/css', 'text/javascript', 'application/json'] or content_type.startswith('text/') or content_type.startswith('application/javascript') or content_type.startswith('text/javascript') or content_type.startswith('image/'):
            # Compress the content using gzip
            compressed_content = gzip.compress(content)#.encode('utf-8')
            # Create a BytesIO object to hold the compressed content
            compressed_content_io = BytesIO(compressed_content)
            # Set the Content-Encoding header to gzip
            headers['Content-Encoding'] = 'gzip'
            headers['Content-Length'] = str(len(compressed_content))
            out_response = response_class(content=compressed_content_io.getvalue(), media_type=content_type, status_code=status_code, headers=headers)
        else:
            out_response =  response_class(content=content, media_type=content_type, status_code=status_code, headers=headers)
    else:
        out_response =  HTMLResponse(content=f"Unsupported content type: {content_type}", status_code=400)
    print("RESPONSE BUILT", out_response)
    print("RESPONSE HEADER", out_response.raw_headers)
    #print("RESPONSE HEADER", content)
    return out_response
    
# def build_response(content_type, content, status_code, headers):
#     response_types = {
#         'text/html': HTMLResponse,
#         'application/json': JSONResponse,
#         'image/png': Response,
#         'text/css': PlainTextResponse
#         # Add more content types and response classes as needed
#     }
#     print("BUILD_RESPONSE", content_type, content[:100], status_code, headers)
#     if content_type in response_types:
#         response_class = response_types[content_type]
#         print("RESPONSE_CLASS", response_class)
#         return response_class(content=content, media_type=content_type, status_code=status_code, headers=headers)
#     else:
#         return HTMLResponse(content=f"Unsupported content type: {content_type}", status_code=400)


#app.mount("/favicon.ico", StaticFiles(directory=DIRECTORY), name="favicon")
@app.get("/favicon.ico")
async def favicon():
    favicon_path = os.path.join(utils.DIRECTORY, "favicon.ico")
    with open(favicon_path, "rb") as fp:
        content = fp.read()
    return Response(content=content, media_type="image/x-icon")


@app.get("/api/{path:path}")
async def read_api(path: str, request: Request):
    print("API", path)
    api_path = os.path.join("api", path)
    print("REDIRECTING TO", api_path)
    print("API PATH", api_path)
    # out = await read_all(api_path, request)
    
    return await read_all(api_path, request)
    #return path

@app.get("/{path:path}")
async def read_all(path: str, request: Request, request_method="GET"):
    utils.dump_cookies(request)
    url = f'{utils.UPSTREAM_HOST}/{path}'
    print("CATCHALL", url, request.query_params)
    print(f"CATCHALL PATH {path} method {request_method}")

    
    upstream_headers = {k: v for k, v in request.headers.items() if k not in ['host', 'upgrade-insecure-requests']}


    if path == "/" or path == "":
        print("HEADERS", request.headers)
        path = "/"
        url = f'{utils.UPSTREAM_HOST}/{path}'
        #upstream_response = requests.get("https://imagebreed.org")
        #upstream_response = requests.get(url, params=request.query_params, headers=upstream_headers)
        upstream_response = requests.request(request_method, url, params=request.query_params, headers=upstream_headers)

        return HTMLResponse(content=upstream_response.content)
    
    else:
        #upstream_response = requests.get(url, params=request.query_params, headers=upstream_headers)
        upstream_response = requests.request(request_method, url, params=request.query_params, headers=upstream_headers)
        

    
    utils.update_action_log(url, params_dict=request.query_params, 
                          headers_dict=request.headers, cookies_dict=request.cookies, 
                          request=request, response=upstream_response, response_headers=upstream_response.headers, 
                          response_content=upstream_response.content)
    print("UPSTREAM HEADERS", upstream_response.headers)
    #response = HTMLResponse(content=upstream_response.content, status_code=upstream_response.status_code, headers=upstream_response.headers)
    print("STATUS", upstream_response.status_code)
    print("HEADERS", upstream_response.headers)
    content_type = upstream_response.headers["Content-Type"]
    print("CONTENT TYPE", content_type)
    print("Calling Response Builder...")
    response = build_response(content_type=content_type,
                              content=upstream_response.content,
                              status_code=upstream_response.status_code,
                              headers=upstream_response.headers)
    utils.copy_cookies(upstream_response, response)
    #print("RESPONSE", upstream_response.content)
    #time.sleep(5)
    # time.sleep(1)
    return response


print("app loaded")
print(__name__)
print(app)

if __name__ == "__main__":
   uvicorn.run("main.app:app", host="127.0.0.1", port=8000, reload=True)