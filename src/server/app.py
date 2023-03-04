from flask import Flask
from abstract_Database import Abstract_Database
from waitress import serve


app = Flask(__name__)

# Home page
@app.route('/')
def home_page():
    return "<span style='color:red'>Home Page</span>"

@app.route("/members")
def members():
    return {"members": ["Member1","Member2","Member3"]}

# dev or prod
mode = "dev"

if __name__ == '__main__':
    
    if mode == "dev": 
        app.run(port=8080,debug=True)
        
    else:
        serve(app, host='0.0.0.0', port=8080)
    