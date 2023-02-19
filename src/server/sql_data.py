''' Handling my sql data base'''

import mysql.connector
from data_interface import data
import os

class sql_data(data):
    
    def __init__(self, config):
        self.config = config
        self.db = None
        self.cursor = None

    
    def connect(self):
        self.db = mysql.connector.connect(**self.config)
        self.cursor = self.db.cursor()

    def disconnect(self):
        self.cursor.close()
        self.db.close()
    
    def execute_query(self, query):
        try:
            self.cursor.execute(query)
            return self.cursor.fetchall()
        except mysql.connector.Error as err:
            print(f"An error occurred while executing the query: {err}")

    def reconnect(self):
        self.disconnect()
        self.connect()
    
    def create_data_base(self):
        self.cursor.execute("CREATE DATABASE db_budget_system")


    def create_table(self,table_name : str) -> None:
        self.cursor.execute(f"CREATE TABLE {table_name} (project_id INT PRIMARY KEY,budget_amount DOUBLE)")
        return
    
# Independent function
def create_config() -> dict:
        configuration = {
            'host': 'localhost',
            'user':  os.environ.get('user_budget_system'),
            'password': os.environ.get('system_budget_password'),
            'database': 'db_budget_system'
        }
        return configuration


if __name__ == "__main__":
    sql_data_base = sql_data(create_config())
    sql_data_base.connect()
    
   
