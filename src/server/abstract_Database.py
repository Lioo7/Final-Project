''' Abstruct class for handling data base '''

from abc import ABC, abstractmethod

class Abstract_Database(ABC):
    
    @abstractmethod
    def connect():
        pass
    
    @abstractmethod
    def disconnect():
        pass
    
    @abstractmethod
    def reconnect():
        pass
    
    @abstractmethod
    def execute_query(query:str):
        pass