FROM python:3.11
WORKDIR /GeminiCompetition/Backend
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8888

CMD ["python3", "./app.py"]