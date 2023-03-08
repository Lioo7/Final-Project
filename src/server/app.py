from flask import Flask ,request, jsonify
from abstract_Database import Abstract_Database
from waitress import serve
from flask_cors import CORS
from tree import Tree

app = Flask(__name__)
CORS(app)

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
    return jsonify({'algo1': 1 ,
                    'algo2': 1})


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
    
    return jsonify(json_tree)



# dev or prod
mode = "dev"

if __name__ == '__main__':
    
    if mode == "dev": 
        app.run(port=5000, debug=True)
        
    else:
        serve(app, host='0.0.0.0', port=5000)
    