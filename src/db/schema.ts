import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";

/**
 * ==========================================================
 * LANGUAGE LEARNING APP DATABASE SCHEMA
 * ==========================================================
 *
 * Database Hierarchy:
 *
 * Course
 *   └── Units
 *         └── Lessons
 *               └── Challenges
 *                     ├── Challenge Options
 *                     └── Challenge Progress
 *
 * User Progress
 *   └── Active Course
 *
 * Example:
 *
 * Spanish Course
 *   ├── Unit 1: Basics
 *   │     ├── Lesson 1
 *   │     │     ├── Challenge 1
 *   │     │     ├── Challenge 2
 *   │     │     └── Challenge 3
 *   │     └── Lesson 2
 *   │
 *   └── Unit 2: Grammar
 *
 *
 * RELATIONSHIP RULE:
 *
 * If a table contains a foreign key:
 *
 *   unit.courseId
 *
 * Then:
 *
 *   Unit   -> one Course
 *   Course -> many Units
 *
 * Foreign Key Side = one()
 * Parent Side      = many()
 *
 *
 * CASCADE DELETE:
 *
 * If a Course is deleted:
 *   -> Units are deleted
 *   -> Lessons are deleted
 *   -> Challenges are deleted
 *   -> Challenge Options are deleted
 *
 * This prevents orphaned records.
 *
 * ==========================================================
 */

/**
 * ==================================================
 * COURSES
 * ==================================================
 * Top-level entity.
 * Example:
 *  - Spanish
 *  - French
 *  - German
 */
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(),
});

/**
 * One Course -> Many Units
 * One Course -> Many User Progress records
 */
export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units),
}));

/**
 * ==================================================
 * UNITS
 * ==================================================
 * A course contains multiple units.
 *
 * Example:
 * Spanish Course
 *  ├── Unit 1: Basics
 *  ├── Unit 2: Grammar
 *  └── Unit 3: Conversations
 */
export const units = pgTable("units", {
  id: serial("id").primaryKey(),

  // Display title of the unit
  title: text("title").notNull(),

  // Description shown to the user
  description: text("description").notNull(),

  /**
   * Foreign Key
   *
   * This tells us which course this unit belongs to.
   *
   * Example:
   * Unit 1 -> Course 1
   */
  courseId: integer("course_id")
    .references(() => courses.id, { onDelete: "cascade" })
    .notNull(),
  /*
    { onDelete: "cascade" } tells the database:
    "If the parent record is deleted, automatically delete all related child records."
  */

  // Controls ordering inside a course
  order: integer("order").notNull(),
});

/**
 * Unit -> One Course
 * Unit -> Many Lessons
 */
export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),

  lessons: many(lessons),
}));

/**
 * ==================================================
 * LESSONS
 * ==================================================
 * Each Unit contains multiple lessons.
 *
 * Example:
 * Unit 1
 *  ├── Lesson 1
 *  ├── Lesson 2
 *  └── Lesson 3
 */
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),

  title: text("title").notNull(),

  /**
   * Foreign Key
   *
   * Which unit does this lesson belong to?
   */
  unitId: integer("unit_id")
    .references(() => units.id, { onDelete: "cascade" })
    .notNull(),

  order: integer("order").notNull(),
});

/**
 * Lesson -> One Unit
 * Lesson -> Many Challenges
 */
export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),

  challenges: many(challenges),
}));

/**
 * Challenge Types
 *
 * SELECT = multiple choice
 * ASSIST = assisted answer
 */
export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST"]);

/**
 * ==================================================
 * CHALLENGES
 * ==================================================
 * A lesson contains multiple challenges/questions.
 *
 * Example:
 * Lesson 1
 *  ├── Question 1
 *  ├── Question 2
 *  └── Question 3
 */
export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),

  /**
   * Foreign Key
   *
   * Which lesson does this challenge belong to?
   */
  lessonId: integer("lesson_id")
    .references(() => lessons.id, { onDelete: "cascade" })
    .notNull(),

  type: challengesEnum("type").notNull(),

  question: text("question").notNull(),

  order: integer("order").notNull(),
});

/**
 * Challenge -> One Lesson
 * Challenge -> Many Options
 * Challenge -> Many Progress Records
 */
export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),

  challengeOptions: many(challengeOptions),

  challengeProgress: many(challengeProgress),
}));

/**
 * ==================================================
 * CHALLENGE OPTIONS
 * ==================================================
 * Multiple choice answers for a challenge.
 *
 * Example:
 * Question:
 * "What is Hola?"
 *
 * Option A
 * Option B
 * Option C
 * Option D
 */
export const challengeOptions = pgTable("challenge_options", {
  id: serial("id").primaryKey(),

  /**
   * Foreign Key
   *
   * Which challenge does this option belong to?
   */
  challengeId: integer("challenge_id")
    .references(() => challenges.id, { onDelete: "cascade" })
    .notNull(),

  text: text("text").notNull(),

  // Whether this answer is correct
  correct: boolean("correct").notNull(),

  imageSrc: text("image_src"),

  audioSrc: text("audio_src"),
});

/**
 * Option -> One Challenge
 */
export const challengeOptionsRelations = relations(
  challengeOptions,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeOptions.challengeId],
      references: [challenges.id],
    }),
  })
);

/**
 * ==================================================
 * CHALLENGE PROGRESS
 * ==================================================
 * Tracks completion status of a challenge.
 *
 * Example:
 * Kevin completed Challenge 1
 * Kevin completed Challenge 2
 * John completed Challenge 1
 */
export const challengeProgress = pgTable("challenge_progress", {
  id: serial("id").primaryKey(),

  // Clerk/Auth user id
  userId: text("user_id").notNull(),

  /**
   * Foreign Key
   *
   * Which challenge is being tracked?
   */
  challengeId: integer("challenge_id")
    .references(() => challenges.id, { onDelete: "cascade" })
    .notNull(),

  completed: boolean("completed").notNull().default(false),
});

/**
 * Progress -> One Challenge
 */
export const challengeProgressRelations = relations(
  challengeProgress,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeProgress.challengeId],
      references: [challenges.id],
    }),
  })
);

/**
 * ==================================================
 * USER PROGRESS
 * ==================================================
 * Stores overall progress for a user.
 *
 * Example:
 * - Active Course
 * - Hearts
 * - XP/Points
 */
export const userProgress = pgTable("user_progress", {
  // User ID from authentication provider
  userId: text("user_id").primaryKey(),

  userName: text("user_name")
    .notNull()
    .default("User"),

  userImageSrc: text("user_image_src")
    .notNull()
    .default("/mascot.svg"),

  /**
   * Foreign Key
   *
   * Which course is the user currently learning?
   */
  activeCourseId: integer("active_course_id")
    .references(() => courses.id, { onDelete: "cascade" }),

  // Lives system
  hearts: integer("hearts")
    .notNull()
    .default(5),

  // XP system
  points: integer("points")
    .notNull()
    .default(0),
});

/**
 * User Progress -> One Active Course
 *
 * Example:
 * Kevin -> Spanish Course
 */
export const userProgressRelations = relations(
  userProgress,
  ({ one }) => ({
    activeCourse: one(courses, {
      fields: [userProgress.activeCourseId],
      references: [courses.id],
    }),
  })
);



/**
 * ==========================================================
 * RELATIONSHIP CHEAT SHEET
 * ==========================================================
 *
 * Course
 *   ├── many Units
 *   └── many User Progress Records
 *
 * Unit
 *   ├── one Course
 *   └── many Lessons
 *
 * Lesson
 *   ├── one Unit
 *   └── many Challenges
 *
 * Challenge
 *   ├── one Lesson
 *   ├── many Challenge Options
 *   └── many Challenge Progress Records
 *
 * Challenge Option
 *   └── one Challenge
 *
 * Challenge Progress
 *   └── one Challenge
 *
 * User Progress
 *   └── one Active Course
 *
 *
 * VISUAL FLOW:
 *
 * Course
 *   ↓
 * Units
 *   ↓
 * Lessons
 *   ↓
 * Challenges
 *   ↓
 * ┌──────────────────────┐
 * │ Challenge Options    │
 * │ Challenge Progress   │
 * └──────────────────────┘
 *
 * ==========================================================
 */