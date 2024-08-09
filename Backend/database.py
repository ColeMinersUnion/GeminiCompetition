import os
from dotenv import load_dotenv
from google.cloud.sql.connector import Connector

load_dotenv()
db_user = os.getenv("CLOUD_SQL_USER")
db_pass = os.getenv("CLOUD_SQL_PASS")
db_name = os.getenv("CLOUD_SQL_DB")
db_conn = os.getenv("CLOUD_SQL_CONNECTION")

#mysprout 6zA@*^*rZwg2vAc
class database:
    def __init__(self):
        socket = '/cloudsql/{}'.format(db_name)
        
    

        

