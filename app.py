from flask_cors import CORS
from flask_restful import Resource, Api
from flask import Flask

app = Flask(__name__)
api = Api(app)

cors = CORS(app, resources={r"/*": {"origins":"*"}})

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(host='0.0.0.0')