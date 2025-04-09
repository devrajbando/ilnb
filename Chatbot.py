import google.generativeai as genai
from flask import Flask, request, jsonify
import os



app = Flask(__name__)
# Don't hardcode API keys in the code
# api_key = os.environ.get('GEMINI_API_KEY')

# if not api_key:
    # raise ValueError("Missing GEMINI_API_KEY environment variable")

genai.configure(api_key='AIzaSyAljRC428A-Epl9Vjkgz098gZhkw-C0pG0') 
model = genai.GenerativeModel("gemini-1.5-flash-latest")


PREDEFINED_TOPICS = {
    "Risk": "You're a financial advisor. Explain what the Sharpe Ratio is, how it helps assess investment risk, and when it's useful. Briefly describe what different ranges of Sharpe Ratios mean, using simple examples. Keep it short and easy to understand for someone with no financial background — 2 to 3 sentences, no jargon.",
    "Stability": "You're a financial advisor. Explain what Maximum Drawdown means, how it shows investment stability, and when it matters. Give a simple example to show how different drawdown values affect investment decisions. Use plain language for someone without financial knowledge — max 2 to 3 sentences, no jargon.",
    "One year Return": "You're a financial advisor. Explain what Annualized Return means, how it works, and why it's important for investors. Include a basic example of how different return values might impact someone's investment. Keep it very simple, short (2 to 3 sentences), and avoid financial jargon.",
    "": """You are a financial advisor. In the following conversation, you will be asked to explain financial concepts in a simple and easy-to-understand manner. Your explanations should be concise, using plain language and avoiding jargon. Please keep your responses short, ideally 2 to 3 sentences. Answer all of the user's inputs in the context of finance, stocks mutual funds and investments. If the user asks for a definition, provide a clear and simple explanation. If the user asks for an example, give a straightforward example that illustrates the concept. If the user asks for a comparison, highlight the key differences or similarities between the two concepts in a simple way. If the user asks for advice, provide general guidance without specific recommendations. If the user asks for a summary, give a brief overview of the main points.""",
}

chat_sessions = {}

@app.route('/main/start', methods=['POST'])
def start_topic():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        topic_name = data.get('input', "")
        chat_id = data.get('newChatId')
 
        if topic_name not in PREDEFINED_TOPICS:
            return jsonify({"error": "Invalid topic name"}), 400
        if not chat_id:
            return jsonify({"error": "Chat ID is required"}), 400

        pre_prompt = PREDEFINED_TOPICS[topic_name]

        

        chat = model.start_chat(history=[])
        response = chat.send_message(pre_prompt)

        chat_sessions[chat_id] = chat

        return jsonify({
            "response": response.text,
            "chat_id": chat_id
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/main/continue', methods=['POST'])
def continue_chat():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400
 
        user_input = data.get('input')
        chat_id = data.get('chatId')

        print(chat_id)
        if not user_input:
            return jsonify({"error": "Input message is required"}), 400
        if not chat_id:
            return jsonify({"error": "Chat ID is required"}), 400
        print('hi2')
        if chat_id not in chat_sessions:
            return jsonify({"error": "Invalid or expired chat ID"}), 400

        chat = chat_sessions[chat_id]
        response = chat.send_message(user_input)

        return jsonify({"response": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5020, debug=True)