from src.server.algorithms import median_algorithm
import pytest

class TestMedianAlgorithm:

    def test_median_algorithm_with_two_users(self):
        # Test case 1: Testing the output of the function with two users.
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

        budget_data = median_algorithm(votes)

        assert budget_data == {
            "Department of Defense": {
                "Army": 25,
                "Police": 20,
                "total": 45
            },
            "Department of Education": {
                "Schools": 25,
                "Higher education": 30,
                "total": 100
            }
        }

    def test_median_algorithm_with_empty_dictionary(self):
        # Test case 2: Testing the function with an empty dictionary.
        votes = {}

        budget_data = median_algorithm(votes)

        assert budget_data == {}

    def test_median_algorithm_with_same_votes(self):
        # Test case 3: Testing the function with the same vote for each department.
        votes = {
            "user1": {
                "Department of Defense": {
                    "Army": 1,
                    "Police": 1,
                    "total": 2
                },
                "Department of Education": {
                    "Schools": 1,
                    "Higher education": 1,
                    "total": 2
                },
                "total": 4
            },
            "user2": {
                "Department of Defense": {
                    "Army": 1,
                    "Police": 1,
                    "total": 2
                },
                "Department of Education": {
                    "Schools": 1,
                    "Higher education": 1,
                    "total": 2
                },
                "total": 4
            }
        }

        budget_data = median_algorithm(votes)

        assert budget_data == {
            "Department of Defense": {
                "Army": 1,
                "Police": 1,
                "total": 2
            },
            "Department of Education": {
                "Schools": 1,
                "Higher education": 1,
                "total": 2
            }
        }

    def test_median_algorithm_one_user(self):
        # Test case 4: Testing the function with only one user.
        votes = {
            "user1": {
                "Department of Defense": {
                    "Army": 1,
                    "Police": 1,
                    "total": 2
                },
                "Department of Education": {
                    "Schools": 1,
                    "Higher education": 1,
                    "total": 2
                },
                "total": 4
            }
        }

        budget_data = median_algorithm(votes)

        assert budget_data == {
            "Department of Defense": {
                "Army": 1,
                "Police": 1,
                "total": 2
            },
            "Department of Education": {
                "Schools": 1,
                "Higher education": 1,
                "total": 2
            }
        }

    def test_median_algorithm_wrong_answer(self):
        # Test case 5: Testing the function for wrong answer.
        votes = {
            "user1": {
                "Department of Defense": {
                    "Army": 1,
                    "Police": 1,
                    "total": 2
                },
                "Department of Education": {
                    "Schools": 1,
                    "Higher education": 1,
                    "total": 2
                },
                "total": 4
            }
        }

        budget_data = median_algorithm(votes)

        assert budget_data != {
            "Department of Defense": {
                "Army": 2,
                "Police": 1,
                "total": 3
            },
            "Department of Education": {
                "Schools": 4,
                "Higher education": 1,
                "total": 5
            }
        }
