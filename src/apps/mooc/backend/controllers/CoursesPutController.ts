import { Request, Response } from 'express';

import { Controller } from './Controller';

export class CoursesPutController implements Controller {
	async run(req: Request, res: Response): Promise<void> {
		throw new Error('method not implemented.');
	}
}
