import os #* For .env variables
import google.generativeai as genai 
import pathlib
import textwrap
from dotenv import load_dotenv

#!Pulls key and configures API
load_dotenv()
key = os.getenv('GEMINI_KEY')

#!Configuring the Gemini Model
genai.configure(api_key=key) 
model = genai.GenerativeModel('gemini-1.5-flash')

if(__name__ == '__main__'):
    res = model.generate_content('What skills do I need for a software engineering job?')
    print(res.text)
