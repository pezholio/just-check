/************************************************************************************************
 * Utility and helper functions for the Just Check Chrome extension
 * 
 * Created 14 June 2013 by Raj Bhaskar <raj@lordofthemoon.com>
 * 
 * Contributers:
 *    Raj Bhaskar <raj@lordofthemoon.com>
 ***********************************************************************************************/
 
/**
 * Tries to identify a postcode from the given address string using a regular expression
 * match
 * 
 * @param address: the address string to search
 * @return the postcode from the address or false if none found
 */ 
function getPostcodeFromAddress(address)
{
  var postcodeMatches= address.match(/[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}|[A-Z]{1,2}[0-9]{1,2}/i);
  var postcode= null;
  if (postcodeMatches != null) {
    return postcodeMatches[0];
  }
  else {
    return false;
  }
} // end function getPostcodeFromAddress


/**
 * Callback function that should be called upon return from call to the FSA ratings API.  Parses
 * the returned JSON data for the rating (if found) and inserts an image into the page containing
 * details about the rating.
 * 
 * In addition to the parameter, more details are required to insert the image, and these should
 * be passed by using the following JQuery syntax for the API call:
 * 
 *     $.ajax({
 *        url: <search_url>,          // URL of the API call
 *        dataType: "json",
 *        insertAfter: "<selector>",  // JQuery selector to indicate element after which the FSA 
 *                                    // info should be inserted
 *        takeawayBox: $(this),       // JQuery object that contains details of a single takeaway
 *        success: processRatings     // call this function
 *   });      
 * 
 * @param data: the returned data from the API as a JSON object
 */ 
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