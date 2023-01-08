from flask import Flask


app = Flask(__name__)

# Home page
@app.route('/')
def home_page():
    return "<span style='color:red'>Home Page</span>"

@app.route("/members")
def members():
    return {"members": ["Member1","Member2","Member3"]}

if __name__ == '__main__':
    app.run(debug=True)