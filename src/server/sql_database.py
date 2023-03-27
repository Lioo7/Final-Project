
import mysql.connector
from abstract_Database import Abstract_Database
import os
from tree import Tree
from node import Node
import datetime

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
        nodes = {} # dict
        
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
    
    def get_row_count(self, table_name: str) -> int:
        query = f"SELECT COUNT(*) FROM {table_name}"
        return self.execute_query(query)

    
    def get_row_count_by_gender(self, table_name: str) -> list[int]:
        male_query = f"SELECT COUNT(*) FROM {table_name} WHERE gender=1"
        male_result = self.execute_query(male_query)
        female_query = f"SELECT COUNT(*) FROM {table_name} WHERE gender=2"
        female_result = self.execute_query(female_query)
        
        return [male_result,female_result]
    
    
    def get_row_count_by_age(self, table_name: str) -> list[int]:
        # [18-25, 26-35, 36-45, 46-55, 56-65, 66+]
        
        current_time = datetime.datetime.now()
        
        eighteen_years_ago = current_time - datetime.timedelta(days=18*365)
        eighteen_years_ago = eighteen_years_ago.strftime('%d/%m/%Y')
       
        Twentyfive_years_ago = current_time - datetime.timedelta(days=25*365)
        Twentyfive_years_ago = Twentyfive_years_ago.strftime('%d/%m/%Y')
        
        Twentysix_years_ago = current_time - datetime.timedelta(days=26*365)
        Twentysix_years_ago = Twentysix_years_ago.strftime('%d/%m/%Y')
        
        Thirtyfive_years_ago = current_time - datetime.timedelta(days=35*365)
        Thirtyfive_years_ago = Thirtyfive_years_ago.strftime('%d/%m/%Y')
        
        
        Thirtysix_years_ago = current_time - datetime.timedelta(days=36*365)
        Thirtysix_years_ago = Thirtysix_years_ago.strftime('%d/%m/%Y')
        
        fourtyfive_years_ago = current_time - datetime.timedelta(days=45*365)
        fourtyfive_years_ago = fourtyfive_years_ago.strftime('%d/%m/%Y')
        
        
        fourtysix_years_ago = current_time - datetime.timedelta(days=46*365)
        fourtysix_years_ago = fourtysix_years_ago.strftime('%d/%m/%Y')
        
        fiftyfive_years_ago = current_time - datetime.timedelta(days=55*365)
        fiftyfive_years_ago = fiftyfive_years_ago.strftime('%d/%m/%Y')
        
        
        fiftysix_years_ago = current_time - datetime.timedelta(days=56*365)
        fiftysix_years_ago = fiftysix_years_ago.strftime('%d/%m/%Y')
        
        sixtyfive_years_ago = current_time - datetime.timedelta(days=65*365)
        sixtyfive_years_ago = sixtyfive_years_ago.strftime('%d/%m/%Y')        
        
        sixtysix_years_ago = current_time - datetime.timedelta(days=66*365)
        sixtysix_years_ago = sixtysix_years_ago.strftime('%d/%m/%Y')
        
        self.execute_query(f'''INSERT INTO USERS (user_id, first_name, last_name, birth_date, mail, password, gender, is_admin,
                    allowed_to_vote) VALUES (4, "ofir", "ovadia", "2000-01-01", "ofir_ovadia@example.com",
                    "password123", "male", 0, 1);''')
        self.execute_query(f'''INSERT INTO USERS (user_id, first_name, last_name, birth_date, mail, password, gender, is_admin,
                    allowed_to_vote) VALUES (2, "ofir", "ovadia", "1900-01-01", "ofir_ovadia@example.com",
                    "password123", "male", 0, 1);''')
        
        print(eighteen_years_ago)
        print(Twentyfive_years_ago)
        
        rows = self.execute_query(f"SELECT * FROM {table_name}")
        for row in rows:
            print(row)
            
        
        eighteen_Twentyfive_years_ago_query = f'''SELECT COUNT(*) FROM {table_name} WHERE
                                    birth_date BETWEEN {eighteen_years_ago} AND {Twentyfive_years_ago}'''
        # eighteen_Twentyfive_years_ago_query = f'''SELECT COUNT(*) FROM {table_name} WHERE
        #                             birth_date > 01/01/2005 AND birth_date < 01/01/1998 '''
        eighteen_Twentyfive_years_ago_result = self.execute_query(eighteen_Twentyfive_years_ago_query)

        Twentysix_Thirtyfive_years_ago_query = f'''SELECT COUNT(*) FROM {table_name} WHERE
                                    birth_date BETWEEN {Twentysix_years_ago} AND {Thirtyfive_years_ago}'''
        Twentysix_Thirtyfive_years_ago_result = self.execute_query(Twentysix_Thirtyfive_years_ago_query)
        
        Thirtysix_fourtyfive_years_ago_query = f'''SELECT COUNT(*) FROM {table_name} WHERE
                                    birth_date BETWEEN {Thirtysix_years_ago} AND {fourtyfive_years_ago}'''
        Thirtysix_fourtyfive_years_ago_result = self.execute_query(Thirtysix_fourtyfive_years_ago_query)
        
        fourtysix_fiftyfive_years_ago_query = f'''SELECT COUNT(*) FROM {table_name} WHERE
                                    birth_date BETWEEN {fourtysix_years_ago} AND {fiftyfive_years_ago}'''
        fourtysix_fiftyfive_years_ago_result = self.execute_query(fourtysix_fiftyfive_years_ago_query)
        
        fiftysix_sixtyfive_years_ago_query = f'''SELECT COUNT(*) FROM {table_name} WHERE
                                    birth_date BETWEEN {fiftysix_years_ago} AND {sixtyfive_years_ago}'''
        fiftysix_sixtyfive_years_ago_result = self.execute_query(fiftysix_sixtyfive_years_ago_query)
        
        sixtysix_years_ago_query = f'''SELECT COUNT(*) FROM {table_name} WHERE
                                    birth_date<={sixtysix_years_ago} '''
        sixtysix_years_ago_result = self.execute_query(sixtysix_years_ago_query)
        
        
        print([eighteen_Twentyfive_years_ago_result,Twentysix_Thirtyfive_years_ago_result,
                Thirtysix_fourtyfive_years_ago_result,fourtysix_fiftyfive_years_ago_result,
                fiftysix_sixtyfive_years_ago_result,sixtysix_years_ago_result])
        # return [eighteen_Twentyfive_years_ago_result[0][0],Twentysix_Thirtyfive_years_ago_result[0][0],
        #         Thirtysix_fourtyfive_years_ago_result[0][0],fourtysix_fiftyfive_years_ago_result[0][0],
        #         fiftysix_sixtyfive_years_ago_result[0][0],sixtysix_years_ago_result[0][0]]
        return []


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
    sql = SQL_database(SQL_database.create_config())
    sql.connect()
    sql.get_row_count_by_age("USERS")
   
