import unittest
import sys
sys.path.append('../..')
from src.server.calculator import Calculator
from src.server.node import Node
from src.server.tree import Tree

class Test_calculator(unittest.TestCase):
    
    def test_get_voter_count(self):
        self.assertEqual(Calculator.amount_of_votes(), 0)
    
    
    def test_transferring_the_money_to_the_leaves(self):
        root = Node(1, "Root", "The root node", None, 100)
        child1 = Node(2, "Child 1", "The first child", 1, 50)
        child2 = Node(3, "Child 2", "The second child", 1, 50)
        tree = Tree(root)
        tree.add_node(1, child1)
        tree.add_node(1, child2)
        Calculator.transferring_the_money_to_the_leaves(tree)
        self.assertEqual(child1.get_allocated_budget_amount(), 50)
        self.assertEqual(child2.get_allocated_budget_amount(), 50)
    
    
    def test_get_voter_count_by_gender(self):
        
        # TODO: Implement test case
        pass
    
    
    def test_get_voter_count_by_age(self):
        # TODO: Implement test case
        pass

if __name__ == '__main__':
    unittest.main()