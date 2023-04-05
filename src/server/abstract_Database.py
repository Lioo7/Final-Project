
from abc import ABC, abstractmethod
from tree import Tree
from user import User

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
    
    @abstractmethod
    def get_row_count(self, table_name: str) -> int:
        pass
    
    @abstractmethod
    def get_row_count_by_gender(self, table_name: str) -> list[int]:
        pass
    
    @abstractmethod
    def get_row_count_by_age(self, table_name: str) -> list[int]:
        pass
    
    @abstractmethod
    def check_if_user_exists(self, id, password) -> bool:
        pass
    
    @abstractmethod
    def user_mail_exeisting(self, user:User) -> bool:
        pass
    
    @abstractmethod
    def user_id_exeisting(self, user:User) -> bool:
        pass
    
    @abstractmethod
    def insert_new_user(self,new_user) -> bool:
        pass
    
    @abstractmethod
    def build_tree_from_current_budget(self) -> Tree:
        pass
    
    @abstractmethod
    def insert_user_voting(self) -> bool:
        pass
    
    @abstractmethod
    def update_voting_option(self, user_id:str) -> bool:
        pass
    
    @abstractmethod
    def check_voting_option(self, user_id:str) -> bool:
        pass
    
    @abstractmethod
    def load_user_votes() -> dict:
        pass