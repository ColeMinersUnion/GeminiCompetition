import os
from dotenv import load_dotenv
import google.generativeai as genai



class LiveChat:
    def __init__(self):
        #*Setting up the chat
        load_dotenv()
        key = os.getenv('GEMINI_KEY')
        genai.configure(api_key=key) 
        self.model_name = "gemini-1.5-flash-001"
        #*I'm not great at prompt engineering
        #* This similar to what google had
        self.system_instruction = "You are an expert offering career advice to someone looking for a job."
        self.model = genai.GenerativeModel(model_name=self.model_name, system_instruction=self.system_instruction)
        self.chat = self.model.start_chat()
        self.cached_content = None
        self.history = []
         
    def send_message(self, msg):
        #*Takes the chat, adds to it, caches it. Returns the response.
        print(self.history)
        self.chat = self.model.start_chat(history=self.history)
        response = self.chat.send_message(msg)
        self.history.append({'role':'user', 'parts': msg})
        self.history.append({'role':'model', 'parts':response.text})
        #self.cache(self.chat.history)
        return response.text
    
    def msg_attachment(self, msg, filepath):
        self.chat = self.model.start_chat(history=self.history)
        file = genai.get_file(filepath)
        response = self.chat.send_message([file, msg])
        self.history.append({'role':'user', 'parts':[file, msg]})
        self.history.append({'role':'model', 'parts':response.text})
    


        