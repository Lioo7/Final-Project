
class Node:
    '''This class present node in the tree of subjects/projects'''

    def __init__(self, id:int, name:str, description:str, parent:int, budget_amount:float):
        self._id = id or None
        self._name = name or None
        self._description = description or None
        self._parent = parent or None
        self._allocated_budget_amount = budget_amount or None
        self._children: list['Node'] = []

    def get_id(self) -> int:
        '''
        Return the id of the node.

        >>> node1 = Node(1, 'Node 1', 'This is node 1', None, 100)
        >>> node1.get_id()
        1
        '''
        return self._id

    def get_name(self) -> str:
        '''
        Return the name of the node.

        >>> node1 = Node(1, 'Node 1', 'This is node 1', None, 100)
        >>> node1.get_name()
        'Node 1'
        '''
        return self._name

    def get_description(self) -> str:
        '''
        Return the description of the node.

        >>> node1 = Node(1, 'Node 1', 'This is node 1', None, 100)
        >>> node1.get_description()
        'This is node 1'
        '''
        return self._description

    def get_parent(self) -> int:
        '''
        Return the id of the parent node.

        >>> node1 = Node(1, 'Node 1', 'This is node 1', 2, 100)
        >>> node1.get_parent()
        2
        '''
        return self._parent

    def get_allocated_budget_amount(self) -> float:
        '''
        Return the allocated budget amount of the node.

        >>> node1 = Node(1, 'Node 1', 'This is node 1', None, 100)
        >>> node1.get_allocated_budget_amount()
        100
        '''
        return self._allocated_budget_amount

    def get_children(self) -> list:
        '''
        Return the list of children nodes.

        >>> node1 = Node(1, 'Node 1', 'This is node 1', None, 100)
        >>> node2 = Node(2, 'Node 2', 'This is node 2', 1, 50)
        >>> node1.add_child(node2)
        >>> list_of_nodes = node1.get_children()
        >>> list[0].get_id()
        2
        '''
        return self._children

    def set_description(self,new_description:str) -> None:
        '''
        Set the description of the node to the given value.

        >>> node1 = Node(1, 'Node 1', 'This is node 1', None, 100)
        >>> node1.set_description('This is the new description of node 1')
        >>> node1.get_description()
        'This is the new description of node 1'
        '''
        self._description = new_description
        
    def set_allocated_budget_amount(self,new_allocated_budget_amount:float) -> None:
        '''
        Return the allocated budget amount of the node.

        >>> node1 = Node(1, 'Node 1', 'This is node 1', None, 100)
        >>> node1.set_allocated_budget_amount(200)
        200
        '''
        self._allocated_budget_amount = new_allocated_budget_amount
    
    def add_child(self,child:'Node') -> None:
        '''
        Add the given node as a child of this node.

        >>> node1 = Node(1, 'Node 1', 'This is node 1', None, 100)
        >>> node2 = Node(2, 'Node 2', 'This is node 2', 1, 50)
        >>> node1.add_child(node2)
        >>> node1.get_children()[0].get_id()
        2
        '''
        self._children.append(child)
    
    def remove_child(self,child_id:int) -> None:
        '''
        Remove a child node with the given id from this node.

        >>> node1 = Node(1, 'Node 1', 'This is node 1', None, 100)
        >>> node2 = Node(2, 'Node 2', 'This is node 2', 1, 50)
        >>> node3 = Node(3, 'Node 3', 'This is node 3', 2, 25)
        >>> node1.add_child(node2)
        >>> node2.add_child(node3)
        >>> node2.remove_child(2)
        >>> node2.remove_child(3)
        >>> node2.get_children()
        []
        '''
        for child in self._children:
            if child.get_id() == child_id:
                self._children.remove(child)
            return
        
        raise ValueError(f"No child node with id {child_id} was found") 
    
    def to_dict(self) ->dict:
        pass
    
    def to_json(self):
        pass