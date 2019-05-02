import sys
from flask_cors import CORS
from flask_restful import Resource, Api
from flask import Flask
sys.path.insert(0, "./restaurants/")
import karrestaurant
import express
import hyllan
import SMAK
import linsen

app = Flask(__name__)
api = Api(app)

cors = CORS(app, resources={r"/*": {"origins":"*"}})

@app.route('/')
def hello_world():
    restaurants = (
            "EXPRESS: " + express.express_menu.string(),  
            "KÅRRESTAURANGEN: " + karrestaurant.kar_menu.string(),
            "SMAK: " + SMAK.smak_menu.string(),
            "LINSEN: " + linsen.linsen_menu.string(),
            "HYLLAN:  " + hyllan.hyllan_menu.string()
        )

    return ''.join(restaurants)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
