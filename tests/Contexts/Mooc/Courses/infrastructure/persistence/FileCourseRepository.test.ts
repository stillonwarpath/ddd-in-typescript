import { Course } from '../../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { FileCourseRepository } from '../../../../../../src/Contexts/Mooc/Courses/infrastructure/persistence/FileCourseRepository';
import { Uuid } from '../../../../../../src/Contexts/Shared/domain/value-objects/Uuid';

describe('FileCourseRepository', () => {
	it('should save a course', async () => {
		const expectedCourse = new Course(
			new Uuid('20412eaa-820f-47c0-a2c0-23557f0a7c64'),
			'name',
			'duration'
		);
		const repository = new FileCourseRepository();

		await repository.save(expectedCourse);

		const course = await repository.search('20412eaa-820f-47c0-a2c0-23557f0a7c64');
		expect(course).toEqual(expectedCourse);
	});
});
