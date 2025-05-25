InterviewPrep is an AI-powered job interview preparation platform built with:

Next.js for frontend

Vapi.ai for voice-based AI interaction

Tailwind CSS for UI styling

Firebase for backend authentication and storage

The platform enables users to simulate real-time technical interviews using voice commands, receive intelligent feedback, and prepare more effectively for job interviews.

📦 Features
🎤 Voice-based Q&A with AI interviewer (Vapi)

🧠 AI-generated feedback on answers

👤 User authentication with Firebase

💾 Real-time data sync and session management

🧩 Modular UI with customizable components

🛠️ Installation & Setup
1. Clone the repository

git clone https://github.com/your-username/ai_mock_interviews.git
cd ai_mock_interviews

2. Install dependencies

npm install

3. Set up environment variables
Create a .env.local file in the root directory and add:

NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_api_key

4. Run the development server

npm run dev
Visit http://localhost:3000 to access the app locally.

📁 Folder Structure

.
├── app/                    # Next.js App router
├── components/             # Reusable React components
├── constants/              # Static data/constants
├── firebase/               # Firebase configuration
├── lib/                    # Utilities and hooks
├── public/                 # Public assets
├── types/                  # TypeScript type definitions

🌐 Deployment
Deployed via Vercel. To deploy your own:

Push the code to GitHub.

Import the repo on Vercel.

Add your environment variables in Vercel settings.

Deploy 🚀

