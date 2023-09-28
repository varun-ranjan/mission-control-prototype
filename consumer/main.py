import requests
import time

last = None

while True:
    res = requests.get("http://localhost:3000/speed")
    if res.json() != last:
        print(res.json())
        last = res.json()
    time.sleep(0.5)
