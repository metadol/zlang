import { getCourses } from "@/db/queries";
import { List } from "./_components/list";

const CoursesPage = async () => {
  const courses = await getCourses();

  return (
    <div className="h-full max-h-[912px] px-[30px] bg-white mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">
        Courses for English Speakers
      </h1>

      <List courses={courses} activeCourseId={1} />
    </div>
  );
};
export default CoursesPage;
