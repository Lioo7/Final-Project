import sys
sys.path.append("../..")
import datetime
import sqlite3
from src.database.abstract_Database import Abstract_Database
from src.server.calculator import Calculator
from src.server.tree import Tree
from src.server.user import User

class mysql_database_for_test(Abstract_Database):
    
    def connect(self):
        pass

    def disconnect(self):
        pass

    def reconnect(self):
        pass

    def execute_query(self, query: str):
        pass

    def create_tree_from_database(self) -> Tree:
        pass

    def get_row_count(self, table_name: str) -> int:
        pass

    def get_row_count_by_gender(self, table_name: str) -> list[int]:
        pass

    def get_row_count_by_age(self, table_name: str) -> list[int]:
        pass

    def check_if_user_exists(self, id, password) -> bool:
        pass

    def user_mail_exeisting(self, user: User) -> bool:
        pass

    def user_id_exeisting(self, user: User) -> bool:
        pass

    def insert_new_user(self, new_user) -> bool:
        pass

    def build_tree_from_current_budget(self) -> Tree:
        pass

    def store_vote(self, vote: str, user_id: int) -> bool:
        pass

    def update_voting_option(self, user_id: str, is_allowed: bool) -> bool:
        pass

    def check_voting_option(self, user_id: str) -> bool:
        pass

    def get_information(self) -> dict:
        pass

    def load_user_votes(self) -> list[dict]:
        pass

    def get_user_full_name(self, user_id: int) -> list[str]:
        pass

    