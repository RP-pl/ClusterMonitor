import datetime
import json
import os
import time

import psutil
import requests
def get_gpu_stats():
    gpus = []
    for line in os.popen("nvidia-smi --query-gpu=name,temperature.gpu,utilization.gpu,utilization.memory,memory.total --format=csv,noheader").readlines():
        gpus.append([((line).strip().split(',')[0]),*[int(l.strip().split(' ')[0]) for l in ((line).strip().split(',')[1:-1])],int((line).strip().split(',')[-1].split(' ')[1])])
    return gpus
def get_cpu_stats():
    return psutil.cpu_percent(interval=1),psutil.cpu_freq().current,psutil.cpu_count()
def get_memory_stats():
    x = psutil.virtual_memory()
    return round(x[0]/(10**7))/100,x[2]

while 1:
    time.sleep(1)

    gpu = get_gpu_stats()
    cpu = get_cpu_stats()
    mem = get_memory_stats()
    gpus = dict()
    i=0
    for crd in gpu:
        gpus["gpu"+str(i)+"_data"]={
            "name":crd[0],
            "temp": crd[1],
            "gpu_usage": crd[2],
            "vram_usage": crd[3],
            "vram_total": crd[4]
        }
        i+=1
    now = datetime.datetime.now()
    data = {
        "name":str(os.popen("hostname").readlines()[0].strip()),
        "timestamp":[now.year,now.month,now.day,now.hour,now.minute,now.second],
        "cpu_data": {
            "cpu_usage": cpu[0],
            "clock": cpu[1],
            "threads": cpu[2]
        },
        "memory_data": {
            "total": mem[0],
            "mem_usage": mem[1]
        },
        **gpus
    }
    r = requests.get('http://ipaddr:5050/recv',json=data,headers={"ContentType":"application/json"})