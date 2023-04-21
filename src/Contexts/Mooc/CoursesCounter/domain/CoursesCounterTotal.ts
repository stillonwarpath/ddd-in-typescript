import { NumberValueObject } from "../../../Shared/domain/value-objects/IntValueObject";

export class CoursesCounterTotal extends NumberValueObject {
	increment(): CoursesCounterTotal {
		return new CoursesCounterTotal(this.value + 1);
	}

	static initialize(): CoursesCounterTotal {
		return new CoursesCounterTotal(0);
	}
}
