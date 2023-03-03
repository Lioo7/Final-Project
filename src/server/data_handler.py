'''This class manages what type of database we will be dealing with - shell of management'''

from abstract_Database import Abstract_Database

class data_handler():
    
    def __init__(self, the_database:Abstract_Database):
        self.database = the_database