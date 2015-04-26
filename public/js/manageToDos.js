var toDosSemanticInfo = {}
$(document).ready(function () {

	$('#submitToDo').click(function(){

		$.post('/todos/insert/', {rawText:$('#to-do').val()} , function(response){
			if(response._id){
				// console.log(response);
				toDosSemanticInfo[response._id] = response.syntaxAnalysis;
				$('#to-do').val('');
        response.syntaxAnalysis.forEach(function(word) {
          console.log(word[1]);
          if(word[1] == 'Contacts') {
            appendContacts(word[0]);
          }
        })
			}
			//TO DO draw in the table the created ToDo
		});
	});
	$('#to-do').focus(function(){
		var self = this;
		$(this).keydown(function(e){

			if (e.which == 13) {
        		$('#submitToDo').click();
        		$(self).off('keydown');
    		}
		});
	});
	$('#helpMe').click(function(){
		navigator.geolocation.getCurrentPosition(function(position) {
		  var pos = new google.maps.LatLng(position.coords.latitude,
		                                   position.coords.longitude);
		  console.log(position);
		  console.log(pos);
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
