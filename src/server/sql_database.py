''' Handling MySQL database'''

import mysql.connector
from abstract_Database import Abstract_Database
import os

class SQL_database(Abstract_Database):
    
    def __init__(self, config:dict):
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
    
    
    
# Independent functions:

def create_data_base(database_name : str) -> None:
    return "CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(database_name) # db_budget_system


def create_table(table_name : str) -> None:
    return f"CREATE TABLE {table_name} (project_id INT PRIMARY KEY,budget_amount DOUBLE)"

    
def create_config() -> dict:
        configuration = {
            'host': 'localhost',
            'user':  os.environ.get('user_budget_system'),
            'password': os.environ.get('system_budget_password'),
            'database': 'db_budget_system',
            'raise_on_warnings' : True
        }
        return configuration



# from data_handler import data_handler

if __name__ == "__main__":
    '''
    EXAMPLE OF USE:
    sql_handler = data_handler(sql_database(create_config()))
    sql_handler.database.connect()
    sql_handler.database.execute_query("string of query")
    sql_handler.database.execute_query("string of query")
    sql_handler.database.execute_query("string of query")
    sql_handler.database.disconnect()
    '''
   
