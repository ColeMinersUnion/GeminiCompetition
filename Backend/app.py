#packages
from flask import Flask, jsonify
import datetime

#*Creating the Flask app. 
app = Flask(__name__)

#? In this function, I'm creating a python dictionary, and dumping it into a json format
#? That way, React can read this Json Data and create responsive front end components based
#? on said data. 

@app.route('/json-data')
def get_now():
    myDict = {"Time":datetime.datetime.now(), "Author":"Cole Hansen"}
    return jsonify(myDict) #This issue I was having was using json.dumps instead of jsonify
    #*jsonify is a conversion, json.dumps is a file writer

if(__name__ == '__main__'):
    app.run(host='localhost', port=5173)