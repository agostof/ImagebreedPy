import http.server
import socketserver
import socket
import threading
import time

from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

from urllib.parse import urlparse, parse_qs

PORT = 8000
DIRECTORY = 'imagebreed.org/'

#Handler = http.server.SimpleHTTPRequestHandler

# with socketserver.TCPServer(("", PORT), Handler) as httpd:
#     print("Serving at port", PORT)
#     httpd.daemon_threads = True
#     httpd.allow_reuse_address = True
#     httpd.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
#     httpd.document_root = DIRECTORY
#     httpd.serve_forever()
import json


class WebHandler(http.server.SimpleHTTPRequestHandler):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs, directory=DIRECTORY)

    def do_GET(self):
        parsed_url = urlparse(self.path)
        if self.path == '/ajax/test':
            data = {'name': 'joe', 'age': 21}
            json_data = json.dumps(data).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json_data)
        if parsed_url.path == '/ajax/user/login':
            params = parse_qs(parsed_url.query)
            print(params)
            username = params.get('username', [''])[0]
            password = params.get('password', [''])[0]
            goto_url = params.get('goto_url', [''])[0]
            print(username, password, goto_url)
        
            data = {'name': 'joe', 'age': 21}
            json_data = json.dumps(data).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json_data)
        if self.path == '/ajax/user/login_button_html':
            data = {'html': '\n      <li class="dropdown">\n        <div class="btn-group" role="group" aria-label="..." style="height:34px; margin: 1px 0px 0px 0px" >\n            <button id="site_login_button" name="site_login_button" class="btn btn-primary" type="button" style="margin: 7px 7px 0px 0px; position-absolute: 10,10,100,10">Login</button>\n        </div>\n      </li>\n ', 'logged_in': ''}
            json_data = json.dumps(data).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json_data)
            # self.send_header('Content-type', 'text/plain')
            # self.end_headers()
            # self.wfile.write(b'This is the /data/collections endpoint')
        else:
            super().do_GET()

httpd = None

class Handler(FileSystemEventHandler):
    def on_any_event(self, event):
        if event.is_directory:
            print("EVENTç")
            return None

        if event.event_type == 'modified':
            global httpd
            print("Reloading server...")
            httpd.shutdown()
            httpd.server_close()
            start_server()

class Watcher:
    def __init__(self, directory):
        self.observer = Observer()
        self.directory = directory

    def run(self):
        print("DIRECTORY", self.directory)
        event_handler = Handler()
        self.observer.schedule(event_handler, self.directory, recursive=True)
        self.observer.start()
        try:
            while True:
                time.sleep(1)
        except:
            self.observer.stop()
            print("Error")

        self.observer.join()



def start_server():
    Handler = WebHandler

    with socketserver.TCPServer(("", PORT), Handler) as httpd_obj:
        print("Serving at port", PORT)
      #  httpd.daemon_threads = True
      #  httpd.allow_reuse_address = True
      #  httpd.set_document_root(DIRECTORY)
        global httpd
        httpd = httpd_obj
        httpd.serve_forever()

if __name__ == '__main__':
   # start_server_thread = threading.Thread(target=start_server)
    #start_server_thread.start()

    watcher = Watcher(DIRECTORY)
    watcher.run()
#handler = http.server.SimpleHTTPRequestHandler

# with socketserver.TCPServer(("", PORT), Handler) as httpd:
#     print("Serving at port", PORT)
#     #httpd.daemon_threads = True
#     httpd.allow_reuse_address = True
#     #httpd.set_document_root(DIRECTORY)
#     httpd.serve_forever()
#     #httpd.