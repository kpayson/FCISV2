# FCIS TODO

## Active
- facility description page
    - create generic facility all page
    - about text width percentage?
    - image sizes
- NCI 1B42 dP data ?

Create new portfolios menu to link to facility pages
Create the facilities page menu
Crete the facility description tab/page 
Rework the facility dashboard/timeline to work with the new layout
Create the facility documents page
Create the facility resources page
Create the condition reporter page
Convert Pie charts to donuts
create facility table entry for 
    CC Interim Nuclear Pharmacy








## Done
### Week 5-1-2003 to 5-5-2003
- dP not DP
- facility selector a few pixels short
- Investigate missing fields in room metadata - make sure everything is populating (RoomParameterInfo endpoint  had commented out code)
- fix layout of search/key and title on dashboard
- search icon kind of looks like key icon
- Performance refactoring for retrieving current status data - refactored to get metadata on demand during pin click and added caching via caching decoration on controllers

### Week 5-8 to 5-12
- error handling strategy in batch calls
- fixed timestamp field in room metadata display
- Create a contact us dialog that open when contact us link is clicked going to FCISQASupport@mail.nih.gov
- Facility Landing page pictures
- Facility Landing page documents

### Week 6/5 - 6/9
trim and or adjust menu color to make blend nicer
facility all map pins link in to facility page. Start on description page like normal






o	Current storybook image (Note the landing page should be “APF Portfolio (All)”
 
o	Correct title to match Storyboard
o	Correct navigation (below title) to match storyboard
o	The map is good
	Left-clicking a Portfolio IC Group should link to the corresponding IC’s Composite Dashboard page
	Zoom could be disabled on this page
	Map Key function should be included on this element
o	“The National Institutes of Health (NIH) APF Portfolio consists of 12 facilites, including pharmacies, radiopharmacies ...” 
    
    (done) Delete this text: APF Portfolio GSF Growth by Classification
    (done) Shift label to left-justified
    (done)  Revise tags to read. “CNC Area” “ISO-8 Area” and “ISO-7 Area”
    (done) Revise label to read, “APF Portfolio Growth by Area of Classification Type (GSF)
o	Donut charts:
    (done)Shift labels to be left-justified
	APF Portfolio GSF by IC
•	(done) Update colors to match the key of the map
•	(done) Use all of the portfolio groups on the chart (i.e., do not aggregate all of the CC groups together)
•	(done) Donut should be larger by about 50%
•	Can you increase the size of the donut hole in proportion to the overall? Double the radius of the white circle would be about right
•	(done) We do not need to see the % tag
	APF Portfolio GSF by Facility
•	Move to below the APF Portfolio GSF by IC
•	Update colors to Coordinate with  the key of the map:
 
•	Donut should be larger by about 50%
•	Can you increase the size of the donut hole in proportion to the overall? Double the radius of the white circle would be about
•	We do not need to see the % tag
