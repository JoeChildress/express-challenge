/*
  Round 1
  When calling the API without search params, returns all data - DONE
  When calling the API with /{id}/, returns the person related to the id - DONE
  When calling the API with search={searchTerm}, returns the rows that contain the search term
  When calling the API where search={searchTerm} and field={fieldName}, returns the rows where the field (e.g. email, vehicle_make, etc.) contain the search term
*/

/* 
  Round 2
  Move 'search' related functionality from query string to param based API (e.g. /search/Ford && /search/Ford/vehicle_make
  Add support for searching multiple fields at once via a comma delimited list
  Each API response must contain the following key/value pairs:
    status: SUCCESS/ERROR
    message: A message to API user related to why the status of the call is the status of the call
  If an API response is successful and should contain data:
    add a "data" key value pair
    add a "count" key value pair
  Add a new endpoint for returning rows where vehicle years start with x and end in y (e.g /years/2008/2010) - A year range is required.
*/

var express = require('express');
var router = express.Router();
var customers = require('../data/MOCK_DATA.json');

router.get("/", function(req, res) {
  let fieldFilter = req.query["field"] || false;
  if(req.query["search"] && req.query["search"].length > 0) {
    let matches = [];
    customers.forEach((item) => {
      let isAMatch = false;
      Object.keys(item).forEach((field) => {
        if(fieldFilter && fieldFilter.length > 0 && fieldFilter !== field) return false;
        if(item[field].toString().toLowerCase().indexOf(req.query["search"].toLowerCase()) > -1) isAMatch = true;
      });
      if(isAMatch) matches.push(item);
    });
    if (matches.length > 1) {
      return res.send(matches);
    } else {
      let message = `No records with value of '${req.query["search"]}' found.`;
      if(fieldFilter && fieldFilter.length > 0) {
        message = `No records with value of '${req.query["search"]}' in the field '${fieldFilter}' found.`;
      } 
      return res.status(404).send({
        status: "ERROR",
        message
      });
    }
  }
  return res.send(customers);
});

//ID **************************/
router.get('/:id', (req, res) => {

  const result = customers.filter(item => {
    return item.id == req.params["id"];
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