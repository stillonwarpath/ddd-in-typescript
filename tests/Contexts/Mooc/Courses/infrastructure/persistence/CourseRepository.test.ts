import { CourseRepository } from "../../../../../../src/Contexts/Mooc/Courses/domain/CourseRepository";
import container from "../../../../../../src/apps/mooc/backend/dependency-injection";
import { CourseMother } from "../../domain/CourseMother";

const repository: CourseRepository = container.get('Mooc.Courses.domain.CourseRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get('Mooc.EnvironmentArranger');

beforeEach(async () => {
    await (await environmentArranger).arrange();
});

afterAll(async () => {
    await (await environmentArranger).arranger();
    await (await environmentArranger).close();
});

describe('CourseRepository', () => {
    describe('#save', () => {
        it('should save a course', async () => {
            const course = CourseMother.random();

            await repository.save(course);
        });
    });
})