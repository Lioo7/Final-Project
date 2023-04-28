import json
import logging
import sys
from datetime import datetime

from flask import Flask, jsonify, request
from flask_cors import CORS
from waitress import serve

from calculator import Calculator
from user import User
from node import Node
from tree import Tree
from counter import Counter
from algorithms import (calculate_totals, convert_structure,
                        generalized_median_algorithm, median_algorithm,
                        unite_votes, update_dict_ids)



import database.abstract_Database
from database.data_handler import data_handler
from database.sql_database import SQL_database

sys.path.append("..")

app = Flask(__name__)
CORS(app)

# DB
database = data_handler(SQL_database(SQL_database.create_config()))


#  ----------------- Login ----------------------

@app.route("/peoples_budget/login", methods=["POST"])
def login():
    try:
        id = request.json["id"]
        password = request.json["password"]

    except:
        logging.error("ERROR! : login args")
        return jsonify({"status": "Faild"})

    database.handler.connect()
    result = database.handler.check_if_user_exists(id, password)

    if result:
        database.handler.disconnect()
        return jsonify({"status": "Succeeded"})

    else:
        database.handler.disconnect()
        return jsonify({"status": "Faild"})


@app.route("/peoples_budget/login", methods=["GET"])
def table_tree():
    database.handler.connect()
    tree = database.handler.build_tree_from_current_budget()
    dictionary = tree.to_dict()

    # updates the 'total' values in the budget dictionary
    calculate_totals(dictionary)
    json_tree = json.dumps(dictionary, ensure_ascii=False)
    database.handler.disconnect()

    return jsonify(json_tree)


# ----------------- Sign up ----------------------

@app.route("/peoples_budget/sign_up", methods=["POST"])
def signup():
    try:
        first_name = request.json["firstName"]
        last_name = request.json["lastName"]
        id = request.json["id"]
        birth_date = request.json["birthDate"]
        gender = request.json["gender"]
        email = request.json["email"]
        password = request.json["password"]

    except:
        logging.error("ERROR! : sign_up args")
        return jsonify("ERROR! : sign_up args")

    # Check validation with database
    converted_date = datetime.strptime(birth_date, "%Y-%m-%d").date()

    if gender == "male":
        # MALE
        gender = 1
    else:
        # FEMALE
        gender = 2

    new_user = User(id, first_name, last_name, converted_date, email, password, gender, False)

    database.handler.connect()
    check_mail = database.handler.user_mail_exeisting(new_user)

    if check_mail:
        database.handler.disconnect()
        return jsonify(
            {"status": "The email already exists in the system - try another email"}
        )

    check_id = database.handler.user_id_exeisting(new_user)
    if check_id:
        database.handler.disconnect()
        return jsonify({"status": "The ID already exists in the system"})

    insert_result = database.handler.insert_new_user(new_user)
    if insert_result:
        database.handler.disconnect()
        return jsonify({"status": "Succeeded"})

    database.handler.disconnect()

    return jsonify({"status": "Faild"})


# --------------------- Home --------------------------

@app.route("/peoples_budget/home", methods=["GET"])
def home():
    try:
        id = request.args.get("user_id")
    except:
        return jsonify({"status": "Error!, id args"})

    try:
        database.handler.connect()

    except:
        return jsonify({"status": "Error!, can not connect to db"})

    full_name = database.handler.get_user_full_name(id)
    first_name = full_name[0]

    if first_name == "Faild":
        database.handler.disconnect()
        return jsonify({"status": f"There is no user in db with id: {id}"})

    if first_name == "Error!":
        database.handler.disconnect()
        return jsonify({"status": "Error!, Faild to execute get full name query"})

    last_name = full_name[1]

    database.handler.disconnect()
    return {"first_name": first_name, "last_name": last_name}


# ------------------- Information ---------------------------

@app.route("/peoples_budget/information", methods=["GET"])
def information():
    database.handler.connect()
    dictionary = database.handler.get_information()

    if dictionary.get("e") == "Error!":
        return jsonify({"status": "Faild"})

    json_information = json.dumps(dictionary, ensure_ascii=False)

    database.handler.disconnect()
    return jsonify(json_information)


# ---------------------- Dashborad ----------------------------

@app.route("/peoples_budget/dashboard", methods=["GET"])
def dashboard():
    database.handler.connect()

    voter_count = Calculator.get_voter_count(database.handler)
    ages = Calculator.get_voter_count_by_age(database.handler)
    genders = Calculator.get_voter_count_by_gender(database.handler)

    database.handler.disconnect()

    return jsonify({"voter_count": voter_count, "ages": ages, "genders": genders})


# ----------------------- Voting ---------------------------

@app.route("/peoples_budget/voting", methods=["GET"])
def subjects_and_projects_tree():
    database.handler.connect()

    user_id = request.args.get("user_id")

    # Check if user can vote
    check_result = database.handler.check_voting_option(user_id=user_id)

    if check_result == "false":
        database.handler.disconnect()
        return jsonify({"status": "Is not allowed to vote"})

    elif check_result == "Error!":
        database.handler.disconnect()
        return jsonify({"status": "Error!, check_voting_option execute query"})

    tree = database.handler.build_tree_from_current_budget()
    dictionary = tree.to_dict()
    # updates the 'total' values in the budget dictionary
    calculate_totals(dictionary)
    count = Counter()
    update_dict_ids(count, dictionary)
    json_tree = json.dumps(dictionary, ensure_ascii=False)

    database.handler.disconnect()
    return json_tree


@app.route("/peoples_budget/voting", methods=["POST"])
def voting_tree():
    try:
        database.handler.connect()
        data = request.json
        user_id = data["id"]
        vote = data["table"]

        # update user option voting
        update_result = database.handler.update_voting_option(user_id=user_id, is_allowed=False)
        if not update_result:
            database.handler.disconnect()
            return jsonify(
                {
                    "status": "Error!, Voting permission has not been updated, vote not saved"
                }
            )

        vote_str = json.dumps(vote, ensure_ascii=False).replace("'", "''")
        result = database.handler.store_vote(vote=str(vote_str), user_id=user_id)

        if not result:
            # update user option voting
            update_result = database.handler.update_voting_option(user_id=user_id, is_allowed=True)
            database.handler.disconnect()
            return jsonify({"status": "Error!, voting does not saved"})

    except:
        return jsonify({"status": "failed"})

    database.handler.disconnect()
    return jsonify({"status": "Succeeded"})


# ----------------------- Results ------------------------------

@app.route("/peoples_budget/results", methods=["GET"])
def algorithms_results():
    database.handler.connect()
    votes = database.handler.load_user_votes()

    if not isinstance(votes, list):
        return jsonify({"status": "Faild to load from DB"})

    voted_dict = unite_votes(votes)

    # Algo 1:
    median_algorithm_result: dict = median_algorithm(voted_dict)

    # Algo 2:
    # generalized_median_result: dict = generalized_median_algorithm(voted_dict)

    # Get current budget
    tree = database.handler.build_tree_from_current_budget()
    current_budget = tree.to_dict()
    # updates the 'total' values in the budget dictionary
    calculate_totals(current_budget)
    count = Counter()
    update_dict_ids(count, current_budget)
    converted_current_budget = convert_structure(current_budget)

    database.handler.disconnect()

    return {
        "median_algorithm": json.dumps(median_algorithm_result, ensure_ascii=False),
        "current_budget": json.dumps(converted_current_budget, ensure_ascii=False),
    }


# dev or prod
mode = "dev"

if __name__ == "__main__":
    if mode == "dev":
        app.run(port=5000, debug=True)

    else:
        serve(app, host="0.0.0.0", port=5000)
