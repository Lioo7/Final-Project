
import mysql.connector
from abstract_Database import Abstract_Database
import os
from tree import Tree
from node import Node
from datetime import datetime, timedelta

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
    
    @staticmethod
    def get_date_years_ago(years_ago):
        """
        Calculates the date that was 'years_ago' years ago from the current date and returns it as a string in the
        format 'yyyy-mm-dd'.
        
        Args:
            years_ago (int): The number of years ago to calculate the date for.
            
        Returns:
            str: The date that was 'years_ago' years ago from the current date, in the format 'yyyy-mm-dd'.
        """
        current_date = datetime.now().date()
        date_years_ago = current_date - timedelta(days=365*years_ago)
        date_years_ago_str = date_years_ago.strftime('%Y-%m-%d')
        
        return date_years_ago_str
    
    def get_user_count_by_age_group(self, table_name: str) -> list[int]:
        """
        Returns a list containing the number of rows in the specified table grouped by age range.

        Args:
            table_name: A string representing the name of the table to retrieve the row counts from.

        Returns:
            A list of integers representing the row counts grouped by age range.
            The age ranges are: [18-25, 26-35, 36-45, 46-55, 56-65, 66+].
        """
        
        # get the dates
        eighteen_years_ago = SQL_database.get_date_years_ago(18)
        twentyfive_years_ago = SQL_database.get_date_years_ago(25)
        twentysix_years_ago = SQL_database.get_date_years_ago(26)
        thirtyfive_years_ago = SQL_database.get_date_years_ago(35)
        thirtysix_years_ago = SQL_database.get_date_years_ago(36)
        fourtyfive_years_ago = SQL_database.get_date_years_ago(45)
        fourtysix_years_ago = SQL_database.get_date_years_ago(46)
        fiftyfive_years_ago = SQL_database.get_date_years_ago(55)
        fiftysix_years_ago = SQL_database.get_date_years_ago(56)
        sixtyfive_years_ago = SQL_database.get_date_years_ago(65)
        sixtysix_years_ago = SQL_database.get_date_years_ago(66)
        
        # get the number of users by group age
        # 18-25
        eighteen_twentyfive_years_ago_query = f'''SELECT COUNT(*) FROM {table_name} WHERE
                                    birth_date BETWEEN '{twentyfive_years_ago}' AND '{eighteen_years_ago}' '''
        eighteen_twentyfive_years_ago_result = self.execute_query(eighteen_twentyfive_years_ago_query)
        # 26-35
        twentysix_thirtyfive_years_ago_query = f'''SELECT COUNT(*) FROM {table_name} WHERE
                                    birth_date BETWEEN '{thirtyfive_years_ago}' AND '{twentysix_years_ago}' '''
        twentysix_thirtyfive_years_ago_result = self.execute_query(twentysix_thirtyfive_years_ago_query)
        # 36-45
        thirtysix_fourtyfive_years_ago_query = f'''SELECT COUNT(*) FROM {table_name} WHERE
                                    birth_date BETWEEN '{fourtyfive_years_ago}' AND '{thirtysix_years_ago}' '''
        thirtysix_fourtyfive_years_ago_result = self.execute_query(thirtysix_fourtyfive_years_ago_query)
        # 46-55
        fourtysix_fiftyfive_years_ago_query = f'''SELECT COUNT(*) FROM {table_name} WHERE
                                    birth_date BETWEEN '{fiftyfive_years_ago}' AND '{fourtysix_years_ago}' '''
        fourtysix_fiftyfive_years_ago_result = self.execute_query(fourtysix_fiftyfive_years_ago_query)
        # 55-65
        fiftysix_sixtyfive_years_ago_query = f'''SELECT COUNT(*) FROM {table_name} WHERE
                                    birth_date BETWEEN '{sixtyfive_years_ago}' AND '{fiftysix_years_ago}' '''
        fiftysix_sixtyfive_years_ago_result = self.execute_query(fiftysix_sixtyfive_years_ago_query)
        # 60+
        sixtysix_years_ago_query = f'''SELECT COUNT(*) FROM {table_name} WHERE
                                    birth_date<='{sixtysix_years_ago}' '''
        sixtysix_years_ago_result = self.execute_query(sixtysix_years_ago_query)
        
        return [eighteen_twentyfive_years_ago_result,twentysix_thirtyfive_years_ago_result,
                thirtysix_fourtyfive_years_ago_result,fourtysix_fiftyfive_years_ago_result,
                fiftysix_sixtyfive_years_ago_result,sixtysix_years_ago_result]

    def add_fake_data(self, table_name:str) -> None:
        # temp code to test the function
        self.execute_query(f'''INSERT INTO USERS (user_id, first_name, last_name, birth_date, mail, password, gender, is_admin,
        allowed_to_vote) VALUES (4, "ofir", "ovadia", '2000-01-24', "ofir_ovadia@example.com",
        "password123", "male", 0, 1);''')
        self.execute_query(f'''INSERT INTO USERS (user_id, first_name, last_name, birth_date, mail, password, gender, is_admin,
                allowed_to_vote) VALUES (2, "ofir", "ovadia", '1900-01-24', "ofir_ovadia@example.com",
                "password123", "male", 0, 1);''')
        
    def print_table(self, table_name:str) -> None:
         # temp code to print all the rows in the table
        rows = self.execute_query(f"SELECT * FROM {table_name}")
        for row in rows:
            print(f'row: {row}')

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
    sql.get_user_count_by_age_group("USERS")
   
