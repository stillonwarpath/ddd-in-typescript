import { Request, Response, Router } from 'express';
import { body } from 'express-validator';

import container from '../dependency-injection';
import { validateReqSchema } from '.';

export const register = (router: Router) => {
	const reqSchema = [
		body('id').exists().isString(),
		body('name').exists().isString(),
		body('duration').exists().isString()
	];

	const controller = container.get('Apps.mooc.controllers.CoursesPutController');
	router.put('/courses/:id', reqSchema, validateReqSchema, (req: Request, res: Response) =>
		controller.run(req, res)
	);
};
