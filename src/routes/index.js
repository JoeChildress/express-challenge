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

	// SEARCH ONLY **************************/
	if (req.query['search'] && !req.query['field']) {
		let results = [];
		let searchVal = req.query['search'].toLowerCase();

		for(var i=0; i<customers.length; i++) {
			for(key in customers[i]) {

				let propVal = customers[i][key];

				//CONVERT PROP VAL TO STRING
				if ((typeof propVal) === 'number') {
					propVal = propVal.toString();
				}

				if(customers[i].hasOwnProperty(key) && propVal.toLowerCase().includes(searchVal)) {
					results.push(customers[i]);
				}
			}
		}

		if(results.length > 0){
			res.status(200).send(results);
		}else{
			res.status(404).send({
				status: "ERROR",
				message: `No records with value of '${req.query["search"]}' found.`
			});
		}
		

	}else if(req.query['search'] && req.query['field']){

		// SEARCH AND FIELD PARAMS  **************************/
		let results = [];
		let searchVal = req.query['search'].toLowerCase();
		let fieldVal = req.query['field'];

		if (searchVal && fieldVal) {
			for(var i=0; i<customers.length; i++) {
				let propVal = customers[i][fieldVal];

				//CONVERT PROP VAL TO STRING
				if ((typeof propVal) === 'number') {
					propVal = propVal.toString();
				}

				if (propVal && propVal.toLowerCase().includes(searchVal)){
					results.push(customers[i]);
				}
			}
 
			//res.status(200).send(results)
			if(results.length > 0){
				res.status(200).send(results);
			}else{
				res.status(404).send({
					status: "ERROR",
					message: `No records with value of '${req.query["search"]}' in the field '${req.query["field"]}' found.`
				});
			}
		}
	}else{
		//NO PARAMS
		res.send(customers);
	}
});

//ID **************************/
router.get('/:id', (req, res) => {

	let id = Number(req.params.id);
	let result = customers.filter(obj => {
		return obj.id === id;
	});

	if(result.length > 0){
		res.status(200).send(result[0]);
	}else{
		res.status(404).send({
			status: "ERROR",
			message: `No record with id '${req.params["id"]}' found.`
		});
	}
	
})

module.exports = router;