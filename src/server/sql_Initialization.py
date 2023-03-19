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
    def create_data_base(cursor,database_name : str) -> None:
        cursor.execute("CREATE DATABASE IF NOT EXISTS {} DEFAULT CHARACTER SET 'utf8'".format(database_name)) # db_budget_system

    @staticmethod
    def create_table(mycursor, table_name:str, table_columns:str) -> None:
        mycursor.execute(f"CREATE TABLE IF NOT EXISTS {table_name} ( {table_columns} )")
    
    @staticmethod
    def delete_table(mycursor, table_name:str) -> None:
        mycursor.execute(f"DROP TABLE IF EXISTS {table_name} ")


if __name__ == "__main__":
    db = SQL_init.connect_database()
    cursor = db.cursor()
    SQL_init.create_data_base(cursor,SQL_init.data_base_name)
    SQL_init.create_table(cursor, 'current_budget', 'id, name, description, parent_id, budget_amount')
    
    # TODO: create tables
    # TODO: to_load()

        