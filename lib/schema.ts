import { pgTable, text, timestamp, pgEnum, real, integer, boolean, date, index, uniqueIndex } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Enums
export const genderEnum = pgEnum('gender', ['MALE', 'FEMALE'])
export const categoryEnum = pgEnum('category', ['DYNAMIC_PROGRAMMING', 'GRAPH'])
export const difficultyEnum = pgEnum('difficulty', ['EASY', 'MEDIUM', 'HARD'])

// Users table
export const users = pgTable('User', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  gender: genderEnum('gender').notNull(),
  college: text('college'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().defaultNow(),
})

// Problems table
export const problems = pgTable('Problem', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  description: text('description').notNull(),
  solution: text('solution').notNull(),
  category: categoryEnum('category').notNull(),
  difficulty: difficultyEnum('difficulty').notNull(),
  tags: text('tags').array().notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
})

// Attempts table
export const attempts = pgTable('Attempt', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  problemId: text('problemId').notNull().references(() => problems.id, { onDelete: 'cascade' }),
  wpm: real('wpm').notNull(),
  accuracy: real('accuracy').notNull(),
  timeSpent: integer('timeSpent').notNull(),
  isCompleted: boolean('isCompleted').notNull().default(false),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  userCreatedAtIdx: index('Attempt_userId_createdAt_idx').on(table.userId, table.createdAt),
  problemIdIdx: index('Attempt_problemId_idx').on(table.problemId),
}))

// Daily limits table
export const dailyLimits = pgTable('DailyLimit', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: date('date').notNull(),
  attempts: integer('attempts').notNull().default(0),
}, (table) => ({
  userDateIdx: index('DailyLimit_userId_date_idx').on(table.userId, table.date),
  userDateUnique: uniqueIndex('DailyLimit_userId_date_key').on(table.userId, table.date),
}))

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  attempts: many(attempts),
  dailyLimits: many(dailyLimits),
}))

export const problemsRelations = relations(problems, ({ many }) => ({
  attempts: many(attempts),
}))

export const attemptsRelations = relations(attempts, ({ one }) => ({
  user: one(users, {
    fields: [attempts.userId],
    references: [users.id],
  }),
  problem: one(problems, {
    fields: [attempts.problemId],
    references: [problems.id],
  }),
}))

export const dailyLimitsRelations = relations(dailyLimits, ({ one }) => ({
  user: one(users, {
    fields: [dailyLimits.userId],
    references: [users.id],
  }),
}))
