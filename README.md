# whenismytrain
Custom project to give a display to show when my next train is  

Uses RealTime Trains API - for further details: https://api.rtt.io/ - this is where the credentials are obtained from for you to store in a local file called *info.json*

## How To

### Instructions for setting up wtih RTT
RTT is what this app is based on, and due to it's use policy you will need to get your own set of personal credentials for this to work. 
1. Go to the [RTT Registration Page](https://api.rtt.io/accounts/register)
2. Fill in your details
3. Activate your account using the link you should receive by email
4. If you haven't already, go to the [RTT Login Page](https://api.rtt.io/accounts/login) and login (N.B. your username is not your email - this catches me out occasionally!)
5. Your auth credentials should be displayed here on the right handside here at https://api.rtt.io/ 

### Instructions for downloading 
1. In terminal/cmd line navigate to where you want to place the project
2. (If using https) Run `git clone https://github.com/jcts3/whenismytrain.git`
3. `cd whenismytrain` - enter project folder
4. `npm install` - install the required npm packages
5. Once install completed, it's time to create 

### Instructions for file creation 
1. Take the template info.json file that can be found [here](https://github.com/jcts3/whenismytrain/blob/master/info_template.json) and rename it to info.json
2. Insert your RTT username and password into the credentials object found above or at your [RTT Homepage](https://api.rtt.io/) after logging in
3. Using the links found below in useful links, fill in your own favourite stations with their name, CRS and TIPLOC codes. You can either use these to pull in directly from the info.json file
4. Save the file as `info.json`
5. _Instructions about fill in favourite services etc._

### Instructions for usage
1. Once file has been created`node app.js` 
2. A console message should pop up saying you are now running on port 8081
3. In a browser go to [http://localhost:8081/EDB/GLQ/departureinfo](http://localhost:8081/EDB/GLQ/departureinfo) to test out - this should give the next train from Edinburgh Waverley to Glasgow Queen Street. 
4. _The page listed as the link here should be a base point, which has the API docs? Swagger??_

## Home Server
If you set up bookmarks, (or once the app is further developed), it can be useful to have a home server running the app. I use a raspberry pi for this. The following steps should allow this:
1. Ensure your pi has npm and node.js - you can check this by getting verion numbers from running `node -v` and `npm -v`
2. Follow the instructions outlined above in [How to](https://github.com/jcts3/whenismytrain#how-to)
3. Find out your Pi's IP address on your Wi-fi - this should be doable using `sudo ifconfig` and looking at the IP value for `wlan0` - more details can be found at [this Adafruit guide](https://learn.adafruit.com/adafruits-raspberry-pi-lesson-3-network-setup/finding-your-pis-ip-address).
4. On your phone/laptop/other device with browser on the same wifi (let's be honest there's probably a fridge that can do it), navigate to `http://<WLAN_IP_ADDRESS_FOUND_IN_3>:8081/EDB/GLQ/departureinfo`

## Useful links
- To find any station code, either CRS, or TIPLOC, use [Railway Codes](http://www.railwaycodes.org.uk/crs/CRSw.shtm)
- If you only need CRS codes, use the [National Rail CRS List](http://www.nationalrail.co.uk/stations_destinations/48541.aspx) where you can also get a csv file of these. 

## Work to be done
- [x] Tidy up README for howto
- [ ] Demo images
- [ ] Describe API -> Swagger?
- [ ] Look at separating out api as separate npm library + build front end to utilise it
- [ ] Batch file to autocreate info.json file?
