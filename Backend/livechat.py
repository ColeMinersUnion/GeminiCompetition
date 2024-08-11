import google.generativeai as genai
from dotenv import load_dotenv
import os

def live_chat(cached_content):
    load_dotenv()
    key = os.getenv('GEMINI_KEY')
    #!Configuring the Gemini Model
    genai.configure(api_key=key) 
    model_name = "gemini-1.5-flash-001"
    system_instruction = "You are an expert analyzing transcripts."

    model = genai.GenerativeModel(model_name=model_name, system_instruction=system_instruction)
    chat = model.start_chat()
    document = genai.upload_file(path=media / "a11.txt")
    response = chat.send_message(["Hi, could you summarize this transcript?", document])
    print("\n\nmodel:  ", response.text)
    response = chat.send_message(
        ["Okay, could you tell me more about the trans-lunar injection"]
    )
    print("\n\nmodel:  ", response.text)

    # To cache the conversation so far, pass the chat history as the list of "contents".
    cache = genai.caching.CachedContent.create(
        model=model_name,
        system_instruction=system_instruction,
        contents=chat.history,
    )
    model = genai.GenerativeModel.from_cached_content(cached_content=cache)

    # Continue the chat where you left off.
    chat = model.start_chat()
    response = chat.send_message(
        "I didn't understand that last part, could you explain it in simpler language?"
    )
    return response.text