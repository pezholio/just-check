/**
 * Utility and helper functions for the Just Check Chrome extension
 * 
 * Created 14 June 2013 by Raj Bhaskar <raj@lordofthemoon.com>
 * 
 * Contributers:
 *    Raj Bhaskar <raj@lordofthemoon.com>
 */
 
/**
 * Tries to identify a postcode from the given address string using a regular expression
 * match
 * 
 * @param address the address string to search
 * @return the postcode from the address or false if none found
 */ 
function getPostcodeFromAddress(address)
{
  var postcodeMatches= address.match(/[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i);
  var postcode= null;
  if (postcodeMatches != null) {
    return postcodeMatches[0];
  }
  else {
    return false;
  }
} // end function getPostcodeFromAddress

