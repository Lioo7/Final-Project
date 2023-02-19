''' This class present node in the tree of subjects/projects'''

class Node:
    def __init__(self):
        id = None # int
        name = None # string
        description = None # string
        parent = None # Node
        childs = [] # list[Node]
        Allocated_budget_amount = None #double