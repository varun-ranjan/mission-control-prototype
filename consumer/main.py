import requests
import time

lastSpeed = None
lastDirection = None

while True:
    resSpeed = requests.get("http://localhost:3000/speed")
    resDirection = requests.get("http://localhost:3000/direction")
    requests.post(
        "http://localhost:3000/connected",
        json={"connected": True})

    if (resSpeed.status_code == requests.codes.not_found or
            resDirection.status_code == requests.codes.not_found):
        print("not found")
        break

    if resSpeed.json() != lastSpeed:
        print(resSpeed.json())
        lastSpeed = resSpeed.json()

    if resDirection.json() != lastDirection:
        print(resDirection.json())
        lastDirection = resDirection.json()

    time.sleep(0.5)
