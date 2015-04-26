var toDosSemanticInfo = {}
$(document).ready(function () {
	
	$('#submitToDo').click(function(){

		$.post('/todos/insert/', {rawText:$('#to-do').val()} , function(response){
			if(response._id){
				console.log(response);
				toDosSemanticInfo[response._id] = response.syntaxAnalysis;
				$('#to-do').val('');
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

	})
	$('.help').click(function(){
		var self = this;
		navigator.geolocation.getCurrentPosition(function(position) {
		  var pos = new google.maps.LatLng(position.coords.latitude,
		                                   position.coords.longitude);
		  
		  var id = $(self).parents('tr').attr('id');
				  
		  $.post('/todos/runActions/', {id:id, lat:position.coords.latitude, longitude:position.coords.longitude},function(response){
		  	console.log(response);
		  });
		});
	});
	
});