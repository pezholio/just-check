$("#SearchResults article").each(function() {
  name = $(this).find(".restaurantDetails h3").text().trim()
  address = $(this).find("address").text().trim()
  postcode = address.match(/[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i)[0]
  var cur = this
  
  // Search and shit
  //url = "http://pezholio.co.uk/fsa/?name="+ name +"&postcode="+ postcode +"&callback=?"
  url = "http://ratings.food.gov.uk/search/"+ name +"/"+ postcode +"/json"

  $.getJSON(url, function(data) {
    var rating = data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail.RatingValue;
    var ratingKey= data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail.RatingKey.toLowerCase();
    var img= "images/" + ratingKey + ".jpg";
    
    var imgURL= chrome.extension.getURL(img);
    $(cur).find(".rating").after("<img src='"+ imgURL +"' class='fsarating' title='" + rating + "' alt='" + rating + "'/>")
  });

});