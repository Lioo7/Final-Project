
from abc import ABC, abstractmethod
from tree import Tree

class Abstract_Database(ABC):
    
    ''' Abstruct class for handling data base '''
    
    @abstractmethod
    def connect(self):
        pass
    
    @abstractmethod
    def disconnect(self):
        pass
    
    @abstractmethod
    def reconnect(self):
        pass
    
    @abstractmethod
    def execute_query(self,query:str):
        pass
    
    @abstractmethod
    def create_tree_from_database(self) -> Tree:
        pass