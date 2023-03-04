from node import Node

class Tree:    
    '''This class present the tree of subjects and projects (container of Nodes)'''
    
    def __init__(self, root:Node):
        self._root = root
        self._node_amount = 0
        
        if self._root is not None:
            self.node_amount = 1


    def add_node(self, parent_id:int, child_node:Node) -> None:
        pass

    def remove_node(self, parent_id:int, child_id:Node) -> None:
        pass


    def get_size(self) -> int:
        return self._node_amount
    
    
    def get_node(self,node_id:int) -> Node:
        return Node(None,None,None,None,None)
    
    
    def get_budget_amount(self) -> float:
        pass
    
    
    def is_project(self, id_node:int) ->bool:
        node = self.get_node(id_node)
        
        # if this node doesn't have children
        if not node.Children:
            return True
        else:
            return False