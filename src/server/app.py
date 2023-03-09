from flask import Flask ,request, jsonify
from waitress import serve
from flask_cors import CORS
from tree import Tree
from algorithms import median_algorithm , generalized_median_algorithm
import json
from data_handler import data_handler
from sql_database import SQL_database

app = Flask(__name__)
CORS(app)

database = data_handler(SQL_database(SQL_database.create_config()))

#  --- Login ---  
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


# --- Sign up ---
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
    
    except: 
        print("error!")
    # Check validation with database
  
    return jsonify({'status': 'succeed'})


@app.route('/peoples_budget/dashboard', methods=['GET'])
def dashboard():
    return  jsonify({ 'count': 1, 
                'ages': [2,2,2,2,2,2], 
                'gender': [2,2] })


@app.route('/peoples_budget/results', methods=['GET'])
def algorithms_results():
    # TODO: select from DB the input voting
    median_tree = Tree()
    median_tree.load_from_db()
    median_algorithm_result = median_algorithm(median_tree.to_dict())
    
    generalized_median_tree = Tree()
    generalized_median_tree.load_from_db()
    generalized_median_result = generalized_median_algorithm(generalized_median_tree.to_dict())
    
    return jsonify({'median_algorithm':json.dump(median_algorithm_result) ,
                    'generalized_median_algorithm': json.dump(generalized_median_result)})


@app.route('/peoples_budget/voting', methods=['POST'])
def voting_tree():
    try:
        tree = Tree()
        tree.load_tree_from_dict(request.json)
        
        # TODO: save tree in DB

    except: 
        print("error!")
        return jsonify({'status': 'failed'})
    # Check validation with database
  
    return jsonify({'status': 'succeed'})


@app.route('/peoples_budget/voting', methods=['GET'])
def subjects_and_projects_tree():
    
    tree = Tree()
    #TODO : object = take data from DB
    json_tree = tree.to_json()
    
    return jsonify({"json_tree": "json_tree"})



# dev or prod
mode = "dev"

if __name__ == '__main__':
    
    if mode == "dev": 
        app.run(port=5000, debug=True)
        
    else:
        serve(app, host='0.0.0.0', port=5000)
    