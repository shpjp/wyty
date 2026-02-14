# Quick Start Guide

Follow these steps to get DSA TypeMaster running:

## 1. Database Setup

You have two options:

### Option A: Local PostgreSQL
```bash
# Install PostgreSQL (macOS)
brew install postgresql@14
brew services start postgresql@14

# Create database
createdb dsa_typing

# Your DATABASE_URL will be:
# postgresql://postgres:postgres@localhost:5432/dsa_typing
```

### Option B: Cloud Database (Recommended for quick start)
Use a free PostgreSQL database from:
- [Supabase](https://supabase.com/) - Free tier with 500MB
- [Neon](https://neon.tech/) - Free serverless Postgres
- [Railway](https://railway.app/) - Free $5 credit

## 2. Environment Setup

Update your `.env` file:
```env
# Replace with your actual database URL
DATABASE_URL="postgresql://user:password@host:5432/database"

# Generate a secret (run: openssl rand -base64 32)
NEXTAUTH_SECRET="your-generated-secret-here"

# Keep as is for local development
NEXTAUTH_URL="http://localhost:3000"
```

## 3. Initialize Database

```bash
# Push the database schema
npm run db:push

# Seed with 6 DSA problems (DP & Graph)
npm run db:seed
```

## 4. Run the App

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## What to Expect

1. **Landing Page**: Auth modal appears with blurred background
   - Click X to continue as guest (no progress saved)
   - Or sign up to track your attempts

2. **Try It Out**:
   - Sign up with: username, email, password, gender
   - You'll get 3 daily attempts
   - Start typing the DSA solution
   - Watch your WPM and accuracy in real-time!

3. **Sample Problems Seeded**:
   - Climbing Stairs (DP - Easy)
   - House Robber (DP - Medium)
   - Longest Common Subsequence (DP - Medium)
   - Number of Islands (Graph - Medium)
   - Course Schedule (Graph - Medium)
   - Clone Graph (Graph - Medium)

## Troubleshooting

### Database connection issues
- Verify your `DATABASE_URL` is correct
- Check if PostgreSQL is running: `brew services list`
- Test connection: `psql $DATABASE_URL`

### Seed fails
- Make sure `npm run db:push` completed successfully
- Check that database is accessible

### Auth not working
- Verify `NEXTAUTH_SECRET` is set in `.env`
- Clear browser cookies and try again

### Build errors
- Delete `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Run: `npm run dev`

## Next Steps

Once running:
1. Create an account and complete your first problem
2. Check your WPM and accuracy stats
3. Try to beat your own record!
4. Explore the codebase and add features

## Development Tips

- Hot reload works for all file changes
- API routes are in `app/api/`
- Components are in `components/`
- Database schema: `prisma/schema.prisma`
- Add more problems: Edit `prisma/seed.ts`

Happy coding! 🚀
