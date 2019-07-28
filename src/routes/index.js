
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
		let searchVal = req.query['search'].toLowerCase()

		//CHECK FOR TYPE OF SEARCH VALUE
		console.log(typeof searchVal)

		//maybe use Object.key and map?

		for(var i=0; i<customers.length; i++) {
			for(key in customers[i]) {

				let propVal = customers[i][key]

				//CONVERT PROP VAL TO STRING
				if ((typeof propVal) === 'number') {
					propVal = propVal.toString()
				}

				if(customers[i].hasOwnProperty(key) && propVal.toLowerCase().includes(searchVal)) {
					results.push(customers[i]);
				}
			}
		  }

		res.send(results)
		//res.send(checkRes(results))

	}else if(req.query['search'] && req.query['field']){

			console.log('search and field used');

		// SEARCH AND FIELD PARAMS  **************************/

		let results = []
		let searchVal = req.query['search'].toLowerCase()
		let fieldVal = req.query['field']
		

		console.log(`search: ${searchVal} and field: ${fieldVal} `);

		if (searchVal && fieldVal) {
			for(var i=0; i<customers.length; i++) {
				let propVal = customers[i][fieldVal]

				//CONVERT PROP VAL TO STRING
				if ((typeof propVal) === 'number') {
					propVal = propVal.toString()
				}

				if (propVal && propVal.toLowerCase().includes(searchVal)){
					results.push(customers[i]);
				}
			  }

			//res.send(checkRes(results))
			res.send(results)
		}
	}else{

		//NO PARAMS
		res.send(customers)
	}

});

//ID **************************/
router.get('/:id', (req, res) => {

	const id = Number(req.params.id);

	let result = customers.filter(obj => {
		return obj.id === id;
	});

	//res.send(result[0]);
	res.send(result);
	//res.send(checkRes(result))

})

function checkRes(res) {
	if (res.length > 0){
		return res
	} else {
		return 'No results found'
	}
}

module.exports = router;