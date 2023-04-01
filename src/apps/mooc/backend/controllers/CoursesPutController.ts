import { Request, Response } from 'express';

import { Controller } from './Controller';
import httpStatus from 'http-status';

export class CoursesPutController implements Controller {
	async run(req: Request, res: Response): Promise<void> {
		res.send(httpStatus.CREATED).send();
	}
}
