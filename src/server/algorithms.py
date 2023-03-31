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


def median_algorithm(leaves_values: dict, total_budget: float) -> dict:
    """
    Calculate the median of the votes for the budget and return the budget according to the median votes.

    Args
    ----
    leaves_values (dict): A dictionary where each key represents a user and the value is a list of budget votes 
        (floats) for each leaf node (project).
    total_budget (float): The total budget.
            
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

    median_values = _calculate_median(leaves_values, total_budget, 1)
    
    return median_values

def generalized_median_algorithm(leaves_values: dict, total_budget: float) -> dict:
    """
    Calculate the budget according to the median algorithm of Hervé Moulin, using linear functions by using the given votes.

    Args
    ----
    leaves_values (dict): A dictionary where each key represents a user and the value is a list of budget votes 
    (floats) for each leaf node (project).
    total_budget (float): The total budget.

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

    median_values = _calculate_median(leaves_values, total_budget, 2)
    
    return median_values

def run_algorithm(votes: dict, algorithm_number: int) -> dict:
    """
    Runs a specific algorithm on the given votes and returns the result.

    Args:
        votes (dict): A nested dictionary representing the votes of all citizens for the budget.
        algorithm_number (int): The number representing the algorithm to run. 
            1 for median_algorithm or 2 for generalized_median_algorithm.

    Raises:
        Exception: If the algorithm_number is not valid.

    Returns:
        dict: A dictionary representing the final result of the algorithm.
    """
    
    # edge case: empty dictionary (no votes)
    if not bool(votes):
        print("The dictionary is empty")
        return votes
    
    num_of_users = len(votes)
    total_budget = votes['user1']['total']
    
    # convert the given dictionary to a tree
    tree = Tree.from_dict(votes)
    
    # find the values of the leaves for each user and store them in a dictionary
    leaves_values = {} # {user_number: list_of_its_values}
    for i in range(0, num_of_users):
        root = tree._root
        node = root._children[i]
        leaves = _find_leaves(node)
        leaves_values[i] = leaves 

    # choose the algorithm to run based on the input
    if algorithm_number == 1: # median_algorithm
        algo_values = median_algorithm(leaves_values, total_budget)
    elif algorithm_number == 2: # generalized_median_algorithm
        algo_values = generalized_median_algorithm(leaves_values, total_budget)
    else: # wrong input
        raise Exception("Invalid algorithm id!")
    
    # create the final result dictionary
    result = _create_result(votes, algo_values)
    
    # return the final result dictionary
    return result


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

def _calculate_median(votes_by_user: dict, total_budget: float, algorithm_number: int) -> dict:
    """
    A utility function that calculates the median value of each
    leaf node (project) in a dictionary of budget votes.

    Args:
        votes_by_user (dict): A dictionary where each key represents a user and the value is a list of budget votes 
            (floats) for each leaf node (project).
        total_budget (float): The total budget.
        algorithm_number (int): The number representing the algorithm to run. 
            1 for median_algorithm or 2 for generalized_median_algorithm.

    Returns:
        dict: A dictionary where each key represents a leaf node (project) and the value is its median budget 
            value across all users.
    """
    
    votes_by_project = {} # {leaf_number (project): its_values (budget)}
    median_values = {} # {leaf_number (project): its_median_value}
    constants = [] # the constants values (will be only used for the 2nd algorithm)
    
    # add each value of project (leave) to the dictionary 
    for user in votes_by_user.keys():
        for count, value in enumerate(list(votes_by_user.values())[user]):
            if count not in votes_by_project:
                votes_by_project[count] = []
            votes_by_project[count].append(value)
    
# choose the algorithm to run based on the input
    if algorithm_number == 2: # generalized_median_algorithm
        num_of_projects = len(votes_by_project)
        constants = _find_median_with_constant_functions(votes_by_project=votes_by_project, c=total_budget, n=num_of_projects)

    for key, values in votes_by_project.items():
        if key not in median_values:
            median_values[key] = []
        # sort the list of values
        sorted_values = sorted(values + constants) 
        median = _find_median(sorted_values) 
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

def _find_median_with_constant_functions(votes_by_project: dict, c: float, n: int, min_search: float = 0, max_search: float = 1) -> list[float]:
    """
    Find the median of a list of values by adding constant functions.

    Args:
        votes_by_project (dict): A dictionary where each key represents a project and the value is a list of budget votes 
            for that project by all the users.
        c (float): The total budget.
        n (int): The number of leaves (project).
        min_search (float, optional): The minimum value of the search range. Defaults to 0.
        min_search (float, optional): The maximum value of the search range. Defaults to 1.

    Returns:
        constants (list[float]): A list of all the constants values.
    """
    
    # calculate the midpoint of the search range
    t = (min_search + max_search) / 2 
    # create an empty list to store the constants
    constants = []

    # loop 'n' - 1 times to create 'n-1' constants
    for i in range(1, n):
        # lreate a new variable name for the constant
        var_name = "f_" + str(i)
        constants.append(var_name)

    # calculate the value of each constant using the following formula: f_i = c * min{1, i * t}
    for i in range(1, n):
        const = c * min(1, i * t)
        constants[i-1] = round(const, 3)
                
    sum_medians = 0
    for project, values in votes_by_project.items():
        values_with_constants = values + constants
        # sort the values and constants 
        sorted_values_with_constants = sorted(values_with_constants) 
        # find the median of the sorted values and constants
        median = _find_median(sorted_values_with_constants) 
        sum_medians += median
    
    # if the sum of the medians is equal to the total budget, return the medians
    if sum_medians == c:
        return constants
    # if the sum of the medians is greater than thetotal budget, search the lower half of the range
    elif sum_medians > c:
        return _find_median_with_constant_functions(votes_by_project=votes_by_project, c=c, n=n, min_search=min_search, max_search=t)
    # If the sum of the medians is less than the total budget, search the upper half of the range
    elif sum_medians < c:
        return _find_median_with_constant_functions(votes_by_project=votes_by_project, c=c, n=n, min_search=t, max_search=max_search)


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
#             "user1": {
#                 "Department of Defense": {"Army": 6, "total": 6},
#                 "Department of Education": {"Schools": 0, "total": 0},
#                 "Department of Interior": {"immigration": 0, "total": 0},
#                 "total": 6
#             },
#             "user2": {
#                 "Department of Defense": {"Army": 0, "total": 0},
#                 "Department of Education": {"Schools": 3, "total": 3},
#                 "Department of Interior": {"immigration": 3, "total": 3},
#                 "total": 6
#             },
#             "user3": {
#                 "Department of Defense": {"Army": 3, "total": 3},
#                 "Department of Education": {"Schools": 3, "total": 3},
#                 "Department of Interior": {"immigration": 0, "total": 0},
#                 "total": 6
#             }
#         }

# tree = Tree.from_dict(votes)
# # tree.print_tree()
# ans = run_algorithm(votes, 2)
# print(ans)
