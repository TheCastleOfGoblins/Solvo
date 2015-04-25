var modelPattern = require('../modelPattern');
var Contact = require('../../models/contact');
var dbApi = require('../dbApi');

function findContactsLike(name, callback){

	Contact.find({name: new RegExp('^'+name+'', "i")}, function(err, contacts){
		console.log(contacts.length);
		callback(err, contacts);
	});
}
function matchSingleModel(model, filters){
	var offset = 0;
	var numberOfContacts = 0;
	modelPattern.match(model,filters).forEach(function(idx){
  		idx += offset;
    	offset -= 1;

    	numberOfContacts ++;
	  	var likeStatment = model[idx][0] + ' ' +  model[idx + 1][0];
  		model.splice(idx , 2, [ likeStatment , 'Contacts' ]);
  	});
  	return numberOfContacts;	
}

function format (model, callback) {

	var async = require('async');
	var _ = require('underscore');
	var numberOfContacts = 0;

	// var offset = 0;
	// modelPattern.match(model,[
	//     {type : 'NN',regex:/^[A-Z][a-z0-9_-]+$/},
	//     {type : 'NN',regex:/^[A-Z][a-z0-9_-]+$/}
 //  	]).forEach(function(idx){
 //  		idx += offset;
 //    	offset -= 1;

 //    	numberOfContacts ++;
	//   	var likeStatment = model[idx][0] + ' ' +  model[idx + 1][0];
 //  		model.splice(idx , 2, [ likeStatment , 'Contacts' ]);
 //  	});


  	   matchSingleModel(model,[{type : 'NN',regex:/^[A-Z][a-z0-9_-]+$/},
	    					{type : 'NN',regex:/^[A-Z][a-z0-9_-]+$/}]);

  	numberOfContacts += matchSingleModel(model,[{type : 'NN',regex:/^[A-Z][a-z0-9_-]+$/},
	    					{type : 'NNP',regex:/^[A-Z][a-z0-9_-]+$/}]);

  	numberOfContacts += matchSingleModel(model,[{type : 'NN',regex:/^[A-Z][a-z0-9_-]+$/},
	    					{type : 'NNPS',regex:/^[A-Z][a-z0-9_-]+$/}]);

  	numberOfContacts += matchSingleModel(model,[{type : 'NNP',regex:/^[A-Z][a-z0-9_-]+$/},
	    					{type : 'NN',regex:/^[A-Z][a-z0-9_-]+$/}]);

  	numberOfContacts += matchSingleModel(model,[{type : 'NNP',regex:/^[A-Z][a-z0-9_-]+$/},
	    					{type : 'NNP',regex:/^[A-Z][a-z0-9_-]+$/}]);

  	numberOfContacts += matchSingleModel(model,[{type : 'NNP',regex:/^[A-Z][a-z0-9_-]+$/},
	    					{type : 'NNPS',regex:/^[A-Z][a-z0-9_-]+$/}]);

  	numberOfContacts += matchSingleModel(model,[{type : 'NNPS',regex:/^[A-Z][a-z0-9_-]+$/},
	    					{type : 'NN',regex:/^[A-Z][a-z0-9_-]+$/}]);

  	numberOfContacts += matchSingleModel(model,[{type : 'NNPS',regex:/^[A-Z][a-z0-9_-]+$/},
	    					{type : 'NNP',regex:/^[A-Z][a-z0-9_-]+$/}]);

  	numberOfContacts += matchSingleModel(model,[{type : 'NNPS',regex:/^[A-Z][a-z0-9_-]+$/},
	    					{type : 'NNPS',regex:/^[A-Z][a-z0-9_-]+$/}]);

	var makeFinalCallback = _.after(numberOfContacts, function(db, model){
														db.close();
														callback(model);
													});
	dbApi.openConnection(function(db){
		modelPattern.match(model,[
		    {type : 'Contacts'}
	  	]).forEach(function(idx){
	  		findContactsLike(model[idx][0] , function(err, contacts){
	  			if(contacts.length != 0){
	  				model[idx][0] = contacts;
	  			}
	  			makeFinalCallback(db, model);
	  		});
	  		console.log(model[idx]);
	  	});
	});
	// db.close();
  	// callback(model);
}

module.exports.format = format;