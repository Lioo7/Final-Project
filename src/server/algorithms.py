"""
This file contains the algorithms that will be used in the project for calculating the budget.
"""

from numpy import empty
from tree import Tree
import logging 

__all__ = ["median_algorithm", "generalized_median_algorithm"]

LOGֹ_FORMAT = "%(levelname)s, time: %(asctime)s , line: %(lineno)d- %(message)s "
# Create and configure logger
logging.basicConfig(
    filename="algorithms_logging.log", level=logging.DEBUG, filemode="w"
)
logger = logging.getLogger()


def median_algorithm(votes: dict) -> dict:
    """
    Calculate the median of the votes for the budget and return the budget according to the median votes.

    Args
    ----
    votes (dict): A nested dictionary representing the votes of all citizens for the budget.

    Returns
    -------
    budget (dict): A nested dictionary representing the budget according to the median votes of all citizens.

    References
    ----------
    https://en.wikipedia.org/wiki/Median

    Example
    -------
    >>> votes = {
    ...     "user1": {
    ...         "Department of Defense": {
    ...             "Army": 40,
    ...             "Police": 30,
    ...             "total": 70
    ...         },
    ...         "Department of Education": {
    ...             "Schools": 20,
    ...             "Higher education": 10,
    ...             "total": 30
    ...         },
    ...         "total": 100
    ...     },
    ...     "user2": {
    ...         "Department of Defense": {
    ...             "Army": 10,
    ...             "Police": 10,
    ...             "total": 20
    ...         },
    ...         "Department of Education": {
    ...             "Schools": 30,
    ...             "Higher education": 50,
    ...             "total": 80
    ...         },
    ...         "total": 100
    ...     }
    ... }

    >>> budget_data = median_algorithm(votes)

    >>> budget_data == {
    ...     "Department of Defense": {
    ...         "Army": 25,
    ...         "Police": 20,
    ...         "total": 45
    ...     },
    ...     "Department of Education": {
    ...         "Schools": 25,
    ...         "Higher education": 30,
    ...         "total": 55
    ...     },
    ...         "total": 100
    ... }
    True
    """
    
    num_of_users = len(votes)
    # convert the given dictionary to a tree
    tree = Tree.from_dict(votes)
    leaves_values = {} # {user_number: list_of_its_values}
    
    for i in range (0, num_of_users):
        root = tree._root
        node = root._children[i]
        leaves = find_leaves(node)
        leaves_values[i] = leaves 

    calculate_median(leaves_values)

def generalized_median_algorithm(votes: dict) -> dict:
    """
    Calculate the budget according to the median algorithm of Hervé Moulin, using linear functions by using the given votes.

    Args
    ----
    votes (dict): A nested dictionary representing the votes of all citizens for the budget.

    Returns
    -------
    budget (dict): A nested dictionary representing the budget according to the median algorithm of Hervé Moulin.

    References
    ----------
    Hervé Moulin. "Fair Division and Collective Welfare". MIT Press, 2003.

    Example
    -------
    >>> votes = {
    ...     "user1": {
    ...         "Department of Defense": {
    ...             "Army": 2,
    ...             "total": 2
    ...         },
    ...         "Department of Education": {
    ...             "Schools": 0,
    ...             "total": 0
    ...         },
    ...         "Department of Interior": {
    ...             "immigration": 0,
    ...             "total": 0
    ...         },
    ...         "total": 2
    ...     },
    ...     "user2": {
    ...         "Department of Defense": {
    ...             "Army": 0,
    ...             "total": 0
    ...         },
    ...         "Department of Education": {
    ...             "Schools": 1,
    ...             "total": 1
    ...         },
    ...         "Department of Interior": {
    ...             "immigration": 1,
    ...             "total": 1
    ...         },
    ...         "total": 2
    ...     }
    ...     "user3": {
    ...         "Department of Defense": {
    ...             "Army": 1,
    ...             "total": 1
    ...         },
    ...         "Department of Education": {
    ...             "Schools": 1,
    ...             "total": 1
    ...         },
    ...         "Department of Interior": {
    ...             "immigration": 0,
    ...             "total": 0
    ...         },
    ...         "total": 2
    ...     }
    ... }

    >>> budget_data = generalized_median_algorithm(votes)

    >>> budget_data == {
    ...     "Department of Defense": {
    ...         "Army": 0.8,
    ...         "total": 0.8
    ...     },
    ...     "Department of Education": {
    ...         "Schools": 0.8,
    ...         "total": 0.8
    ...     },
    ...     "Department of Interior": {
    ...         "immigration": 0.4,
    ...         "total": 0.4
    ...     },
    ...     "total": 2
    ... }
    True
    """

    # Empty implementation
    return 0

def find_leaves(node) -> list:
    """"Returns all the leaves of the given node"""
    if not node._children:
        return [node._value]
    leaves = []
    for child in node._children:
        # ignore leaves named 'total'
        if child._name != "total":
            leaves += find_leaves(child)
        
    return leaves

def calculate_median(dict):
    dict_values = {} # {leaf_number (project): its_values (budget)}
    median_values = {} # {leaf_number (project): its_median_value}
    
    # add each value of project (leave) to the dictionary 
    for user in dict.keys():
        for count, value in enumerate(list(dict.values())[user]):
            if count not in dict_values:
                dict_values[count] = []
            dict_values[count].append(value)
    
    for key, values in dict_values.items():
        if key not in median_values:
            median_values[key] = []
        median = find_median(values)
        median_values[key] = median
    
    return median_values
    
def find_median(lst) -> float:
    """
    The function returns the median value.

    Args:
        lst (List of int): a list of integers.
    
    Returns:
        The median number.
    """
    median = 0
    lst_length = len(lst)
    median_index = lst_length // 2
    if lst_length % 2 != 0:
        median = lst[median_index]
    else:
        first_median = lst[median_index - 1] 
        second_median = lst[median_index] 
        median = (first_median + second_median) / 2
        
    return median
        
if __name__ == "__main__":
    votes = {
     "user1": {
         "Department of Defense": {
             "Army": 40,
             "Police": 30,
             "total": 70
         },
         "Department of Education": {
             "Schools": 20,
             "Higher education": 10,
              "total": 30
          },
         "total": 100
     },
     "user2": {
         "Department of Defense": {
             "Army": 10,
             "Police": 10,
             "total": 20
          },
         "Department of Education": {
             "Schools": 30,
             "Higher education": 50,
             "total": 80
         },
         "total": 100
     }
 }


tree = Tree.from_dict(votes)
# tree.print_tree()
ans = median_algorithm(votes)
print(ans)
