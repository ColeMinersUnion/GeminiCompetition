import os #* For .env variables
import google.generativeai as genai 
from dotenv import load_dotenv
import requests
from bs4 import BeautifulSoup

#!Pulls key and configures API


def jobMatch(uri, resume):
    load_dotenv()
    key = os.getenv('GEMINI_KEY')

    #!Configuring the Gemini Model
    genai.configure(api_key=key) 
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    response = requests.get(uri)
    soup = BeautifulSoup(response.text, 'html.parser')    
    #!Uploading the file
    file = genai.get_file(resume)

    res = model.generate_content([file, 'Please review this resume and the job posting to see if the candidate described on the resume is a good match for the job. Please describe the reasoning for your choice. The job post: ' + soup.prettify()])
    questions = model.generate_content('Provide some common interview questinos I may expect to see at an interview for this position:\n'+soup.prettify())

    print(res.text)
    return res.text, questions.text


if(__name__ == '__main__'):
    #res = model.generate_content('What skills do I need for a software engineering job?')
    #print(res.text)
    txt = jobMatch("https://www.google.com/about/careers/applications/jobs/results/117794194642084550-software-engineer-iii-mobile-ios-youtube?skills=Computer%20Programming#!t=jo&jid=127025001&", "SampleData/Resume.jpg")



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
