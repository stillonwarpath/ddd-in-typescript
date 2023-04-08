import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseDuration } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';
import { CourseName } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { CourseNameLengthExceeded } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseNameLengthExceeded';
import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';
import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock';

describe('CourseCreator', () => {
	let repository: CourseRepositoryMock;
	let creator: CourseCreator;

	beforeEach(() => {
		repository = new CourseRepositoryMock();
		creator = new CourseCreator(repository);
	});

	it('should create a valid course', async () => {
		const id = new CourseId('20412eaa-820f-47c0-a2c0-23557f0a7c64');
		const name = new CourseName('name');
		const duration = new CourseDuration('5 hours');
		const expectedCourse = new Course({
			id,
			name,
			duration
		});

		await creator.run({ id: id.value, name: name.value, duration: duration.value });

		repository.assertSaveHaveBeenCalledWith(expectedCourse);
	});

	it('should throw error if course name length is exceeded', async () => {
		const id = '20412eaa-820f-47c0-a2c0-23557f0a7c64';
		const name = 'some-name'.repeat(30);
		const duration = 'some-duration';

		expect(() => {
			const course = new Course({
				id: new CourseId(id),
				name: new CourseName(name),
				duration: new CourseDuration(duration)
			});

			creator.run({ id, name, duration });

			repository.assertSaveHaveBeenCalledWith(course);
		}).toThrow(CourseNameLengthExceeded);
	});
});
