const Clariai = require("clarifai")

const app = new Clarifai.App({apiKey: 'b8b170041b36452bb6e97b9206e17f06'});

const imageApiHandler = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		console.log(data)
		res.json(data)
})
	.catch(err => res.status(400).json("could'nt get image boundaries"))

}

const imageHandler = (req, res, db) => {

	const { id } = req.body;

	db('users')
	  .where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries =>{
	  	res.json(entries[0])
	  })
	  .catch(err => res.json("unable to retreive entries"))
}

module.exports = {

	imageHandler,
	imageApiHandler
}