import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseDuration } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';
import { CourseName } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';
import { CourseIdMother } from '../../Shared/domain/CourseIdMother';
import { CourseDurationMother } from './CourseDurationMother';
import { CourseNameMother } from './CourseNameMother';

export class CourseMother {
	static create(id: CourseId, name: CourseName, duration: CourseDuration): Course {
		return new Course({
			id,
			name,
			duration
		});
	}

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

	static random(): Course {
		return this.create(
			CourseIdMother.random(),
			CourseNameMother.random(),
			CourseDurationMother.random()
		);
	}
}
