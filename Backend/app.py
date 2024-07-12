#packages
from flask import Flask, request, flash
import datetime
from GeminiAPI import callGemi
from flask_cors import CORS

#*Creating the Flask app. 
app = Flask(__name__)
CORS(app)

#? In this function, I'm creating a python dictionary, and dumping it into a json format
#? That way, React can read this Json Data and create responsive front end components based
#? on said data. 

@app.route('/api/v1/gemi', methods=['POST'])
def gemi():
    prompt = request.json['Client']
    print(prompt)
    return 'Success', 200


@app.route('/api/v1/json-data', methods=['GET'])
def get_now():
    myDict = {"time":datetime.datetime.now(), "author":"Cole Hansen"}
    return myDict #This issue I was having was using json.dumps instead of jsonify
    #Apparently I don't need the jsonify wrapper, Flask handles it anyway
    #*jsonify is a conversion, json.dumps is a file writer



if(__name__ == '__main__'):
    app.run(host='localhost', port=5000)

""" Code from work to implement
from flask import Flask, jsonify
import os
from datetime import datetime
import threading


app = Flask(__name__, template_folder='./FrontEnd/')

@app.route('/api')
def index():
    return jsonify({"time":datetime.now()})

def start():
    #print(os.getcwd())
    os.chdir("C:\\Users\\chansen\\Flask-Vite\\FullStack\\FrontEnd")
    os.system('npx vite --host')
    
def run():
    app.run(host="192.168.1.122", port=5173)

if(__name__ == '__main__'):

    FrontEnd = threading.Thread(target=start)
    BackEnd = threading.Thread(run)

    FrontEnd.start()
    BackEnd.start()
    
    FrontEnd.join()
    BackEnd.join()
    
    
"""
