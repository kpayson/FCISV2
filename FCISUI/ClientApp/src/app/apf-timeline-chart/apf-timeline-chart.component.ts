import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-apf-timeline-chart',
  templateUrl: './apf-timeline-chart.component.html',
  styleUrls: ['./apf-timeline-chart.component.scss']
})
export class ApfTimelineChartComponent implements OnInit {

  constructor() { }

  private _chartData: any[] = [];

  @Input()
  get chartData(): any[] {
    return this._chartData;
  }
  set chartData(v: any[]) {
    if (v.some(Boolean)) {
      this._chartData = v;
      this.options = this.chartOptions(this._chartData)
    }
  }

  chartType = ChartType.AreaChart;
  columnNames = ['ChillerName'];
  data: any[] = []
  options: any;

  //     dataTable.addColumn({ type: 'string', id: 'ChillerName' });
//     dataTable.addColumn({ type: 'string', id: 'ChillerNameTooltip', role: 'tooltip', 'p': { 'html': true } });
//     dataTable.addColumn({ type: 'string', id: 'ChillerStatus' });
//     dataTable.addColumn({ type: 'string', role: 'style' });
//     dataTable.addColumn({ type: 'date', id: 'StartTime' });
//     dataTable.addColumn({ type: 'date', id: 'EndTime' });


  ngOnInit(): void {
  }

  chartOptions(data: any[]) {
  }

}



// $(document).ready(function () {

//     // input from navigation bar elements
//     var StrStartDate = $("#<%= txtStartTime.ClientID %>").val();
//     var StrEndDate = $("#<%= txtEndTime.ClientID %>").val();
//     var facid = $("#<%= ddlfacilSelector.ClientID %>").val();
//     var interval = $("#<%= ddltimescaleSelector.ClientID %>").val();
//     var Atr = $("#<%= ddlStatusSelector.ClientID %>").val();

//     ShowProgress();
//     $.ajax({
//         type: 'POST',
//         dataType: 'json',
//         contentType: 'application/json',
//         url: 'FacilityDashboard.aspx/GetDataToPopulateWindowB',
//         data: '{"StrStartDate":"' + StrStartDate + '","StrEndDate":"' + StrEndDate + '","facid":"' + facid + '","Atr":"' + Atr + '","interval":"' + interval + '"}',
//         success:
//             function (response) {
//                 google.charts.setOnLoadCallback(function () {
//                     drawChart(response.d);
//                 })
//                 //drawChart(response.d);
//                 document.getElementById('loadingGif').style.display = "none";
//             },
//         error: function () {
//             alert("Error loading data! Fix Me!");
//         }
//     });

// })
// function drawChart(dataValues) {

//     var container = document.getElementById('CHLChart');
//     var chart = new google.visualization.Timeline(container);
//     var dataTable = new google.visualization.DataTable();

//     dataTable.addColumn({ type: 'string', id: 'ChillerName' });
//     dataTable.addColumn({ type: 'string', id: 'ChillerNameTooltip', role: 'tooltip', 'p': { 'html': true } });
//     dataTable.addColumn({ type: 'string', id: 'ChillerStatus' });
//     dataTable.addColumn({ type: 'string', role: 'style' });
//     dataTable.addColumn({ type: 'date', id: 'StartTime' });
//     dataTable.addColumn({ type: 'date', id: 'EndTime' });
//     /*dataTable.addColumn({ type: 'string', id: 'tooltipString' });*/

//     // if data values.length = 0, if they have no rows, add dummy row
//     if (dataValues.length == 0) {
//         var tooltipTextDummy = createCustomHTMLContentTable('No Data', 'No Data', 'No Data', 'No Data'); // These need to be updated for the correct tooltip display
//         //var tooltipTextStringDummy = createCustomHTMLContentStringDemo('No data', 'No data', 'No data', 'No data');
//         var dummyName = 'No Data';
//         var dummyStatus = 'No Data';
//         var dummyColor = 'white';
//         var dummyStart = new Date(2000, 1, 1, 0, 0, 0);
//         var dummyEnd = new Date(2000, 1, 2, 0, 0, 0);

//         dataTable.addRow([{
//             v: dummyName, p: {
//                 link: ''
//             }
//         },
//             tooltipTextDummy,
//             dummyStatus,
//             dummyColor,
//             dummyStart,
//             dummyEnd,
//             /*tooltipTextStringDummy*/]);


//         console.log(" ***THIS IS A DUMMY ROW***");
//     }
//     else {
//         for (var i = 0; i < dataValues.length; i++) {

//             console.log("i = " + i + " ; length = " + dataValues.length);

//             var facidForTooltipsWindowB = $("#<%= ddlfacilSelector.ClientID %>").val();

//             if (facidForTooltipsWindowB.toString() === '0') {
//                 var statusColor = '';
//                 if (dataValues[i].ChillerStatus == 'Within Spec') { statusColor = 'green'; }
//                 else if (dataValues[i].ChillerStatus == 'Comm Loss') { statusColor = 'gray'; }
//                 else if (dataValues[i].ChillerStatus == 'Warning') { statusColor = 'yellow'; }
//                 else if (dataValues[i].ChillerStatus == 'Alarm (Out of Spec)') { statusColor = 'red'; }
//                 else { statusColor = 'white'; }

//                 var statusAttr = $("#<%= ddlStatusSelector.ClientID %>").val();
//                 var tooltipText;

//                 // Different tooltips for different status attribute type
//                 if (statusAttr == 'DP') {
//                     tooltipText = createCustomHTMLContentTableDP(dataValues[i].RoomNumber); // These need to be updated for the correct tooltip display
//                 }
//                 else {
//                     tooltipText = createCustomHTMLContentTable(dataValues[i].RoomNumber, dataValues[i].RoomName, dataValues[i].ISO, dataValues[i].SQ)
//                 }

//                 //var tooltipTextString = createCustomHTMLContentStringDemo(dataValues[i].RoomNumber, dataValues[i].RoomName, dataValues[i].ISO, dataValues[i].SQ);
//                 //console.log('tooltipText: ' + tooltipText);
//                 //console.log('tooltipText: ' + tooltipTextString);

//                 // ***REMEMBER RoomName and RoomNumber are flipped***
//                 dataTable.addRow([{
//                     v: dataValues[i].RoomName, p: {
//                         link: 'https://orfd-cogen.ors.nih.gov/data-quality/plotcgmp?path=' + dataValues[i].Tag // This will need to be the correct concantonated link: dataValues[i].Tag + ...
//                     }
//                 },
//                     tooltipText,
//                 dataValues[i].ChillerStatus,
//                     statusColor,
//                 new Date(dataValues[i].StartTime),
//                 new Date(dataValues[i].EndTime),
//                 /*tooltipTextString*/]);
//                 //console.log(i + " \tName: " + dataValues[i].RoomName + " \t\t#: " + dataValues[i].RoomNumber + " \t\tStatus: " + dataValues[i].ChillerStatus + " \t\tColor: " + statusColor /*+ " Start: " + new Date(dataValues[i].StartTime) + " End: " + new Date(dataValues[i].EndTime)*/);

//             }
//             else {


//                 //console.log("                 *********About to add to Window B: " + "pin" + dataValues[i].RoomName);
//                 var testPin = "pin" + dataValues[i].RoomName;
//                 var cleanTestPin = testPin.replace("-", "_");
//                 //console.log("                 *********About to add to Window B CLEAN: " + cleanTestPin);
//                 var elementExists = !!document.getElementById(cleanTestPin);
//                 //console.log("                 *********Does it exist???: " + elementExists);

//                 if (elementExists) {
//                     var statusColor = '';
//                     if (dataValues[i].ChillerStatus == 'Within Spec') { statusColor = 'green'; }
//                     else if (dataValues[i].ChillerStatus == 'Comm Loss') { statusColor = 'gray'; }
//                     else if (dataValues[i].ChillerStatus == 'Warning') { statusColor = 'yellow'; }
//                     else if (dataValues[i].ChillerStatus == 'Alarm (Out of Spec)') { statusColor = 'red'; }
//                     else { statusColor = 'white'; }

//                     var statusAttr = $("#<%= ddlStatusSelector.ClientID %>").val();
//                     var tooltipText;
//                     // var linkToNicks;

//                     // Different tooltips for different status attribute type
//                     if (statusAttr == 'DP') {
//                         tooltipText = createCustomHTMLContentTableDP(dataValues[i].RoomNumber); // These need to be updated for the correct tooltip display
//                     //    linkToNicks = 'https://orfd-cogen.ors.nih.gov/data-quality/plotcgmp?path=' + dataValues[i].Tag + '&type=dp'; // This will need to be the correct concantonated link: dataValues[i].Tag + ...
//                     }
//                     else {
//                         tooltipText = createCustomHTMLContentTable(dataValues[i].RoomNumber, dataValues[i].RoomName, dataValues[i].ISO, dataValues[i].SQ)
//                     //    linkToNicks = 'https://orfd-cogen.ors.nih.gov/data-quality/plotcgmp?path=' + dataValues[i].Tag;
//                     }

//                     //var tooltipTextString = createCustomHTMLContentStringDemo(dataValues[i].RoomNumber, dataValues[i].RoomName, dataValues[i].ISO, dataValues[i].SQ);
//                     //console.log('tooltipText: ' + tooltipText);
//                     //console.log('tooltipText: ' + tooltipTextString);

//                     // ***REMEMBER RoomName and RoomNumber are flipped***
//                     dataTable.addRow([{
//                         v: dataValues[i].RoomName, p: {
//                             link: 'https://orfd-cogen.ors.nih.gov/data-quality/plotcgmp?path=' + dataValues[i].Tag // This will need to be the correct concantonated link: dataValues[i].Tag + ...
                            
//                         }
//                     },
//                         tooltipText,
//                     dataValues[i].ChillerStatus,
//                         statusColor,
//                     new Date(dataValues[i].StartTime),
//                     new Date(dataValues[i].EndTime),
//                 /*tooltipTextString*/]);
//                     //console.log(i + " \tName: " + dataValues[i].RoomName + " \t\t#: " + dataValues[i].RoomNumber + " \t\tStatus: " + dataValues[i].ChillerStatus + " \t\tColor: " + statusColor /*+ " Start: " + new Date(dataValues[i].StartTime) + " End: " + new Date(dataValues[i].EndTime)*/);

//                 }
//                 else {
//                     //console.log("                 *********Not added to Window B: " + dataValues[i].RoomName);

//                 }
//             }

            
//         }
//     }

//     var options = {
//         timeline: { showBarLabels: false, colorByRowLabel: true },
//         backgroundColor: '#ebe9e6',
//         tooltip: { isHtml: true },
//         focusTarget: 'category',
//     };

//     //var view1 = new google.visualization.DataView(dataTable);
//     //var view2 = new google.visualization.DataView(view1);
//     //view2.setColumns([0, 1, 2, 3, 4, 5]);

//     // formats the row labels
//     if (dataValues.length == 0) {
//         // no need to format row labels
//         //console.log("DUMMY 2A");
//     }
//     else {
//         google.visualization.events.addListener(chart, 'ready', function () {

//             /* @MM This is the currently picked status attribute*/
//             var statusAttr = $("#<%= ddlStatusSelector.ClientID %>").val();

//             /* @MM Add tooltips and links to google chart window B labels*/
//             //console.log("DUMMY 2B");
//             var labels = container.getElementsByTagName('text');

//             Array.prototype.forEach.call(labels, function (label) {

//                 if (label.getAttribute('text-anchor') === 'end') {

//                     // make labels bolder by increasing font-weight
//                     label.setAttribute('font-weight', '700');

//                     // this formats the row label colors
//                     var labelText = label.textContent;

//                     //var tooltipDataRows = dataTable.getFilteredRows([{ column: 1, value: labelText }]);
//                     var facidForTooltips = $("#<%= ddlfacilSelector.ClientID %>").val();
//                     console.log("labelText: " + labelText);
//                     //console.log("facidForTooltips: " + facidForTooltips.toString());
//                     //console.log("facid: " + dataValues.facid);
//                     //console.log("room number: " + dataValues[i].RoomNumber == null);
//                     //console.log("tooltipDataRows test value: " + tooltipDataRows);

//                     // Split this up by facility or portfolio flag
//                     if (facidForTooltips.toString() === '0') { // This is Portfolio All
//                         // do nothing
//                     }

//                     else { // This is facility to room
//                         //console.log("gets here 1");
//                         var dataRows = dataTable.getFilteredRows([{ column: 0, value: labelText }]);
//                         //console.log("gets here 1.1 dataRows length: " + dataRows.length);

//                         label.setAttribute('fill', 'black'); // All other end text anchor labels

//                         /* Sets the tooltips for the chart labels*/
//                         label.setAttribute('data-toggle', 'tooltip');
//                         label.setAttribute('data-placement', 'right');
//                         label.setAttribute('data-html', 'true');

//                         var tooltipData = dataTable.getValue(dataRows[0], 1); //tooltip data from chart data
//                         var statusColorCurr = dataTable.getValue(dataRows[dataRows.length-1], 2); //status color at the very end of row/room

//                         // Color --> color class for CSS
//                         //console.log("dataRows size: " + dataRows.length);
//                         //console.log("status color: " + statusColorCurr);

//                         var tooltipData = dataTable.getValue(dataRows[0], 1);

//                         //console.log("gets here 2.2");
//                         label.setAttribute('title', tooltipData);

//                         //console.log("gets here 3");

//                         // This is used for testing and therefore is set to TEST
//                         if (statusAttr == 'TEST') {

//                             // Changes the pin arrow status color
//                             var pinCurrent = document.getElementById(labelText);
//                             //var classAttrString = '';
//                             //pinCurrent.setAttribute('class', classAttrString); // reset the class attribute string on the component

//                             if (statusColorCurr === 'Within Spec') { pinCurrent.setAttribute('fill', 'green'); }
//                             else if (statusColorCurr === 'Comm Loss') { pinCurrent.setAttribute('fill', 'gray'); }
//                             else if (statusColorCurr === 'Alarm (Out of Spec)') { pinCurrent.setAttribute('fill', 'red'); }
//                             else if (statusColorCurr === 'Warning') { pinCurrent.setAttribute('fill', 'yellow'); }
//                             else { pinCurrent.setAttribute('fill', 'white'); }

//                             //if (statusColorCurr === 'Within Spec') { pinCurrent.setAttribute('fill', 'green'); }
//                             //else if (statusColorCurr === 'Comm Loss') { pinCurrent.setAttribute('fill', 'gray'); }
//                             //else if (statusColorCurr === 'Alarm (Out of Spec)') { pinCurrent.setAttribute('fill', 'red'); }
//                             //else if (statusColorCurr === 'Warning') { pinCurrent.setAttribute('fill', 'yellow'); }
//                             //else { pinCurrent.setAttribute('fill', 'white'); }

//                             //pinCurrent.setAttribute('class', classAttrString);

//                             console.log("gets here 4b");

//                             pinCurrent.setAttribute('data-toggle', 'tooltip');
//                             pinCurrent.setAttribute('data-placement', 'right');
//                             pinCurrent.setAttribute('data-html', 'true');
//                             pinCurrent.setAttribute('data-original-title', tooltipData);

//                             $('[data-toggle="tooltip"]').tooltip({ placement: 'right' });
//                             console.log("gets here 5b");

//                             // Pins (window A) --> label in the chart (window B)
//                             pinCurrent.addEventListener('click', function (sender) { // add event to pin when clicked to open URL
//                                 if (dataRows.length > 0) {
//                                     var link = dataTable.getProperty(dataRows[0], 0, 'link');
//                                     console.log(link);
//                                     window.open(link, '_blank');
//                                 }

//                             });

//                             pinCurrent.addEventListener('mouseover', function (sender) { // add event to pin when mouse over to show tooltips
//                                 label.setAttribute('fill', 'red');
//                                 //classAttrString = classAttrString + ' stArrowBackGrayHover';
//                                 pinCurrent.setAttribute('class', 'stArrowBackGrayHover');
//                             });

//                             pinCurrent.addEventListener('mouseout', function (sender) {
//                                 label.setAttribute('fill', 'black');
//                                 //classAttrString = classAttrString + ' stArrowBackGray';
//                                 pinCurrent.setAttribute('class', 'stArrowBackGray');
//                             });



//                             // Label in the chart (window B) --> pins (window A) 
//                             label.addEventListener('click', function (sender) { // add event to row labels when clicked to open URL
//                                 if (dataRows.length > 0) {
//                                     var link = dataTable.getProperty(dataRows[0], 0, 'link');
//                                     console.log(link);
//                                     window.open(link, '_blank');
//                                 }

//                             });

//                             label.addEventListener('mouseover', function (sender) { // add event to row labels when mouse over to show tooltips
//                                 label.setAttribute('fill', 'red');
//                                 pinCurrent.setAttribute('class', 'stArrowBackGray');
//                             });

//                             label.addEventListener('mouseout', function (sender) {
//                                 label.setAttribute('fill', 'black');
//                                 pinCurrent.setAttribute('class', 'stArrowBackGray');
//                             });

//                             pinCurrent.setAttribute('style', 'cursor: pointer; text-decoration: underline;'); // add cursor event to pin
//                             label.setAttribute('style', 'cursor: pointer; text-decoration: underline;'); // add cursor event to row label

//                         }

//                         // For all other status attribute types (now used for all)
//                         else {

//                             let _labelText = labelText.toString();
//                             let cleanLabelText = _labelText.replace("-", "_"); // clean the label to make HTML happy
//                             //cleanLabelText = cleanLabelText.replace(".", "_");

//                             console.log("cleanLabelText:" + cleanLabelText);

//                             // *** need null checks around all these
//                             var pinColorCurrent = 'pinColor' + cleanLabelText;
//                             var pinCurrComp = document.getElementById(pinColorCurrent); // pin color component

//                             var pinBackCurrent = 'pinBack' + cleanLabelText;
//                             var pinBackCurrComp = document.getElementById(pinBackCurrent); // pin back component (background color of the pin)

//                             console.log("gets here 3.2");
//                             console.log("pinColorCurrent: " + pinColorCurrent);
//                             console.log("pinCurrComp: " + pinCurrComp);

//                             console.log("gets here 3.3");

//                             // This is where Window A is updated with LATEST STATUS BY END TIME
//                             //if (statusColorCurr === 'Within Spec') { pinCurrComp.setAttribute('class', 'stGreen'); }
//                             //else if (statusColorCurr === 'Comm Loss') { pinCurrComp.setAttribute('class', 'stGray'); }
//                             //else if (statusColorCurr === 'Alarm (Out of Spec)') { pinCurrComp.setAttribute('class', 'stRed'); }
//                             //else if (statusColorCurr === 'Warning') { pinCurrComp.setAttribute('class', 'stYellow'); }
//                             //else { pinCurrComp.setAttribute('class', 'stWhite'); }

//                             console.log("gets here 4");

//                             // Entire pin 
//                             var pinCompName = 'pin' + cleanLabelText;
//                             var pinComp = document.getElementById(pinCompName);


//                             if (pinComp != null) {
//                                 pinComp.setAttribute('data-toggle', 'tooltip');
//                                 pinComp.setAttribute('data-placement', 'right');
//                                 pinComp.setAttribute('data-html', 'true');
//                                 pinComp.setAttribute('data-original-title', tooltipData);
//                             }
                            

//                             $('[data-toggle="tooltip"]').tooltip({ placement: 'right' });
//                             console.log("gets here 5");

//                             // Pins (window A) --> label in the chart (window B)

//                             if (pinComp != null) {
//                                 pinComp.addEventListener('click', function (sender) { // add event to pin when clicked to open URL
//                                     let detailsWindowComp1 = document.getElementById('cph_main_details_window1');
//                                     let detailsWindowComp2 = document.getElementById('cph_main_details_window2');

//                                     console.log("6: " + labelText);

//                                     // Gets the RoomDataList for Details Window (only single room)
//                                     $(document).ready(function () {

//                                         $.ajax({
//                                             type: 'POST',
//                                             dataType: 'json',
//                                             contentType: 'application/json',
//                                             url: 'FacilityDashboard.aspx/GetRoomDataListForDetailsWindowSingleRoomAsDictOrdered',
//                                             data: '{"roomNumber":"' + labelText + '"}',
//                                             success:
                                                
//                                                 function (data) {
//                                                     console.log("            GOT HERE AJAX 3 START");

//                                                     var roomValues = data.d;

//                                                     var roomValuesSize = 0;

//                                                     // Count the size of the room value attributes
//                                                     $.each(data.d, function (key, value) {

//                                                         roomValuesSize++;
//                                                     });
//                                                     var halfSize = roomValuesSize / 2;
//                                                     //console.log("roomValuesSize: " + roomValuesSize);

//                                                     var ii = 0;
//                                                     var roomDetailsHTMLStart = '<div style="max-width: 500px; padding:5px 5px 5px 5px;">' + '<table class="table table-sm table-striped">';
//                                                     var roomDetailsHTMLCol1 = '';
//                                                     var roomDetailsHTMLCol2 = '';
//                                                     var roomDetailsHTMLEnd = '</table>' + '</div>';

//                                                     $.each(data.d, function (key, value) {

//                                                         // This logic pipes the labels to produce desired output
//                                                         if (key === "Maximum") {
//                                                             key = "High Alarm Limit";
//                                                         }
//                                                         else if (key === "Minimum") {
//                                                             key = "Low Alarm Limit";
//                                                         }
//                                                         else if (key === "ISO") {
//                                                             key = "Classification";
//                                                             if (value === "7" || value === "8") {
//                                                                 value = "ISO-" + value;
//                                                             }
//                                                         }
//                                                         else if (key === "SQ") {
//                                                             key = "GSF";
//                                                         }
//                                                         else if (key === "BAS (SQL)") {
//                                                             console.log("         ***BAS 111");
//                                                             if (value.includes("Setpoints were defined by virtual point")) {
//                                                                 console.log("         ***BAS 222");
//                                                                 let regex = /Setpoints were defined by virtual point/g;
//                                                                 value = value.replace(regex, "(Virtual) ");
//                                                                 console.log("         ***BAS 333: " + value);

//                                                                 let regex2 = /;/gi;
//                                                                 value = value.replace(regex2, ",<br>");
//                                                                 //value = value.replace(regex2, ",\t");
//                                                                 //value = value.split(";").join(",\n");

//                                                                 console.log("         ***BAS 444: " + value);
//                                                             }
//                                                         }
                                                        

//                                                         // Pipe status icon
//                                                         var valueSymbol = '';
//                                                         if (value === "Within Spec") {
//                                                             valueSymbol =
//                                                                 '<div class="circle-border" style="display: inline-block; background: green; border:3px solid black; width: 20px; height: 20px; border-radius:13px; vertical-align: text-bottom; margin-left: 10px;  "></div>';

//                                                                 //'<span>' +
//                                                                 //'<img src="Images/_StatusIcon_WithinSpec.svg" style="width: inherit; padding-left: 10px;" />' +
//                                                                 //'</span>';
//                                                         }
//                                                         else if (value === "Warning") {
//                                                             valueSymbol =
//                                                                 '<div class="circle-border" style="display: inline-block; background: yellow; border:3px solid black; width: 20px; height: 20px; border-radius:13px; vertical-align: text-bottom; margin-left: 10px;  "></div>';

//                                                                 //'<span>' +
//                                                                 //'<img src="Images/_StatusIcon_Warning.svg" style="width: inherit; padding-left: 10px;" />' +
//                                                                 //'</span>';
//                                                         }
//                                                         else if (value === "Comm Loss") {
//                                                             valueSymbol =
//                                                                 '<div class="circle-border" style="display: inline-block; background: gray; border:3px solid black; width: 20px; height: 20px; border-radius:13px; vertical-align: text-bottom; margin-left: 10px;  "></div>';

//                                                                 //'<span>' +
//                                                                 //'<img src="Images/_StatusIcon_CommLossV2.svg" style="width: inherit; padding-left: 10px;" />' +
//                                                                 //'</span>';
//                                                         }
//                                                         else if (value === "Alarm (Out of Spec)") {
//                                                             valueSymbol =
//                                                                 '<div class="circle-border" style="display: inline-block; background: red; border:3px solid black; width: 20px; height: 20px; border-radius:13px; vertical-align: text-bottom; margin-left: 10px;  "></div>';

//                                                                 //'<span>' +
//                                                                 //'<img src="Images/_StatusIcon_Alarm.svg" style="width: inherit; padding-left: 10px;" />' +
//                                                                 //'</span>';
//                                                         }


//                                                         // End piping logic

//                                                         //if (ii != 0) {
//                                                         if (ii < halfSize) {
//                                                             roomDetailsHTMLCol1 = roomDetailsHTMLCol1 + '<tr><td><strong>' + key + ':</strong></td> <td>' + value + valueSymbol + '</td></tr>'
//                                                             //if (key === "SQ" || key === "Timestamp" || key === "Low Alarm Delay" || key === "Next Calibration") {
//                                                             //    roomDetailsHTMLCol1 = roomDetailsHTMLCol1 + '<tr style="border: 0;"><hr></tr>'
//                                                             //}
//                                                             //if (key === "High Alarm Delay" || key === "Target" || key === "Winter Target Range") {
//                                                             //    roomDetailsHTMLCol1 = roomDetailsHTMLCol1 + '<tr style="border: 0;"></tr>'
//                                                             //}
//                                                         }
//                                                         else {
//                                                             roomDetailsHTMLCol2 = roomDetailsHTMLCol2 + '<tr><td><strong>' + key + ':</strong></td> <td>' + value + valueSymbol + '</td></tr>'
//                                                             //if (key === "SQ" || key === "Timestamp" || key === "Low Alarm Delay" || key === "Next Calibration") {
//                                                             //    roomDetailsHTMLCol2 = roomDetailsHTMLCol2 + '<tr style="border: 0;"><hr></tr>'
//                                                             //}
//                                                             //if (key === "High Alarm Delay" || key === "Target" || key === "Winter Target Range") {
//                                                             //    roomDetailsHTMLCol2 = roomDetailsHTMLCol2 + '<tr style="border: 0;"></tr>'
//                                                             //}
//                                                         }
//                                                         //}
//                                                         ii++;
//                                                     });
//                                                     //console.log("ii: " + ii);

//                                                     var roomDetailsHTMLWindow1 = roomDetailsHTMLStart + roomDetailsHTMLCol1 + roomDetailsHTMLEnd; // First column
//                                                     var roomDetailsHTMLWindow2 = roomDetailsHTMLStart + roomDetailsHTMLCol2 + roomDetailsHTMLEnd; // Second column
//                                                     //console.log("roomDetailsHTML: " + roomDetailsHTML.toString());
//                                                     detailsWindowComp1.innerHTML = roomDetailsHTMLWindow1;
//                                                     detailsWindowComp2.innerHTML = roomDetailsHTMLWindow2;

//                                                     console.log("            GOT HERE AJAX 3 END");
//                                                 }
//                                             ,
//                                             error: function () {
//                                                // alert("Error loading GetRoomDataListForWindowA!! Single room data!!");
//                                             }
//                                         });

//                                     })

//                                     // This was Window A on click --> Nicks trend graph
//                                     //if (dataRows.length > 0) {
//                                     //    var link = dataTable.getProperty(dataRows[0], 0, 'link');
//                                     //    console.log(link);
//                                     //    window.open(link, '_blank');
//                                     //}

//                                 });

//                                 if (pinComp != null) {
//                                     pinComp.addEventListener('mouseover', function (sender) { // add event to pin when mouse over to show tooltips
//                                         label.setAttribute('fill', 'red');
//                                         if (pinBackCurrComp != null) {
//                                             pinBackCurrComp.setAttribute('class', 'stHoverBack');
//                                         }
//                                     });
//                                 }
//                                 if (pinComp != null) {

//                                     pinComp.addEventListener('mouseout', function (sender) {
//                                         label.setAttribute('fill', 'black');
//                                         if (pinBackCurrComp != null) {
//                                             pinBackCurrComp.setAttribute('class', 'stGray');
//                                         }
//                                     });
//                                 }
                                
//                             }
                            



//                             // Label in the chart (window B) --> pins (window A) 
//                             label.addEventListener('click', function (sender) { // add event to row labels when clicked to open URL
//                                 if (dataRows.length > 0) {
//                                     var link = dataTable.getProperty(dataRows[0], 0, 'link');
//                                     console.log(link);
//                                     window.open(link, '_blank');
//                                 }

//                             });

//                             label.addEventListener('mouseover', function (sender) { // add event to row labels when mouse over to show tooltips
//                                 label.setAttribute('fill', 'red');
//                                 if (pinBackCurrComp != null) {
//                                     pinBackCurrComp.setAttribute('class', 'stHoverBack');
//                                 }
                                
//                             });

//                             label.addEventListener('mouseout', function (sender) {
//                                 label.setAttribute('fill', 'black');
//                                 if (pinBackCurrComp != null) {
//                                     pinBackCurrComp.setAttribute('class', 'stGray');
//                                 }
                                

//                             });

//                             if (pinComp != null) {
//                                 pinComp.setAttribute('style', 'cursor: pointer; text-decoration: underline;'); // add cursor event to pin
//                             }
                            
//                             label.setAttribute('style', 'cursor: pointer; text-decoration: underline;'); // add cursor event to row label
//                         }

                        
//                     }



//                 }
//             });
//         });
//     }

//     //console.log("DUMMY 3");

//     chart.draw(dataTable, options);

//     // tableChart to output data
//     //var tableDateFormatter = new google.visualization.DateFormat({ formatType: 'short' });
//     var tableDateFormatter = new google.visualization.DateFormat({ pattern: "M/d/yyyy hh:mm:ss aa" });

//     tableDateFormatter.format(dataTable, 4);
//     tableDateFormatter.format(dataTable, 5);

//     //var tableChart = new google.visualization.Table(document.getElementById('table_chart_div'));
//     //tableChart.draw(dataTable, { allowHTML: true, showRowNumber: true, width: '100%', height: '100%' });

    
// }

// function createCustomHTMLContentTableDP(Name) {
//     return '<div align="left" style="max-width: 300px; padding:5px 5px 5px 5px;">' +
//         '<table>' +
//         '<tr><th>' + 'Name: ' + Name + '</th></tr>' +
//         '</table>' + '</div>';
// }

// function createCustomHTMLContentTable(RoomName, RoomNumber, Class, GSF) {
//     var squared = "2".sup();
//     return '<div align="left" style="max-width: 300px; padding:5px 5px 5px 5px;">' +
//         '<table>' +
//         '<tr><th>' + 'Room: ' + RoomName + '</th></tr>' +
//         '<tr><td><b>' + 'Room #: ' + RoomNumber + '</b></td>' + '</tr>' +
//         '<tr><td><b>' + 'Class: ' + Class + '</b></td>' + '</tr>' +
//         '<tr><td><b>' + 'GSF: ' + GSF + '</b></td>' + '</tr>' +
//         '</table>' + '</div>';
// }

// function createCustomHTMLContentString(RoomNumber, RoomName, Class, GSF) {
//     return RoomNumber + '\n' + RoomName + '\nClass: ' + Class + '\nGSF: ' + GSF;
// }
// function createCustomHTMLContentStringDemo(RoomNumber, RoomName, Class, GSF) {
//     return RoomNumber + '\n' + 'RoomNameX' + '\nClass: ' + 'ClassX' + '\nGSF: ' + '123';
// }

// $(document).ready(function () {

//     $.ajax({
//         type: 'POST',
//         dataType: 'json',
//         contentType: 'application/json',
//         url: 'FacilityDashboard.aspx/GetRoomDataListForWindowA',
//         success:
//             function (data) {
//                 console.log("GOT HERE AJAX 2");
//                 $.each(data.d, function (key, value) {
//                     console.log("2a: " + key + " " + value);

//                     let _key = key.toString();
//                     let cleanString = _key.replace("-", "_");
//                     //cleanString = cleanString.replace(".", "_");

//                     console.log("2b: " + cleanString + " " + value);

//                     if (document.getElementById(cleanString) != null) {
//                         document.getElementById(cleanString).setAttribute('class', value.toString());
//                     }
                    
//                 });
//                 console.log("GOT HERE AJAX 2 END");
//             },
//         error: function () {
//             alert("Error loading GetRoomDataListForWindowA !!");
//         }
//     });

// })


