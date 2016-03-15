var express= require('express');
var router= express.Router();

var mongoose= require('mongoose');
//include schema into scope
var Workout= require('../models/workouts');

router.get('/', function(req,res,next){
	//use model to retreive all workouts
	Workout.find(function(err, workout){
		if(err){
			console.log(err);
			res.end(err);
		}
		else{
			//data procured
			res.render('workouts/index', {
				title: 'Workouts',
				workout: workout
			});
		}
	});
});


//get handler for adding an entry
router.get('/add', function(req,res,next){
	res.render('workouts/add', {
		title: 'add new entry'
	});
});

//post handler for adding to database
router.post('/add', function(req,res,next){
	//save workout using model workout
	Workout.create({
		workoutTitle: req.body.workoutTitle,
		workoutHours: req.body.hours,
		userName: req.body.person
	});

	res.redirect('/workouts')
});

router.get('/:id', function(req,res,next){
	//request id from url
	var id= req.params.id;
	console.log(id);

	//look up selected workout
	Workout.findById(id, function(err, workout){
		if(err){
			//log error to console
			console.log(err);
			res.end(err);
		}
		else{
			console.log(workout);
			res.render('workouts/edit', {
				title: 'Workout Details',
				workout: workout
			});
		}
	});

});

//handle updating the workout
router.post('/:id', function(req,res,next){
	//create variable holding the id from url
	var id=req.params.id;
	console.log(id);
	//fill workout object
	var workout= new Workout({
		_id: id,
		workoutTitle: req.body.workoutTitle,
		workoutHours: req.body.hours,
		userName: req.body.person
	});
	console.log(workout);
	// update the model
	Workout.update({_id:id}, workout, function(err){
		if (err){
			console.log(err);
			res.end(err);
		}
		//if no errors redirect to workouts
		else{
			res.redirect('/workouts');
		}
	})

})
//make public
module.exports= router;