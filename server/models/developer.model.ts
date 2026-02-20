import db from '../database/index'
import Developers from '../types/developers.types'

class DeveloperModal {
	//create developer
	async create(u: Developers): Promise<Developers> {
		try {
			//open connect with DB1
			const connect = await db.connect()
			const checkName = await connect.query(
				'SELECT * FROM developers WHERE name=($1)',
				[u.name]
			)
			if (checkName.rows.length) {
				throw new Error(`developer already exists! `)
			}
			const sql =
				'INSERT INTO developers ( name, photo, location, active, description ) values ($1, $2, $3, $4, $5) returning *'
			//run query
			const result = await connect.query(sql, [
				u.name,
				u.photo,
				u.location,
				u.active === '' ? true : u.active,
				u.description,
			])
			//release connect
			connect.release()
			//return created developer
			return result.rows[0]
		} catch (err: any) {
			// throw new Error(`email already exists! `)
			throw new Error(`${err} `)
		}
	}
	//get all developers
	async getAll(): Promise<Developers[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from developers'
			//run query
			const result = await connect.query(sql)
			//release connect
			connect.release()
			//return created developer
			return result.rows
		} catch (err) {
			throw new Error(`${err}`)
		}
	}
	//get specific developer
	async getOne(id: string): Promise<Developers> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from developers WHERE id=($1)'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created developer
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find developer ${id}, ${err}`)
		}
	}
	//get specific developer by name
	async getOneFromName(name: string): Promise<Developers> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from developers WHERE name=($1)'
			//run query
			const result = await connect.query(sql, [name])
			//release connect
			connect.release()
			//return created developerName
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find developer ${name}, ${err}`)
		}
	}
	//update developer
	async update(u: Developers): Promise<Developers> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE developers SET name=$1, photo=$2, location=$3, active=$4, description=$5 WHERE id=$6 RETURNING *`
			//run query
			const result = await connect.query(sql, [
				u.name,
				u.photo,
				u.location,
				u.active,
				u.description,
				u.id,
			])
			//release connect
			connect.release()
			//return created developer
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  developer ${u.name}, ${err}`)
		}
	}
	//delete developer
	async delete(id: string): Promise<Developers> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'DELETE from developers  WHERE id=($1) RETURNING *'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created developer
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not delete  developer ${id}, ${err}`)
		}
	}
}
export default DeveloperModal
