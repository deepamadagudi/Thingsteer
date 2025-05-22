import google.generativeai as genai

# Configure Gemini
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

def optimize_response(user_input: str) -> str:
    optimize_prompt = f"""
You are Thingsteer's AI Assistant, a smart, helpful, and professional chatbot that communicates clearly and concisely with users.

Please rewrite the following assistant response to:
- Maintain a helpful and friendly tone
- Represent Thingsteer's brand voice (professional and informative)
- Condense unnecessary repetition
- Prompt the user for context respectfully if information is unclear or unfamiliar

Here is the original assistant response:
{user_input}
"""
    response = model.generate_content(optimize_prompt)

    return response.text if hasattr(response, "text") else "Optimization failed"
