# ✨ MagicSlide — AI Gmail Classifier

MagicSlide is an **AI-powered Gmail dashboard** that lets users securely log in with Google, fetch their emails, and automatically classify them using **OpenAI GPT-4o** into categories like *Important, Marketing, Spam, Advertising, Social,* or *Uncategorized*.  
Built with **Next.js 15**, **TypeScript**, **TailwindCSS**, and **ShadCN UI** — it combines elegant UI with intelligent email analysis.

---

## 🚀 Features

### 🔐 Authentication
- Google OAuth 2.0 login using **NextAuth.js**
- Secure session management
- Logout with token cleanup

### 📧 Gmail Integration
- Fetches up to **50 latest emails** using Gmail API
- Displays sender, subject, snippet, and timestamp
- Fully responsive email dashboard (3-column layout)
- Scrollable inbox view and detailed preview section

### 🧠 AI-Powered Classification
- Users can enter **their own OpenAI API key**
- GPT-4o model classifies emails into:
  - 🟢 **Important**
  - 🟠 **Marketing**
  - 🔵 **Social**
  - 🔴 **Spam**
  - 🟣 **Advertising**
  - ⚪ **Uncategorized**
- Filter dropdown for quick sorting by AI labels

### 🧭 Dashboard Interface
- Modern 3-column layout:
  - Sidebar → Navigation + User info  
  - Middle → Inbox & Scrollable Mail List  
  - Right → Email Preview with details & actions
- Responsive and mobile-friendly
- Smooth transitions and hover animations

### ⚙️ Tech Stack
- **Frontend:** Next.js (App Router), TypeScript  
- **UI:** TailwindCSS + ShadCN UI + Lucide Icons  
- **Auth:** NextAuth.js (Google Provider)  
- **AI:** OpenAI GPT-4o (classification endpoint)  
- **API:** Gmail REST API (v1)  
- **State Management:** React Hooks + Local Storage  
- **Deployment:** Vercel  

---


---

## 🧠 How It Works

1. **User Login:**  
   Sign in with your Google account via NextAuth.

2. **Enter OpenAI API Key:**  
   On the login screen, enter your personal OpenAI API key (stored securely in localStorage).

3. **Fetch Emails:**  
   Click *Fetch Emails* to retrieve the latest 50 Gmail messages.

4. **Classify with GPT-4o:**  
   Click *Classify with GPT-4o* — AI will analyze and tag each email.

5. **Filter Results:**  
   Use the *AI Filter* dropdown (All / Important / Spam / etc.) to sort emails dynamically.

---

🧑‍💻 Installation & Setup

Clone the repository:

git clone https://github.com/Wintorez7/magicslide-ai-mail-filtration.git
cd magicslide-ai-classifier


Install dependencies:

npm install


Run development server:

npm run dev

