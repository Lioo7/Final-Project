from datetime import date
from gender import Gender

class User:
    '''This class present regested user in the system'''

    def __init__(self, id:int, first_name:int ,last_name:int, date_of_birth:date, mail:str,
                 password:str, is_admin:bool, gender:Gender):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.date_of_birth = date_of_birth
        self.mail = mail
        self.password = password
        self.is_admin = is_admin
        self.gender = gender
        