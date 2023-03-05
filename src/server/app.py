from flask import Flask ,request, jsonify
from abstract_Database import Abstract_Database
from waitress import serve
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/peoples_budget/login', methods=['POST'])
def login():
    try:
        id = request.json['id']
        password = request.json['password']
        print(id , password)
    
    except: 
        print("error!")
    # TODO: Check validation with database
  
    return jsonify({'status': 'succeed'})

@app.route('/peoples_budget/sign_up', methods=['POST'])
def signup():
    try:
        first_name = request.json['firstname']
        last_name = request.json['lastname']
        id = request.json['id']
        birth_date = request.json['birthDate']
        gender = request.json['gender']
        email = request.json['email']
        password = request.json['password']
        
        print(id , password)
    
    except: 
        print("error!")
    # Check validation with database
  
    return jsonify({'status': 'succeed'})


# dev or prod
mode = "dev"

if __name__ == '__main__':
    
    if mode == "dev": 
        app.run(port=5000, debug=True)
        
    else:
        serve(app, host='0.0.0.0', port=5000)
    