var modelPattern = require('../modelPattern');
var Contact = require('../../models/contact');
var dbApi = require('../dbApi');

function findContactsLike(name, callback){

	Contact.find({name: new RegExp('^'+name+'', "i")}, function(err, contacts){
		// console.log(contacts.length);
		callback(err, contacts);
	});
}
function matchSingleModel(model, filters, singleName){
	var offset = 0;
	var numberOfContacts = 0;
	
	modelPattern.match(model,filters).forEach(function(idx, e, a){ ;
  		console.log(idx, e, a, model, singleName)
    	var likeStatment = '';
    	if(singleName){

    		likeStatment = model[idx][0];
  			model[idx] = [ likeStatment , 'Contacts'];
    	}else{
    		idx += offset;
    		offset -= 1;

    		likeStatment = model[idx][0] + ' ' +  model[idx + 1][0];
  			model.splice(idx , 2, [ likeStatment , 'Contacts' ]);
    	}
    	numberOfContacts ++;
	  	console.log(idx, e, a, model, singleName)
  	});

  	return numberOfContacts;	
}

function format (model, callback) {
	console.log("Contact Formatter for " + model.raw);
	var async = require('async');
	var _ = require('underscore');
	var numberOfContacts = 0;

	


  	numberOfContacts += matchSingleModel(model,[{type : 'NN',regex:/^[A-Z][a-z0-9_-]+$/},
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

  	numberOfContacts += matchSingleModel(model,[{type : 'NNPS',regex:/^[A-Z][a-z0-9_-]+$/}],
  																					true);

  	numberOfContacts += matchSingleModel(model,[{type : 'NNP',regex:/^[A-Z][a-z0-9_-]+$/}],
  																					true);

  	numberOfContacts += matchSingleModel(model,[{type : 'NN',regex:/^[A-Z][a-z0-9_-]+$/}],
  																					true);

  	if(numberOfContacts == 0){
  		callback(model);
  		return;
  	}
	var makeFinalCallback = _.after(numberOfContacts, function(db, model){
														db.close();
														callback(model);
													});
	dbApi.openConnection(function(db){
		
		modelPattern.match(model,[
		    {type : 'Contacts'}
	  	]).forEach(function(idx){
	  		
	  		findContactsLike(model[idx][0] , function(err, contacts){

	  			if(!contacts){
	  				makeFinalCallback(db, model);
	  				return;
	  			}
	  			console.log(err, contacts);
	  			if(contacts.length != 0){
	  				model[idx][0] = contacts;
	  			}else{
	  				if(model[idx][0].indexOf(' ') < 0){
	  					model[idx][1] = 'NN';
	  				}
	  			}
	  			makeFinalCallback(db, model);
	  		});
	  		
	  	});
	});
	// db.close();
  	// callback(model);
}

module.exports.format = format;