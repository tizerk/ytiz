import requests


def test_backend():
    port = input("Enter the backend's port number: ")
    try:
        r = requests.get(f"http://localhost:{port}/api/test")
        assert (
            r.status_code == 200
        ), "Failed to connect to backend.  Check if the backend is running, and if the port number is correct."
    except requests.exceptions.ConnectionError:
        print(
            "Failed to connect to backend.  Check if the backend is running, and if the port number is correct."
        )


test_backend()
