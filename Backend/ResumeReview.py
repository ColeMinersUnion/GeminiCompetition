import os #* For .env variables
import google.generativeai as genai 
from dotenv import load_dotenv

#!Pulls key and configures API


def resumeGemi(uploaded_file):
    load_dotenv()
    key = os.getenv('GEMINI_KEY')

    #!Configuring the Gemini Model
    genai.configure(api_key=key) 
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    #!Uploading the file
    file = genai.upload_file(uploaded_file)
    res = model.generate_content([file, 'Please review this resume and offer imporvements if possible.'])
    print(res.text)
    return res.text


if(__name__ == '__main__'):
    #res = model.generate_content('What skills do I need for a software engineering job?')
    #print(res.text)
    txt = resumeGemi("SampleData/Pitt_Resume.pdf")



"""
General tips and info. Try to use the flash model so we keep our requests per minute
in the free range. To parse data from resumes and CVs use the File API from google. 

Try to figure out the Async request, the Axios hook should also be async, and
that would make the website much nice to use. 

Use requests to pull information from the job postings. Pull html, tell gemini
to parse and summarize information about the job, including requirements, salaray range, etc

There's a role option which is perfect for interview prep. 

Safety rating checks should be used to validate user inputs. 
"""
