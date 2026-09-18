import { cache } from "react";
import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { 
  challengeProgress,
  courses, 
  units, 
  userProgress 
} from "@/db/schema";

export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if(!userId) {
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where :eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  return data;
});

// Course
//   └── Units
//         └── Lessons
//                └── Challenges
//                        └── Challenge Progress
export const getUnits = cache(async () => {

  // Curly braces {} are used for object destructuring.
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  // ?. is a Optional chaining:
  // If userProgress exists, access activeCourseId.
  // Otherwise, return undefined to avoid an error.
  if(!userId || !userProgress?.activeCourseId) {
    return [];
  }

    // Find all units for the user's active course.
    // Include the lessons for each unit.
    // Include the challenges for each lesson.
    // Include the progress associated with each challenge.
  const data = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId,
                  userId,
                ),
              },
            },
          },
        },
      },
    },
  });

  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return challenge.challengeProgress
        && challenge.challengeProgress.length > 0
        && challenge.challengeProgress.every((progress) => progress.completed);
      });

      return { ...lesson, completed: allCompletedChallenges };
    });

    return {...unit, lessons: lessonsWithCompletedStatus }
  });

  return normalizedData;
});

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();

  return data;
});

export const getCourseById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  });

  return data;
})

