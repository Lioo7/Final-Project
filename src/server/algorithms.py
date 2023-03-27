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
    
    # an edge case: empty dictionary (no votes)
    if not bool(votes):
        print("The dictionary is empty")
        return votes
    
    num_of_users = len(votes)
    # convert the given dictionary to a tree
    tree = Tree.from_dict(votes)
    leaves_values = {} # {user_number: list_of_its_values}
    
    for i in range (0, num_of_users):
        root = tree._root
        node = root._children[i]
        leaves = _find_leaves(node)
        leaves_values[i] = leaves 

    median_values = _calculate_median(leaves_values)
    result = _create_result(votes, median_values)
    
    return result

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
    ...     },
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

def _find_leaves(node) -> list:
    """"Returns all the leaves of the given node"""
    if not node._children:
        return [node._value]
    leaves = []
    for child in node._children:
        # ignore leaves named 'total'
        if child._name != "total":
            leaves += _find_leaves(child)
        
    return leaves

def _calculate_median(dict: dict) -> dict:
    """
    A utility function that calculates the median value of each
    leaf node (project) in a dictionary of budget votes.

    Args:
        dict (dict): A dictionary where each key represents a user and the value is a list of budget votes 
            (floats) for each leaf node (project).

    Returns:
        dict: A dictionary where each key represents a leaf node (project) and the value is its median budget 
            value across all users.
    """
    
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
        median = _find_median(values)
        median_values[key] = median
    
    return median_values
    
def _find_median(lst: list[float]) -> float:
    """
    A utility function that returns the median value.

    Args:
        lst (List of floats): a list of integers.
    
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
      
def _create_result(votes: dict, new_values: list[float]) -> dict:
    """
    A utility funfction that create a dictionary that aggregates user votes with the provided budget values.
    
    Args:
    - votes (dict): A dictionary representing the votes of each user, where the keys are the users' IDs and the values
      are dictionaries representing their votes.
    - new_values (list[float]): A list of budget values that corresponds to each vote category.
    
    Returns:
    - A dictionary representing the result of aggregating the user votes with the budget values, with keys
      corresponding to the categories of the votes and nested dictionaries representing subcategories, and values
      representing the budget allocated to each category or subcategory. The "total" key is added to each nested 
      dictionary to represent the total budget allocated to the corresponding category or subcategory.
    """
    
    # the key of the first user in the given dict
    first_key = next(iter(votes))
    # extracts the vote of the first user
    first_user_vote = votes[first_key]
    # create an empty dictionary to hold the final result
    result = {}
    # point the current index in the new_values
    index = {}
    index[0] = 0
    
    result = _building_nested_dict(first_user_vote, new_values, index, result)
    _calculate_totals(result)
    
    return result

def _building_nested_dict(votes: dict, new_values: list, index: list[float], result: dict) -> dict:
    """
    A utility function that recursively build a new nested dictionary based on
    an input dictionary and a list that contains the updated values.

    Args:
        votes (dict): The input dictionary to build from.
        new_values (list): A list of values to assign to the keys in the input dictionary.
        index (list): A list holding a single integer, representing the current index in the list of values.
        result (dict): A dictionary to add the newly created nested dictionary to.

    Returns:
        dict: A new nested dictionary built from the input dictionary and list of values.
    """
    
    # create a new dictionary to hold the nested values
    nested_result = {}
    
    # iterate over the items in the input dictionary
    for key, value in votes.items():
        # if the current value is a nested dictionary, recursively call the function
        if isinstance(value, dict):
            nested_result[key] = _building_nested_dict(value, new_values, index, result)
        else:
            # if the current key is "total", leave empty
            if key == "total":
                nested_result[key] = ""
            else:
                nested_result[key] = new_values[index[0]]
                index[0] += 1
    
    return nested_result

def _calculate_totals(budget: dict) -> float:
    """
    A utility function that recursively calculates the total budget
    for each level of a nested dictionary and assigns it to the 'total' key.
    The function updates the total keys in the given budget.

    Args:
        budget (dict): A nested dictionary representing a budget.

    Returns:
        float: The total budget at the highest level of the dictionary.
    """
    
    total = 0
    for key, value in budget.items():
        if isinstance(value, dict):
            # if the value is a dictionary, recursively calculate its total budget and assign it to the 'total' key
            sub_dept_budget = _calculate_totals(value)
            budget[key]['total'] = sub_dept_budget
            total += sub_dept_budget
        elif isinstance(value, (int, float)):
            # if the value is an integer or a float, add it to the total budget
            total += value
    # assign the total budget to the 'total' key of the current level
    budget['total'] = total
    
    return total


# if __name__ == "__main__":
#     votes = {
#     "user1": {
#         "Department of Defense": {"Army": 1, "Police": 1, "total": 2},
#         "Department of Education": {
#             "Schools": 1,
#             "Higher education": 1,
#             "total": 2
#         },
#         "total": 4
#     }
# }

# tree = Tree.from_dict(votes)
# # tree.print_tree()
# ans = median_algorithm(votes)
# print(ans)
