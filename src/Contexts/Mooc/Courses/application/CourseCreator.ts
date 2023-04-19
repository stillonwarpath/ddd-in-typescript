import { EventBus } from '../../../Shared/domain/EventBus';
import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { Course } from '../domain/Course';
import { CourseDuration } from '../domain/CourseDuration';
import { CourseName } from '../domain/CourseName';
import { CourseRepository } from '../domain/CourseRepository';
import { CourseCreatorRequest } from './CourseCreatorRequest';

export class CourseCreator {
	constructor(private readonly repository: CourseRepository, private readonly eventBus: EventBus) {}

	async run(request: CourseCreatorRequest) {
		const course = Course.create(
			new CourseId(request.id),
			new CourseName(request.name),
			new CourseDuration(request.duration)
		);
		await this.repository.save(course);
		await this.eventBus.publish(course.pullDomainEvents());
	}
}
