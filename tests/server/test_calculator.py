import unittest
import sys
sys.path.append('../..')
from src.server.calculator import Calculator
from src.server.data_handler import data_handler
from src.server.sql_database import SQL_database

class Test_calculator(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls):
        cls.database = data_handler(SQL_database(SQL_database.create_config()))
        cls.database.database.connect()
    
    def tearDown(self):
        self.database.database.disconnect()
    
    
    def test_get_voter_count(self):
        
        query = ""
        select_from_db = self.database.database.execute_query(query) 
        self.assertEqual(Calculator.get_voter_count(self.database.database), select_from_db)
        
    
    def test_get_voter_count_by_gender(self):
        query = ""
        select_from_db = self.database.database.execute_query(query)
        self.assertEqual(Calculator.get_voter_count_by_gender(self.database.database), select_from_db)
        
    
    def test_get_voter_count_by_age(self):
        query = ""
        select_from_db = self.database.database.execute_query(query)
        self.assertEqual(Calculator.get_voter_count_by_age(self.database.database), select_from_db)


if __name__ == '__main__':
    unittest.main()