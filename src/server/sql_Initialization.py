import mysql.connector
import os
import pandas
from tree import Tree
from node import Node
from sql_database import SQL_database
import csv
import json

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
    def load_and_insert_to_current_budget_table(cursor,db) -> None:
        path = '../../dataset/'
        df = pandas.read_csv( path + 'national_budget.csv',encoding='utf-8')
        num_rows = len(df)
        for i in range(1,num_rows):
            row = df.iloc[i, :]
            cursor.execute('''INSERT INTO CURRENT_BUDGET (kod_one, name_one,
                            kod_two, name_two, kod_three, name_three, kod_four, name_four, kod_five, name_five,
                            kod_six, name_six, takziv)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)''',
                        (int(row[0]), row[1], int(row[2]), row[3], int(row[4]), row[5], int(row[6]), row[7],
                            int(row[8]), row[9], int(row[10]),row[11], str(row[12])))
        db.commit()
    
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
            node_name = row_list[1]
            if not tree.node_exists(int(node_id),node_name):
                node = Node(id=int(node_id),name=node_name,parent=0)
                tree.add_node_by_id_and_name(0,"root",node)
        
        for i in range(1,num_rows):
            row = df.iloc[i, :]
            row_list = row.tolist()
            node_id = int(row_list[2])
            node_name = row_list[3]    
            if not tree.node_exists(int(node_id),node_name):
                node = Node(id=int(node_id),name=node_name,parent=int(row_list[0]))
                parent_id = int(row_list[0])
                parent_name = row_list[1]
                tree.add_node_by_id_and_name(parent_id,parent_name,node)
        
        for i in range(1,num_rows):
            row = df.iloc[i, :]
            row_list = row.tolist()
            node_id = int(row_list[4])
            node_name = row_list[5]
            if not tree.node_exists(int(node_id),node_name):
                node = Node(id=int(node_id),name=node_name,parent=int(row_list[2]))
                parent_id = int(row_list[2])
                parent_name = row_list[3]
                tree.add_node_by_id_and_name(parent_id,parent_name,node)
        
        for i in range(1,num_rows):
            row = df.iloc[i, :]
            row_list = row.tolist()
            node_id = int(row_list[6])
            node_name = row_list[7]
            if not tree.node_exists(int(node_id),node_name):
                node = Node(id=int(node_id),name=node_name,parent=int(row_list[4]))
                parent_id = int(row_list[4])
                parent_name = row_list[5]
                tree.add_node_by_id_and_name(parent_id,parent_name,node)
        
        for i in range(1,num_rows):
            row = df.iloc[i, :]
            row_list = row.tolist()
            node_id = int(row_list[8])
            node_name = row_list[9]
            if not tree.node_exists(int(node_id),node_name):
                node = Node(id=int(node_id),name=node_name,parent=int(row_list[6]))
                parent_id = int(row_list[6])
                parent_name = row_list[7]
                tree.add_node_by_id_and_name(parent_id,parent_name,node)
        
        for i in range(1,num_rows):
            row = df.iloc[i, :]
            row_list = row.tolist()
            node_id = int(row_list[10])
            node_name = row_list[11]
            if not tree.node_exists(int(node_id),node_name):
                node = Node(id=int(node_id),name=node_name,parent=int(row_list[8]),budget_amount=float(row_list[12]))
                parent_id = int(row_list[8])
                parent_name = row_list[9]
                tree.add_node_by_id_and_name(parent_id,parent_name,node)
                
        return tree
    
    
    @staticmethod
    def write_tree_to_csv(tree, filename):
        with open(filename, mode='w', newline='',encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(['node_id', 'name', 'description', 'parent_id', 'budget_amount'])
            SQL_init.write_node_to_csv(tree.get_root(), writer)

    
    @staticmethod
    def write_node_to_csv(node, writer):
        writer.writerow([node.get_id(), node.get_name(), node.get_description(), node.get_parent_id()
                         , node.get_allocated_budget_amount()])
        for child in node.get_children():
            SQL_init.write_node_to_csv(child, writer)
            
    @staticmethod
    def create_users_votes_table(cursor) -> None:
        # SQL_init.create_table(cursor, 'USERS_VOTES', 'id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, level_1 VARCHAR(255), level_2 VARCHAR(255), section VARCHAR(255), domain VARCHAR(255), program VARCHAR(255), regulation VARCHAR(255), total INT')
        SQL_init.create_table(cursor, 'USERS_VOTES', 'user_id VARCHAR(255), vote VARCHAR(255)')

    
if __name__ == "__main__":
    # Connect server
    db = SQL_init.connect_database()
    cursor = db.cursor()
    
    # Create and build database
    SQL_init.create_database(cursor,SQL_init.data_base_name)
    SQL_init.create_table(cursor, 'CURRENT_BUDGET', '''kod_one INT, name_one VARCHAR(1000),
                            kod_two INT, name_two VARCHAR(1000), kod_three INT, name_three VARCHAR(1000),
                            kod_four INT, name_four VARCHAR(1000), kod_five INT, name_five VARCHAR(1000),
                            kod_six INT, name_six VARCHAR(1000), takziv VARCHAR(255)''')
    SQL_init.create_table(cursor, 'USERS', '''user_id INT PRIMARY KEY, first_name VARCHAR(255),
                            last_name VARCHAR(255), birth_date DATE, mail VARCHAR(255), password VARCHAR(255),
                            gender VARCHAR(255), is_admin VARCHAR(255), allowed_to_vote VARCHAR(255)''')
    
    # # TODO: Change USERS_VOTES column to : user_id, node_name, node_name, node_name ... budget_amount
    # SQL_init.create_table(cursor, 'USERS_VOTES', '''user_id INT PRIMARY KEY, project_name VARCHAR(255),
    #                         budget_amount VARCHAR(255)''')
    SQL_init.create_users_votes_table(cursor)
    
    SQL_init.load_and_insert_to_current_budget_table(cursor,db)
    
    # Clean
    #SQL_init.clean_database(cursor)
    
    
    
    ###### App (server) example:
    # sql_handler = SQL_database(SQL_database.create_config())
    # sql_handler.connect()
    # tree = sql_handler.build_tree_from_current_budget()
    # tree.print_tree()
    
    # dictionary = tree.to_dict()
    # print(dictionary)
    # json_tree = json.dumps(dictionary,ensure_ascii=False)
    # print(json_tree)