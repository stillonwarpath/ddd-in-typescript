import { DomainEvent } from '../../../domain/DomainEvent';
import { EventBus } from '../../../domain/EventBus';

export class RabbitMqEventBus implements EventBus {
	private failoverPublisher: DomainEventFailoverPublisher;
	private readonly connection: RabbitMqConnection;
	private exchange: string;

	constructor(params: {
		failoverPublisher: DomainEventFailoverPublisher; 
		connection: RabbitMqConnection 
		exchange: string;
	}) {
		const { failoverPublisher, connection, exchange  } = params;
		this.failoverPublisher = failoverPublisher;
		this.connection = connection;
		this.exchange = exchange;
	}

	async publish(events: Array<DomainEvent>): Promise<void> {
		for (const event of events) {

			try {

				const routingKey = event.eventName;
				const content = this.serialize(event);
				const options = this.options(event);
				const exchange = this.exchange;

				await this.connection.publish({ routingKey, content, options, exchange });

			} catch (error: any) {
				await this.failoverPublisher.publish(event);
			}
		}
	}

	private options(event: DomainEvent) {
		return {
			messageId: event.eventId,
			contentType: 'application/json',
			contentEncoding: 'utf-8'
		};
	}

	private serialize(event: DomainEvent): Buffer {
		const eventPrimitives = {
			data: {
				id: event.eventId,
				type: event.eventName,
				occurred_on: event.occurredOn.toISOString(),
				attributes: event.toPrimitives()
			}
		};

		return Buffer.from(JSON.stringify(eventPrimitives));
	}
}
