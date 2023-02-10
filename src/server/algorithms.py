"""
This file contains the algorithms that will be used in the project for calculating the budget.
"""

import logging

__all__ = ['median_algorithm', 'median_algorithm_with_linear_functions']

LOGֹ_FORMAT = "%(levelname)s, time: %(asctime)s , line: %(lineno)d- %(message)s "
# create and configure logger
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
    
    Programmers
    -----------
    Stu L.Akirav, O.Ovadia & E.Mansbach
    
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
    ...         "Higher education": {
    ...             "new_value": 30,
    ...         "total": 55
    ...     },
    ...         "total": 100
    ... }
    True
    """
    
    # Empty implementation 
    return 0
