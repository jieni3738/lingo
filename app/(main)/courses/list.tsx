"use client"
import { toast } from "sonner"
import { courses, userProgress } from "@/db/schema";
import { Card } from "./card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";

type Props = {
  courses: typeof courses.$inferSelect[];
  // only the type of activeCourseId is extracted, which is: number | null
  // $inferSelect means: Automatically infer the TypeScript type of a row selected from a database table.
  activeCourseId: typeof userProgress.$inferSelect.activeCourseId;
}

export const List = ({ courses, activeCourseId}: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {

    // Prevent duplicate clicks while the request is pending
    if(pending) return;

    // If the selected course is already active, navigate directly to the learn page
    if(id === activeCourseId) {
      return router.push("/learn");
    }
    // The server action checks for existing user progress,
    // updates it or creates a new record, revalidates the pages,
    // and then redirects the user to the learn page.
    startTransition(() => {
      upsertUserProgress(id)
      .catch(() => toast.error("Something went wrong."))
    });
  }

  return(
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card 
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  )
}