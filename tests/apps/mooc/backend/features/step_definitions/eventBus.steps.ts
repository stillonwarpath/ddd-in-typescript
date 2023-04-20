import { Given } from 'cucumber';

import container from '../../../../../../src/apps/mooc/backend/dependency-injection';
import { EventBus } from '../../../../../../src/Contexts/Shared/domain/EventBus';
}
const eventBus = container.get('Mooc.Shared.domain.EventBus') as EventBus;
const deserializer = buildDeserializer();

Given('I send an event to the event bus:', async (event: any) => {
	const domainEvent = deserializer.deserialize(event);

	await eventBus.publish([domainEvent]);
	await wait(100);
});

function buildDeserializer() {
	const subscribers = DomainEventSubscribers.from(container);

	return domainEventDeserializer.configure(subscribers);
}

async function wait(milliseconds: number) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}