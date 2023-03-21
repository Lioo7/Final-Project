
from abstract_Database import Abstract_Database

class data_handler():
    
    '''This class manages what type of database we will be dealing with - shell of management'''
    
    
    def __init__(self, the_database:Abstract_Database):
        #TODO: change property name to "handler"
        self.database = the_database