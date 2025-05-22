from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from Chatbot_banckend import optimize_response  # Import from optimizer.py

# Configure Gemini
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Welcome to the Gemini Chatbot API!"

@app.route('/get_prediction', methods=['POST'])
def get_prediction():
    user_input = request.json.get('user_input')

    if not user_input:
        return jsonify({'error': 'No input provided'}), 400

    try:
        # Step 1: Get Gemini's initial response
        raw_response = model.generate_content(user_input)
        assistant_reply = raw_response.text if hasattr(raw_response, "text") else "No response"

        # Step 2: Optimize it using the helper function
        optimized = optimize_response(assistant_reply)

        return jsonify({
            'original_response': assistant_reply,
            'optimized_response': optimized
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
# This code is a Flask application that serves as a chatbot backend using Google Gemini.