import sys
import unittest
from datetime import date

sys.path.append("../..")
from src.server.gender import Gender
from src.server.user import User


class Test_user(unittest.TestCase):
    def setUp(self):
        # Initialize user object for testing
        self.user = User(
            1234,
            "ofir",
            "ovadia",
            date(2000, 1, 1),
            "ofir@example.com",
            "password",
            1,
            False,
        )

    def test_id(self):
        # Test get_id() function
        self.assertEqual(self.user.get_id(), 1234)

        # Test set_id() function
        self.user.set_id(5678)
        self.assertEqual(self.user.get_id(), 5678)

    def test_first_name(self):
        # Test get_first_name() function
        self.assertEqual(self.user.get_first_name(), "ofir")

        # Test set_first_name() function
        self.user.set_first_name("Gal")
        self.assertEqual(self.user.get_first_name(), "Gal")

    def test_last_name(self):
        # Test get_last_name() function
        self.assertEqual(self.user.get_last_name(), "ovadia")

        # Test set_last_name() function
        self.user.set_last_name("Levi")
        self.assertEqual(self.user.get_last_name(), "Levi")

    def test_date_of_birth(self):
        # Test get_date_of_birth() function
        self.assertEqual(self.user.get_date_of_birth(), date(2000, 1, 1))

        # Test set_date_of_birth() function
        self.user.set_date_of_birth(date(1996, 2, 2))
        self.assertEqual(self.user.get_date_of_birth(), date(1996, 2, 2))

    def test_mail(self):
        # Test get_mail() function
        self.assertEqual(self.user.get_mail(), "ofir@example.com")

        # Test set_mail() function
        self.user.set_mail("someone@example.com")
        self.assertEqual(self.user.get_mail(), "someone@example.com")

    def test_password(self):
        # Test get_password() function
        self.assertEqual(self.user.get_password(), "password")

        # Test set_password() function
        self.user.set_password("newpassword")
        self.assertEqual(self.user.get_password(), "newpassword")

    def test_is_admin(self):
        # Test get_is_admin() function
        self.assertEqual(self.user.get_is_admin(), False)

        # Test set_is_admin() function
        self.user.set_is_admin(True)
        self.assertEqual(self.user.get_is_admin(), True)

    def test_gender(self):
        # Test get_gender() function

        self.assertEqual(self.user.get_gender_value(), Gender.MALE.value)
        self.assertEqual(self.user.get_gender_name(), Gender.MALE.name)

        # Test set_gender() function
        self.user.set_gender(2)
        self.assertEqual(self.user.get_gender_value(), Gender.FEMALE.value)
        self.assertEqual(self.user.get_gender_name(), Gender.FEMALE.name)

    def test_may_vote(self):
        # Test get_allowed_to_vote() function
        self.assertEqual(self.user.get_allowed_to_vote(), True)

        # Test set_allowed_to_vote() function
        self.user.set_allowed_to_vote(False)
        self.assertEqual(self.user.get_allowed_to_vote(), False)


if __name__ == "__main__":
    unittest.main()
