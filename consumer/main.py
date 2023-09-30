import requests
import time

last = None

while True:
    res = requests.get("http://localhost:3000/speed")
    x = requests.post(
        "http://localhost:3000/connected",
        json={"connected": True})
    if res.status_code == requests.codes.not_found:
        print("not found")
        break
    if res.json() != last:
        print(res.json())
        last = res.json()
    time.sleep(0.5)
