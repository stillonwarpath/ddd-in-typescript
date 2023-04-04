import { Course } from "../../../../../../src/Contexts/Mooc/Courses/domain/Course";

describe('FileCourseRepository', () => {
    it('should save a course', async () => {
        const expectedCourse = new Course('id', 'name', 'duration');
        const repository = new FileCourseRepository();

        await repository.save(course);

        const course = await repository.search('id');
        expect(course).toEqual(expectedCourse);
    });
});