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
        password = os.environ.get('system_budget_password')
    )
        return db
        
    @staticmethod
    def create_data_base(cursor,database_name : str) -> None:
        cursor.execute("CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(database_name)) # db_budget_system

    @staticmethod
    def create_table(mycursor, table_name:str, table_columns) -> None:
        mycursor.execute(f"CREATE TABLE  {table_name}  ( {table_columns} )")
    


if __name__ == "__main__":
    db = SQL_init.connect_database()
    cursor = db.cursor()
    SQL_init.create_data_base(cursor,SQL_init.data_base_name)

    # TODO: create tables
    # TODO: to_load()

        