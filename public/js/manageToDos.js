var toDosSemanticInfo = {}
$(document).ready(function () {

	$('#submitToDo').click(function(){

		$.post('/todos/insert/', {rawText:$('#to-do').val()} , function(response){
			if(response._id){
					
				$('#to-do').val('');
				var newRow = $('<tr id='+ response._id +' data-task=""><td>'+ response.rawText +'<div class="contacts"></div></td><td><button text="Help" class="help btn btn-sm">Help!</button></td><td><div class="checkbox"><input type="checkbox" class="resolve"></div></td></tr>')
			    
			    newRow.find('.resolve').click(function(){
					var id = $(this).parents('tr').attr('id');
					var self = this;
					
					$.post('/todos/resolve',{todoId:id}, function(response){
						console.log(response);
						if(response.ok == 1){
							$(self).parents('tr').fadeOut(function(){
								$(self).parents('tr').remove();
							});
						}
					});
				});

			    newRow.find('.help').click(function(){
					var self = this;
					navigator.geolocation.getCurrentPosition(function(position) {
					  var pos = new google.maps.LatLng(position.coords.latitude,
					                                   position.coords.longitude);
					  
					  var id = $(self).parents('tr').attr('id');
							  
					  $.post('/todos/runActions/', {id:id, lat:position.coords.latitude, lon:position.coords.longitude},function(response){
					  	console.log(response);
					  });
					});
				});

			    $('#latest').append(newRow);
			    response.syntaxAnalysis.forEach(function(word) {
			      if(word[1] == 'Contacts') {
			        appendContacts(word[0]);
			      }
			    })
			}
			//TO DO draw in the table the created ToDo
		});
	});
	
	$('#to-do').keydown(function(e){

		if (e.which == 13) {
			e.preventDefault();
    		$('#submitToDo').click();
    		$(self).off('keydown');
		}
	});

	$('.resolve').click(function(){
		var id = $(this).parents('tr').attr('id');
		var self = this;
		
		$.post('/todos/resolve',{todoId:id}, function(response){
			console.log(response);
			if(response.ok == 1){
				$(self).parents('tr').fadeOut(function(){
					$(self).parents('tr').remove();
				});

			}
		});
	});
	$('.help').click(function(){
		var self = this;
		navigator.geolocation.getCurrentPosition(function(position) {
		  var pos = new google.maps.LatLng(position.coords.latitude,
		                                   position.coords.longitude);
		  
		  var id = $(self).parents('tr').attr('id');
				  
		  $.post('/todos/runActions/', {id:id, lat:position.coords.latitude, lon:position.coords.longitude},function(response){
		  	console.log(response);
		  });
		});
	});

});

function appendContacts(contacts) {
  contacts.forEach(function(contact) {
    $('.contacts').append(showContact(contact));
  })
}

function showContact(contact) {
  var contactInfo = '<div>';
  contactInfo += '<table><tr><td>';
  contactInfo += '<a href="'+ contact.link +'"><img src="' + contact.picture.data.url + '"></a>';
  contactInfo += '</td><td>';
  contactInfo += '<a href="'+ contact.link +'">' + contact.name + '</a>';
  contactInfo += '</td></tr></table>';

  return contactInfo;
}
