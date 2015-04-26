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


var toDosSemanticInfo = {}
$(document).ready(function () {

	$('#submitToDo').click(function(){

		$.post('/todos/insert/', {rawText:$('#to-do').val()} , function(response){
        resp.syntaxAnalysis.forEach(function(word) {
          if(word[1] == 'Contacts') {
            appendContacts(word[0]);
          }
        })

        var articles = resp.syntaxAnalysis[resp.syntaxAnalysis.length - 1];
        appendArticles(articles, 6);
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
