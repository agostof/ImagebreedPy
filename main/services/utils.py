
from collections import defaultdict
import requests

PORT = 8000
DIRECTORY = 'main/site_root/imagebreed.org/'

# UPSTREAM_HOST = "http://localhost:7080"
# UPSTREAM_HOST = "http://imagebreed-mirror.rlab.scienceversa.com:7080"
UPSTREAM_HOST= "https://imagebreed.org"

DEBUG_COOKIE = False

ACTION_LOG = defaultdict(list)
ACTION_POINTER = 0

def dump_cookies(request):
    cookies = request.cookies
    out = {}
    if DEBUG_COOKIE: print("******* COOKIE_DUMP START *******")
    if isinstance(request, requests.models.Response):
        if DEBUG_COOKIE:
            print("COOKIE JAR TYPE", type(request.cookies))
            print("Using settings for 'requests.cookies.RequestsCookieJar'")
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
