/*
  Round 1
  When calling the API without search params, returns all data - DONE
  When calling the API with /{id}/, returns the person related to the id - DONE
  When calling the API with search={searchTerm}, returns the rows that contain the search term
  When calling the API where search={searchTerm} and field={fieldName}, returns the rows where the field (e.g. email, vehicle_make, etc.) contain the search term
 
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
  return res.status(200).send({
    status: "SUCCESS",
    message: `Records found.`,
    data: customers,
    count: customers.length
  });
});

router.get('/:id', (req, res) => {
  const match = customers.filter(item => {
    return item.id == req.params["id"];
  });

	if(match.length > 0){
		res.status(200).send({
      status: "SUCCESS",
      message: `A record with value of '${req.params["id"]}' in the field 'id' found.`,
      data: match[0],
      count: match.length
    });
	}else{
		res.status(404).send({
			status: "ERROR",
			message: `No record with id '${req.params["id"]}' found.`
		});
	}
})

router.get("/search/:searchVal", function(req, res) {
  let matches = [];

  customers.forEach((item) => {
    let isAMatch = false;
    Object.keys(item).forEach((field) => {
      if(item[field].toString().toLowerCase().indexOf(req.params["searchVal"].toLowerCase()) > -1) isAMatch = true;
    });
    if(isAMatch) matches.push(item);
  });

  if (matches.length > 0) {
    return res.status(200).send({
      status: "SUCCESS",
      message: `Records with value of '${req.params["searchVal"]}' found.`,
      data: matches,
      count: matches.length
    });
  } else {
    return res.status(404).send({
      status: "ERROR",
      message : `No records with value of '${req.params["searchVal"]}' found.`
    });
  }
});

router.get("/search/:searchVal/:field", function(req, res) {
  let matches = [],
    fieldList =  req.params["field"].split(',');

  customers.forEach((item) => {
    let isAMatch = false;
    Object.keys(item).forEach((field) => {
      if(!fieldList.includes(field)) return false;
      if(item[field].toString().toLowerCase().indexOf(req.params["searchVal"].toLowerCase()) > -1) isAMatch = true;
    });
    if(isAMatch) matches.push(item);
  });

  if (matches.length > 0) {
    return res.status(200).send({
      status: "SUCCESS",
      message: `Records with value of '${req.params["searchVal"]}' in the field '${req.params["field"]}' found.`,
      data: matches,
      count: matches.length
    });
  } else {
    return res.status(404).send({
      status: "ERROR",
      message: `No records with value of '${req.params["searchVal"]}' in the field '${req.params["field"]}' found.`
    });
  }
});

module.exports = router;