var source= document.URL.toLowerCase();

if (source.indexOf("just-eat") != -1)
{
  $("#SearchResults article").each(function() {
    name = $(this).find(".restaurantDetails h3").text().trim()
    address = $(this).find("address").text().trim()
    postcode = getPostcodeFromAddress(address);
    var cur = this
  
    // Search and shit
    var search_url= "http://ratings.food.gov.uk/search/" + name + "/" + postcode + "/json";
    $.getJSON(search_url, function(data) {
      if (data.FHRSEstablishment.Header.ItemCount > 0)
      {
        var rating = data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail.RatingValue;
        var ratingKey= data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail.RatingKey.toLowerCase();
        var img= "images/" + ratingKey + ".jpg";
    
        var imgURL= chrome.extension.getURL(img);
        $(cur).find(".rating").after("<img src='"+ imgURL +"' class='fsarating' title='" + rating + "' alt='" + rating + "'/>")
      } // end if result found
    });
  });
} // end if this is Just-Eat

else if (source.indexOf("hungryhouse") != -1)
{
  $("#restsSearchResultsList .restsSearchItemRes").each(function() {
    var name= $(this).find(".restsMainInfo h3 a").text().trim();
    var address= $(this).find(".restsMap div:first-child").text().trim();
    var postcode= getPostcodeFromAddress(address);
    var currentItem= $(this);
    //console.log("currentItem is: " + JSON.stringify(currentItem));
    
    // now search for the restaurant on the FSA website
    var search_url= "http://ratings.food.gov.uk/search/" + name + "/" + postcode + "/json";
    
    $.ajax({
      url: search_url,
      dataType: "json",
      insertAfter: "a.buttonsOld",
      takeawayBox: $(this),
      success: processRatings
    });
    
    /*
    $.getJSON(search_url, function(data) {
      // don't try to do anything if we don't have any results
      if (data.FHRSEstablishment.Header.ItemCount > 0)
      {
        var rating = data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail.RatingValue;
        var ratingKey= data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail.RatingKey.toLowerCase();
        var img= "images/" + ratingKey + ".jpg";
    
        var imgURL= chrome.extension.getURL(img);
        $(curentItem).find("a.buttonsOld").after("<img src='"+ imgURL +"' class='fsarating' title='" + rating + "' alt='" + rating + "'/>")
      } // end if result found
    });
         */
  }); 
} // end if this is Hungry House


function processRatings(data)
{
  // don't try to do anything if we don't have any results
  if (data.FHRSEstablishment.Header.ItemCount > 0)
  {
    var rating = data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail.RatingValue;
    var ratingKey= data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail.RatingKey.toLowerCase();
    var img= "images/" + ratingKey + ".jpg";
    
    var imgURL= chrome.extension.getURL(img);
    
    $(this.takeawayBox).find(this.insertAfter).after("<img src='"+ imgURL +"' class='fsarating' title='" + rating + "' alt='" + rating + "'/>")
  } // end if result found

} // end function processRatings()