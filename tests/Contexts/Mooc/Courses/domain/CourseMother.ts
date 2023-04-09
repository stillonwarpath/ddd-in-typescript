import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseDuration } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';
import { CourseName } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';

export class CourseMother {
	static fromRequest({
		id,
		name,
		duration
	}: {
		id: string;
		name: string;
		duration: string;
	}): Course {
		return new Course({
			id: new CourseId(id),
			name: new CourseName(name),
			duration: new CourseDuration(duration)
		});
	}
}
