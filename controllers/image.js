const clarifai = require('clarifai');

const app = new clarifai.App({
 apiKey: '2a03d21f720f44149e244d025e884845'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Can\'t fetch the image'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users')
		.where('id', '=', id)
  		.increment('entries', 1)
  		.returning('entries')
  		.then(entries => {
  			res.json(entries[0]);
  		})
  		.catch(err => res.status(400).json('Unable to count'))
}

module.exports = {
	handleImage,
  handleApiCall
}