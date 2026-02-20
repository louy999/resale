import {Router} from 'express'
import usersRoutes from './api/users.routes'
import developerRoutes from './api/developer.routes'
import offersRoutes from './api/offers.routes'

const routes = Router()
routes.use('/users', usersRoutes)
routes.use('/dev', developerRoutes)
routes.use('/offers', offersRoutes)

export default routes
