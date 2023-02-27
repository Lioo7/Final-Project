"""
This file contains the algorithms that will be used in the project for calculating the budget.
"""

import logging

__all__ = ['median_algorithm', 'generalized_median_algorithm']

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
    
    # Empty implementation 
    return 0

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
