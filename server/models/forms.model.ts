import db from '../database/index'
import FormsTypes from '../types/forms.types'

class FormsModal {
	//create forms
	async create(u: FormsTypes): Promise<FormsTypes> {
		try {
			//open connect with DB1
			const connect = await db.connect()
			const sql =
				'INSERT INTO forms ( name, phone, request, calls ) values ($1, $2, $3, $4) returning *'
			//run query
			const result = await connect.query(sql, [
				u.name,
				u.phone,
				u.request,
				u.calls,
			])
			//release connect
			connect.release()
			//return created forms
			return result.rows[0]
		} catch (err: any) {
			// throw new Error(`email already exists! `)
			throw new Error(`${err} `)
		}
	}
	//get all forms
	async getAll(): Promise<FormsTypes[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from forms'
			//run query
			const result = await connect.query(sql)
			//release connect
			connect.release()
			//return created forms
			return result.rows
		} catch (err) {
			throw new Error(`${err}`)
		}
	}
	//get specific forms
	async getOne(id: string): Promise<FormsTypes> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from forms WHERE id=($1)'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created forms
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find forms ${id}, ${err}`)
		}
	}
	//get specific forms by name
	async getOneFromName(name: string): Promise<FormsTypes> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from forms WHERE name=($1)'
			//run query
			const result = await connect.query(sql, [name])
			//release connect
			connect.release()
			//return created developerName
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find forms ${name}, ${err}`)
		}
	}
	//get specific forms by phone
	async getOneFromPhone(phone: string): Promise<FormsTypes> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from forms WHERE phone=($1)'
			//run query
			const result = await connect.query(sql, [phone])
			//release connect
			connect.release()
			//return created developerName
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find forms ${phone}, ${err}`)
		}
	}
	//update forms
	async update(u: FormsTypes): Promise<FormsTypes> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE forms SET name=$1, phone=$2, request=$3, calls=$4 WHERE id=$5 RETURNING *`
			//run query
			const result = await connect.query(sql, [
				u.name,
				u.phone,
				u.request,
				u.calls,
				u.id,
			])
			//release connect
			connect.release()
			//return created forms
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  forms ${u.name}, ${err}`)
		}
	}
	//delete forms
	async delete(id: string): Promise<FormsTypes> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'DELETE from forms  WHERE id=($1) RETURNING *'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created forms
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not delete  forms ${id}, ${err}`)
		}
	}
}
export default FormsModal
