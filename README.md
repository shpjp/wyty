# WHAT'S YOUR TYPE ? 

A typing practice platform for Data Structures & Algorithms problems. Build muscle memory by typing DSA solutions, track your WPM, accuracy, and compete with your college peers!

## Features

✨ **Core Features:**
- 🎯 Problem of the Day - Focus on DP and Graph problems from Striver's A2Z sheet
- ⚡ Real-time WPM and accuracy tracking
- 🎨 Monaco Editor (VS Code editor) integration
- 🔒 3 daily attempts per user (encourages focused practice)
- 👤 User authentication with JWT & bcrypt
- 🎭 Guest mode - practice without login (progress not saved)
- 👨‍💻 Gender-based profile avatars

🚀 **Coming Soon:**
- 🏫 College leaderboards
- 📊 Personal stats dashboard
- 🏆 Achievements and streaks

## Tech Stack

### Why This Stack?

**Frontend:**
- **Next.js 14 (App Router)** - Full-stack framework with built-in API routes, SSR for SEO, and excellent developer experience
- **TypeScript** - Type safety enforces SOLID principles (especially LSP & ISP)
- **Tailwind CSS** - Utility-first CSS for rapid, consistent UI development
- **Monaco Editor** - Industry-standard code editor with syntax highlighting

**Backend:**
- **Next.js API Routes** - Serverless functions, eliminates separate backend setup
- **Prisma ORM** - Type-safe database queries (DRY principle), automatic migrations
- **PostgreSQL** - Relational database for data integrity and complex queries
- **NextAuth.js v5** - Authentication with JWT sessions and credentials provider
- **bcrypt** - Industry-standard password hashing

**Architecture Principles:**
- **SOLID**: Type-safe interfaces, single-responsibility components, dependency injection via props
- **KISS**: Simple authentication flow, straightforward data models
- **DRY**: Reusable React components, Prisma schema as single source of truth

## Project Structure

```
wyt/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts    # NextAuth handler
│   │   │   └── signup/route.ts           # User registration
│   │   ├── attempts/
│   │   │   ├── route.ts                  # Submit attempts
│   │   │   └── limit/route.ts            # Check daily limit
│   │   └── problems/
│   │       └── today/route.ts            # Get problem of the day
│   ├── layout.tsx                        # Root layout with providers
│   └── page.tsx                          # Main page
├── components/
│   ├── AuthModal.tsx                     # Login/signup modal
│   ├── CodeEditor.tsx                    # Monaco editor with WPM tracking
│   ├── Navbar.tsx                        # Top navigation
│   └── ClientProvider.tsx                # NextAuth session provider
├── lib/
│   ├── auth.ts                           # NextAuth configuration
│   └── prisma.ts                         # Prisma client singleton
├── prisma/
│   ├── schema.prisma                     # Database schema
│   └── seed.ts                           # Seed DSA problems
└── types/
    └── next-auth.d.ts                    # TypeScript declarations
```

## Database Schema

```prisma
User (id, username, email, password, gender, college)
  ├── attempts[] (userId → Attempt)
  └── dailyLimits[] (userId → DailyLimit)

Problem (id, title, description, solution, category, difficulty)
  └── attempts[] (problemId → Attempt)

Attempt (id, userId, problemId, wpm, accuracy, timeSpent, isCompleted)

DailyLimit (id, userId, date, attempts) [UNIQUE on userId + date]
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd /Users/shabby/Projects/wyt
   npm install
   ```

2. **Set up environment variables:**
   Edit `.env` file and update:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Set up database:**
   ```bash
   # Push Prisma schema to database
   npm run db:push

   # Seed with DSA problems
   npm run db:seed
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## Usage

### Guest Mode
- Click the X on the auth modal to continue as guest
- Practice typing DSA solutions
- View real-time WPM and accuracy
- Progress is not saved

### Authenticated Mode
- Sign up with username, email, password, and gender
- Optionally add your college (for future leaderboards)
- Get 3 daily attempts that reset at midnight
- All attempts are saved and tracked
- Profile avatar shows in navbar

### Typing Practice
1. Read the problem description
2. Start typing the solution in the Monaco Editor
3. Timer starts automatically on first keystroke
4. Track your WPM (words per minute) and accuracy in real-time
5. Complete the problem to save your attempt (if logged in)

## API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/signup` | POST | No | Register new user |
| `/api/auth/[...nextauth]` | GET/POST | No | NextAuth handlers |
| `/api/problems/today` | GET | No | Get problem of the day |
| `/api/attempts` | POST | Yes | Submit attempt |
| `/api/attempts/limit` | GET | Yes | Check daily limit |

## Future Enhancements

- [ ] College leaderboards with rankings
- [ ] Personal dashboard with stats graphs
- [ ] Problem categories filter (DP, Graph, etc.)
- [ ] Streak tracking and achievements
- [ ] Dark/light theme toggle
- [ ] Mobile responsive improvements
- [ ] Problem difficulty progression
- [ ] Social sharing of achievements

## Contributing

Built following:
- **SOLID** principles for maintainable code
- **DRY** principle to avoid duplication
- **KISS** principle for simplicity
- Clean code practices with TypeScript

## License

MIT

---

Built with ❤️ for developers who want to build muscle memory for DSA problems
