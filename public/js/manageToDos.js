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
});