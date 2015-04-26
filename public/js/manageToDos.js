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