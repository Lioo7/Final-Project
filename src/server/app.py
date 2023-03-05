from flask import Flask ,request, jsonify
from abstract_Database import Abstract_Database
from waitress import serve

app = Flask(__name__)

# Home page
# @app.route('/')
# def home_page():
#     return "<span style='color:red'>Home Page</span>"


# @app.route("/members")
# def members():
#     return {"members": ["Member1","Member2","Member3"]}


# @app.route('/peoples_budget/login', methods=['POST'])
# def example_endpoint():
#     id,password = request.get_json()
#     print(id , password)
#     return 'succeed'

@app.route('/peoples_budget/login', methods=['POST'])
def login():
    id = request.json['id']
    password = request.json['password']
    print(id , password)
  
    # Check validation with database
  
    return jsonify({'status': 'success'})

@app.route('/peoples_budget/home', methods=['GET'])
def home_page():
    return "s"


# dev or prod
mode = "dev"

if __name__ == '__main__':
    
    if mode == "dev": 
        app.run(port=3000,debug=True)
        
    else:
        serve(app, host='0.0.0.0', port=3000)
    