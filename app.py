from flask_cors import CORS
from flask_restful import Resource, Api
from flask import Flask
import express

app = Flask(__name__)
api = Api(app)

cors = CORS(app, resources={r"/*": {"origins":"*"}})

@app.route('/')
def hello_world():
    return express.express_menu.string()

if __name__ == '__main__':
    app.run(host='0.0.0.0')