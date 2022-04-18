import datetime
import time
from concurrent.futures import ThreadPoolExecutor
from threading import Lock
from flask import Flask,request,jsonify
from flask_cors import cross_origin
app = Flask(__name__)

data = {}

lock = Lock()

@app.route('/recv',methods=['POST','PUT','GET'])
def recv():
    lock.acquire()
    try:
        data[request.json["name"]] = request.json
    finally:
        lock.release()
    return "Ok"

@app.route('/ret',methods=['GET'])
@cross_origin()
def ret():
    return jsonify(data)

@app.route('/machine/<name>',methods=['GET'])
@cross_origin()
def re(name):
    return jsonify(data[name])
@app.route('/machines',methods=['GET'])
@cross_origin()
def machines():
    return jsonify({"machines":list(data.keys())})

def clear():
    while 1:
        time.sleep(1)
        for k in data.keys():
            lock.acquire()
            try:
                if (datetime.datetime(*(data[k]["timestamp"])) - datetime.datetime.now()).total_seconds() < -60:
                    del data[k]
                    print(k)
            finally:
                lock.release()

if __name__ == "__main__":
    tpe = ThreadPoolExecutor(4)
    tpe.submit(lambda: app.run(port=5050,host="0.0.0.0"))
    tpe.submit(clear)