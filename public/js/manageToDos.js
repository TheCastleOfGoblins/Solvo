
var resp = {
  "__v": 0,
  "syntaxAnalysis": [
    [
      "buy",
      "VB"
    ],
    [
      "very",
      "RB"
    ],
    [
      "good",
      "JJ"
    ],
    [
      "vodka",
      "NN"
    ],
    [
      "tomorrow",
      "NN"
    ],
    [
      ".",
      "."
    ],
    {
      "google": [
        {
          "href": "http://www.huffingtonpost.com/2013/10/04/best-vodka_n_4038718.html",
          "description": "4 Oct 2013 ... 7 Ways To Avoid Being Ripped Off When Buying A Car 48 · Another Company .... \nVodka isn't exactly a darling of the mixology community, but in terms of overall ..... \nShoots, tomorrow we move on to tequila (Cinco de Mayo is good any ... Try the \nkirkland vodka from costco - it is really good and really cheap.",
          "link": "http://www.huffingtonpost.com/2013/10/04/best-vodka_n_4038718.html",
          "title": "What's The Best-Tasting Vodka In America? (TASTE TEST)"
        },
        {
          "href": "http://www.thekitchn.com/best-liquors-what-is-your-favo-2-124923",
          "description": "19 Aug 2010 ... Also, what liquor would you like to talk about tomorrow? ... I'd also add Tito's as a \nbest buy because it's smooth and reasonably priced. Reply .... I'm not a vodka \naficionado, but it tastes really good in drinks and is inexpensive.",
          "link": "http://www.thekitchn.com/best-liquors-what-is-your-favo-2-124923",
          "title": "Best Liquors: What Is Your Favorite Vodka – and Why? | The Kitchn"
        },
        {
          "href": "http://www.jamesbondlifestyle.com/product/smirnoff-vodka",
          "description": "The close partnership between Smirnoff Vodka and Bond began in 1962's Dr. No\n, when ... In Dr. No (left) and Tomorrow Never Dies (right), Bond drinks from a \nbottle with a similar, vintage Smirnoff label ... The Smirnoff Vodka is a great \nproduct.",
          "link": "http://www.jamesbondlifestyle.com/product/smirnoff-vodka",
          "title": "Smirnoff Vodka | Bond Lifestyle"
        }
      ],
      "bing": [
        {
          "Url": "http://www.ar15.com/forums/t_1_5/992216_.html&page=1",
          "DisplayUrl": "www.ar15.com/forums/t_1_5/992216_.html&page=1",
          "Description": "AR15.Com. 3 Gun Nation",
          "Title": "Need a decent inexpensive vodka...for tomorrow. - Page 1 ...",
          "ID": "61b4f7aa-efbe-405a-879c-0f400a4b573e",
          "__metadata": {
            "type": "WebResult",
            "uri": "https://api.datamarket.azure.com/Data.ashx/Bing/Search/v1/Web?Query='buy very good vodkatomorrow'&$skip=0&$top=1"
          }
        },
        {
          "Url": "http://mixthatdrink.com/marshmallow-vodka-infusion/",
          "DisplayUrl": "mixthatdrink.com/marshmallow-vodka-infusion",
          "Description": "This drink is actually very good straight, as a Marshmallow Martini. ... Can’t wait to pick up some vodka tomorrow & try some of your recipes! Thanks! Reply.",
          "Title": "Marshmallow Vodka Infusion - Mix That Drink",
          "ID": "2356c5c5-e696-45b4-899d-5bde8643d6cb",
          "__metadata": {
            "type": "WebResult",
            "uri": "https://api.datamarket.azure.com/Data.ashx/Bing/Search/v1/Web?Query='buy very good vodkatomorrow'&$skip=1&$top=1"
          }
        }
      ],
      "wiki": {
        "link": "http://en.wikipedia.org/wiki/Vodka",
        "description": "Vodka (Polish: wódka [ˈvutka], Russian: водка [ˈvotkə]) is a distilled beverage composed primarily of water and ethanol, sometimes with traces of impurities and flavorings.",
        "title": "Vodka"
      }
    }
  ],
  "rawText": "buy very good vodka tomorrow.",
  "userId": "553c0e0f002c02c83430ba44",
  "_id": "553caf3e8ae48b3c41722fee",
  "location": [],
  "reminderDates": [],
  "createdAt": "2015-04-26T09:26:22.655Z",
  "isResolved": false
};


var markersArray = [];

var toDosSemanticInfo = {}
$(document).ready(function () {
  
	$('#submitToDo').click(function(){

		$.post('/todos/insert/', {rawText:$('#to-do').val()} , function(response){
        // resp.syntaxAnalysis.forEach(function(word) {
        //   if(word[1] == 'Contacts') {
        //     appendContacts(word[0]);
        //   }
        // })

        // var articles = resp.syntaxAnalysis[resp.syntaxAnalysis.length - 1];
        // appendArticles(articles, 6);
			if(response._id){

				$('#to-do').val('');
				var newRow = $('<tr id='+ response._id +' data-task=""><td>'+ response.rawText +'<div></div></td><td><button text="Help" class="help btn btn-sm">Help!</button></td><td><div class="checkbox"><input type="checkbox" class="resolve"></div></td></tr>')

			    newRow.find('.resolve').click(function(){
					var id = $(this).parents('tr').attr('id');
					var self = this;

					$.post('/todos/resolve',{todoId:id}, function(response){
						console.log(response)
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
					  	showTask(response,position.coords);
              appendArticles(response.searches, 3);
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

		// $.post('/todos/insert/', {rawText:$('#to-do').val()} , function(response){
		// 	if(response._id){
		// 		console.log(response);
		// 		toDosSemanticInfo[response._id] = response.syntaxAnalysis;
		// 		$('#to-do').val('');
        // response.syntaxAnalysis.forEach(function(word) {
          // console.log(word[1]);
          // if(word[1] == 'Contacts') {
            // appendContacts(word[0]);
          // }
        // })
		// 	}
		// 	//TO DO draw in the table the created ToDo
		// });
	});

	$('#to-do').keydown(function(e){

		if (e.which == 13) {
			e.preventDefault();
    		$('#submitToDo').click();
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
        //console.log(response);
        showTask(response,position.coords);
        appendArticles(response.searches, 3);
		  });
		});
	});

});

function appendContacts(contacts) {
  $('.show-on-contacts').hide();
  contacts.forEach(function(contact) {
    $('.show-on-contacts').show();
    $('.contacts').append(showContact(contact));
    $('table .contacts').removeClass('contacts');
  })
}

function showContact(contact) {
  var contactInfo = '';
  contactInfo += '<div>';
  contactInfo += '<table><tr><td>';
  contactInfo += '<a href="'+ contact.link +'"><img src="' + contact.picture.data.url + '"></a>';
  contactInfo += '</td><td>';
  contactInfo += '<a href="'+ contact.link +'">' + contact.name + '</a>';
  contactInfo += '</td></tr></table>';

  return contactInfo;
}

function showArticleInfo(title, description, link) {
  var articleInfo = '';
  articleInfo += '<div>';
  articleInfo += '<p><strong><a href="' + link + '">' + title + '</a></strong></p>';
  articleInfo += '<p>' + description + '</p>';
  articleInfo += '<p><a href="' + link + '">Read more...</a></p>';
  articleInfo += '</div>';

  return articleInfo;
}

function showArticle(article, type) {
  if(type === 'bing') {
    return showArticleInfo(article.Title, article.Description, article.Url);
  } else {
    return showArticleInfo(article.title, article.description, article.link);
  }
}

function appendArticles(articles, count) {
  var forDisplay = [];
  if(articles.google && articles.google.length >= 1) {
    forDisplay.push(articles.google[0]);
  }
  if(articles.bing && articles.bing.length >= 1) {
    forDisplay.push(articles.bing[0]);
  }
  if(articles.wiki) {
    forDisplay.push(articles.wiki);
  }
  if(articles.google && articles.google.length >= 2) {
    forDisplay.push(articles.google[1]);
  }
  if(articles.bing && articles.bing.length >= 2) {
    forDisplay.push(articles.bing[1]);
  }
  if(articles.google && articles.google.length >= 3) {
    forDisplay.push(articles.google[2]);
  }

  var i = 0;
  var type = 'googlewiki';
  while(i < count && forDisplay.length >= i+1) {
    if(i == 1 || i == 4) {
      type = 'bing';
    } else {
      type = 'googlewiki';
    }

    $('.articles').append(showArticle(forDisplay[i], type));
    i++;
  }
}

function drawMap(data, coords){
  var mapOptions = {
    center: { lat: coords.latitude, lng: coords.longitude},
    zoom: 16
  };
  taskMap = new google.maps.Map(document.getElementById('taskMapCanvas'),mapOptions);
  var mapCanvas = document.getElementById('taskMapCanvas');
  
  setTimeout(function() { google.maps.event.trigger(taskMap, "resize")}, 300);
  
  var myAddress = new google.maps.LatLng(coords.latitude,coords.longitude);
  
  var marker = new google.maps.Marker({
      position: myAddress,
      icon : "content/human.png",
      map: taskMap,
    });
  
  for(var i = 0; i < data.addresses.length; i++){
    var myLatlng = new google.maps.LatLng(eval(data.addresses[i])[0].latitude,eval(data.addresses[i])[0].longitude);
    var marker = new google.maps.Marker({
      position: myLatlng,
      icon : "content/map_marker.png",
      map: taskMap,
    });
    markersArray.push(marker);
    marker.setMap(taskMap);
  }
  
  for(var i = 0; i < data.entities.length; i++){
    var myLatlng = new google.maps.LatLng(data.entities[i].lat,data.entities[i].lon);
    var marker = new google.maps.Marker({
      position: myLatlng,
      icon : "content/map_marker.png",
      map: taskMap,
    });
    markersArray.push(marker);
    marker.setMap(taskMap);
    //google.maps.event.addListener(marker, 'click', toggleBounce)
  }
  /*var marker = new google.maps.Marker({
    position: location,
    map: map
  });

  markers.push(marker);

  google.maps.event.addListener(marker, 'click', function() {
    if(onClick)
      onClick(marker);
  });*/
}

function drawWeather(weather, locationName) {

	var weatherPanel = "<div class='weather-panel col-sm-8'>"
		+ "<h3>Weather forecast for "+(new Date(weather.dt)).toDateString()+"</h3>"
    + "<img style='width:50px;height:50px;float:right;' class=\"weather-forecast-img\" src=\"http://openweathermap.org/img/w/"+weather.weather.pic+".png\" />"
		+ "<p>"+weather.weather.main+"</p>"
		+ "<span style=\"color:#aaaaff\">"+parseInt(weather.avgTemp)+"C with </span>"
		+ "<span style=\"color:light-blue\">"+weather.weather.description+" is expected at "+locationName+"</span>"
		+ "<div style='clear:both'></div></div>";
	return weatherPanel;
}


function showTask(data,coords){
  $('.contacts').text('');
  $('#task-raw').text('');
  $('.task-date').text('');
  $('.task-weather').text('');
  $('.articles').text('');

  $('#taskModal').modal('show');
  if(data.addresses.length > 0 || data.entities.length > 0){
    drawMap(data,coords);
  }
  $('.contacts').text('');
  if(data.users.length > 0){
    data.users.forEach(function(word) {
      appendContacts(word);
    })
  }
  $('#task-raw').text(data.raw);
  if(data.dateTimes.length){
    $('.task-date').text(data.dateTimes[0].date.year + '-' + data.dateTimes[0].date.month + '-' + data.dateTimes[0].date.day + ' ' + data.dateTimes[0].time.hour + ':' + data.dateTimes[0].time.minute);
  }
  console.log(data);
  if(data.weather && !$.isEmptyObject(data.weather)){
    console.log(data.weather);
    var template = drawWeather(data.weather,"Sofia");;
    $('.task-weather').append(template);
  }
}
