import { Lesson } from "./Lesson";
import { useGetLessonsQuery } from '../graphql/generated';

export function Sidebar() {
    const { data } = useGetLessonsQuery();

    return (
        <aside className="bg-gray-700 w-full lg:w-[340px] min-h-screen p-6 lg:border-l border-gray-600">
            <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
                Cronograma de aulas
            </span>

            <div className="flex flex-col gap-8">
                {data?.lessons.map(lesson => {
                    return (
                        <Lesson
                            key={lesson.id}
                            title={lesson.title}
                            availableAt={new Date(lesson.availableAt)}
                            slug={lesson.slug}
                            type={lesson.lessonType}
                        />
                    )
                })}
            </div>
        </aside>
    )
}