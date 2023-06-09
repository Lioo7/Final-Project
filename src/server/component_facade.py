from user import *

class component_facade:
    '''This class implements the Facade software design
    This class uses all subsystems and classes and exposes to server the functions cleanly'''
    
    @staticmethod
    def is_guest_user(user_id:id) -> bool:
        if User.guest_user(user_id):
            return True
        
        return False