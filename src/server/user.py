from datetime import date
from gender import Gender

class User:
    '''This class present regested user in the system'''

    def __init__(self, id:int, first_name:int ,last_name:int, date_of_birth:date, mail:str,
                 password:str, is_admin:bool, gender:Gender):
        self._id = id
        self._first_name = first_name
        self._last_name = last_name
        self._date_of_birth = date_of_birth
        self._mail = mail
        self._password = password
        self._is_admin = is_admin
        self._gender = gender
        self._allowed_to_vote = True


    def get_id(self):
        return self._id

    def set_id(self, id:int):
        self._id = id

    def get_first_name(self):
        return self._first_name

    def set_first_name(self, first_name:int):
        self._first_name = first_name

    def get_last_name(self):
        return self._last_name

    def set_last_name(self, last_name:int):
        self._last_name = last_name

    def get_date_of_birth(self):
        return self._date_of_birth

    def set_date_of_birth(self, date_of_birth:date):
        self._date_of_birth = date_of_birth

    def get_mail(self):
        return self._mail

    def set_mail(self, mail:str):
        self._mail = mail

    def get_password(self):
        return self._password

    def set_password(self, password:str):
        self._password = password

    def get_is_admin(self):
        return self._is_admin

    def set_is_admin(self, is_admin:bool):
        self._is_admin = is_admin

    def get_gender(self):
        return self._gender

    def set_gender(self, gender:Gender):
        self._gender = gender
    
    def get_allowed_to_vote(self):
        return self._allowed_to_vote
    
    def set_allowed_to_vote(self, _allowed_to_vote:bool):
        self._allowed_to_vote = _allowed_to_vote