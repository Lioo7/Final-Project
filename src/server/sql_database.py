
import mysql.connector
from abstract_Database import Abstract_Database
import os
import json
from tree import Tree
from node import Node
from datetime import datetime, timedelta, date
from user import User

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
        result = self.execute_query(query)
        return result[0][0]

    
    def get_row_count_by_gender(self, table_name: str) -> list[int]:
        male_query = f"SELECT COUNT(*) FROM {table_name} WHERE gender=1"
        female_query = f"SELECT COUNT(*) FROM {table_name} WHERE gender=2"
        
        try:
            self.cursor.execute(male_query)
            male_result = self.cursor.fetchone()
            self.cursor.execute(female_query)
            female_result = self.cursor.fetchone()
        
        except mysql.connector.Error as err:
            print(f"An error occurred while executing the query: {err}")
        
        return [male_result[0],female_result[0]]
    
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
    
    def get_row_count_by_age(self, table_name: str) -> list[int]:
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
                                    birth_date BETWEEN '{twentyfive_years_ago}' AND '{eighteen_years_ago}'
                                    AND allowed_to_vote = '0' '''
        eighteen_twentyfive_years_ago_result = self.execute_query(eighteen_twentyfive_years_ago_query)
        # 26-35
        twentysix_thirtyfive_years_ago_query = f'''SELECT COUNT(*) FROM {table_name} WHERE
                                    birth_date BETWEEN '{thirtyfive_years_ago}' AND '{twentysix_years_ago}'
                                    AND allowed_to_vote = '0' '''
        twentysix_thirtyfive_years_ago_result = self.execute_query(twentysix_thirtyfive_years_ago_query)
        # 36-45
        thirtysix_fourtyfive_years_ago_query = f'''SELECT COUNT(*) FROM {table_name} WHERE
                                    birth_date BETWEEN '{fourtyfive_years_ago}' AND '{thirtysix_years_ago}'
                                    AND allowed_to_vote = '0' '''
        thirtysix_fourtyfive_years_ago_result = self.execute_query(thirtysix_fourtyfive_years_ago_query)
        # 46-55
        fourtysix_fiftyfive_years_ago_query = f'''SELECT COUNT(*) FROM {table_name} WHERE
                                    birth_date BETWEEN '{fiftyfive_years_ago}' AND '{fourtysix_years_ago}'
                                    AND allowed_to_vote = '0' '''
        fourtysix_fiftyfive_years_ago_result = self.execute_query(fourtysix_fiftyfive_years_ago_query)
        # 55-65
        fiftysix_sixtyfive_years_ago_query = f'''SELECT COUNT(*) FROM {table_name} WHERE
                                    birth_date BETWEEN '{sixtyfive_years_ago}' AND '{fiftysix_years_ago}'
                                    AND allowed_to_vote = '0' '''
        fiftysix_sixtyfive_years_ago_result = self.execute_query(fiftysix_sixtyfive_years_ago_query)
        # 60+
        sixtysix_years_ago_query = f'''SELECT COUNT(*) FROM {table_name} WHERE
                                    birth_date<='{sixtysix_years_ago}'
                                    AND allowed_to_vote = '0' '''
        sixtysix_years_ago_result = self.execute_query(sixtysix_years_ago_query)
        print(eighteen_twentyfive_years_ago_result[0][0],twentysix_thirtyfive_years_ago_result[0][0],
                thirtysix_fourtyfive_years_ago_result[0][0],fourtysix_fiftyfive_years_ago_result[0][0],
                fiftysix_sixtyfive_years_ago_result[0][0],sixtysix_years_ago_result[0][0])
        return [eighteen_twentyfive_years_ago_result[0][0],twentysix_thirtyfive_years_ago_result[0][0],
                thirtysix_fourtyfive_years_ago_result[0][0],fourtysix_fiftyfive_years_ago_result[0][0],
                fiftysix_sixtyfive_years_ago_result[0][0],sixtysix_years_ago_result[0][0]]
        


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

    def check_if_user_exists(self, id, password):
        query = f'''SELECT user_id FROM USERS WHERE user_id = '{id}' AND password = '{password}' '''
        try:
            self.cursor.execute(query)
            
        except mysql.connector.Error as err:
            return False
        
        result = self.cursor.fetchone()
        if result is not None:
            return True
        
        return False
    
    
    def user_id_exeisting(self, user:User) -> bool:
        query = f'''SELECT user_id FROM USERS WHERE user_id={user.get_id()}'''
        try:
            self.cursor.execute(query)
                    
        except mysql.connector.Error as err:
            return False
        
        result = self.cursor.fetchone()
        if result is not None:
            return True
        
        return False
    
    
    def user_mail_exeisting(self, user:User) ->bool:
        query = f'''SELECT mail FROM USERS WHERE mail='{user.get_mail()}' '''
        try:
            self.cursor.execute(query)            
        
        except mysql.connector.Error as err:
            return False
        
        result = self.cursor.fetchone()
        if result is not None:
            return True
        
        return False
    
    def insert_new_user(self, new_user:User) -> bool:
        
        query = f'''INSERT INTO USERS (user_id, first_name, last_name, birth_date, mail, password, gender, is_admin,
        allowed_to_vote) VALUES ({new_user.get_id()}, '{new_user.get_first_name()}', '{new_user.get_last_name}',
        '{new_user.get_date_of_birth()}', '{new_user.get_mail()}', '{new_user.get_password()}',
        '{new_user.get_gender_value()}','0', '1');'''
        
        try:
            self.cursor.execute(query)
        except mysql.connector.Error as err:
            print(f"An error occurred while executing the query to insert new user: {err}")
            return False
        
        result = self.cursor.fetchall()
        
        if result is not None:
            self.db.commit()
            return True
        
        return False
    
    
    def find_node_by_id(self, node_id: int,node_map:dict) -> Node:
        if node_id in node_map:
            return node_map[node_id]
        else:
            query = f"SELECT * FROM CURRENT_BUDGET WHERE node_id = {node_id}"
            self.cursor.execute(query)
            result = self.cursor.fetchone()
            if result:
                node = Node(id=result[0], name=result[1], description=result[2], parent=result[3],budget_amount=result[4])
                node_map[node_id] = node
                parent_id = result[3]
                if parent_id is not None:
                    parent = self.find_node_by_id(parent_id,node_map)
                    parent.add_child(node)
                return node
            else:
                return None
    
    
    def build_tree_from_current_budget(self) -> Tree:
        self.cursor.execute("SELECT * FROM CURRENT_BUDGET")
        rows = self.cursor.fetchall()
    
        root = Node(id=0,name="root",description="I am root", parent=None, budget_amount=0)
        tree = Tree(root)
        num_rows = self.cursor.rowcount
        
        for row in rows:
            node_id = int(row[0])
            node_name = row[1]
            if not tree.node_exists(int(node_id),node_name):
                node = Node(id=int(node_id),name=node_name,parent=0)
                tree.add_node_by_id_and_name(0,"root",node)
        
        for row in rows:
            node_id = int(row[2])
            node_name = row[3]    
            if not tree.node_exists(int(node_id),node_name):
                node = Node(id=int(node_id),name=node_name,parent=int(row[0]))
                parent_id = int(row[0])
                parent_name = row[1]
                tree.add_node_by_id_and_name(parent_id,parent_name,node)
        
        for row in rows:
            node_id = int(row[4])
            node_name = row[5]
            if not tree.node_exists(int(node_id),node_name):
                node = Node(id=int(node_id),name=node_name,parent=int(row[2]))
                parent_id = int(row[2])
                parent_name = row[3]
                tree.add_node_by_id_and_name(parent_id,parent_name,node)
        
        for row in rows:
            node_id = int(row[6])
            node_name = row[7]
            if not tree.node_exists(int(node_id),node_name):
                node = Node(id=int(node_id),name=node_name,parent=int(row[4]))
                parent_id = int(row[4])
                parent_name = row[5]
                tree.add_node_by_id_and_name(parent_id,parent_name,node)
        
        for row in rows:
            node_id = int(row[8])
            node_name = row[9]
            if not tree.node_exists(int(node_id),node_name):
                node = Node(id=int(node_id),name=node_name,parent=int(row[6]))
                parent_id = int(row[6])
                parent_name = row[7]
                tree.add_node_by_id_and_name(parent_id,parent_name,node)
        
        for row in rows:
            node_id = int(row[10])
            node_name = row[11]
            if not tree.node_exists(int(node_id),node_name):
                node = Node(id=int(node_id),name=node_name,parent=int(row[8]),budget_amount=float(row[12]))
                parent_id = int(row[8])
                parent_name = row[9]
                tree.add_node_by_id_and_name(parent_id,parent_name,node)
                
        return tree
    
    def store_vote(self, vote: dict, user_id: int) -> bool:
        """
        Stores a user's vote in the database.
        
        Args:
            vote (dict): A dictionary object containing the user's vote.
            user_id (int): The ID of the user who submitted the vote.
            
        Returns:
            bool: True if the vote was successfully stored, False otherwise.
        """
        
        # convert the JSON data to a string
        vote_str = json.dumps(vote)
        
        # create the query to insert the vote data into the database
        query = f'''INSERT INTO USERS_VOTES (user_id, vote_data) VALUES ({user_id}, '{vote_str}');'''
        
        try:
            """
            TODO: the code below is another approach to store the data by break down the dictionary 
            into multiple rows and store each level in a separate column in the database table.
            I first want to try the basic approach, and then the more complex.
            """
            
            # for level1, level1_dict in vote['votes'][0].items():
            #     for level2, level2_dict in level1_dict.items():
            #         for section, section_dict in level2_dict.items():
            #             for domain, domain_dict in section_dict.items():
            #                 for program, program_dict in domain_dict.items():
            #                     for regulation, regulation_dict in program_dict.items():
            #                         for category, category_dict in regulation_dict.items():
            #                             total = category_dict['total']
            #                             query = f'''INSERT INTO votes (user_id, level_1, level_2, section, domain, program, regulation, category, total) 
            #                             VALUES ({user_id}, '{level1}', '{level2}', '{section}', '{domain}', '{program}', '{regulation}', '{category}', {total})'''
            #                             self.cursor.execute(query)
                        
            # execute the query and commit the changes to the database
            self.cursor.execute(query)
            self.db.commit()
            return True
        except mysql.connector.Error as err:
            # if an error occurred, print the error message and return False
            print(f"An error occurred while storing the vote: {err}")
            return False

    
    def update_voting_option(self,user_id:str) -> bool:
        update_query = "UPDATE USERS SET allowed_to_vote = %s WHERE user_id = %s"
        try:
            self.cursor.execute(update_query, ("0", user_id))
        except:
            return False
        
        return True
    
    def check_voting_option(self,user_id:str) -> str:
        check_query = "SELECT allowed_to_vote FROM USERS WHERE user_id = %s"
        try:
            self.cursor.execute(check_query, user_id)
        except:
            return "Error!"
        
        result = self.cursor.fetchall()
        if result == "0":
            return "false"
        
        return "true"
    
    def get_information(self) -> dict:
        dictionary = dict()
        query = '''SELECT * FROM INFORMATION'''
        try:
            self.cursor.execute(query)
        except:
            dictionary[0] = "Error!"
            return dictionary
        
        result = self.cursor.fetchall()
        
        for row in result:
            dictionary[row[0]] = row[1]   
        
        return dictionary
    
    def load_user_votes(self) -> dict:
        pass
    
    