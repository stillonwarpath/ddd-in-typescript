import { Uuid } from '../../../Shared/domain/value-objects/Uuid';
import { Course } from '../domain/Course';
import { CourseRepository } from '../domain/CourseRepository';
import { CourseCreatorRequest } from './CourseCreatorRequest';

export class CourseCreator {

	private readonly repository: CourseRepository;

	constructor(repository: CourseRepository) {
		this.repository = repository;
	}

	async run(request: CourseCreatorRequest) {
		const course = new Course(new Uuid(request.id), request.name, request.duration);

		return this.repository.save(course);
	}
}
