import uvicorn
import os
from fastapi import FastAPI, Query, Request
from fastapi.responses import RedirectResponse, HTMLResponse, JSONResponse, FileResponse, Response, PlainTextResponse



import requests
import time

from fastapi.staticfiles import StaticFiles
import json

PORT = 8000
DIRECTORY = 'site_root/imagebreed.org/'

app = FastAPI()
# UPSTREAM_HOST = "http://localhost:7080"
# UPSTREAM_HOST = "http://imagebreed-mirror.rlab.scienceversa.com:7080"
UPSTREAM_HOST= "https://imagebreed.org"

DEBUG_COOKIE = False

from collections import defaultdict
ACTION_LOG = defaultdict(list)
ACTION_POINTER = 0

def dump_cookies(request):
    cookies = request.cookies
    out = {}
    if DEBUG_COOKIE: print("******* COOKIE_DUMP START *******")
    if isinstance(request, requests.models.Response):
        if DEBUG_COOKIE:
            print("COOKIE JAR TYPE", type(request.cookies))
            print("Using seetings for 'requests.cookies.RequestsCookieJar'")
        cookies = request.cookies.get_dict()
    elif isinstance(request, dict):
        if DEBUG_COOKIE:
            print("Assuming cookies dict sent.")
        cookies = request
    else:
        if DEBUG_COOKIE:
            print("COOKIE JAR TYPE", type(request.cookies))
            print("Trying default")
        cookies = request.cookies
    if (cookies):
        for key in cookies:
            value = cookies.get(key)
            if DEBUG_COOKIE: print(f"COOKIE-> {key}:{value} ")
            out[key] = value
        if DEBUG_COOKIE: print("******* COOKIE_DUMP END *******")
        return out
    
def copy_cookies(request, response, upstream_session_id=None):
    if isinstance(request, requests.cookies.RequestsCookieJar):
        print("[COPY] COOKIE JAR.")
        cookies = request.cookies.get_dict()
    elif isinstance(request, dict):
        print("[COPY] Assuming cookies dict sent.")
        cookies = request
    else:
        print("[COPY] Trying default")
        cookies = request.cookies
    # set the cookies in the response headers
    print("COOKIES", cookies)
    # time.sleep(2)
    if (cookies):
            
        for key in cookies:
            value = cookies.get(key)
            if DEBUG_COOKIE:
                print(f"COPYING: {key} {value} ")
            response.set_cookie(key=key, value=value)
        if upstream_session_id:
            if DEBUG_COOKIE:
                print(f"COPYING: sgn_session_id from {cookies['sgn_session_id']} to {upstream_session_id}")
            response.set_cookie(key='sgn_session_id', value=upstream_session_id)
        if DEBUG_COOKIE:
            print("COOKIE DUMP", response.raw_headers)

    else:
        print("NO COOKIE")

# TODO: WHY IS THE loggin not fowarding properly?
# The sucessful utput is 
# {
#     "html": "  <li>\n      <div class=\"btn-group\" role=\"group\" aria-label=\"...\" style=\"height:34px; margin: 1px 3px 0px 0px\">\n\t<button id=\"navbar_profile\" class=\"btn btn-primary\" type=\"button\" onclick='location.href=\"/solpeople/profile/330\"' style=\"margin: 7px 0px 0px 0px\" title=\"My Profile\">fja32_imuser</button>\n\t<button id=\"navbar_lists\" name=\"lists_link\" class=\"btn btn-info\" style=\"margin:7px 0px 0px 0px\" type=\"button\" title=\"Lists\" onClick=\"show_lists();\">\n        Lists <span class=\"glyphicon glyphicon-list-alt\" ></span>\n\t</button>\n\t<button id=\"navbar_personal_calendar\" name=\"personal_calendar_link\" class=\"btn btn-primary\" style=\"margin:7px 0px 0px 0px\" type=\"button\" title=\"Your Calendar\">Calendar&nbsp;<span class=\"glyphicon glyphicon-calendar\" ></span>\n\t</button>\n\t<button id=\"navbar_logout\" class=\"btn btn-default glyphicon glyphicon-log-out\" style=\"margin:6px 0px 0px 0px\" type=\"button\" onclick=\"logout();\" title=\"Logout\"></button>\n      </div>\n  </li>\n",
#     "logged_in": 1
# }
# Maybe a cookie is needed
# @app.get("/api")
# async def read_api():
#     return {"Hello": "World"}

# async def read_api(name: str = Query(...), age: int = Query(...)):
#     data = {'name': name, 'age': age}
#     response = requests.get('http://example.com/api', params=data)
#     return response.json()


#https://imagebreed.org/ajax/user/login?username=fja32_imuser&password=SomePassword&goto_url=%2Fsolpeople%2Fprofile%2F330
# @app.get("/ajax/user/login")
# async def ajax_login(username: str = Query(...), password: str = Query(...), goto_url: str = Query(...)):
#     data = {'username': username, 
#             'password': password, 
#             'goto_url': goto_url}
#     #print(username, password, goto_url
#     #)
#     print("LOGIN", data)
#     response = requests.get('https://imagebreed.org/ajax/user/login', params=data)
#     print("LOGIN", response.status_code)
#     time.sleep(1)
#     print("LOGIN", response.content)
#     time.sleep(2)
#     #return json.dumps(data)
#     return response.content

## PRE-RENDERED BUTTON
# @app.get("/ajax/user/login_button_html")
# async def login_button_html(request: Request):
#     print("STATIC LOGGIN BUTTON")
#     data = {'html': '\n      <li class="dropdown">\n        <div class="btn-group" role="group" aria-label="..." style="height:34px; margin: 1px 0px 0px 0px" >\n            <button id="site_login_button" name="site_login_button" class="btn btn-primary" type="button" style="margin: 7px 7px 0px 0px; position-absolute: 10,10,100,10">Login</button>\n        </div>\n      </li>\n ', 'logged_in': ''}
#     logged_in = {"logged_in":1,"html":"  <li>\n      <div class=\"btn-group\" role=\"group\" aria-label=\"...\" style=\"height:34px; margin: 1px 3px 0px 0px\">\n\t<button id=\"navbar_profile\" class=\"btn btn-primary\" type=\"button\" onclick='location.href=\"/solpeople/profile/44\"' style=\"margin: 7px 0px 0px 0px\" title=\"My Profile\">fja32_imuser</button>\n\t<button id=\"navbar_lists\" name=\"lists_link\" class=\"btn btn-info\" style=\"margin:7px 0px 0px 0px\" type=\"button\" title=\"Lists\" onClick=\"show_lists();\">\n        Lists <span class=\"glyphicon glyphicon-list-alt\" ></span>\n\t</button>\n\t<button id=\"navbar_personal_calendar\" name=\"personal_calendar_link\" class=\"btn btn-primary\" style=\"margin:7px 0px 0px 0px\" type=\"button\" title=\"Your Calendar\">Calendar&nbsp;<span class=\"glyphicon glyphicon-calendar\" ></span>\n\t</button>\n\t<button id=\"navbar_logout\" class=\"btn btn-default glyphicon glyphicon-log-out\" style=\"margin:6px 0px 0px 0px\" type=\"button\" onclick=\"logout();\" title=\"Logout\"></button>\n      </div>\n  </li>\n"}
#     response = requests.get("http://localhost:7080/ajax/user/login_button_html", params=request.query_params)
#     out_response = JSONResponse(content=logged_in, 
#                             status_code=200,
#                             headers={"X-Requested-With": "XMLHttpRequest"})

#     copy_cookies(request, out_response)
#     return out_response

from collections import defaultdict
ACTION_LOG = defaultdict(list)
ACTION_POINTER = 0

# Dump ACCTION_LOG
@app.get("/dump_action_log")
async def dump_action_log():
    print("DUMP ACTION LOG")
    print("DUMP ACTION LOG", ACTION_LOG)

    # ignore css and js actions from output log
    out = defaultdict(list)
    for k in ACTION_LOG:
        out[k] = []
        for rec_no,item in enumerate(ACTION_LOG[k]):
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
    url = f'{UPSTREAM_HOST}/user/{path}'

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
    url = f'{UPSTREAM_HOST}/ajax/user/{path}'
    print(f"AJAX (XDR:{is_xhr}) USER: [{path}] -->", url)
    #is_xhr=False
    app_cookies = dump_cookies(in_request)
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
    upstream_cookies = dump_cookies(upstream_response)

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
            copy_cookies(in_request, out_response, upstream_sgn_session_id)
        elif upstream_cookies and "sgn_session_id" in upstream_cookies:
            print(f'\nWILL USE upstream_cookies--->{upstream_cookies}')
            print(f'\nIGNORING APP_REQ cookies--->{app_cookies}')
            copy_cookies(upstream_cookies, out_response, upstream_sgn_session_id)
        else:
            print(f"\nIDK COOKIES.. passing from in request. {app_cookies}")
            copy_cookies(in_request, out_response, upstream_sgn_session_id)
        #time.sleep(2)
        if is_login_session:
            print("SETTING upstream_sgn_session_id")
            o =  {'sgn_session_id': upstream_sgn_session_id, 'user_prefs': user_prefs}
            copy_cookies(o, out_response, upstream_sgn_session_id)
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
            copy_cookies(in_request, out_response, upstream_sgn_session_id)
        elif upstream_cookies:
            copy_cookies(upstream_cookies, out_response, upstream_sgn_session_id)
        if is_login_session:
            print("SETTING upstream_sgn_session_id")
            o =  {'sgn_session_id': upstream_sgn_session_id, 'user_prefs': user_prefs}
            copy_cookies(o, out_response, upstream_sgn_session_id)
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


# @app.get("/breeders/drone_imagery", response_class=HTMLResponse)
# async def breeders_tool_box_drone_imagery(request: Request):
#     print("STATIC_PAGE: drone_imagery")
#     return open('site_root/imagebreed.org/breeders/drone_imagery').read()

### STATIC PAGES fro Breeders Toolbox pages of interest
# These were downloaded using wget and are served as static pages
# They are usually generated by the CatalystServer and we are just saving the outcome.
# STATIC PAGE FOR DRONE ROVER
@app.get("/breeders/drone_rover", response_class=HTMLResponse)
async def breeders_tool_box_drone_rover(request: Request):
    print("STATIC_PAGE: drone_rover")
    
    content = open('site_root/imagebreed.org/breeders/drone_rover').read()
    #out
    response = HTMLResponse(content=content, status_code=200, headers=request.headers)
    return response

# STATIC PAGE FOR DRONE IMAGERY
@app.get("/breeders/drone_imagery", response_class=HTMLResponse)
async def breeders_toolbox_drone_imagery(request: Request):
    print("STATIC_PAGE: drone_imagery")
    
    content = open('site_root/imagebreed.org/breeders/drone_imagery').read()
    #out
    response = HTMLResponse(content=content, status_code=200, headers=request.headers)
    return response

@app.get("/breeders/{path:path}")
async def breeders_tool_box(path: str, in_request: Request):
#    print(f"COOKIES LIST: {in_request.cookies}")
#    print(f"COOKIES: {in_request.cookies}")
    global ACTION_POINTER

    app_cookies = dump_cookies(in_request)
    print("APP_COOKIES", app_cookies)

    if "drone_rover" in path:
        increase_action_pointer()
    update_action_log(path)

    sgn_session_id = in_request.cookies.get("sgn_session_id")
    user_prefs = in_request.cookies.get("user_prefs")
    print(f"SESSION_ID: {sgn_session_id}")
    print(f"user_prefs: {user_prefs}")

    url = f'{UPSTREAM_HOST}/breeders/{path}'
    print("breeders_tool_box", url)
    response = requests.get(url, params=in_request.query_params, cookies=app_cookies)
    #print(url, request.query_params)
    #return response.text
    #return RedirectResponse(url=url)
    out_response = HTMLResponse(content=response.content, status_code=response.status_code)
    print("RESPONSE", response.cookies)
    copy_cookies(in_request, out_response)
    return out_response



@app.get("/tools/{path:path}")
async def read_ajax_api(path: str, in_request: Request):
    url = f'{UPSTREAM_HOST}/tools/{path}'
    print("TOOLSL HEADERS", in_request.headers)
    app_cookies = dump_cookies(in_request)
    print("APP_COOKIES", app_cookies)
    
    tools_path = os.path.join("tools", path)
    print("REDIRECTING TO", tools_path)
    return await read_all(tools_path, in_request)

@app.get("/brapi/{path:path}")
@app.post("/brapi/{path:path}")
async def read_brapi(path: str, in_request: Request):
    url = f'{UPSTREAM_HOST}/brapi/{path}'
    print("BRAPI HEADERS", in_request.headers)
    app_cookies = dump_cookies(in_request)
    print("APP_COOKIES", app_cookies)
    method = in_request.method
    brapi_path = os.path.join("brapi", path)
    print("REDIRECTING TO", brapi_path)
    print("METHOD", method)
    return await read_all(brapi_path, in_request, request_method=method)

@app.get("/ajax/{path:path}")
async def read_ajax_api(path: str, in_request: Request):
    url = f'{UPSTREAM_HOST}/ajax/{path}'
    print("AJAX CATCHALL", url, in_request.query_params)
    print("AJAX CATCHALL HEADERS", in_request.headers)
    app_cookies = dump_cookies(in_request)
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
    favicon_path = os.path.join(DIRECTORY, "favicon.ico")
    with open(favicon_path, "rb") as fp:
        content = fp.read()
    return Response(content=content, media_type="image/x-icon")

def increase_action_pointer():
    global ACTION_POINTER
    ACTION_POINTER += 1

# record all the data necessary to recreate a URL request, including cookies, headers, and params
# in addition record the output of the request and the response headers
# this will be used to recreate the request on the client side
def update_action_log(url, params_dict=None, headers_dict=None, cookies_dict=None, request=None, response=None, response_headers=None, response_content=None):

    global ACTION_LOG, ACTION_POINTER
    #ACTION_LOG[ACTION_POINTER].append(f"Url: {url} {params_dict} {headers_dict} {cookies_dict} {request} {response} {response_headers} {response_content}")
    
    # append json data to the action log
    log_data = { "url": url, "params": params_dict, "headers": headers_dict,
                 "cookies": cookies_dict, "request": request, "response": response, 
                 "response_headers": response_headers}
    if response_content is not None:
        print("TYPE", type(response_content))
        log_data["response_content"] = str(response_content).encode('utf-8')
    
    ACTION_LOG[ACTION_POINTER].append(log_data)

@app.get("/api/{path:path}")
async def read_api(path: str, request: Request):
    print("API", path)
    api_path = os.path.join("api", path)
    print("REDIRECTING TO", api_path)
    print("API PATH", api_path)
    # out = await read_all(api_path, request)
    
    return await read_all(api_path, request)
    #return path

app.mount("/", StaticFiles(directory=DIRECTORY, html=True), name="root")


@app.get("/{path:path}")
async def read_all(path: str, request: Request, request_method="GET"):
    dump_cookies(request)
    url = f'{UPSTREAM_HOST}/{path}'
    print("CATCHALL", url, request.query_params)
    print(f"CATCHALL PATH {path} method {request_method}")

    
    upstream_headers = {k: v for k, v in request.headers.items() if k not in ['host', 'upgrade-insecure-requests']}


    if path == "/" or path == "":
        print("HEADERS", request.headers)
        path = "/"
        url = f'{UPSTREAM_HOST}/{path}'
        #upstream_response = requests.get("https://imagebreed.org")
        #upstream_response = requests.get(url, params=request.query_params, headers=upstream_headers)
        upstream_response = requests.request(request_method, url, params=request.query_params, headers=upstream_headers)

        return HTMLResponse(content=upstream_response.content)
    
    else:
        #upstream_response = requests.get(url, params=request.query_params, headers=upstream_headers)
        upstream_response = requests.request(request_method, url, params=request.query_params, headers=upstream_headers)
        

    
    update_action_log(url, params_dict=request.query_params, 
                          headers_dict=request.headers, cookies_dict=request.cookies, 
                          request=request, response=upstream_response, response_headers=upstream_response.headers, 
                          response_content=upstream_response.content)
    print("UPSTREAM HEADERS", upstream_response.headers)
    #response = HTMLResponse(content=upstream_response.content, status_code=upstream_response.status_code, headers=upstream_response.headers)
    print("STATUS", upstream_response.status_code)
    print("HEADERS", upstream_response.headers)
    content_type = upstream_response.headers["Content-Type"]
    print("CONTENT TYPE", content_type)
    print("Calling Response Biulder...")
    response = build_response(content_type=content_type,
                              content=upstream_response.content,
                              status_code=upstream_response.status_code,
                              headers=upstream_response.headers)
    copy_cookies(upstream_response, response)
    #print("RESPONSE", upstream_response.content)
    #time.sleep(5)
    # time.sleep(1)
    return response



#app.mount("/", StaticFiles(directory=DIRECTORY, html=True), name="root")



# app.mount("/css", StaticFiles(directory="server/css"), name="css")
# app.mount("/documents", StaticFiles(directory="server/documents"), name="documents")
# app.mount("/img", StaticFiles(directory="server/img"), name="img")
# app.mount("/", StaticFiles(directory="server"), name="root")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)