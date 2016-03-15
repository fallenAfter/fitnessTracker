//link mongoose
var mongoose= require('mongoose');

//define the workout schema
var workoutSchema= new mongoose.Schema({
	date: {
		type: Date,
		default: Date.now
	},
	workoutTitle: {
		type: String,
		default: '',
		required: 'Cannot be blank'
	},
	workoutHours:{
		type: Number,
		default: 0,
		required: 'Workouts have lengths'
	},
	userName:{
		type: String,
		default:'',
		required: 'Who are you?'
	}
});

//make public
module.exports= mongoose.model('Workout', workoutSchema);