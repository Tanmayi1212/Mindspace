# MindSpace: Mental Health Journal

MindSpace is a peaceful corner of the internet for journaling, mood tracking, and AI-powered reflection.  
Reconnect with your inner self, reflect, grow, and find clarity.

## Why MindSpace?

Modern life is stressful and fast-paced. MindSpace was created to help you slow down, check in with your feelings, and build a habit of self-reflection.  
With secure journaling, mood tracking, and gentle AI support, MindSpace empowers you to nurture your mental wellness—privately and thoughtfully.

## Features

- **Secure Journal Entries:** Write, edit, and delete personal journal entries.
- **Mood Tracking:** Log your mood and view affirmations.
- **AI Reflection:** Get empathetic, therapist-like reflections on your entries.
- **Sentiment Analysis:** See how your journal entries are feeling.
- **Dark & Light Mode:** Beautiful, consistent theming across all pages.
- **Responsive Sidebar Navigation:** Hamburger menu for mobile, sidebar for desktop.
- **User Settings:** Update your profile and theme preference.
- **Authentication:** Secure login, signup, and account management.

## Tech Stack

- **Next.js (App Router)**
- **React**
- **Tailwind CSS**
- **MongoDB (Mongoose)**
- **NextAuth.js** for authentication
- **Cohere AI** for reflections
- **Custom CSS Variables** for theming

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set up environment variables:**

   - Copy `.env.example` to `.env.local` and fill in your MongoDB URI, Cohere API key, and NextAuth secret.

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Folder Structure

- `app/` — Main Next.js app directory
- `components/` — Reusable React components
- `styles/` — Global and component CSS
- `models/` — Mongoose models
- `lib/` — Utility functions (DB, AI, etc.)
- `public/` — Static assets

## Customization

- **Theming:** Edit `styles/global.css` to adjust colors and variables.
- **AI Reflection:** Update prompts in `app/api/analyze/route.js` for different reflection styles.

## License

MIT

---

_Made with ❤️ for mental wellness._
