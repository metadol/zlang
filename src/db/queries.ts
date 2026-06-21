import { cache } from "react"
import db from "./drizzle"
import { challengeProgress, courses, units, userProgress } from "./schema"
import { auth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"

export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany()
    return data
})

export const getUserProgress = cache(async () => {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        },
    });

    return data;
});

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
        // with: {
        //     units: {
        //         orderBy: (units, { asc }) => [asc(units.order)],
        //         with: {
        //             lessons: {
        //                 orderBy: (lessons, { asc }) => [asc(lessons.order)],
        //             },
        //         },
        //     },
        // },
    });

    return data;
});

export const getUnits = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  // Gets the user's active course.
  if (!userId || !userProgress?.activeCourseId) {
    return [];
  }

  // Fetches all units, lessons, challenges, and challenge progress for that course.
  const data = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
            with: {
              challengeProgress: {
                where: eq(
                  challengeProgress.userId,
                  userId,
                ),
              },
            },
          },
        },
      },
    },
  });

  // Calculates whether each lesson is completed.
  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      if (
        lesson.challenges.length === 0
      ) {
        return { ...lesson, completed: false };
      }

      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return challenge.challengeProgress
          && challenge.challengeProgress.length > 0
          && challenge.challengeProgress.every((progress) => progress.completed);
      });

      return { ...lesson, completed: allCompletedChallenges };
    });

    return { ...unit, lessons: lessonsWithCompletedStatus };
  });

  return normalizedData;
  
});