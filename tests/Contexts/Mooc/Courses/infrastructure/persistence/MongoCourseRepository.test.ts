import container from '../../../../../../src/apps/mooc/backend/dependency-injection';
import { CourseRepository } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseRepository';
import { EnvironmentArranger } from '../../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { MongoEnvironmentArranger } from '../../../../Shared/infrastructure/mongo/MongoEnvironmentArranger';
import { CourseMother } from '../../domain/CourseMother';

const repository: CourseRepository = container.get('Mooc.Courses.domain.CourseRepository');
const environmentArranger: EnvironmentArranger = new MongoEnvironmentArranger(
	container.get('Mooc.ConnectionManager')
);

beforeEach(async () => {
	await environmentArranger.arrange();
});

afterAll(async () => {
	await environmentArranger.arrange();
	await environmentArranger.close();
});

describe('CourseRepository', () => {
	describe('#save', () => {
		it('should save a course', async () => {
			const course = CourseMother.random();

			await repository.save(course);
		});
	});
});
