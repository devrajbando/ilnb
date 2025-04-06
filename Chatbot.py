import google.generativeai as genai
from flask import Flask, request, jsonify,current_app

app = Flask(__name__)

genai.configure(api_key="AIzaSyAljRC428A-Epl9Vjkgz098gZhkw-C0pG0")
model = genai.GenerativeModel("gemini-1.5-flash-latest")

PREDEFINED_TOPICS = {
    "Explain_sharpe": "You're a financial advisor. Explain what sharpe ratio are, how they work, and when they are ideal for investment.",
    "2 ": "You're a finance expert. Teach the user about volatility",
 

}

chat_sessions = {}

@app.route('/main/start', methods=['POST'])
def start_topic():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400
        
        user_input = data.get('input')
        chat_id = data.get('newChatId')
        print("ihihhi")
        topic_name = data.get('topic')

        # if not chat_id:
        #     return jsonify({"error": "Chat ID is required"}), 400
        
        # # If topic is provided, prepend the predefined prompt
        # if topic_name and topic_name in PREDEFINED_TOPICS:
        #     user_input = f"{PREDEFINED_TOPICS[topic_name]}\n{user_input}"

        chat = model.start_chat(history=[])
        print("1234")
        
        response = chat.send_message(user_input) 
        print("45678")
        chat_sessions[chat_id] = chat
        print("9999")
        
        
        return jsonify({
            "response": response.text,
            "chat_id": chat_id
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/main/continue', methods=['POST'])
def continue_chat():
    message = request.get_json()
    print(message)
    if not message:
            return jsonify({"error": "No JSON data provided"}), 400
    
    user_input = message.get('input')
    chat_id = message.get('chatId')
    print(chat_id)
    chat = chat_sessions[chat_id]
    response = chat.send_message(user_input) 
    
    
    return jsonify({"response": response.text})


# ✅ Manual test
if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5020, debug=True)
    print(start_topic("Explain_sharpe", user_id="test_user"))
    while True:
        msg = input("You: ")
        if msg.lower() == "exit":
            break
        print("Bot:", continue_chat(msg, user_id="test_user"))