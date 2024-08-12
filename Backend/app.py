#packages
from flask import Flask, request, jsonify
import datetime
from GeminiAPI import callGemi
from ResumeReview import resumeGemi
from JobPostParsing import jobPostParsing
from flask_cors import CORS
from JobMatch import jobMatch
import os
from Chat import LiveChat
import google.generativeai as genai
from werkzeug.utils import secure_filename

#*Creating the Flask app. 
UPLOAD_FOLDER = './Database'
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
#CORS(app)
chatObj = LiveChat()
latestResume = []
latestJob = []
latestMatch = []

AllowedExtensions = ['.png', '.jpg', 'jpeg', '.pdf', '.txt']

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in AllowedExtensions

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
    #chatgpt code
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)


    Stored_file = genai.upload_file(file_path)
    response = resumeGemi(Stored_file.name)
    print('here')
    latestResume = [{'role':'user', 'parts': 'Please review this resume and offer imporvements if possible.'},
                   {'role':'model', 'parts': response}]
    return {'Code': 200, 'Res': response}

@app.route('/api/v1/jobposting', methods=['POST'])
def jobPost():
    url = request.form.get('Joburl')
    response = jobPostParsing(url)
    latestJob = [{'role':'user', 'parts': 'Summarize this job posting.\n' + response[2]},
                   {'role':'model', 'parts': response[0]}]
    try: 
        return {'Code': 200, 'Res': response[0], 'Questions': response[1]}
    except(...):
        return 'Failed', 400

@app.route('/api/v1/jobMatch', methods=['POST'])
def JobMatch():
    
    
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    url = request.form.get('Joburl')

    Stored_file = genai.upload_file(file_path)
    resp = jobMatch(url, Stored_file.name)
    latestMatch = [{'role':'user', 'parts': 'Is the candidate a good match for the job?'},
                   {'role':'model', 'parts': resp}]
    return {'Code': 200, 'Res': resp[0], 'Questions':resp[1]}


@app.route('/api/v1/startChat', methods=['POST'])
def start_chat():
    chatObj.history = []
    chatHistory = request.json['lastMsg']
    print(chatHistory)
    print(type(chatHistory))
    if (chatHistory == ""):
        return {'Code': 201, 'Res': 'Success'}
    chatObj.history.append({'role':'model', 'parts':chatHistory})
    return {'Code': 200, 'Res': chatObj.history, 'Input': chatHistory}
    #Now that we've checked the origin, we can start to chat. 

@app.route('/api/v1/chat', methods=['POST'])
def chat():
    message = request.form.get('message')
    if 'file'  in request.files:
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400
        
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        Stored_file = genai.upload_file(file_path)
        try:
            response = chatObj.msg_attachment(message, Stored_file)
            return {'Code': 200, 'Res': response}
        except():
            return {'Code': 444, 'Res': "An error occurred."}
    else:
        try:
            response = chatObj.send_message(message)
            return {'Code': 200, 'Res': response}
        except():
            return {'Code': 444, 'Res': "An error occurred."}


@app.route('/api/v1/salary', methods=['POST'])
def salary():
    job = request.json['job']
    JobSalary = callGemi('What is the typical salary range for a' + job)
    return {'Res': JobSalary}

@app.route('/api/v1/lob', methods=['POST'])
def LOB():
    job = request.json['job']
    industry = callGemi('What is the typical line of business for a' + job)
    return {'Res': industry}

@app.route('/api/v1/qualifications', methods=['POST'])
def qualifications():
    job = request.json['job']
    qual = callGemi('What are the typical qualifications need to be a' + job)
    return {'Res': qual}

#!Mostly for testing connections
@app.route('/api/v1/json-data', methods=['GET'])
def get_now():
    myDict = {"time":datetime.datetime.now(), "author":"Cole Hansen"}
    return myDict #This issue I was having was using json.dumps instead of jsonify
    #Apparently I don't need the jsonify wrapper, Flask handles it anyway
    #*jsonify is a conversion, json.dumps is a file writer
    

if(__name__ == '__main__'):
    app.run(host="0.0.0.0", port=8080)
