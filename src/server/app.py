from flask import Flask, request, jsonify
from waitress import serve
from flask_cors import CORS
from tree import Tree
from node import Node
from algorithms import median_algorithm, generalized_median_algorithm, calculate_totals, update_dict_ids
import json
from data_handler import data_handler
from sql_database import SQL_database
from user import User
from datetime import datetime, date
from calculator import Calculator

app = Flask(__name__)
CORS(app)

database = data_handler(SQL_database(SQL_database.create_config()))

#  --- Login ---


@app.route('/peoples_budget/login', methods=['POST'])
def login():
    try:
        id = request.json['id']
        password = request.json['password']

    except:
        print("error!")
    # TODO: Check validation with database
    database.handler.connect()
    result = database.handler.check_if_user_exists(id, password)
    if result:
        database.handler.disconnect()
        return jsonify({'status': 'Succeeded'})

    else:
        database.handler.disconnect()
        return jsonify({'status': 'Faild'})

@app.route('/peoples_budget/login', methods=['GET'])
def table_tree():
    database.handler.connect()
    tree = database.handler.build_tree_from_current_budget()
    dictionary = tree.to_dict()
    # updates the 'total' values in the budget dictionary
    calculate_totals(dictionary)
    json_tree = json.dumps(dictionary, ensure_ascii=False)
    return jsonify(json_tree)


# --- Sign up ---
@app.route('/peoples_budget/sign_up', methods=['POST'])
def signup():
    try:
        first_name = request.json['firstName']
        last_name = request.json['lastName']
        id = request.json['id']
        birth_date = request.json['birthDate']
        gender = request.json['gender']
        email = request.json['email']
        password = request.json['password']

    except:
        print("error!")

    # Check validation with database
    converted_date = datetime.strptime(birth_date, "%Y-%m-%d").date()

    if gender == "male":
        # MALE
        gender = 1
    else:
        # FEMALE
        gender = 2

    new_user = User(id, first_name, last_name, converted_date,
                    email, password, gender, False)

    database.handler.connect()
    check_mail = database.handler.user_mail_exeisting(new_user)

    if check_mail:
        database.handler.disconnect()
        return jsonify({'status': f'user already exists by {new_user.get_mail()}'})

    check_id = database.handler.user_id_exeisting(new_user)
    if check_id:
        database.handler.disconnect()
        return jsonify({'status': f'user already exists by {new_user.get_id()}'})

    insert_result = database.handler.insert_new_user(new_user)
    if insert_result:
        database.handler.disconnect()
        return jsonify({'status': 'Succeeded'})

    database.handler.disconnect()
    return jsonify({'status': 'Faild'})

# --- Information ---
@app.route('/peoples_budget/information', methods=['GET'])
def information():
    database.handler.connect()
    dictionary = database.handler.get_information()
    
    if dictionary.get("e") == "Error!":
        return jsonify({'status': 'Faild'})
    
    json_information = json.dumps(dictionary, ensure_ascii=False)
    return jsonify(json_information)
    
    
# --- Dashborad ---
@app.route('/peoples_budget/dashboard', methods=['GET'])
def dashboard():
    database.handler.connect()
    return jsonify({'voter_count': Calculator.get_voter_count(database.handler),
                    'ages': Calculator.get_voter_count_by_age(database.handler),
                    'genders': Calculator.get_voter_count_by_gender(database.handler)})


# --- Results ---
@app.route('/peoples_budget/results', methods=['GET'])
def algorithms_results():
    # TODO: select from DB the input voting
    database.handler.connect()
    # TODO: implement load_user_votes() function in sql_database class
    dictionary = database.handler.load_user_votes()

    median_algorithm_result: dict = median_algorithm(dictionary)
    generalized_median_result: dict = generalized_median_algorithm(dictionary)

    return jsonify({'median_algorithm': json.dump(median_algorithm_result),
                    'generalized_median_algorithm': json.dump(generalized_median_result)})


# --- Voting ---
@app.route('/peoples_budget/voting', methods=['POST'])
def voting_tree():
    try:
        database.handler.connect()
        data = request.json
        #print(data)
        user_id = data['id']
        # have to get the user id from the client!
        print(user_id)

        check_result = database.handler.check_voting_option(user_id=user_id)
        print("here2")

        if check_result == "false":
            print("here3")
            
            return jsonify({'status': 'Is not allowed to vote'})

        elif check_result == "Error!":
            print(check_result)
            
            raise Exception("Error!, check_voting_option execute query")
        print("here4")

        json_string = request.json
        dictionary = json.loads(json_string)

        # Save tree in DB
        # TODO : have to get the user_id from the client and test the function
        result = database.handler.store_vote(
            vote_data=dictionary, user_id=user_id)
        if not result:
            raise Exception("Error!, voting does not saved")

        else:
            database.handler.update_voting_option(user_id=user_id)

    except:
        return jsonify({'status': 'failed'})
    print("here")
    return jsonify({'status': 'Succeeded'})


@app.route('/peoples_budget/voting', methods=['GET'])
def subjects_and_projects_tree():
    database.handler.connect()
    tree = database.handler.build_tree_from_current_budget()
    dictionary = tree.to_dict()
    # updates the 'total' values in the budget dictionary
    calculate_totals(dictionary)
    update_dict_ids(dictionary)
    json_tree = json.dumps(dictionary, ensure_ascii=False)
    
    return jsonify(json_tree)

# dev or prod
mode = "dev"

if __name__ == '__main__':

    if mode == "dev":
        app.run(port=5000, debug=True)

    else:
        serve(app, host='0.0.0.0', port=5000)
