 const signinHandler = (req, res, db, bcrypt) => {

	const {email , password} = req.body;

	if(!email || !password){

		return res.status(400).json(`can't register, one or more fields blank`)
	}

	db('login').select('email', 'hash')
	.where('email', '=', email)
	.then(data => {

		const isValid = bcrypt.compareSync(password, data[0].hash)
		if(isValid){
		db('users').select('*').where('email', '=', email)
			.then(user => {
				return res.json(user[0])
			})
		}else{

			return res.status(400).json('wrong credentials')
		}
	})
	.catch(err => res.json("error getting user"))

}

module.exports = {

	signinHandler
}