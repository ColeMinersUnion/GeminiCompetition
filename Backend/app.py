#packages
from flask import Flask, request
import datetime
from GeminiAPI import callGemi
from ResumeReview import resumeGemi
from JobPostParsing import jobPostParsing
from flask_cors import CORS
from JobMatch import jobMatch
import os
from Chat import LiveChat
import google.generativeai as genai

#*Creating the Flask app. 

app = Flask(__name__)
CORS(app)
chatObj = LiveChat()
latestResume = []
latestJob = []
latestMatch = []

#? In this function, I'm creating a python dictionary, and dumping it into a json format
#? That way, React can read this Json Data and create responsive front end components based
#? on said data. 

@app.route('/api/v1/gemi', methods=['POST'])
def gemi():
    prompt = request.json['Prompt']
    #print(prompt['content'])
    print(callGemi(prompt['content']))
    return 'Success', 200

@app.route('/api/v1/resume', methods=['POST'])
def resume():
    file = request.files['Resume']
    Stored_file = genai.upload_file(file)
    response = resumeGemi(Stored_file)
    latestResume = [{'role':'user', 'parts': 'Please review this resume and offer imporvements if possible.'},
                   {'role':'model', 'parts': response}]
    return {'Code': 200, 'Res': response}

@app.route('/api/v1/jobposting', methods=['POST'])
def jobPost():
    url = request.json['Joburl']
    print(url)
    response = jobPostParsing(url['content'])
    latestJob = [{'role':'user', 'parts': 'Summarize this job posting.\n' + response[1]},
                   {'role':'model', 'parts': response[0]}]
    try: 
        return {'Code': 200, 'Res': response[0]}
    except(...):
        return 'Failed', 400

@app.route('/api/v1/jobMatch', methods=['POST'])
def jobMatch():
    url = request.json['Joburl']
    print(url)
    file = request.files['Resume']
    file.save(os.path.join(app.config['Database'], file.name))
    resp = jobMatch(url, 'Database/'+file.name)
    latestMatch = [{'role':'user', 'parts': 'Is the candidate a good match for the job?'},
                   {'role':'model', 'parts': resp}]
    return {'Code': 200, 'Res': resp}


@app.route('/api/v1/startChat', methods=['POST'])
def start_chat():
    from_content = request.json['origin']
    if (from_content == '1'):
        chatObj.cache(latestResume)
    elif (from_content == '2'):
        chatObj.cache(latestJob)
    elif (from_content == '3'):
        chatObj.cache(latestMatch)
    return 200, 'Success'
    #Now that we've checked the origin, we can start to chat. 

@app.route('/api/v1/chat', methods=['POST'])
def chat():
    message = request.json['message']
    try:
        response = chatObj.send_message(message['content'])
        return {'Code': 200, 'Res': response}
    except():
        return {'Code': 444, 'Res': "An error occurred."}


#!Mostly for testing connections
@app.route('/api/v1/json-data', methods=['GET'])
def get_now():
    myDict = {"time":datetime.datetime.now(), "author":"Cole Hansen"}
    return myDict #This issue I was having was using json.dumps instead of jsonify
    #Apparently I don't need the jsonify wrapper, Flask handles it anyway
    #*jsonify is a conversion, json.dumps is a file writer
    

if(__name__ == '__main__'):
    app.run(host="0.0.0.0", port=8080)
