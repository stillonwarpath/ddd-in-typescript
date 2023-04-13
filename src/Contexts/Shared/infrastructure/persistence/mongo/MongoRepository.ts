import { Collection, MongoClient } from 'mongodb';
import * as MUUID from 'uuid-mongodb';

import { AggregateRoot } from '../../../domain/AggregateRoot';

export abstract class MongoRepository<T extends AggregateRoot> {
	constructor(private readonly _client: Promise<MongoClient>) {}

	protected abstract collectionName(): string;

	protected async client(): Promise<MongoClient> {
		return this._client;
	}

	protected async collection(): Promise<Collection> {
		return (await this._client).db().collection(this.collectionName());
	}

	protected async persist(id: string, aggregateRoot: T): Promise<void> {
		const collection = await this.collection();

		const mUUID = MUUID.from(id);

		const document = {
			...aggregateRoot.toPrimitives(),
			_id: mUUID,
			id: undefined
		};

		await collection.updateOne({ _id: mUUID }, { $set: document }, { upsert: true });
	}
}
