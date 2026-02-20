import db from '../database/index'
import Offers from '../types/offer.types'

class OffersModel {
	//create offer
	async create(u: Offers): Promise<Offers> {
		try {
			//open connect with DB1
			const connect = await db.connect()
			const sql =
				'INSERT INTO offers ( photos, title, sale_status, price, developer_id, type, areas, bed, bath, delivery_date, finished, location, down_payment, installment, description, active, category ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) returning *'
			//run query
			const result = await connect.query(sql, [
				u.photos,
				u.title,
				u.sale_status,
				u.price,
				u.developer_id,
				u.type,
				u.areas,
				u.bed,
				u.bath,
				u.delivery_date,
				u.finished,
				u.location,
				u.down_payment,
				u.installment,
				u.description,
				u.active,
				u.category,
			])
			//release connect
			connect.release()
			//return created offer
			return result.rows[0]
		} catch (err: any) {
			throw new Error(`${err} `)
		}
	}
	//get all Offers
	async getAll(): Promise<Offers[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from offers'
			//run query
			const result = await connect.query(sql)
			//release connect
			connect.release()
			//return created offer
			return result.rows
		} catch (err) {
			throw new Error(`${err}`)
		}
	}
	//get specific offer
	async getOne(id: string): Promise<Offers> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from offers WHERE id=($1)'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created offer
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find offer ${id}, ${err}`)
		}
	}
	//get specific offer by title
	async getOneFromTitle(title: string): Promise<Offers[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from offers WHERE title=($1)'
			//run query
			const result = await connect.query(sql, [title])
			//release connect
			connect.release()
			//return get offer title
			return result.rows
		} catch (err) {
			throw new Error(`.could not find offer ${title}, ${err}`)
		}
	}
	//get specific offer by description
	async getOneFromDescription(description: string): Promise<Offers[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from offers WHERE description=($1)'
			//run query
			const result = await connect.query(sql, [description])
			//release connect
			connect.release()
			//return get offer title
			return result.rows
		} catch (err) {
			throw new Error(`.could not find offer ${description}, ${err}`)
		}
	}
	//update offer
	async update(u: Offers): Promise<Offers> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE Offers SET photos=$1, title=$2, sale_status=$3, price=$4, developer_id=$5, type=$6, areas=$7, bed=$8, bath=$9, delivery_date=$10, finished=$11, location=$12, down_payment=$13, installment=$14, description=$15, active=$16, category=$17 WHERE id=$18 RETURNING *`
			//run query
			const result = await connect.query(sql, [
				u.photos,
				u.title,
				u.sale_status,
				u.price,
				u.developer_id,
				u.type,
				u.areas,
				u.bed,
				u.bath,
				u.delivery_date,
				u.finished,
				u.location,
				u.down_payment,
				u.installment,
				u.description,
				u.active,
				u.category,
				u.id,
			])
			//release connect
			connect.release()
			//return created offer
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  offer ${u.id}, ${err}`)
		}
	}
	//delete offer
	async delete(id: string): Promise<Offers> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'DELETE from Offers  WHERE id=($1) RETURNING *'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created offer
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not delete  offer ${id}, ${err}`)
		}
	}
}
export default OffersModel
