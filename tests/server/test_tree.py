import unittest
import sys
sys.path.append('../..')
from src.server.tree import Tree
from src.server.node import Node

class Test_tree(unittest.TestCase):
    pass

    def setUp(self):
        # Called before every test function
        pass
    
    def tearDown(self):
        # Called after every test function
        
        pass
    
    
    def test_add_node(self):
        root = Node(0, "Ministry of Defence", "description", None, 100)
        tree = Tree(root)
        child = Node(1, "project", "description", 0, 50)
        tree.add_node(0, child)
        
        self.assertEqual(len(tree.get_node(0).Children), 1)
        self.assertEqual(tree.node_amount, 2)
        
        for i in range(2,100):
            node = (i,"node {i}".format(i=i),"description",None,10)
            tree.add_node(i-1,node)
            
        self.assertEqual(tree.node_amount,100)
    
    
    def test_remove_node(self):
        root = Node(0, "Root", "This is the root node", None, 100)
        tree = Tree(root)
        child = Node(1, "Child", "This is a child node", 0, 50)
        tree.add_node(0, child)
        tree.remove_node(0, child)
        
        self.assertEqual(len(tree.get_node(0).Children), 0)
        self.assertEqual(tree.node_amount, 1)
        
        # Add nodes until the tree has 100 nodes
        for i in range(1,100):
            node = (i,"node {i}".format(i=i),"description",None,10)
            tree.add_node(i-1,node)
        
        # Remove nodes until the tree has only the root node
        i = 99
        while (i > 0):
            tree.remove_node(i,node)
            i = i-1
        
        self.assertEqual(len(tree._root.Children), 0)
        self.assertEqual(tree.node_amount, 1)
            

    def test_get_size(self):
        root = Node(0, "Root", "This is the root node", None, 100)
        tree = Tree(root)
        child1 = Node(1, "Child1", "This is a child node", 0, 50)
        child2 = Node(2, "Child2", "This is another child node", 0, 25)
        tree.add_node(0, child1)
        tree.add_node(0, child2)
        
        self.assertEqual(tree.get_size(), 3)

    def test_get_budget_amount(self):
        root = Node(0, "Root", "This is the root node", None, 100)
        tree = Tree(root)
        child1 = Node(1, "Child1", "This is a child node", 0, 50)
        child2 = Node(2, "Child2", "This is another child node", 0, 25)
        grandchild = Node(3, "Grandchild", "This is a grandchild node", 1, 10)
        tree.add_node(0, child1)
        tree.add_node(0, child2)
        tree.add_node(1, grandchild)
        
        self.assertEqual(tree.get_budget_amount(), 185)
        
    def test_is_project(self):
        root = Node(0, "Root", "This is the root node", None, 100)
        tree = Tree(root)
        child1 = Node(1, "Child1", "This is a child node", 0, 50)
        child2 = Node(2, "Child2", "This is another child node", 0, 25)
        grandchild = Node(3, "Grandchild", "This is a grandchild node", 1, 10)
        tree.add_node(0, child1)
        tree.add_node(0, child2)
        tree.add_node(1, grandchild)
        
        self.assertFalse(tree.is_project(0))
        self.assertFalse(tree.is_project(1))
        self.assertTrue(tree.is_project(2))
        self.assertTrue(tree.is_project(3))

        
if __name__ == '__main__':
    unittest.main()