#Going through the feedback to check for inappropriate content
def checkPromptFeedback(res):
    for i, safety in enumerate(res.prompt_feedback):
        if(safety["probability"] != "NEGLIGIBLE"):
           return i
        else:
            pass
    return -1
