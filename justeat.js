/************************************************************************************************
 * Main content script for Just Check extension - displays food hygiene information on Just-Eat
 * and Hungry House takeaway clearing house websites.
 * 
 * For Hungry House, this only works when the website is in 'expanded' view, as the compact view
 * doesn't contain the address of the takeaway.   
 * 
 * Created 06 June 2013 by pezholio
 * 
 * Contributers:
 *    Raj Bhaskar <raj@lordofthemoon.com>
 ***********************************************************************************************/
 
var source= document.URL.toLowerCase();

// Just-Eat detected
if (source.indexOf("just-eat") != -1)
{
  $(".restaurants .restaurant").each(function() {
    name = $(this).find(".title h2 a").text()
    address = $(this).find(".address").text().trim()
    postcode = getPostcodeFromAddress(address);

    if (postcode)
    {
      // Search
      var search_url= "http://ratings.food.gov.uk/search/" + name + "/" + postcode + "/json";
    
      // make the call to the web service, sending some additional parameters to the callback
      // (success) function [insertAfter, takeawayBox]
      $.ajax({
        url: search_url,
        dataType: "json",
        insertAfter: ".address",
        takeawayBox: $(this),
        success: processRatings
      });
    } // end if a postcode was found
  });
} // end if this is Just-Eat

// Hungry House detected
else if (source.indexOf("hungryhouse") != -1)
{
  // Force expanded mode so we can see the scores
  $('.homepagePostCodeForm form').append('<input name="view[name]" value="expanded" type="hidden" />')
  
  $("#restsSearchResultsList .restsSearchItemRes").each(function() {
    var name= $(this).find(".restsMainInfo h3 a").text().trim();
    var address= $(this).find(".restsMap div:first-child").text().trim();
    var postcode= getPostcodeFromAddress(address);
    
    // only search if we found a postcode
    if (postcode)
    {
      // now search for the restaurant on the FSA website
      var search_url= "http://ratings.food.gov.uk/search/" + name + "/" + postcode + "/json";
    
      // make the call to the web service, sending some additional parameters to the callback
      // (success) function [insertAfter, takeawayBox]
      $.ajax({
        url: search_url,
        dataType: "json",
        insertAfter: "a.buttonsOld",
        takeawayBox: $(this),
        success: processRatings
      });
    } // end if a postcode was found
  }); 
} // end if this is Hungry House

// Fill My Belly detected
else if (source.indexOf("fillmybelly") != -1) {
  
  $(".search-product").each(function() {
    var name= $(this).find(".searchlogo-heading span:first").text().trim();
    var address= $(this).find("img.displayblock").attr('alt').trim();
    var postcode= getPostcodeFromAddress(address);

    // only search if we found a postcode
    if (postcode)
    {
      // now search for the restaurant on the FSA website
      var search_url= "http://ratings.food.gov.uk/search/" + name + "/" + postcode + "/json";
    
      // make the call to the web service, sending some additional parameters to the callback
      // (success) function [insertAfter, takeawayBox]
      $.ajax({
        url: search_url,
        dataType: "json",
        insertAfter: ".searchlogo",
        takeawayBox: $(this),
        success: processRatings
      });
    } // end if a postcode was found
  });
}
