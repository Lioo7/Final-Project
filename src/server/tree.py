from node import Node

class Tree:    
    '''This class present the tree of subjects and projects (container of Nodes)'''
    
    def __init__(self, root:Node):
        self._root = root
        self._node_amount = 0
        
        if self._root is not None:
            self.node_amount = 1


    def add_node(self, parent_id:int, child_node:Node) -> None:
        '''
        Add a new node to the tree with the specified parent id.
        
        >>> root_node = Node(0, 'root', 'I am root', None, 0)
        >>> child_node = Node(1, 'child', 'project', 10)
        >>> tree = Tree(root_node)
        >>> tree.add_node(0, child_node)
        >>> tree.get_size()
        2
        >>> tree.get_node(1,root_node).get_id()
        1
        '''
        pass

    def remove_node(self, parent_id:int, child_id:int) -> None:
        '''
        Removes a node from the tree with the given parent id and child id
        
        >>> root = Node(1, "root",  "I am root", None , 1000)
        >>> node1 = Node(2, "project1", "I am project1", None, 500)
        >>> node2 = Node(3, "project2", "I am project2", None, 300)
        >>> tree = Tree(root)
        >>> tree.add_node(1, node1)
        >>> tree.add_node(2, node2)
        >>> tree.get_size()
        3
        >>> tree.remove_node(2, 3)
        >>> tree.get_size()
        2
        >>> tree.get_node(3,root)
        None
        '''
        pass


    def get_size(self) -> int:
        '''
        Returns the size of the tree
        
        >>> root = Node(1, "root-subject","I am root" , None, 1000)
        >>> t = Tree(root)
        >>> t.get_size()
        1
        >>> node1 = Node(2, "project", "I am node1", None, 500)
        >>> t.add_node(1, node1)
        >>> t.get_size()
        2
        '''
        return self._node_amount
    
    
    def get_node(self,node_id:int, root:Node) -> Node:
        '''
        Returns the node object with the given id.
        
        >>> root = Node(1, "root", "I am root", None, 1000)
        >>> node1 = Node(2, "project1", "I am project1", None, 250)
        >>> node2 = Node(3, "project2", "I am project1", None, 500)
        >>> tree = Tree(root)
        >>> tree.add_node(1, node1)
        >>> tree.add_node(2, node2)
        >>> founded_node = tree.get_node(2)
        >>> founded_node.tree.get_name()
        project1
        >>> founded_node = tree.get_node(3)
        >>> founded_node.tree.get_name()
        project2
        '''
        if root is None:
            root = self._root
        
        if root.get_id() == node_id:
            return root
        
        for child in root.get_children():
            result = self.get_node(node_id, child)
            if result is not None:
                return result
        
        return None
    
    
    def get_budget_amount(self) -> float:
        '''
        Return the total budget of all the projects and subjects nodes in the tree.
        
        >>> root_node = Node(1,'root', 'I am root', None, 0)
        >>> child_node1 = Node(2,'child1', 'project1',None, 15)
        >>> child_node2 = Node(3,'child2', 'project2',None, 35)
        >>> child_node3 = Node(4,'child3', 'project3',None, 30)
        >>> tree = Tree(root_node)
        >>> tree.add_node(1, child_node1)
        >>> tree.add_node(1, child_node2)
        >>> tree.add_node(1, child_node3)
        >>> tree.get_budget_amount()
        80
        '''
        pass
    
    
    def is_project(self, id_node:int) ->bool:
        '''
        Return the total budget of all the projects and subjects nodes in the tree.
        
        >>> root_node = Node(1,'root', 'subject', None, 0)
        >>> child_node1 = Node(2,'child1', 'subject', None, 15)
        >>> child_node2 = Node(3,'child2', 'project2', None, 35)
        >>> child_node3 = Node(4,'grandchild3', 'project3', None, 30)
        >>> tree = Tree(root_node)
        >>> tree.add_node(1, child_node1)
        >>> tree.add_node(1, child_node2)
        >>> tree.add_node(2, child_node3)
        >>> tree.is_project(1)
        False
        >>> tree.is_project(2)
        False
        >>> tree.is_project(3)
        True
        >>> tree.is_project(4)
        True
        '''
        node = self.get_node(id_node)
        
        # if this node doesn't have children
        if not node.Children:
            return True
        else:
            return False