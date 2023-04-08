import { StringValueObject } from '../../../Shared/domain/value-objects/StringValueObject';
import { CourseNameLengthExceeded } from './CourseNameLengthExceeded';

export class CourseName extends StringValueObject {
	constructor(value: string) {
		super(value);
        this.ensureLengthIsLessThan30Characters(value);
	}

	private ensureLengthIsLessThan30Characters(value: string): void {
		if (value.length > 30) {
			throw new CourseNameLengthExceeded(`The course name <${value} has more than 30 characters`);
		}
	}
}
