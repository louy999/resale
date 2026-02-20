import db from '../database/index'
import User from '../types/user.types'
import bcrypt from 'bcrypt'
import config from '../config'

const hashPassword = (password: string) => {
	const salt = parseInt(config.salt as unknown as string, 10)
	return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}

class UserModel {
	//create user
	async create(u: User): Promise<User> {
		try {
			//open connect with DB1
			const connect = await db.connect()
			const checkPhone = await connect.query(
				'SELECT * FROM users WHERE phone=($1)',
				[u.phone]
			)
			if (checkPhone.rows.length) {
				throw new Error(`user already exists! `)
			}
			const sql =
				'INSERT INTO users ( name, phone, email, password, access, photo ) values ($1, $2, $3, $4, $5, $6) returning *'
			//run query
			const result = await connect.query(sql, [
				u.name,
				u.phone,
				u.email,
				hashPassword(u.password),
				u.access === '' ? 'user' : u.access,
				u.photo === '' ? 'image-1687075732968.png' : u.photo,
			])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err: any) {
			// throw new Error(`email already exists! `)
			throw new Error(`${err} `)
		}
	}
	//get all users
	async getAll(): Promise<User[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from users'
			//run query
			const result = await connect.query(sql)
			//release connect
			connect.release()
			//return created user
			return result.rows
		} catch (err) {
			throw new Error(`${err}`)
		}
	}
	//get specific user
	async getOne(id: string): Promise<User> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from users WHERE id=($1)'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find user ${id}, ${err}`)
		}
	}
	//get specific user by email
	async getOneFromEmail(email: string): Promise<User> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from users WHERE email=($1)'
			//run query
			const result = await connect.query(sql, [email])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find user ${email}, ${err}`)
		}
	}
	//get specific user by phone
	async getOneFromPhone(phone: string): Promise<User> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from users WHERE phone=($1)'
			//run query
			const result = await connect.query(sql, [phone])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find user ${phone}, ${err}`)
		}
	}
	//update user
	async update(u: User): Promise<User> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE users SET name=$1, phone=$2, email=$3, password=$4, access=$5, photo=$6 WHERE id=$7 RETURNING *`
			//run query
			const result = await connect.query(sql, [
				u.name,
				u.phone,
				u.email,
				u.password,
				u.access,
				u.photo,
				u.id,
			])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  user ${u.email}, ${err}`)
		}
	}
	//delete user
	async delete(id: string): Promise<User> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'DELETE from users  WHERE id=($1) RETURNING *'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not delete  user ${id}, ${err}`)
		}
	}
	//authenticate user
	async auth(phone: string, password: string): Promise<User | null> {
		try {
			const connect = await db.connect()
			const sql = `SELECT password FROM users WHERE phone=$1`
			const res = await connect.query(sql, [phone])
			if (res.rows.length) {
				const {password: hashPassword} = res.rows[0]
				const isPassValid = bcrypt.compareSync(
					`${password}${config.pepper}`,
					hashPassword
				)
				if (isPassValid) {
					const userInfo = await connect.query(
						`SELECT * FROM users WHERE phone=($1)`,
						[phone]
					)
					return userInfo.rows[0]
				}
			}
			connect.release()
			return null
		} catch (err) {
			throw new Error(`${err}`)
		}
	}
}
export default UserModel
