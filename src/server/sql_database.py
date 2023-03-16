
import mysql.connector
from abstract_Database import Abstract_Database
import os
from tree import Tree
from node import Node

class SQL_database(Abstract_Database):
    
    ''' Handling MySQL database'''
    
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

    def reconnect(self):
        self.disconnect()
        self.connect()
    
    def execute_query(self, query):
        
        try:
            self.cursor.execute(query)
            return self.cursor.fetchall()
        except mysql.connector.Error as err:
            print(f"An error occurred while executing the query: {err}")
            
            
    def create_tree_from_database(self) -> Tree:
        rows = self.cursor.execute("SELECT * FROM current_budget")
        nodes = {}
        for row in rows:
            id = row[0]
            name = row[1]
            description = row[2]
            parent_id = row[3]
            budget_amount = row[4]

            # Create a new node
            node = Node(id, name, description, parent_id, budget_amount)

            # Add the node to the dictionary
            nodes[id] = node
        
        # Add the child nodes to the parent nodes
        for node in nodes.values():
            parent_id = node.get_parent()
            if parent_id is not None:
                parent_node = nodes[parent_id]
                parent_node.add_child(node)
        
        # Get the root nodes
        root_node = None
        for node in nodes.values():
            if node.get_parent() is None:
                root_node = node
                
        return Tree(root_node)
        



    # TODO: Adding specific functions dealing with the database such as : insert table 

    @staticmethod
    def create_config() -> dict:
            configuration = {
                'host': 'localhost',
                'user':  os.environ.get('user_budget_system'),
                'password': os.environ.get('system_budget_password'),
                'database': 'db_budget_system',
                'raise_on_warnings' : True,
                'charset' : 'utf8'
            }
            return configuration



# from data_handler import data_handler

if __name__ == "__main__":
    '''
    EXAMPLE OF USE:
    sql_handler = data_handler(SQL_database(SQL_database.create_config()))
    sql_handler.database.connect()
    sql_handler.database._execute_query("string of query")
    sql_handler.database._execute_query("string of query")
    sql_handler.database._execute_query("string of query")
    sql_handler.database.disconnect()
    '''
   
