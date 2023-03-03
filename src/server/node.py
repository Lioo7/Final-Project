
class Node:
    '''This class present node in the tree of subjects/projects'''
    
    def __init__(self, id:int, name:str, description:str, parent:int, budget_amount:float):
        self._id = id or None
        self._name = name or None
        self._description = description or None
        self._parent = parent or None
        self._allocated_budget_amount = budget_amount or None
        self._Children = [] # list[Node]
    
    def get_id(self) -> int:
        return self._id
    
    def get_name(self) -> str:
        return self._name
    
    def get_description(self) -> str:
        return self._description
    
    def get_parent(self) -> int:
        return self._parent
    
    def get_allocated_budget_amount(self) -> float:
        return self._allocated_budget_amount
    
    def get_children(self) -> list:
        return self._Children