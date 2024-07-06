#packages
from flask import Flask, request, flash
import datetime
from GeminiAPI import callGemi

#*Creating the Flask app. 
app = Flask(__name__)

#? In this function, I'm creating a python dictionary, and dumping it into a json format
#? That way, React can read this Json Data and create responsive front end components based
#? on said data. 

@app.route('/gemi', methods=['POST', 'GET'])
def gemi():
    prompt = request.json
    flash(prompt)
    flash(callGemi(prompt['Prt']))
    return 'Success', 200


@app.route('/json-data', methods=['GET'])
def get_now():
    myDict = {"time":datetime.datetime.now(), "author":"Cole Hansen"}
    return myDict #This issue I was having was using json.dumps instead of jsonify
    #Apparently I don't need the jsonify wrapper, Flask handles it anyway
    #*jsonify is a conversion, json.dumps is a file writer



if(__name__ == '__main__'):
    app.run(host='localhost', port=5173)