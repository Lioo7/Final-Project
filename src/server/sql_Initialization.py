import mysql.connector
import os
import pandas
from tree import Tree
from node import Node
from sql_database import SQL_database

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

    @staticmethod
    def insert_to_current_budget_table(mycursor, node:Node) -> None:
        mycursor.execute('''INSERT INTO CURRENT_BUDGET (node_id, name, description, parent_id, budget_amount)
                       VALUES (%s, %s, %s, %s, %s)''',
                       (node.get_id(), node.get_name(), node.get_description(),
                        node.get_parent_id(), node.get_allocated_budget_amount()))
        for child in node.get_children():
            SQL_init.insert_to_current_budget_table(mycursor,child)
    
    @staticmethod
    def build_tree_from_csv()->Tree:
        path = '../../dataset/'
        df = pandas.read_csv( path + 'national_budget.csv',encoding='utf-8')
    
        root = Node(id=0,name="root",description="I am root", parent=None, budget_amount=0)
        tree = Tree(root)
        num_rows = len(df)
        for i in range(1,num_rows):
            row = df.iloc[i, :]
            row_list = row.tolist()
            node_id = int(row_list[0])
            if not tree.node_exists(int(node_id)):
                node_name = row_list[1]
                node = Node(id=int(node_id),name=node_name,parent=0)
                tree.add_node(0,node)
        
        for i in range(1,num_rows):
            row = df.iloc[i, :]
            row_list = row.tolist()
            node_id = int(row_list[2])
            if not tree.node_exists(int(node_id)):
                node_name = row_list[3]
                node = Node(id=int(node_id),name=node_name,parent=int(row_list[0]))
                parent_id = int(row_list[0])
                tree.add_node(parent_id,node)
        
        for i in range(1,num_rows):
            row = df.iloc[i, :]
            row_list = row.tolist()
            node_id = int(row_list[4])
            if not tree.node_exists(int(node_id)):
                node_name = row_list[5]
                node = Node(id=int(node_id),name=node_name,parent=int(row_list[2]))
                parent_id = int(row_list[2])
                tree.add_node(parent_id,node)
        
        for i in range(1,num_rows):
            row = df.iloc[i, :]
            row_list = row.tolist()
            node_id = int(row_list[6])
            if not tree.node_exists(int(node_id)):
                node_name = row_list[7]
                node = Node(id=int(node_id),name=node_name,parent=int(row_list[4]))
                parent_id = int(row_list[4])
                tree.add_node(parent_id,node)
        
        for i in range(1,num_rows):
            row = df.iloc[i, :]
            row_list = row.tolist()
            node_id = int(row_list[8])
            if not tree.node_exists(int(node_id)):
                node_name = row_list[9]
                node = Node(id=int(node_id),name=node_name,parent=int(row_list[6]))
                parent_id = int(row_list[6])
                tree.add_node(parent_id,node)
        
        for i in range(1,num_rows):
            row = df.iloc[i, :]
            row_list = row.tolist()
            node_id = int(row_list[10])
            if not tree.node_exists(int(node_id)):
                node_name = row_list[11]
                node = Node(id=int(node_id),name=node_name,parent=int(row_list[8]))
                parent_id = int(row_list[8])
                tree.add_node(parent_id,node)
                
        return tree
    
    
    
if __name__ == "__main__":
    # Connect server
    # db = SQL_init.connect_database()
    # cursor = db.cursor()
    # # Create and build database
    # SQL_init.create_database(cursor,SQL_init.data_base_name)
    # SQL_init.create_table(cursor, 'CURRENT_BUDGET', '''node_id INT PRIMARY KEY, name VARCHAR(1000),
    #                       description VARCHAR(1000), parent_id INT, budget_amount VARCHAR(255)''')
    # SQL_init.create_table(cursor, 'USERS_VOTES', '''user_id INT PRIMARY KEY, project_name VARCHAR(255),
    #                       budget_amount VARCHAR(255)''')
    # SQL_init.create_table(cursor, 'USERS', '''user_id INT PRIMARY KEY, first_name VARCHAR(255),
    #                       last_name VARCHAR(255), birth_date DATE, mail VARCHAR(255), password VARCHAR(255),
    #                       gender VARCHAR(255), is_admin VARCHAR(255), allowed_to_vote VARCHAR(255)''')
    
    # #SQL_init.clean_database(cursor)
    
    # tree = SQL_init.build_tree_from_csv()
    # node = tree.get_root()
    
    # SQL_init.insert_to_current_budget_table(cursor,tree.get_root())
    # db.commit()
    
    
    sql_handler = SQL_database(SQL_database.create_config())
    sql_handler.connect()
    tree = sql_handler.build_tree_from_mysql_table()
    
    
        