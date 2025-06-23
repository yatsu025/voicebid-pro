 # 🎙️ Voicebid-Pro

**Voicebid-Pro** is a real-time, voice-powered auction platform built for speed, interactivity, and uniqueness — ideal for hackathons or demos. Users can place bids using voice commands, view live bid updates, and enjoy a smooth auction experience.

---

## 🌟 Features

- 🎤 Voice recognition for bidding (Web Speech API)
- 🔁 Real-time auction bid updates (Firebase Realtime DB)
- ⏱️ Countdown timers for auctions
- 🎉 Confetti celebration for winners
- 🌙 Dark Mode UI (TailwindCSS)
- 🚀 Deployed on Vercel for fast public access

---

## 🧰 Tech Stack

| Layer        | Tech Used                          |
|--------------|------------------------------------|
| Frontend     | React (Next.js), TailwindCSS       |
| Voice API    | Web Speech API                     |
| Real-time DB | Firebase Realtime Database         |
| Animations   | Confetti.js                        |
| Deployment   | Vercel                             |
| Dev Tools    | VS Code, GitHub                    |

---

## 📦 Folder Structure

```

/voicebid-pro
├── app/               # Main Next.js app pages
├── components/        # Reusable UI components
├── hooks/             # React hooks
├── lib/               # Utility libraries
├── public/            # Static assets
├── styles/            # Tailwind and global styles
├── firebase.js        # Firebase config (optional)
├── README.md
├── package.json
└── tailwind.config.ts

````

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yatsu025/voicebid-pro.git
cd voicebid-pro
````

### 2. Install Dependencies

```bash
npm install
```

> ⚠️ **Having a dependency conflict?**
> If you see an error like:

```
npm ERR! Could not resolve dependency:
npm ERR! peer date-fns@"^2.28.0 || ^3.0.0" from react-day-picker@8.10.1
```

✅ Run this instead to bypass the error:

```bash
npm install --legacy-peer-deps
```

or

```bash
npm install --force
```

---

### 3. Start the Development Server

```bash
npm run dev
```

Then open: [http://localhost:3000](http://localhost:3000)

---

## ✅ Submission Checklist

* ✅ Working voice bidding + UI
* ✅ Real-time bid updates
* ✅ Vercel deployed: [https://voicebid-pro.vercel.app](https://voicebid-pro.vercel.app)
* ✅ Full documentation
* ✅ Voice + UI integration demo ready

---

## 🔮 Future Improvements

* AI-based speech processing (Whisper)
* TTS announcements using ElevenLabs
* Admin panel and auction scheduler
* Multi-item auction support

---

## 👥 Author

Made with ❤️ by **[Yash Srivastava](https://github.com/yatsu025)**
Hackathon Submission for Vibe Coders 🚀
