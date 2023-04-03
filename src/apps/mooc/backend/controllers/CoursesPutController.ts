import { Request, Response } from 'express';

import { Controller } from './Controller';
import { CourseCreator } from '../../../../Contexts/Mooc/Courses/application/CourseCreator';
import httpStatus from 'http-status';

export class CoursesPutController implements Controller {

	constructor(private courseCreator: CourseCreator) {}

	async run(req: Request, res: Response): Promise<void> {
		const { id, name, duration } = req.body;
		
		await this.courseCreator.run(id, name, duration);

		res.status(httpStatus.CREATED).send();
	}
}
