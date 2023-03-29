import mysql.connector
import os

class SQL_init():
    
    '''A class that initializes the database'''
    
    # Static var
    data_base_name = "db_budget_system"

    @staticmethod
    def connect_database():
        db = mysql.connector.connect(
        host ="localhost",
        user = os.environ.get('user_budget_system'),
        password = os.environ.get('system_budget_password'),
        database= 'db_budget_system'
    )
        return db
        
    @staticmethod
    def create_database(cursor,database_name : str) -> None:
        cursor.execute("CREATE DATABASE IF NOT EXISTS {} DEFAULT CHARACTER SET 'utf8'".format(database_name)) # db_budget_system

    @staticmethod
    def create_table(mycursor, table_name:str, table_columns:str) -> None:
       # mycursor.execute(f"CREATE TABLE IF NOT EXISTS {table_name} ( {table_columns} )")
       # mycursor.execute(f"CREATE TABLE IF NOT EXISTS {table_name} ({table_columns})")
        mycursor.execute(f"CREATE TABLE IF NOT EXISTS {table_name} ({table_columns})")

    @staticmethod
    def delete_table(mycursor, table_name:str) -> None:
        mycursor.execute(f"DROP TABLE IF EXISTS {table_name} ")

    @staticmethod
    def clean_database(cursor) -> None:
        #Clean database
        SQL_init.delete_table(cursor,'CURRENT_BUDGET')
        SQL_init.delete_table(cursor,'USERS_VOTES')
        SQL_init.delete_table(cursor,'USERS')

if __name__ == "__main__":
    # Connect server
    db = SQL_init.connect_database()
    cursor = db.cursor()
    # Create and build database
    SQL_init.create_database(cursor,SQL_init.data_base_name)
    SQL_init.create_table(cursor, 'CURRENT_BUDGET', '''node_id INT PRIMARY KEY, name VARCHAR(255),
                          description VARCHAR(255), parent_id INT, budget_amount VARCHAR(255)''')
    SQL_init.create_table(cursor, 'USERS_VOTES', '''user_id INT PRIMARY KEY, project_name VARCHAR(255),
                          budget_amount VARCHAR(255)''')
    SQL_init.create_table(cursor, 'USERS', '''user_id INT PRIMARY KEY, first_name VARCHAR(255),
                          last_name VARCHAR(255), birth_date DATE, mail VARCHAR(255), password VARCHAR(255),
                          gender VARCHAR(255), is_admin VARCHAR(255), allowed_to_vote VARCHAR(255)''')
    
    
    # TODO: to_load(csv) for CURRENT_BUDGET table

    #SQL_init.clean_database(cursor)
        