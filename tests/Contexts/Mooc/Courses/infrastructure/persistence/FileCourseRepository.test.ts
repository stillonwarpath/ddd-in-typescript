import { Course } from '../../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseDuration } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';
import { CourseName } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { FileCourseRepository } from '../../../../../../src/Contexts/Mooc/Courses/infrastructure/persistence/FileCourseRepository';
import { CourseId } from '../../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';

describe('FileCourseRepository', () => {
	it('should save a course', async () => {
		const expectedCourse = new Course({
			id: new CourseId('20412eaa-820f-47c0-a2c0-23557f0a7c64'),
			name: new CourseName('name'),
			duration: new CourseDuration('duration')
		});
		const repository = new FileCourseRepository();

		await repository.save(expectedCourse);

		const course = await repository.search('20412eaa-820f-47c0-a2c0-23557f0a7c64');
		expect(course).toEqual(expectedCourse);
	});
});
