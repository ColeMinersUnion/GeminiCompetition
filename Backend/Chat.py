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

    def cache(self, history):
        self.cached_content = genai.caching.CachedContent.create(
            model=self.model_name,
            system_instruction=self.system_instruction,
            contents=history,
        )
         
    def send_message(self, msg):
        #*Takes the chat, adds to it, caches it. Returns the response. 
        self.model = genai.GenerativeModel.from_cached_content(cached_content=self.cached_content())
        self.chat = self.model.start_chat()
        response = self.chat.send_message(msg)
        self.cache(self.chat.history)
        return response.text

    


        