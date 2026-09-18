import { StickyWrapper } from "@/components/sticky-wapper"
import { FeedWrapper } from "@/components/feed-wrapper"
import { Header } from "./header"
import { Unit } from "./unit"
import { UserProgress } from "@/components/user-progress"
import { getUnits, getUserProgress } from "@/db/queries"
import { redirect } from "next/navigation"

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();

  const [
    userProgress,
    units,
  ] = await Promise.all([
    userProgressData,
    unitsData
  ]);

  if(!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return(
    <div className="flex flex-row-reverse gap-12 px-6">
      <StickyWrapper>
        <UserProgress 
          activeCourse ={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit 
              id={unit.id}
              order={unit.id}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={undefined}
              activeLessonPercentage={0}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  )
}

export default LearnPage