import os
from flask import Flask, request
from flask_cors import CORS
import json
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer, CsvFileTrainer
import sanitiser as s

app = Flask(__name__)
CORS(app)

chatbot = ChatBot(
    'Chatty',
    logic_adapters=[
        {
            'import_path': 'chatterbot.logic.BestMatch',
            'default_response': 'I am sorry, but I do not understand. Please pick an option from the list below.',
            'maximum_similarity_threshold': 0.95
        },
        {'import_path': 'chatterbot.logic.MathematicalEvaluation'}
    ],
    preprocessors=[
        'chatterbot.preprocessors.clean_whitespace',
        'chatterbot.preprocessors.unescape_html'
    ]
)

trainer = ListTrainer(chatbot)
trainercsv = CsvFileTrainer(
    chatbot,
    field_map={'persona': 0, 'text': 1, 'conversation': 2}
)

trainer.train(s.sanitise_txt("financialData.txt"))
trainer.train(s.sanitise_txt("BasicCasualTraining.txt"))
trainer.train(s.sanitise_txt("nutmegtrainingdata.txt"))
trainer.train(s.sanitise_txt("BasicEducationalTraining.txt"))
trainercsv.train("jpmdata.csv")

@app.route('/query', methods=['POST'])
def query():
    request_data = request.get_json()
    user_query = request_data.get('query', '')
    bot_response = str(chatbot.get_response(user_query))
    return json.dumps({"response": bot_response.strip('"')})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(debug=False, host='0.0.0.0', port=port)