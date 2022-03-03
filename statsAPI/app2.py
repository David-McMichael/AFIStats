from flask import Flask, json, request, jsonify, make_response
from pymongo import MongoClient
from bson import ObjectId
import string
from flask_cors import CORS
from flask import Flask, make_response, jsonify, request
from functools import wraps

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://127.0.0.1:27017")
db = client.third
plays = db.AFI
users = db.users



########################################################################################

@app.route("/api/v1.0/plays", methods=["GET"])
def show_all_plays():
    data_to_return = []       
    for play in plays.find():
            data_to_return.append(
    {
    '_id' : str(play['_id']),
    'id': (play["id"]),
    'GameDate' : (play["GameDate"]),
    'OffenseTeam' : (play["OffenseTeam"]),
    'Yards': str(play['Yards']),
    'Description' : (play['Description']),
    'DefenseTeam' : (play['DefenseTeam']),
    'Quarter' : (play['Quarter']),
    "GameId": (play["GameId"]),
   "Quarter": (play["Quarter"]),
    "Minute": (play["Minute"]),
    "Second": (play["Second"]),
    "OffenseTeam": (play["OffenseTeam"]),
    "DefenseTeam": (play["DefenseTeam"]),
    "Down": (play["Down"]),
    "ToGo": (play["ToGo"]),
    "YardLine": (play["YardLine"]),
    "Passer": (play["Passer"]),
    "Receiver": (play["Receiver"]),
    "Tackler": (play["Tackler"]),
    "AssistantTackler": (play["AssistantTackler"]),
    "InterceptedBy": (play["InterceptedBy"]),
    "SackedBy": (play["SackedBy"]),
    "PenaltyOn": (play["PenaltyOn"]),
    "Description": (play["Description"]),
    "SeasonYear": (play["SeasonYear"]),
    "Yards": (play["Yards"]),
    "Formation": (play["Formation"]),
    "PlayType": (play["PlayType"]),
    "IsRush": (play["IsRush"]),
    "IsPass": (play["IsPass"]),
    "IsIncomplete": (play["IsIncomplete"]),
    "IsTouchdown": (play["IsTouchdown"]),
    "PassType": (play["PassType"]),
    "IsSack": (play["IsSack"]),
    "IsChallenge": (play["IsChallenge"]),
    "IsChallengeReversed": (play["IsChallengeReversed"]),
    "Challenger": (play["Challenger"]),
    "IsMeasurement": (play["IsMeasurement"]),
    "IsInterception": (play["IsInterception"]),
    "IsFumble": (play["IsFumble"]),
    "IsPenalty": (play["IsPenalty"]),
    "IsTwoPointConversion": (play["IsTwoPointConversion"]),
    "IsTwoPointConversionSuccessful": (play["IsTwoPointConversionSuccessful"]),
    "RushDirection": (play["RushDirection"]),        
    "YardLineFixed": (play["YardLineFixed"]),        
    "YardLineDirection": (play["YardLineDirection"]),        
    "IsPenaltyAccepted": (play["IsPenaltyAccepted"]),        
    "PenaltyTeam": (play["PenaltyTeam"]),        
    "IsNoPlay": (play["IsNoPlay"]),        
    "PenaltyType": (play["PenaltyType"]),        
    "PenaltyYards": (play["PenaltyYards"]),
    "PassStatus": (play["PassStatus"])
     
     } 
     )
    return make_response(jsonify(data_to_return), 200)

########################################################################################

@app.route("/api/v1.0/plays", methods=["POST"])
def add_play():
    count = 0
    for play in plays.find():
        now = play['id']
        if(play['id'] > count):
            count = play['id']       
    if ("GameId" in request.form and "id" in request.form and "GameDate" in request.form and "Quarter" in request.form and "Minute" in request.form and \
        "Second" in request.form and "OffenseTeam" in request.form and "DefenseTeam" in request.form and "Down" in request.form and \
        "ToGo" in request.form and "YardLine" in request.form and "Passer" in request.form and "Reciever" in request.form and "Tackler" in request.form and \
        "AssistantTackler" in request.form and "InterceptedBy" in request.form and "SackedBy" in request.form and "PenaltyOn" in request.form and \
        "Description" in request.form and "SeasonYear" in request.form and "Yards" in request.form and \
        "Formation" in request.form and "PlayType" in request.form and "IsRush" in request.form and "IsPass" in request.form and \
        "IsIncomplete" in request.form and "IsTouchdown" in request.form and "PassType" in request.form and "IsSack" in request.form and \
        "IsChallenge" in request.form and "IsChallengeReversed" in request.form and "Challenger" in request.form and "IsMeasurement" in request.form and \
        "IsInterception" in request.form and "IsFumble" in request.form and "IsPenalty" in request.form and "IsTwoPointConversion" in request.form and \
        "IsTwoPointConversionSuccessful" in request.form and "RushDirection" in request.form and "YardLineFixed" in request.form and "YardLineDirection" in request.form and \
        "IsPenaltyAccepted" in request.form and "PenaltyTeam" in request.form and "IsNoPlay" in request.form and "PenaltyType" in request.form and "PenaltyYards" in request.form) or 1 == 1:
        new_play = {
        "GameId": request.form["GameId"],
        "id": count+1,
        "GameDate": request.form["GameDate"],
        "Quarter": request.form["Quarter"],
        "Minute": request.form["Minute"],
        "Second": request.form["Second"],
        "OffenseTeam": request.form["OffenseTeam"],
        "DefenseTeam": request.form["DefenseTeam"],
        "Down": int(request.form["Down"]),
        "ToGo": int(request.form["ToGo"]),
        "YardLine": request.form["YardLine"],
        "Passer": request.form["Passer"],
        "Receiver": request.form["Receiver"],
        "Tackler": request.form["Tackler"],
        "AssistantTackler": request.form["AssistantTackler"],
        "InterceptedBy": request.form["InterceptedBy"],
        "SackedBy": request.form["SackedBy"],
        "PenaltyOn": request.form["PenaltyOn"],
        "Description": request.form["Description"],
        "SeasonYear": request.form["SeasonYear"],
        "Yards": int(request.form["Yards"]),
        "Formation": request.form["Formation"],
        "PlayType": request.form["PlayType"],
        "IsRush": request.form["IsRush"],
        "IsPass": int(request.form["IsPass"]),
        "IsIncomplete": int(request.form["IsIncomplete"]),
        "IsTouchdown": request.form["IsTouchdown"],
        "PassType": request.form["PassType"],
        "IsSack": int(request.form["IsSack"]),
        "IsChallenge": request.form["IsChallenge"],
        "IsChallengeReversed": request.form["IsChallengeReversed"],
        "Challenger": request.form["Challenger"],
        "IsMeasurement": request.form["IsMeasurement"],
        "IsInterception": int(request.form["IsInterception"]),
        "IsFumble": request.form["IsFumble"],
        "IsPenalty": request.form["IsPenalty"],
        "IsTwoPointConversion": request.form["IsTwoPointConversion"],
        "IsTwoPointConversionSuccessful": request.form["IsTwoPointConversionSuccessful"],
        "RushDirection": request.form["RushDirection"],        
        "YardLineFixed": request.form["YardLineFixed"],        
        "YardLineDirection": request.form["YardLineDirection"],        
        "IsPenaltyAccepted": request.form["IsPenaltyAccepted"],        
        "PenaltyTeam": request.form["PenaltyTeam"],        
        "IsNoPlay": request.form["IsNoPlay"],        
        "PenaltyType": request.form["PenaltyType"],        
        "PenaltyYards": request.form["PenaltyYards"],
        "PassStatus": request.form["PassStatus"] 
    }
    
        plays.insert_one(new_play)
        return make_response(jsonify({"error": "Success"}), 201)
    else:
        return make_response(jsonify({"error": "Missing form data"}), 404)

########################################################################################
@app.route("/api/v1.0/plays/<string:id>", methods=["PUT"])
def edit_play2(id):
  if ("GameId" in request.form and "GameDate" in request.form and "Quarter" in request.form and "Minute" in request.form and \
        "Second" in request.form and "OffenseTeam" in request.form and "DefenseTeam" in request.form and "Down" in request.form and \
        "ToGo" in request.form and "YardLine" in request.form and "SeriesFirstDown" in request.form and "NextScore" in request.form and \
        "Description" in request.form and "TeamWin" in request.form and "SeasonYear" in request.form and "Yards" in request.form and \
        "Formation" in request.form and "PlayType" in request.form and "IsRush" in request.form and "IsPass" in request.form and \
        "IsIncomplete" in request.form and "IsTouchdown" in request.form and "PassType" in request.form and "IsSack" in request.form and \
        "IsChallenge" in request.form and "IsChallengeReversed" in request.form and "Challenger" in request.form and "IsMeasurement" in request.form and \
        "IsInterception" in request.form and "IsFumble" in request.form and "IsPenalty" in request.form and "IsTwoPointConversion" in request.form and \
        "IsTwoPointConversionSuccessful" in request.form and "RushDirection" in request.form and "YardLineFixed" in request.form and "YardLineDirection" in request.form and \
        "IsPenaltyAccepted" in request.form and "PenaltyTeam" in request.form and "IsNoPlay" in request.form and "PenaltyType" in request.form and "PenaltyYards" in request.form) or 1==1:
    result = plays.update_one({"_id": ObjectId(id)},{"$set":
    {
        "Passer": request.form["Passer"],
        "Receiver": request.form["Receiver"],
        "Description": request.form["Description"],
        "Yards": int(request.form["Yards"]),
        "PlayType": request.form["PlayType"],
        "IsRush": request.form["IsRush"],
        "IsPass": int(request.form["IsPass"]),
        "IsIncomplete": int(request.form["IsIncomplete"]),
        "IsSack": int(request.form["IsSack"]),
        "IsInterception": int(request.form["IsInterception"]),
        "PassStatus": request.form["PassStatus"]
    }
    }
    )
    return make_response(jsonify({"Success": "success"}), 200)
  else:
    return make_response(jsonify({"error": "Missing form data"}), 404)

########################################################################################

@app.route("/api/v1.0/plays/<string:id>", methods=["DELETE"])
def delete_play(id):
 result = plays.delete_one({"_id": ObjectId(id)})
 if result.deleted_count == 1:
    return make_response(jsonify({}), 204)
 else:
    return make_response(jsonify({"error": "Invalid play ID"}), 404)

########################################################################################

if __name__ == "__main__":
    app.run( debug = True)
    