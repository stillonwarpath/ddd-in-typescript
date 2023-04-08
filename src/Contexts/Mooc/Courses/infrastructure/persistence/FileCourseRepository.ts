import { deserialize, serialize } from 'bson';
import fs from 'fs';

import { Uuid } from '../../../../Shared/domain/value-objects/Uuid';
import { Course } from '../../domain/Course';
import { CourseRepository } from '../../domain/CourseRepository';

export class FileCourseRepository implements CourseRepository {
	private readonly FILE_PATH = `${__dirname}/courses`;

	async save(course: Course): Promise<void> {
		await fs.promises.writeFile(
			this.filePath(course.id.value),
			serialize({ id: course.id.value, name: course.name, duration: course.duration })
		);
	}

	async search(courseId: string): Promise<Course> {
		const courseData = await fs.promises.readFile(this.filePath(courseId));
		const { id, name, duration } = deserialize(courseData);

		return new Course(new Uuid(id), name, duration);
	}

	private filePath(id: string): string {
		return `${this.FILE_PATH}.${id}.repo`;
	}
}
