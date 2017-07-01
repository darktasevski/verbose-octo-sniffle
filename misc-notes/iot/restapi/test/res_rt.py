#!/bin/bash

import sys


sensor_resource_type = {
    "ambient_light": "/a/illuminance",
    "button-toggle": "/a/button",
    "button": "/a/button",
    "buzzer": "/a/buzzer",
    "environmental_sensor": "/a/env",
    "fan": "/a/fan",
    "gas": "/a/gas",
    "led": "/a/led",
    "motion": "/a/pir",
    "power-uart": "/a/power",
    "rgb_led": "/a/rgbled",
    "solar": "/a/solar",
    "switch": "/a/binarySwitch",
    "temperature": "/a/temperature"
}


if __name__ == "__main__":
    res_rt = sensor_resource_type.get(sys.argv[1])
    if res_rt:
        print(res_rt)
    else:
        sys.exit(1)