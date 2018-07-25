from src import *

if __name__ == "__main__":
    # starts the webserver
    # optional parameters
    # start(FusionDiagnostics,address='127.0.0.1', port=8081, multiple_instance=False,enable_file_cache=True, update_interval=0.1, start_browser=True)

    start(FusionDiagnostics, debug=False, address='0.0.0.0', start_browser=False)