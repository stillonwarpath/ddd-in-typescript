import { Uuid } from "../../../Shared/domain/value-objects/Uuid";

export class Course {
	readonly id: Uuid;
	readonly name: string;
	readonly duration: string;

	constructor(id: Uuid, name: string, duration: string) {
		this.id = id;
		this.name = name;
		this.duration = duration;
	}
}
