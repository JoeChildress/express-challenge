
/*
  When calling the API without search params, returns all data - DONE
  When calling the API with /{id}/, returns the person related to the id - DONE
  When calling the API with search={searchTerm}, returns the rows that contain the search term
  When calling the API where search={searchTerm} and field={fieldName}, returns the rows where the field (e.g. email, vehicle_make, etc.) contain the search term
*/

var express = require('express');
var router = express.Router();
var customers = require('../data/MOCK_DATA.json');

router.get('/', function(req, res, next) {

	if (req.query['search'] && !req.query['field']) {

		// SEARCH ONLY **************************/
		console.log('search only used');

		let results = []
		let searchVal = req.query['search']

		//maybe use Object.key and map?
		//** update for indexOf***************************

		for(var i=0; i<customers.length; i++) {
			for(key in customers[i]) {
				//string.indexOf(substring) !== -1
				if(customers[i].hasOwnProperty(key) && customers[i][key] === searchVal) {

				//if(customers[i].hasOwnProperty(key) && customers[i][key].toString.contains(searchVal) ) {
					results.push(customers[i]);
				}
			}
		  }

		res.send('search used')

	}else if(req.query['search'] && req.query['field']){

			console.log('search and field used');
		// SEARCH AND FIELD PARAMS  **************************/

		let results = []
		let searchVal = req.query['search']
		let fieldVal = req.query['field']

			console.log(`search: ${searchVal} and field: ${fieldVal} `);

		for(var i=0; i<customers.length; i++) {

			if (customers[i][fieldVal] === searchVal){
				results.push(customers[i]);
			}

		  }

		res.send(results)
	}else{

		//no params
		res.send(customers)
	}

});

//id used
router.get('/:id', (req, res) => {
	console.log('id used');
	const id = Number(req.params.id);

	let result = customers.filter(obj => {
		return obj.id === id;
	});

	res.send(result[0]);
})


module.exports = router;
