CREATE TYPE "public"."category" AS ENUM('DYNAMIC_PROGRAMMING', 'GRAPH');--> statement-breakpoint
CREATE TYPE "public"."difficulty" AS ENUM('EASY', 'MEDIUM', 'HARD');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('MALE', 'FEMALE');--> statement-breakpoint
CREATE TABLE "Attempt" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"problemId" text NOT NULL,
	"wpm" real NOT NULL,
	"accuracy" real NOT NULL,
	"timeSpent" integer NOT NULL,
	"isCompleted" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "DailyLimit" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"date" date NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Problem" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"solutionRecursion" text NOT NULL,
	"solutionMemoization" text NOT NULL,
	"solutionTabulation" text NOT NULL,
	"solutionSpaceOptimized" text NOT NULL,
	"constraints" text[] NOT NULL,
	"leetcodeUrl" text NOT NULL,
	"category" "category" NOT NULL,
	"difficulty" "difficulty" NOT NULL,
	"tags" text[] NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"gender" "gender" NOT NULL,
	"college" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "User_username_unique" UNIQUE("username"),
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_problemId_Problem_id_fk" FOREIGN KEY ("problemId") REFERENCES "public"."Problem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DailyLimit" ADD CONSTRAINT "DailyLimit_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "Attempt_userId_createdAt_idx" ON "Attempt" USING btree ("userId","createdAt");--> statement-breakpoint
CREATE INDEX "Attempt_problemId_idx" ON "Attempt" USING btree ("problemId");--> statement-breakpoint
CREATE INDEX "DailyLimit_userId_date_idx" ON "DailyLimit" USING btree ("userId","date");--> statement-breakpoint
CREATE UNIQUE INDEX "DailyLimit_userId_date_key" ON "DailyLimit" USING btree ("userId","date");