
import json

from user import *
from calculator import Calculator
from counter import Counter
from flask import Flask, jsonify, request
from flask_cors import CORS
from node import Node
from tree import Tree

from algorithms import (
    calculate_totals,
    convert_structure,
    generalized_median_algorithm,
    median_algorithm,
    unite_votes,
    update_dict_ids,
)

from database.data_handler import data_handler
from database.sql_database import SQL_database



class Utilities_component :
    '''This class implements the Facade software design
    This class uses all subsystems and classes and exposes to server the functions cleanly
    For loose coupling between the server and the logical side'''
    
    def __init__(self) -> None:
        self.database = data_handler(SQL_database(SQL_database.create_config()))
    
    
    def is_guest_user(self,id:str) -> bool: 
        
        if User.guest_user(id):
            return True
        
        return False
    
    def build_current_budget(self):
        self.database.handler.connect()
        tree = self.database.handler.build_tree_from_current_budget()
        dictionary = tree.to_dict()

        # updates the 'total' values in the budget dictionary
        calculate_totals(dictionary)
        
        return json.dumps(dictionary, ensure_ascii=False)