from node import Node
import json

class Tree:    
    '''This class present the tree of subjects and projects (container of Nodes)'''
    
    def __init__(self, root:Node):
        self._root = root
        self._node_amount = 0
        
        if self._root is not None:
            self.node_amount = 1

    
    
    def get_root(self) -> Node:
        '''
        Return the root node of the tree.

        >>> node1 = Node(1, 'Node 1', 'This is node 1', None, 100)
        >>> tree = Tree(node1)
        >>> tree.get_root().get_id()
        1
        '''
        return self._root

    def set_root(self, new_root: Node) -> None:
        '''
        Set the root node of the tree to the given node.

        >>> node1 = Node(1, 'Node 1', 'This is node 1', None, 100)
        >>> node2 = Node(2, 'Node 2', 'This is node 2', 1, 50)
        >>> tree = Tree(node1)
        >>> tree.set_root(node2)
        >>> tree.get_root().get_id()
        2
        '''
        self._root = new_root
    
    def add_node(self, parent_id:int, new_node:Node) -> bool:
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
        if new_node is None:
            print("Error!, New Node that inserted is None.")
            return False
        
        if parent_id is None:
            print("Error!, Parent id that inserted is None.")
            return False
            
        else:
            parent_node = self.get_node(parent_id)
            if parent_node is None:
                print(f"Error!, There is no Node with id ''{parent_id}'' in the tree")
                return False
            
        parent_node.add_child(new_node)
        self._node_amount += 1
        
        return True
    
        
        

    def remove_node(self, parent_id:int, node_id:int) -> bool:
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
        node = self.get_node(node_id)
        
        if node is None:
            print(f"Error!, There is no node in the tree that has the id {node_id}")
            return False
        
        # Remove children
        for child in node.get_children():
            child.set_parent_id(None)
        
        # Remove node from beeing child of his parent
        parent_id = node.get_parent_id()
        parent_node = self.get_node(parent_id)
        parent_node.remove_child(node.get_id())
        
        # Remove parent id from this node
        node.set_parent_id(None)
        
        self._node_amount -= 1
        
        return True
        


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
    
    
    def get_node(self,node_id:int) -> Node:
        '''
        Returns the node object with the given id,
        If there is no node with such an id it will return None
        
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
        if self._root is None:
            print("Error!, Empty tree")
            return None

        current_node = self._root
        return self._get_node_recursive(current_node, node_id)
       
    
    def _get_node_recursive(self, current_node:Node, target_node_id:int) -> Node:
        
        if target_node_id == current_node.get_id():
            return current_node
        
        else:
            for child in current_node.get_children():
                found_node = self._get_node_recursive(child, target_node_id)
                if found_node:
                    return found_node
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
        if self._root is None:
            print("Error!, Empty tree")
            return 0
        
        current_node = self._root
        return self._get_budget_amount_recursive(current_node,current_node.get_allocated_budget_amount())
        
    
    def _get_budget_amount_recursive(self,current_node:Node, total_budget:float) -> float:
        if current_node is None:
            return total_budget
                
        for child in current_node.get_children():
            total_budget += self._get_budget_amount_recursive(child, total_budget)

        return total_budget
    
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
        if node is None:
            print(f"Error!, There is no node with {id_node} in the tree")
            return False
        
        # if this node doesn't have children
        if not node.get_children() or node.get_children() is None:
            return True
        
        return False
        
    
    
        