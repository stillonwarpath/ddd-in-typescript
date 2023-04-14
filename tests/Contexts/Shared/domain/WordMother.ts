import { MotherCreator } from './MotherCreator';

export class WordMother {
	static random({ minLength = 0, maxLength }: { minLength?: number; maxLength: number }): string {
		
		let word = MotherCreator.random().lorem.word(
			Math.floor(Math.random() * (maxLength - minLength)) + minLength
		);

		word = 'pepe';

		return word;
	}
}
