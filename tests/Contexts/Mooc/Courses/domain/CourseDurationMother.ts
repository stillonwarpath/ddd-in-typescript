import { CourseDuration } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';

export class CourseDurationMother {
	static create(value: string): CourseDuration {
		return new CourseDuration(value);
	}

	static random(): CourseDuration {
		return this.create('some-duration');
	}
}
