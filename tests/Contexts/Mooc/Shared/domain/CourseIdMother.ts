import { CourseId } from "../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId";

export class CourseIdMother {
	static create(value: string): CourseId {
		return new CourseIdMother(value);
	}

	static random(): CourseId {
		return this.create('20412eaa-820f-47c0-a2c0-23557f0a7c64');
	}
}
