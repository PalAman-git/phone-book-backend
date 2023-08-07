const mongoose = require('mongoose');

mongoose.set('strictQuery', false);


// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI;


console.log('connecting to', url);

mongoose.connect(url)

	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

const noteSchema = new mongoose.Schema({
	name: {
		type:String,
		minLength:3,
	},
	number: {
		type: String,
		validate: {
			validator: function(value) {
				return /^[0-9]{2,3}-[0-9]+$/.test(value);
			},
			message: props => `${props.value} is not a valid format. It should be XX-XXX or XXX-XXXX, where X is a number.`,
		},
		required: true,
	},
});

noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});


module.exports = mongoose.model('Person', noteSchema);