import { Collection, MongoClient } from 'mongodb';

import { CourseId } from '../../../Shared/domain/Courses/CourseId';
import { Course } from '../../domain/Course';
import { CourseRepository } from '../../domain/CourseRepository';

export interface CourseDocument {
	_id: string;
	name: string;
	duration: string;
}

export class MongoCourseRepository implements CourseRepository {
	constructor(private readonly _client: Promise<MongoClient>) {}

	public async save(course: Course): Promise<void> {
		return this.persist(course.id.value, course);
	}

	public async search(id: CourseId): Promise<Nullable<Course>> {
		const collection = await this.collection();
		const document = await collection.findOne<CourseDocument>({ _id: id.value });

		return document
			? Course.fromPrimitives({ name: document.name, duration: document.duration, id: id.value })
			: null;
	}

	private async persist(id: string, aggregateRoot: Course): Promise<void> {
		const collection = await this.collection();

		const document = { ...aggregateRoot.toPrimitives(), _id: id, id: undefined };

		await collection.updateOne({ _id: id }, { $set: document }, { upsert: true });
	}

	private async collection(): Promise<Collection> {
		return (await this._client).db().collection(this.collectionName());
	}

	protected collectionName(): string {
		return 'courses';
	}
}
