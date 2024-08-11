FROM python:3.11
WORKDIR /GeminiCompetition/Backend
COPY . .
RUN pip install --upgrade pip
RUN pip --no-cache-dir install -r requirements.txt
EXPOSE 8080
CMD ["python3", "app.py"]