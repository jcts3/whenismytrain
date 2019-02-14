# whenismytrain
Custom project to give a display to show when my next train is  

Uses RealTime Trains API - for further details: https://api.rtt.io/ - this is where the credentials are obtained from for you to store in a local file called *info.json*

# TODO - WORK IN PROGRESS
## How To

### Instructions for setting up wtih RTT
RTT is what this app is based on, and due to it's use policy you will need to get your own set of personal credentials for this to work. 
1. Go to the [RTT Registration Page](https://api.rtt.io/accounts/register)
2. Fill in your details
3. Activate your account using the link you should receive by email
4. If you haven't already, go to the [RTT Login Page](https://api.rtt.io/accounts/login) and login (N.B. your username is not your email - this catches me out occasionally!)
5. Your auth credentials should be displayed here on the right handside here at https://api.rtt.io/ 

### Instructions for downloading 
_git clone etc._

### Instructions for file creation 
1. Take the template info.json file that can be found [here](https://github.com/jcts3/whenismytrain/blob/master/info_template.json) and rename it to info.json
2. Insert your RTT username and password into the credentials object found above or at your [RTT Homepage](https://api.rtt.io/) after logging in
3. Using the links found below in useful links, fill in your own favourite stations with their name, CRS and TIPLOC codes. You can either use these to pull in directly from the info.json file
4. _Instructions about fill in favourite services etc._

### Instructions for usage
_npm install etc._

### Useful links
_Station Codes etc._
- To find any station code, either CRS, or TIPLOC, use [Railway Codes](http://www.railwaycodes.org.uk/crs/CRSw.shtm)
- If you only need CRS codes, use the [National Rail CRS List](http://www.nationalrail.co.uk/stations_destinations/48541.aspx) where you can also get a csv file of these. 

## Work to be done
- [ ] Tidy up README for howto
- [ ] Demo images
- [ ] Describe API -> Swagger?
- [ ] Look at separating out api as separate npm library + build front end to utilise it
- [ ] Batch file to autocreate info.json file?
