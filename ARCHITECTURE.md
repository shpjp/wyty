# Architecture & Design Decisions

## Overview
DSA TypeMaster is a full-stack Next.js application designed to help developers build muscle memory for typing DSA solutions. The architecture follows SOLID, DRY, and KISS principles.

## Technology Stack Rationale

### Frontend
- **Next.js 14 (App Router)**: Chosen for unified frontend + API backend, server components for better performance, and built-in routing
- **TypeScript**: Enforces type safety (SOLID: Interface Segregation Principle), catches errors at compile time
- **Tailwind CSS**: Utility-first approach reduces custom CSS (DRY), rapid prototyping, consistent design system
- **Monaco Editor**: VS Code's editor - familiar to developers, excellent syntax highlighting, minimal setup

### Backend
- **Next.js API Routes**: Serverless endpoints, no separate backend server needed (KISS), automatic TypeScript support
- **Prisma ORM**: Type-safe database queries, schema as single source of truth (DRY), automatic migrations
- **PostgreSQL**: ACID compliance for data integrity, relational model fits user-problem-attempt relationships
- **NextAuth.js v5**: Industry-standard authentication, JWT sessions, extensible for OAuth later

### Security
- **bcrypt**: Industry-standard password hashing with salt rounds
- **JWT**: Stateless sessions, scalable for future features
- **Zod**: Runtime validation prevents injection attacks

## Database Design

### Schema Decisions

**User Model**
```prisma
- id: CUID (collision-resistant, URL-safe)
- username: Unique identifier for display
- gender: For avatar personalization
- college: Optional - future feature (leaderboards)
```

**Problem Model**
```prisma
- category: ENUM (DYNAMIC_PROGRAMMING, GRAPH) - enforces valid types
- difficulty: ENUM (EASY, MEDIUM, HARD) - future filtering
- tags: String[] - flexible categorization
```

**Attempt Model**
```prisma
- wpm, accuracy, timeSpent: Core metrics for progress tracking
- isCompleted: Boolean flag for completed vs partial attempts
- Indexes on userId+createdAt: Optimizes user history queries
```

**DailyLimit Model**
```prisma
- Unique constraint on userId+date: Prevents duplicate entries
- Atomic increment: Race condition safe
```

### Relationships
- User → Attempts (1:N): One user, many attempts
- Problem → Attempts (1:N): One problem, many attempts
- User → DailyLimits (1:N): Track daily usage

## Component Architecture

### Separation of Concerns

**Page Components** (`app/page.tsx`)
- State management (session, problem, attempts)
- Data fetching orchestration
- Layout composition

**UI Components** (`components/`)
- Single Responsibility Principle
- Props-based configuration (Dependency Inversion)
- Reusable across different contexts

**API Routes** (`app/api/`)
- RESTful design
- Input validation with Zod
- Error handling with proper HTTP codes

### Component Hierarchy
```
RootLayout (SessionProvider)
└── HomePage
    ├── AuthModal (conditional)
    ├── Navbar
    │   └── User Profile
    └── Main Content
        ├── Attempt Counter
        ├── CodeEditor
        │   ├── Problem Info
        │   ├── Stats Display
        │   └── Monaco Editor
        └── Guest Notice
```

## Key Features Implementation

### 1. Authentication Flow
**Design**: Modal-first with guest fallback
- **Why**: Encourage sign-ups while allowing exploration
- **Implementation**: 
  - Modal on first visit
  - Backdrop blur (visual hierarchy)
  - Persistent session with JWT
  - Server-side auth checks

### 2. Daily Attempt Limiting
**Design**: Database-enforced with atomic operations
- **Why**: Prevent race conditions, ensure fairness
- **Implementation**:
  - Unique constraint on user+date
  - Upsert with increment (atomic)
  - Calendar day (midnight reset)

### 3. WPM Calculation
**Design**: Real-time, client-side calculation
- **Why**: Immediate feedback, reduced server load
- **Implementation**:
  - Start timer on first keystroke
  - Update every 1 second
  - Words = characters / 5 (standard)
  - Accuracy = correct chars / total chars

### 4. Problem Rotation
**Design**: Simple "latest problem" approach
- **Why**: KISS - complex rotation later
- **Current**: Fetch most recent problem
- **Future**: Daily rotation algorithm, difficulty progression

## SOLID Principles Application

### Single Responsibility
- `AuthModal`: Only handles auth UI
- `CodeEditor`: Only handles typing + metrics
- `Navbar`: Only handles navigation + profile
- API routes: Each handles one resource

### Open/Closed
- Problem categories: ENUM - add new types without changing logic
- Authentication: NextAuth providers - add OAuth without rewriting

### Liskov Substitution
- TypeScript interfaces ensure components accept standard props
- Prisma models maintain consistent structure

### Interface Segregation
- Components receive only needed props
- API endpoints return only required data

### Dependency Inversion
- Components depend on props, not implementations
- Prisma client injected, not hardcoded

## DRY Implementation

### Code Reuse
- Prisma schema: Single source for types + validation
- Shared types: `next-auth.d.ts` for session typing
- Utility functions: Error handling patterns
- Component composition: Navbar, Modals

### Configuration as Code
- `.env` for environment-specific values
- Prisma schema for database structure
- Tailwind config for design tokens

## KISS Implementation

### Simplicity Choices
- Authentication: Email/password (no OAuth initially)
- Problem selection: Latest problem (no complex algorithm)
- Attempt tracking: Simple count (no rate limiting complexity)
- UI: Modal-first (no multi-step wizard)

### What We Avoided
- ❌ Microservices (monolith is simpler)
- ❌ Redis caching (PostgreSQL sufficient)
- ❌ WebSockets (polling sufficient)
- ❌ Complex state management (React hooks sufficient)

## Performance Considerations

### Optimizations
- **Server Components**: Default in Next.js 14 - faster initial load
- **Client Components**: Only where needed (interactivity)
- **Database Indexes**: On frequently queried fields
- **Prisma Connection Pooling**: Singleton pattern prevents connection exhaustion

### Future Optimizations
- [ ] React Query for client-side caching
- [ ] Image optimization for avatars
- [ ] Code splitting for Monaco Editor
- [ ] Edge functions for auth

## Security Considerations

### Current Implementation
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT session encryption
- ✅ Input validation with Zod
- ✅ SQL injection prevention (Prisma ORM)
- ✅ XSS prevention (React escaping)

### Production Checklist
- [ ] Rate limiting on API routes
- [ ] HTTPS enforcement
- [ ] CSRF protection
- [ ] Secure headers (helmet)
- [ ] Environment variable validation

## Testing Strategy

### Current Status
- Manual testing during development
- TypeScript for compile-time checks

### Future Testing
- [ ] Unit tests: Components with Jest
- [ ] Integration tests: API routes with Supertest
- [ ] E2E tests: User flows with Playwright
- [ ] Database tests: Prisma migrations

## Scalability Plan

### Phase 1 (Current)
- Single PostgreSQL instance
- Next.js deployed on Vercel
- Up to 10k users

### Phase 2 (Future)
- Database read replicas
- Redis for session storage
- CDN for static assets
- Up to 100k users

### Phase 3 (Scale)
- Horizontal scaling with load balancer
- Separate auth service
- Microservices for specific features
- 1M+ users

## Monitoring & Observability

### Planned Metrics
- User signups per day
- Daily active users
- Average WPM by problem
- Attempt completion rate
- API response times
- Database query performance

### Tools (Future)
- Vercel Analytics
- Prisma Pulse for database monitoring
- Sentry for error tracking
- PostHog for product analytics

## Deployment

### Development
- `npm run dev` - Local development
- Hot reload enabled
- Database: Local PostgreSQL or cloud

### Production
- Platform: Vercel (recommended)
- Database: Supabase / Neon / Railway
- Environment variables via platform dashboard
- Automatic deployments on git push

## Future Features Roadmap

### Phase 1 (MVP) ✅
- [x] User authentication
- [x] Problem display
- [x] Code typing with WPM tracking
- [x] Daily attempt limiting
- [x] Guest mode

### Phase 2 (Enhancement)
- [ ] College leaderboards
- [ ] Personal stats dashboard
- [ ] Problem filtering by category
- [ ] Streak tracking
- [ ] Achievement badges

### Phase 3 (Social)
- [ ] Share results on social media
- [ ] Friend challenges
- [ ] Global leaderboard
- [ ] Team competitions
- [ ] Live typing races

## Lessons Learned

### What Worked Well
✅ Next.js unified stack reduced complexity
✅ Prisma schema first approach saved time
✅ TypeScript caught errors early
✅ Tailwind enabled rapid UI iteration

### What Could Be Improved
⚠️ Monaco Editor bundle size (consider CodeMirror)
⚠️ Client-side only metrics (consider server validation)
⚠️ No pagination on problems (future issue)

## Contributing Guidelines

### Code Standards
- TypeScript strict mode enabled
- ESLint rules enforced
- Prettier for formatting
- Meaningful variable names
- Comments for complex logic

### Git Workflow
- Feature branches from `main`
- Descriptive commit messages
- PR reviews required
- Squash merge to keep history clean

### Adding Problems
1. Edit `prisma/seed.ts`
2. Add problem object with required fields
3. Run `npm run db:seed`
4. Verify in application

---

**Author Notes**: This architecture prioritizes developer experience, maintainability, and scalability. Each decision balances current needs with future growth while keeping the codebase simple and understandable.
