import {Router, Request, Response} from 'express'
import OffersModel from '../../models/offer.model'
const offersModel = new OffersModel()

const routes = Router()
// create offer
routes.post('/', async (req: Request, res: Response, next) => {
	try {
		const offer = await offersModel.create(req.body)
		res.json({
			status: 'success',
			data: {...offer},
			message: 'offer created successfully',
		})
	} catch (err) {
		next(err)
	}
})
//get all offers
routes.get('/', async (req: Request, res: Response, next) => {
	try {
		const offer = await offersModel.getAll()
		res.json({
			status: 'success',
			data: offer,
			message: 'offers retrieved successfully',
		})
	} catch (err: any) {
		next(err.message)
	}
})
// get specific offer
routes.get('/:id', async (req: Request, res: Response, next) => {
	try {
		const offer = await offersModel.getOne(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: offer,
			message: 'offer retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
// get specific offer by title
routes.get('/title/:title', async (req: Request, res: Response, next) => {
	try {
		const offer = await offersModel.getOneFromTitle(
			req.params.title as unknown as string
		)
		res.json({
			status: 'success',
			data: offer,
			message: 'offer retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
// get specific offer by description
routes.get('/des/:des', async (req: Request, res: Response, next) => {
	try {
		const offer = await offersModel.getOneFromDescription(
			req.params.des as unknown as string
		)
		res.json({
			status: 'success',
			data: offer,
			message: 'offer retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
// update offer
routes.patch('/:id', async (req: Request, res: Response, next) => {
	try {
		const offer = await offersModel.update(req.body)
		res.json({
			status: 'success',
			data: offer,
			message: 'offer updated successfully',
		})
	} catch (err) {
		next(err)
	}
})
// delete offer
routes.delete('/:id', async (req: Request, res: Response, next) => {
	try {
		const offer = await offersModel.delete(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: offer,
			message: 'offer deleted successfully',
		})
	} catch (err) {
		next(err)
	}
})

export default routes
