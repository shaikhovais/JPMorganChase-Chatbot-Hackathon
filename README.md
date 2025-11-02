# JP Morgan Chase Chatbot (Hackathon Project)

A full-stack chatbot developed for JP Morgan Chase’s challenge at the "Do you have the GUTS? 2025" hackathon organized by University of Glasgow.

## Tech Stack
- **Frontend:** Angular (Bootstrap)
- **Backend:** Python (Flask, ChatterBot), spaCy

## Project Structure
angular-frontend/ # Angular frontend code
python-backend/ # Python (Flask) backend code

## How to Run

**Backend:**
1. Go to the backend folder:
cd python-backend
2. Create and activate a virtual environment:
python3 -m venv venv
source venv/bin/activate
3. Install dependencies:
pip install -r requirements.txt
python -m spacy download en_core_web_sm
4. Start the backend server:
python3 chat.py

**Frontend:**
1. Go to the frontend folder:
cd angular-frontend
2. Install dependencies:
npm install
3. Start the frontend server:
ng serve
4. Open your browser at [http://localhost:4200](http://localhost:4200)

---

**Developed for educational purposes — University of Glasgow Hackathon 2025**
