import {Router, Request, Response} from 'express'
import FormsModal from '../../models/forms.model'
const formsModel = new FormsModal()

const routes = Router()
// create forms
routes.post('/', async (req: Request, res: Response, next) => {
	try {
		const forms = await formsModel.create(req.body)
		res.json({
			status: 'success',
			data: {...forms},
			message: 'forms created successfully',
		})
	} catch (err) {
		next(err)
	}
})
//get all forms
routes.get('/', async (req: Request, res: Response, next) => {
	try {
		const forms = await formsModel.getAll()
		res.json({
			status: 'success',
			data: forms,
			message: 'forms retrieved successfully',
		})
	} catch (err: any) {
		next(err.message)
	}
})
// get specific forms
routes.get('/:id', async (req: Request, res: Response, next) => {
	try {
		const forms = await formsModel.getOne(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: forms,
			message: 'forms retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
// get specific forms by name
routes.get('/name/:name', async (req: Request, res: Response, next) => {
	try {
		const forms = await formsModel.getOneFromName(
			req.params.name as unknown as string
		)
		res.json({
			status: 'success',
			data: forms,
			message: 'forms retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
// get specific forms by phone
routes.get('/phone/:phone', async (req: Request, res: Response, next) => {
	try {
		const forms = await formsModel.getOneFromPhone(
			req.params.phone as unknown as string
		)
		res.json({
			status: 'success',
			data: forms,
			message: 'forms retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
// update forms
routes.patch('/:id', async (req: Request, res: Response, next) => {
	try {
		const forms = await formsModel.update(req.body)
		res.json({
			status: 'success',
			data: forms,
			message: 'forms updated successfully',
		})
	} catch (err) {
		next(err)
	}
})
// delete forms
routes.delete('/:id', async (req: Request, res: Response, next) => {
	try {
		const forms = await formsModel.delete(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: forms,
			message: 'forms deleted successfully',
		})
	} catch (err) {
		next(err)
	}
})

export default routes
