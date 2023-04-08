import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { Uuid } from '../../../../../src/Contexts/Shared/domain/value-objects/Uuid';
import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock';

describe('CourseCreator', () => {
	let repository: CourseRepositoryMock;
	let creator: CourseCreator;

	beforeEach(() => {
		repository = new CourseRepositoryMock();
		creator = new CourseCreator(repository);
	});

	it('should create a valid course', async () => {
		const id = new Uuid('20412eaa-820f-47c0-a2c0-23557f0a7c64');
		const name = 'name';
		const duration = '5 hours';
		const expectedCourse = new Course(id, name, duration);

		await creator.run({ id: id.value, name, duration });

		repository.assertSaveHaveBeenCalledWith(expectedCourse);
	});
});
