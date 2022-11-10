<%@ Page Title="FCIS-Home" Language="C#" MasterPageFile="~/FCIS.Master" AutoEventWireup="true" CodeBehind="FCISIndex.aspx.cs" Inherits="FCISPortal.FCISIndex" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cph_error" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cph_main" runat="server">

    <!-- Breadcrumbs-->
    <!-- <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li class="breadcrumb-item active">Overview</li>
        </ol> -->

    <!-- Icon Cards-->

    <div class="card mb-3">
        <!-- <div class="card-header">
            <i class="fas fa-university"></i>
            Facilities Compliance and Inspection Section(FCIS)</div> -->
        <div class="card-body svgCard" style="margin-left: 15px;">
            <div class="row">
                <h4 class="mainTitle" style="margin-left: 0px;">Aseptic Production Facilities Portfolio</h4>
                <br />
            </div>

            <div class="row" id="rowTest">
                <%--Left column = svg--%>
                <div class="panel-left col-md-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7613 11828.29" <%--viewBox="0 0 801.1 700.31"--%>>
                        <style>
                            svg {
                                background-image: url(images/APF-Portfolio_RevisedvMM.svg);
                                background-size: 100% 100%;
                                background-repeat: no-repeat;
                                max-width: 900px;
                                width: 90%;
                            }

                            path {
                                fill: transparent;
                                cursor: pointer;
                                transition: fill 0.2s
                            }

                            /*test with new svg*/
                            /*CCE Facility = brown*/
                            svg #Pin_Facility_2J a:hover path {
                                fill: rgb(180, 107, 23);
                                cursor: pointer;
                            }
                            svg #Pin_Facility_2E a:hover path {
                                fill: rgb(180, 107, 23);
                                cursor: pointer;
                            }
                            svg #Pin_Facility_3E a:hover path {
                                fill: rgb(180, 107, 23);
                                cursor: pointer;
                            }
                            svg #Pin_Facility_East_Terrace a:hover path {
                                fill: rgb(180, 107, 23);
                                cursor: pointer;
                            }

                            /*CC Pharmacy Facility = green*/
                            svg #Pin_Facility_I-IVAU a:hover path {
                                fill: #b5fd19;
                                cursor: pointer;
                            }
                            svg #Pin_Facility_P-IVAU a:hover path {
                                fill: #b5fd19;
                                cursor: pointer;
                            }

                            /*CC Other Facilities = fuchsia*/
                            svg #Pin_Facility_DLM_Image a:hover path {
                                fill: #fb09bf;
                                cursor: pointer;
                            }
                            svg #Pin_Facility_NMD a:hover path {
                                fill: #fb09bf;
                                cursor: pointer;
                            }
                            svg #Pin_Facility_PET_B3 a:hover path {
                                fill: #fb09bf;
                                cursor: pointer;
                            }
                            svg #Pin_Facility_PET_Radiopharm a:hover path {
                                fill:#fb09bf;
                                cursor: pointer;
                            }

                            /*NCI Facility = blue*/
                            svg #Ownership_Facility_Other a:hover path {
                                fill: #0ff;
                                cursor: pointer;
                            }
                            svg #Pin_Facility_HPC13 a:hover path { /*lab 7*/
                                fill: #0ff;
                                cursor: pointer;
                            }
                            svg #Pin_Facility_1B42 a:hover path {
                                fill: #0ff;
                                cursor: pointer;
                            }
                            svg #Pin_Facility_10A a:hover path {
                                fill: #0ff;
                                cursor: pointer;
                            }
                            svg #Pin_Facility_10B a:hover path {
                                fill: #0ff;
                                cursor: pointer;
                            }

                            /*NIAID Facility = red*/
                            svg #Ownership_Facility_NIAID a:hover path { /*lab 2*/
                                fill: #c9363c;
                                cursor: pointer;
                            }



                            .st1 {
                                fill: #e1e1e1
                            }

                            .st2 {
                                fill: #fbb03b
                            }

                            .st3 {
                                fill-opacity: .25;
                                stroke: #000;
                                stroke-linecap: round;
                                stroke-linejoin: round
                            }

                            .st4 {
                                fill: #94762d
                            }

                            .st5 {
                                fill: #0ff
                            }

                            .st6 {
                                fill: #fb09bf
                            }

                            .st7 {
                                fill: #b5fd19
                            }

                            .st9 {
                                fill: none
                            }

                            .st10 {
                                fill: #676767
                            }

                            .st11 {
                                font-family: &apos;
                                Calibri &apos;
                            }

                            .st12 {
                                font-size: 320.8324px
                            }

                            .st14 {
                                font-size: 213.8883px
                            }
                        </style>

                        <g id="Pins_Ownership">

                            <g id="Pin_Facility_2J">
                                <a class="far fa-lab3" data-toggle="tooltip" id="twojtooltip" title="CC CCE 2J Cell Therapy Lab" href="CC-CCE-2J_Main.aspx">

                                    <path class="st3" d="M2551.84 3649.85c-95 95-114.25 236.99-57.93 351.13l-221.41 359.26L2633 4139.9c114.09 56.13 255.89 36.82 350.8-58.09 119.28-119.28 119.28-312.68 0-431.96-119.28-119.28-312.68-119.28-431.96 0zm353.51 353.52c-75.96 75.96-199.11 75.96-275.06 0s-75.96-199.11 0-275.06 199.11-75.96 275.06 0 75.96 199.1 0 275.06z" />
                                    <circle id="CC_Pharmacy_2J" class="st4" cx="2767.82" cy="3865.84" r="194.5" />
                                </a>
                            </g>

                            <%--3E or 3T?--%>
                            <g id="Pin_Facility_3E">
                                <a class="far fa-lab4" data-toggle="tooltip" title="CC CCE 3T Cell Therapy Lab"  href="CC-CCE-3T_Main.aspx">

                                <path class="st3" d="M1677.88 3589.51c-95 95-114.25 236.99-57.93 351.13l-221.41 359.26 360.5-220.34c114.09 56.13 255.89 36.82 350.8-58.09 119.28-119.28 119.28-312.68 0-431.96-119.28-119.28-312.68-119.28-431.96 0zm353.51 353.52c-75.96 75.96-199.11 75.96-275.06 0-75.96-75.96-75.96-199.11 0-275.06 75.96-75.96 199.11-75.96 275.06 0s75.96 199.1 0 275.06z" />
                                <circle id="CC_Pharmacy_3E" class="st4" cx="1893.86" cy="3805.5" r="194.5" />
                                    </a>
                            </g>

                            <g id="Pin_Facility_10A">
                                <a class="far fa-lab6" href="NCI-Trailer1_Main.aspx"   title="NCI Trailer 10A">
                                <path class="st3" d="M1568.89 3340.55c95-95 114.25-236.99 57.93-351.13l221.41-359.26-360.5 220.34c-114.09-56.13-255.89-36.82-350.8 58.09-119.28 119.28-119.28 312.68 0 431.96 119.28 119.28 312.68 119.28 431.96 0zm-353.51-353.52c75.96-75.96 199.11-75.96 275.06 0 75.96 75.96 75.96 199.11 0 275.06-75.96 75.96-199.11 75.96-275.06 0-75.96-75.95-75.96-199.1 0-275.06z" />
                                <circle id="CC_Other_10A" class="st5" cx="1352.91" cy="3124.57" r="194.5" />
                                    </a>
                            </g>

                            <g id="Pin_Facility_10B">
                                <a class="far fa-lab5" href="NCI-Trailer2_Main.aspx"   title="NCI Trailer 10B">
                                <path class="st3" d="M1132.54 2073.69c95 95 236.99 114.25 351.13 57.93l359.26 221.41-220.34-360.5c56.13-114.09 36.82-255.89-58.09-350.8-119.28-119.28-312.68-119.28-431.96 0-119.28 119.28-119.28 312.68 0 431.96zm353.52-353.52c75.96 75.96 75.96 199.11 0 275.06-75.96 75.96-199.11 75.96-275.06 0-75.96-75.96-75.96-199.11 0-275.06 75.95-75.95 199.1-75.95 275.06 0z" />
                                <circle id="CC_Other_10B" class="st5" cx="1348.52" cy="1857.71" r="194.5" />
                                    </a>
                            </g>

                            <g id="Pin_Facility_PET_B3">
                                <a class="far fa-lab8"  href="B3-PET_Main.aspx"  title="CC PET B3 Radiochemistry">
                                <path class="st3" d="M3349.62 1581.68c-95 95-114.25 236.99-57.93 351.13l-221.41 359.26 360.5-220.34c114.09 56.13 255.89 36.82 350.8-58.09 119.28-119.28 119.28-312.68 0-431.96-119.28-119.28-312.67-119.28-431.96 0zm353.52 353.52c-75.96 75.96-199.11 75.96-275.06 0-75.96-75.96-75.96-199.11 0-275.06 75.96-75.96 199.11-75.96 275.06 0 75.95 75.95 75.95 199.1 0 275.06z" />
                                <circle id="NCI_Facility_PET_B3" class="st6" cx="3565.61" cy="1797.67" r="194.5" />
                                    </a>
                            </g>

                            <g id="Pin_Facility_NMD">
                                <a class="far fa-labten"  href="CC-NMD_Radio_Main.aspx"  title="CC NMD Radiopharmacy">
                                <path class="st3" d="M3556.34 3388.81c0-134.35-86.79-248.37-207.33-289.25l-97.48-410.6-99.11 410.72c-120.36 40.98-206.98 154.9-206.98 289.13 0 168.69 136.75 305.45 305.45 305.45 168.7-.01 305.45-136.76 305.45-305.45zm-499.94 0c0-107.42 87.08-194.5 194.5-194.5s194.5 87.08 194.5 194.5-87.08 194.5-194.5 194.5-194.5-87.08-194.5-194.5z" />
                                <circle id="NCI_Facility_NMD" class="st6" cx="3250.9" cy="3388.81" r="194.5" />
                                    </a>
                            </g>

                            <g id="Pin_Facility_P-IVAU">
                                <a class="far fa-lab15" title="CC Pharmacy P-IVAU"  href="P-IVAU_Main.aspx">
                                <path class="st3" d="M6028.59 1181.75c-95 95-114.25 236.99-57.93 351.13l-221.41 359.26 360.5-220.34c114.09 56.13 255.89 36.82 350.8-58.09 119.28-119.28 119.28-312.68 0-431.96-119.28-119.28-312.67-119.28-431.96 0zm353.52 353.52c-75.96 75.96-199.11 75.96-275.06 0-75.96-75.96-75.96-199.11 0-275.06 75.96-75.96 199.11-75.96 275.06 0s75.95 199.1 0 275.06z" />
                                <circle id="CCE_Facility_P-IVAU" class="st7" cx="6244.57" cy="1397.74" r="194.5" />
                                    </a>
                            </g>

                            <g id="Pin_Facility_East_Terrace">
                                <a class="far fa-lab16" title="CC CCE East Terrace Modular"  href="CC-CCE-NCI_Main.aspx">
                                <path class="st3" d="M5879.99 3036.92c134.35 0 248.37-86.78 289.25-207.33l410.6-97.48-410.72-99.11c-40.98-120.36-154.9-206.98-289.13-206.98-168.69 0-305.44 136.75-305.45 305.44 0 168.71 136.75 305.46 305.45 305.46zm0-499.95c107.42 0 194.5 87.08 194.5 194.5s-87.08 194.5-194.5 194.5-194.5-87.08-194.5-194.5 87.08-194.5 194.5-194.5z" />
                                <circle id="CC_Pharmacy_East_Terrace" class="st4" cx="5879.99" cy="2731.47" r="194.5" />
                                    </a>
                            </g>

                            <g id="Pin_Facility_I-IVAU">
                                <a href="I-IVAU_Main.aspx" class="far fa-ivau" data-toggle="tooltip" title="CC Pharmacy I-IVAU">
                                    <path class="st3" d="M6046.3 3552.46c-134.36 0-248.37 86.78-289.25 207.32l-410.6 97.48 410.72 99.11c40.98 120.36 154.9 206.98 289.13 206.98 168.69 0 305.45-136.75 305.45-305.45 0-168.68-136.76-305.44-305.45-305.44zm0 499.95c-107.42 0-194.5-87.08-194.5-194.5s87.08-194.5 194.5-194.5 194.5 87.08 194.5 194.5-87.08 194.5-194.5 194.5z" />
                                    <circle id="CCE_Facility_I-VAU" class="st7" cx="6046.3" cy="3857.91" r="194.5" />
                                </a>
                            </g>

                            <%--this is actually 12E--%>
                            <g id="Pin_Facility_2E">
                                <a class="far fa-lab13" title="CC CCE 12 East Cell Therapy" href="CC-CCE-12E_Main.aspx" >
                                <path class="st3" d="M6124.81 4647.94c-95-95-236.99-114.25-351.13-57.93l-359.26-221.41 220.34 360.5c-56.13 114.09-36.82 255.89 58.09 350.8 119.28 119.28 312.68 119.28 431.96 0 119.29-119.28 119.29-312.68 0-431.96zm-353.51 353.51c-75.96-75.96-75.96-199.11 0-275.06 75.96-75.96 199.11-75.96 275.06 0 75.96 75.96 75.96 199.11 0 275.06-75.95 75.96-199.1 75.96-275.06 0z" />
                                <circle id="CC_Pharmacy_2E" class="st4" cx="5908.83" cy="4863.92" r="194.5" />
                                    </a>
                            </g>

                            <g id="Pin_Facility_HPC13"> <%--update href--%>
                                <a class="far fa-lab7" href="NCY_Hyperpolarized_C13_Main.aspx"   title="NCI Hyperpolarized Cell Labeling Lab">
                                <path class="st3" d="M6568.1 6441.99c-95-95-236.99-114.25-351.13-57.93l-359.26-221.41 220.34 360.5c-56.13 114.09-36.82 255.89 58.09 350.8 119.28 119.28 312.68 119.28 431.96 0s119.28-312.67 0-431.96zm-353.52 353.52c-75.96-75.96-75.96-199.11 0-275.06 75.96-75.96 199.11-75.96 275.06 0s75.96 199.11 0 275.06-199.1 75.95-275.06 0z" />
                                <circle id="CC_Other_HP13" class="st5" cx="6351.75" cy="6657.98" r="194.5" />
                                    </a>
                            </g>

                            <g id="Ownership_Facility_Other">
                                <a class="far fa-labOne"  title="NCI Surgery Branch TIL Modular"  href="NCI-Mod_Main.aspx"  >
                                <path class="st3" d="M3639.09 8304.34c-95-95-236.99-114.25-351.13-57.93L2928.7 8025l220.34 360.5c-56.13 114.09-36.82 255.89 58.09 350.8 119.28 119.28 312.68 119.28 431.96 0 119.28-119.28 119.28-312.67 0-431.96zm-353.51 353.52c-75.96-75.96-75.96-199.11 0-275.07s199.11-75.96 275.06 0c75.96 75.96 75.96 199.11 0 275.06s-199.11 75.96-275.06.01z" />
                                <circle id="CC_Other_T_30" class="st5" cx="3423.11" cy="8520.32" r="194.5" />
                                    </a>
                            </g>

                            <g id="Ownership_Facility_NIAID"> <%--update href??--%>
                                <a class="far fa-lab2" href="NIAID_29B_Bio_Facility_Main.aspx" title="NIAID 29B Bioreactor Pilot Plant">
                                <path class="st3" d="M1180.85 10244.69c-95 95-114.25 236.99-57.93 351.13l-221.41 359.26 360.5-220.34c114.09 56.13 255.89 36.82 350.8-58.09 119.28-119.28 119.28-312.68 0-431.96-119.28-119.28-312.68-119.28-431.96 0zm353.51 353.51c-75.96 75.96-199.11 75.96-275.06 0-75.96-75.96-75.96-199.11 0-275.06 75.96-75.96 199.11-75.96 275.06 0 75.96 75.96 75.96 199.11 0 275.06z" />
                                <circle cx="1396.83" cy="10460.67" r="194.5" fill="#c9363c" stroke="#000" stroke-miterlimit="10" />
                                    </a>
                            </g>

                            <g id="Pin_Facility_1B42">
                                <a class="far fa-lab11"  href="NCI-1B42_Main.aspx" title="NCI Surgery Branch 1B42">
                                <path class="st3" d="M5071.5 5836.78c95-95 114.25-236.99 57.93-351.13l221.41-359.26-360.5 220.34c-114.09-56.13-255.89-36.82-350.8 58.09-119.28 119.28-119.28 312.68 0 431.96 119.28 119.28 312.68 119.28 431.96 0zm-353.51-353.52c75.96-75.96 199.11-75.96 275.06 0 75.96 75.96 75.96 199.11 0 275.06-75.96 75.96-199.11 75.96-275.06 0s-75.96-199.1 0-275.06z" />
                                <circle id="CC_Other_HP13_1b42" class="st5" cx="4855.52" cy="5620.79" r="194.5" />
                                    </a>
                            </g>

                            <g id="Pin_Facility_DLM_Image">
                                <a class="far fa-lab14"  href="CC-DLM-Lab_Main.aspx" title="CC DLM Sterility Lab">
                                <path class="st3" d="M3738.65 4701.06c95-95 114.25-236.99 57.93-351.13l221.41-359.26-360.5 220.34c-114.09-56.13-255.89-36.82-350.8 58.09-119.28 119.28-119.28 312.68 0 431.96 119.28 119.29 312.68 119.29 431.96 0zm-353.51-353.51c75.96-75.96 199.11-75.96 275.06 0 75.96 75.96 75.96 199.11 0 275.06-75.96 75.96-199.11 75.96-275.06 0-75.96-75.95-75.96-199.11 0-275.06z" />
                                <circle id="NCI_Facility_DLM_Image" class="st6" cx="3522.67" cy="4485.08" r="194.5" />
                                    </a>
                            </g>

                            <g id="Pin_Facility_PET_Radiopharm">
                                <a class="far fa-lab9"  href="B1-PET_Main.aspx" title="CC PET Radiopharmacy">
                                <path class="st3" d="M2262.85 2113.21c95 95 236.99 114.25 351.13 57.93l359.26 221.41-220.34-360.5c56.13-114.09 36.82-255.89-58.09-350.8-119.28-119.28-312.68-119.28-431.96 0-119.28 119.28-119.28 312.68 0 431.96zm353.52-353.51c75.96 75.96 75.96 199.11 0 275.06s-199.11 75.96-275.06 0c-75.96-75.96-75.96-199.11 0-275.06 75.95-75.96 199.1-75.96 275.06 0z" />
                                <circle id="NCI_Facility_PET_Radiopharm" class="st6" cx="2478.84" cy="1897.23" r="194.5" />
                                    </a>
                            </g>
                        </g>

                    </svg>
                </div>

        

                <%--center column--%>
                <div class="col-md-3 panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    <div id="panelsGroup">
                        <%--panelsGroup = javascript that controls only one panel opening at a time--%>

                        <%--Center-left column--%>

                        <%--APF Portfolio Panel--%>
                        <div class="panel panel-default" id="APFPortfolioPanel">
                            <div class="panel-heading" role="tab" id="headingAPFPortfolio">
                                <h4 class="panel-title twoJbutton">
                                    <span class="accordion_link blackButtonTitle"><a href="#"><b>APF Portfolio</b></a></span>
                                    <a class="collapsed blackButtonTitle" data-toggle="collapse" data-parent="#accordion"
                                        href="#collapseAPFPortfolio" aria-expanded="false" aria-controls="collapseAPFPortfolio"></a>
                                </h4>

                            </div>
                            <div id="collapseAPFPortfolio" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingAPFPortfolio">
                                <div class="card cardWidth">
                                    <ul>
                                       <li><a href="FacilityDashboard.aspx?FID=0">APF Facility Dashboard </a></li>
                                     <%--    <li><a href="FacilityDetailDashboard.aspx?FID=0" target="_self">FCIS Business Dashboard </a></li>
                                        <li><a href="apfdailyrep.aspx?FID=3" target="_self">FCIS Project Data </a></li>
                                        <li><a href="Images/CCE_2J_Cell_Therapy_Lab.pdf" target="_blank">FCIS Project Kanban (TODO link)</a></li>--%>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <%--CC CCE 2J Cell Therapy Lab Panel--%>
                        <div class="panel panel-default" id="CCCCE2JPanel">
                            <div class="panel-heading" role="tab" id="headingThree">
                                <h4 class="twoJHover panel-title petB1">
                                    <span class="accordion_link blackButtonTitle"><a href="CC-CCE-2J_Main.aspx">CC CCE 2J Cell Therapy Lab</a></span>
                                    <a class="collapsed blackButtonTitle" data-toggle="collapse" data-parent="#accordion"
                                        href="#collapseCCCCE2J" aria-expanded="false" aria-controls="collapseCCCCE2J"></a>
                                </h4>

                            </div>
                            <div id="collapseCCCCE2J" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingThree">
                                <div class="card cardWidth">
                                    <ul>
                                        <li><a href="FacilityDashboard.aspx?FID=3">Facility Dashboard </a></li>
                           <%--             <li><a href="FacilityDetailDashboard.aspx?FID=3" target="_self">Facility Detail Dashboard</a></li>--%>
                                        <%--<li><a href="apfdailyrep.aspx?FID=3" target="_self">Daily Reports</a></li>--%>
                                        <%--<li><a href="Images/CCE_2J_Cell_Therapy_Lab.pdf" target="_blank">Facility Diagram </a></li>--%>
                                        <li><asp:LinkButton ID="lnkDoc2J"  runat="server" CommandArgument="3" OnClick="lnkDoc_Click">Facility Diagram</asp:LinkButton></li>
                                        <li><a href="CC-CCE-2J_Main.aspx" target="_self">Description</a></li>
                                        <li><a href="CC-CCE-2J_Documents.aspx" target="_self">Documents</a></li>
                                        <li><a href="CC-CCE-2J_Pictures.aspx" target="_self">Pictures </a></li>
                                        <li><a href="https://dtrdata.orf.od.nih.gov/APFDaily/ViewDailyReport.aspx?FacilityID=1" target="_blank">FMC Daily Reports</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <%--CC CCE 3T Cell Therapy Lab Panel (note: rest of panels do not have id set)--%>
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingNine">
                                <h4 class="threeTHover panel-title twoJbutton">
                                    <span class="accordion_link blackButtonTitle"><a href="CC-CCE-3T_Main.aspx">CC CCE 3T Cell Therapy Lab</a></span>
                                    <a class="collapsed blackButtonTitle" data-toggle="collapse" data-parent="#accordion" href="#collapseCCCCE3T"
                                        aria-expanded="false" aria-controls="collapseCCCCE3T"></a>
                                </h4>

                            </div>
                            <div id="collapseCCCCE3T" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingNine">
                                <div class="card cardWidth">
                                    <ul>
                                        <%--<li><a href="FacilityDashboard.aspx?FID=16">Facility Dashboard</a></li>
                                        <li><a href="FacilityDetailDashboard.aspx?FID=16" target="_self">Facility Detail Dashboard </a></li>--%>
                                        <%--<li><a href="apfdailyrep.aspx?FID=16" target="_self">Daily Reports</a></li>--%>
                                        <li><asp:LinkButton ID="lnk3T"  runat="server" CommandArgument="16" OnClick="lnkDoc_Click" >Facility Diagram</asp:LinkButton></li>
                                        <li><a href="CC-CCE-3T_Main.aspx" target="_self">Description</a></li>
                                        <li><a href="CC-CCE-3T_Documents.aspx" target="_self">Documents</a></li>
                                        <li><a href="CC-CCE-3T_Pictures.aspx" target="_self">Pictures </a></li>
<%--                                        <li><a href="https://dtrdata.orf.od.nih.gov/apfdaily/viewdailyreport.aspx?FID=16" class="disabled" target="_blank">FMC Daily Reports</a></li>--%>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <%--CC CCE 12E Cell Therapy Lab Panel--%>
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingEleven">
                                <h4 class="twelveEHover panel-title petB1">
                                    <span class="accordion_link blackButtonTitle"><a href="CC-CCE-12E_Main.aspx">CC CCE 12E Cell Therapy Lab</a></span>
                                    <a class="collapsed blackButtonTitle" data-toggle="collapse" data-parent="#accordion" href="#collapseCCCCE12E"
                                        aria-expanded="false" aria-controls="collapseCCCCE12E"></a>
                                </h4>

                            </div>
                            <div id="collapseCCCCE12E" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingEleven">
                                <div class="card cardWidth">
                                    <ul>
                                       <%-- <li><a href="FacilityDashboard.aspx?FID=4">Facility Dashboard </a></li>
                                        <li><a href="FacilityDetailDashboard.aspx?FID=4" target="_self">Facility Detail Dashboard </a></li>--%>
                                        <%--<li><a href="apfdailyrep.aspx?FID=4" target="_self">Daily Reports</a></li>--%>
                                         <li><asp:LinkButton ID="lnk12E"  runat="server" CommandArgument="4" OnClick="lnkDoc_Click">Facility Diagram</asp:LinkButton></li>
                                        <li><a href="CC-CCE-12E_Main.aspx" target="_self">Description</a></li>
                                        <li><a href="CC-CCE-12E_Documents.aspx" target="_self">Documents</a></li>
                                        <li><a href="CC-CCE-12E_Pictures.aspx" target="_self">Pictures </a></li>
<%--                                          <li><a href="https://dtrdata.orf.od.nih.gov/apfdaily/viewdailyreport.aspx?FID=4" class="disabled" target="_blank">FMC Daily Reports</a></li>--%>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <%--CC CCE East Terrace Modular Panel--%>
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingTwelve">
                                <h4 class="NCIEHover panel-title twoJbutton">
                                    <span class="accordion_link blackButtonTitle"><a href="CC-CCE-NCI_Main.aspx">CC CCE East Terrace Modular</a></span>
                                    <a class="collapsed blackButtonTitle" data-toggle="collapse" data-parent="#accordion" href="#collapseCCCCE"
                                        aria-expanded="false" aria-controls="collapseCCCCE"></a>
                                </h4>

                            </div>
                            <div id="collapseCCCCE" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTwelve">
                                <div class="card cardWidth">
                                    <ul>
                                         <li><a href="FacilityDashboard.aspx?FID=5">Facility Dashboard </a></li>
                                       <%--<li><a href="FacilityDetailDashboard.aspx?FID=5" target="_self">Facility Detail Dashboard </a></li>--%>
                                        <%--<li><a href="apfdailyrep.aspx?FID=5" target="_self">Daily Reports</a></li>--%>
                                        <li><asp:LinkButton ID="lnkCCE"  runat="server" CommandArgument="5" OnClick="lnkDoc_Click">Facility Diagram</asp:LinkButton></li>
                                        <li><a href="CC-CCE-NCI_Main.aspx" target="_self">Description</a></li>
                                        <li><a href="CC-CCE-NCI_Documents.aspx" target="_self">Documents</a></li>
                                        <li><a href="CC-CCE-NCI_Pictures.aspx" target="_self">Pictures </a></li>
<%--                                       <li><a href="https://dtrdata.orf.od.nih.gov/apfdaily/viewdailyreport.aspx?FID=5" class="disabled" target="_blank">FMC Daily Reports</a></li>--%>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <%--CC DLM Sterility Lab Panel--%>
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingFourteen">
                                <h4 class="DLMSHover panel-title petB1">
                                    <span class="accordion_link blackButtonTitle"><a href="CC-DLM-Lab_Main.aspx">CC DLM Sterility Lab</a></span>
                                    <a class="collapsed blackButtonTitle" data-toggle="collapse" data-parent="#accordion" href="#collapseCCDLM"
                                        aria-expanded="false" aria-controls="collapseCCDLM"></a>
                                </h4>

                            </div>
                            <div id="collapseCCDLM" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingFour">
                                <div class="card cardWidth">
                                    <ul>
                                       <li><a href="FacilityDashboard.aspx?FID=6">Facility Dashboard </a></li>
                                       <%--  <li><a href="FacilityDetailDashboard.aspx?FID=6" target="_self">Facility Detail Dashboard </a></li>--%>
                                        <%--<li><a href="apfdailyrep.aspx?FID=6" target="_self">Daily Reports</a></li>--%>
                                        <li><asp:LinkButton ID="lnkDLM"  runat="server" CommandArgument="6" OnClick="lnkDoc_Click">Facility Diagram</asp:LinkButton></li>
                                        <li><a href="CC-DLM-Lab_Main.aspx" target="_self">Description</a></li>
                                        <li><a href="CC-DLM-Lab_Documents.aspx" target="_self">Documents</a></li>
                                        <li><a href="CC-DLM-Lab_Pictures.aspx" target="_self">Pictures </a></li>
<%--                                         <li><a href="https://dtrdata.orf.od.nih.gov/apfdaily/viewdailyreport.aspx?FID=6" class="disabled" target="_blank">FMC Daily Reports</a></li>--%>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <%--CC NMD Radiopharmacy Panel--%>
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingFour">
                                <h4 class="nmradioHover panel-title twoJbutton">
                                    <span class="accordion_link blackButtonTitle"><a href="CC-NMD_Radio_Main.aspx">CC NMD Radiopharmacy</a></span>
                                    <a class="collapsed blackButtonTitle" data-toggle="collapse" data-parent="#accordion" href="#collapseCCNMD"
                                        aria-expanded="false" aria-controls="collapseCCNMD"></a>
                                </h4>

                            </div>
                            <div id="collapseCCNMD" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingFour">
                                <div class="card cardWidth">
                                    <ul>
                                       <%--  <li><a href="FacilityDashboard.aspx?FID=7">Facility Dashboard </a></li>
                                       <li><a href="FacilityDetailDashboard.aspx?FID=1" target="_self">Facility Detail Dashboard </a></li>--%>
                                        <%--<li><a href="apfdailyrep.aspx?FID=1" target="_self">Daily Reports</a></li>--%>
                                        <li><asp:LinkButton ID="lnkNMD"  runat="server" CommandArgument="7" OnClick="lnkDoc_Click">Facility Diagram</asp:LinkButton></li>
                                        <li><a href="CC-NMD_Radio_Main.aspx" target="_self">Description</a></li>
                                        <li><a href="CC-NMD_Radio_Documents.aspx" target="_self">Documents</a></li>
                                        <li><a href="CC-NMD_Radio_Pictures.aspx" target="_self">Pictures </a></li>
<%--                                        <li><a href="https://dtrdata.orf.od.nih.gov/apfdaily/viewdailyreport.aspx?FID=1" class="disabled" target="_blank">FMC Daily Reports</a></li>--%>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <%--CC PET B3 RadioChemistry Panel--%>
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingTwo">
                                <h4 class="petB3hover panel-title petB1">
                                    <span class="accordion_link blackButtonTitle"><a href="B3-PET_Main.aspx">CC PET B3 Radiochemistry</a></span>
                                    <a class="collapsed blackButtonTitle" data-toggle="collapse" data-parent="#accordion" href="#collapseFour"
                                        aria-expanded="false" aria-controls="collapseFour"></a>
                                </h4>

                            </div>
                            <div id="collapseFour" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTwo">
                                <div class="card cardWidth">
                                    <ul>
                                        <li><a href="FacilityDashboard.aspx?FID=2">Facility Dashboard </a></li>
                              <%--          <li><a href="FacilityDetailDashboard.aspx?FID=2" target="_self">Facility Detail Dashboard </a></li>--%>
                                        <%--<li><a href="apfdailyrep.aspx?FID=2" target="_self">Daily Reports</a></li>--%>
                                       <li><asp:LinkButton ID="lnkPETB3"  runat="server" CommandArgument="2" OnClick="lnkDoc_Click">Facility Diagram</asp:LinkButton></li>
                                        <li><a href="B3-PET_Main.aspx" target="_self">Description</a></li>
                                        <li><a href="B3-PET_Documents.aspx" target="_self">Documents</a></li>
                                        <li><a href="B3-PET_Pictures.aspx" target="_self">Pictures </a></li>
<%--                                       <li><a href="https://dtrdata.orf.od.nih.gov/apfdaily/viewdailyreport.aspx?FID=2" class="disabled" target="_blank">FMC Daily Reports</a></li>--%>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <%--CC PET Radiopharmacy Panel--%>
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingOne">
                                <h4 class="petB1hover panel-title twoJbutton">
                                    <span class="accordion_link blackButtonTitle"><a href="B1-PET_Main.aspx">CC PET Radiopharmacy</a></span>
                                    <a class="collapsed blackButtonTitle" data-toggle="collapse" data-parent="#accordion" href="#collapseOne"
                                        aria-expanded="false" aria-controls="collapseOne"></a>
                                </h4>

                            </div>
                            <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                <div class="card cardWidth">
                                    <ul>
                                        <li><a href="FacilityDashboard.aspx?FID=1">Facility Dashboard </a></li>
                                      <%--  <li><a href="FacilityDetailDashboard.aspx?FID=1" target="_self">Facility Detail Dashboard </a></li>--%>
                                        <%--<li><a href="apfdailyrep.aspx" target="_self">Daily Reports</a></li>--%>
                                        <li><asp:LinkButton ID="lnkPETRa"  runat="server" CommandArgument="1" OnClick="lnkDoc_Click">Facility Diagram</asp:LinkButton></li>
                                        <li><a href="B1-PET_Main.aspx" target="_self">Description</a></li>
                                        <li><a href="B1-PET_Documents.aspx" target="_self">Documents</a></li>
                                        <li><a href="B1-PET_Pictures.aspx" target="_self">Pictures </a></li>
<%--                                         <li><a href="https://dtrdata.orf.od.nih.gov/apfdaily/viewdailyreport.aspx?FID=1" class="disabled" target="_blank">FMC Daily Reports</a></li>--%>
                                    </ul>
                                </div>
                            </div>
                        </div>


                    </div>
                    <script>
                        $('.collapse').on('shown.bs.collapse', function () {
                            $(this).prev().addClass('collapsed');

                            var $panelsGroup2 = $('#panelsGroup2');
                            var $panelsGroup = $('#panelsGroup');
                            $panelsGroup.on('show.bs.collapse', '.collapse', function () {
                                $panelsGroup2.find('.collapse.in').collapse('hide');
                                $panelsGroup.find('.collapse.in').collapse('hide');
                            });

                        });

                        $('.collapse').on('hidden.bs.collapse', function () {
                            $(this).prev().removeClass('collapsed');

                        });
                    </script>
                </div>

                <%--right column--%>
                <div class="col-md-3 panel-group" id="accordion2" role="tablist" aria-multiselectable="true">
                    <div id="panelsGroup2">
                        <%--CC Pharmacy I-IVAU Panel--%>
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingFive"<%--onclick="javascript:ColapseAllButClicked(this);"--%>>
                                <h4 class="ivauHover panel-title twoJbutton">
                                    <span class="accordion_link blackButtonTitle"><a href="I-IVAU_Main.aspx">CC Pharmacy I-IVAU</a></span>
                                    <a class="collapsed blackButtonTitle" data-toggle="collapse" data-parent="#accordion" href="#collapseFive"
                                        aria-expanded="false" aria-controls="collapseFive" ></a>
                                </h4>

                            </div>
                            <div id="collapseFive" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingFive">
                                <div class="card cardWidth">
                                    <ul>
                                        <li><a href="FacilityDashboard.aspx?FID=17">Facility Dashboard </a></li>
                                     <%--   <li><a href="FacilityDetailDashboard.aspx?FID=8" target="_self">Facility Detail Dashboard </a></li>--%>
                                        <%--<li><a href="apfdailyrep.aspx?FID=8" target="_self">Daily Reports</a></li>--%>
                                        <li><asp:LinkButton ID="lnkIIVAU"  runat="server" CommandArgument="8" OnClick="lnkDoc_Click">Facility Diagram</asp:LinkButton></li>
                                        <li><a href="I-IVAU_Main.aspx" target="_self">Description</a></li>
                                        <li><a href="I-IVAU_Documents.aspx" target="_self">Documents</a></li>
                                        <li><a href="I-IVAU_Pictures.aspx" target="_self">Pictures </a></li>
                                        <li><a href="https://dtrdata.orf.od.nih.gov/APFDaily/ViewDailyReport.aspx?FacilityID=2" target="_blank">FMC Daily Reports</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <%--CC Pharmacy P-IVAU Panel--%>
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingThirteen" <%--onclick="javascript:ColapseAllButClicked(this);"--%>>
                                <h4 class="pvauHover panel-title petB1">
                                    <span class="accordion_link blackButtonTitle"><a href="P-IVAU_Main.aspx">CC Pharmacy P-IVAU</a></span>
                                    <a class="collapsed blackButtonTitle" data-toggle="collapse" data-parent="#accordion" href="#collapseThree"
                                        aria-expanded="false" aria-controls="collapseThree" ></a>
                                </h4>

                            </div>
                            <div id="collapseThree" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingThirteen">
                                <div class="card cardWidth">
                                    <ul>
                                        <%--<li><a href="FacilityDashboard.aspx?FID=9">Facility Dashboard </a></li>
                                        <li><a href="FacilityDetailDashboard.aspx?FID=9" target="_self">Facility Detail Dashboard </a></li>--%>
                                        <%--<li><a href="apfdailyrep.aspx?FID=9" target="_self">Daily Reports</a></li>--%>
                                        <li><asp:LinkButton ID="lnkPIAU"  runat="server" CommandArgument="9" OnClick="lnkDoc_Click">Facility Diagram</asp:LinkButton></li>
                                        <li><a href="P-IVAU_Main.aspx" target="_self">Description</a></li>
                                        <li><a href="P-IVAU_Documents.aspx" target="_self">Documents</a></li>
                                        <li><a href="P-IVAU_Pictures.aspx" target="_self">Pictures </a></li>
<%--                                        <li><a href="https://dtrdata.orf.od.nih.gov/apfdaily/viewdailyreport.aspx?facilityid=3" class="disabled" target="_blank">FMC Daily Reports</a></li>--%>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <%--NCI Trailer 10A Facility Panel = Trailer 1--%>
                        <div class="panel panel-default" id="NCITrailer10APanel">
                            <div class="panel-heading" role="tab" id="headingNCITrailer10A">
                                <h4 class="trailer1Hover panel-title twoJbutton"><%--***note: twoJbutton = dark, petB1 = light ***--%>
                                    <span class="accordion_link blackButtonTitle"><a href="NCI-Trailer1_Main.aspx">NCI Trailer 10A Facility</a></span>
                                    <a class="collapsed blackButtonTitle" data-toggle="collapse" data-parent="#accordion"
                                        href="#collapseNCITrailer10A" aria-expanded="false" aria-controls="collapseNCITrailer10A"></a>
                                </h4>

                            </div>
                            <div id="collapseNCITrailer10A" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingNCITrailer10A">
                                <div class="card cardWidth">
                                    <%--TODO update links and link FIDs--%>
                                    <ul>
                                         <li><a href="FacilityDashboard.aspx?FID=13">Facility Dashboard </a></li>
                                 <%--       <li><a href="FacilityDetailDashboard.aspx?FID=13" target="_self">Facility Detail Dashboard </a></li>--%>
                                        <%--<li><a href="apfdailyrep.aspx?FID=13" target="_self">Daily Reports</a></li>--%>
                                       <li><asp:LinkButton ID="lnk10A"  runat="server" CommandArgument="13" OnClick="lnkDoc_Click">Facility Diagram</asp:LinkButton></li>
                                          <li><a href="NCI-Trailer1_Main.aspx" target="_self">Description</a></li>
                                        <li><a href="NCI-Trailer1_Documents.aspx" target="_self">Documents</a></li>
                                        <li><a href="NCI-Trailer1_Pictures.aspx" target="_self">Pictures </a></li>
<%--                                        <li><a href="https://dtrdata.orf.od.nih.gov/APFDaily/ViewDailyReport.aspx?FacilityID=12" class="disabled"  target="_blank">FMC Daily Reports</a></li>--%>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <%--NCI Trailer 10B Facility Panel = Trailer 2--%>
                        <div class="panel panel-default" id="NCITrailer10BPanel">
                            <div class="panel-heading" role="tab" id="headingNCITrailer10B">
                                <h4 class="trailer2Hover panel-title petB1"><%--***note: twoJbutton = dark, petB1 = light ***--%>
                                    <span class="accordion_link blackButtonTitle"><a href="NCI-Trailer1_Main.aspx">NCI Trailer 10B Facility</a></span>
                                    <a class="collapsed blackButtonTitle" data-toggle="collapse" data-parent="#accordion"
                                        href="#collapseNCITrailer10B" aria-expanded="false" aria-controls="collapseNCITrailer10B"></a>
                                </h4>

                            </div>
                            <div id="collapseNCITrailer10B" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingNCITrailer10B">
                                <div class="card cardWidth">
                                    <%--TODO update links and link FIDs--%>
                                    <ul>
                                         <li><a href="FacilityDashboard.aspx?FID=12">Facility Dashboard </a></li>
                                        <%--<li><a href="FacilityDetailDashboard.aspx?FID=12" target="_self">Facility Detail Dashboard </a></li>--%>
                                        <%--<li><a href="apfdailyrep.aspx?FID=13" target="_self">Daily Reports</a></li>--%>
                                        <li><asp:LinkButton ID="lnk10B"  runat="server" CommandArgument="12" OnClick="lnkDoc_Click">Facility Diagram</asp:LinkButton></li>
                                          <li><a href="NCI-Trailer2_Main.aspx" target="_self">Description</a></li>
                                        <li><a href="NCI-Trailer2_Documents.aspx" target="_self">Documents</a></li>
                                        <li><a href="NCI-Trailer2_Pictures.aspx" target="_self">Pictures </a></li>
                                         <li><a href="https://dtrdata.orf.od.nih.gov/apfdaily/viewdailyreport.aspx?facilityid=4" target="_blank">FMC Daily Reports</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <%--NCI Surgery Branch 1B42 Panel--%>
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingTen">
                                <h4 class="vvfHover panel-title twoJbutton">
                                    <span class="accordion_link blackButtonTitle"><a href="NCI-1B42_Main.aspx">NCI Surgery Branch 1B42</a></span>
                                    <a class="collapsed blackButtonTitle" data-toggle="collapse" data-parent="#accordion" href="#collapseSeven"
                                        aria-expanded="false" aria-controls="collapseSeven"></a>
                                </h4>

                            </div>
                            <div id="collapseSeven" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTen">
                                <div class="card cardWidth">
                                    <ul>
                                        <li><a href="FacilityDashboard.aspx?FID=10">Facility Dashboard </a></li>
                               <%--         <li><a href="FacilityDetailDashboard.aspx?FID=10" target="_self">Facility Detail Dashboard </a></li>--%>
                                        <%--<li><a href="apfdailyrep.aspx?FID=10" target="_self">Daily Reports</a></li>--%>
                                       <li><asp:LinkButton ID="lnk1B42"  runat="server" CommandArgument="10" OnClick="lnkDoc_Click">Facility Diagram</asp:LinkButton></li>
                                        <li><a href="NCI-1B42_Main.aspx" target="_self">Description</a></li>
                                        <li><a href="NCI-1B42_Documents.aspx" target="_self">Documents</a></li>
                                        <li><a href="NCI-1B42_Pictures.aspx" target="_self">Pictures </a></li>
                                        <li><a href="https://dtrdata.orf.od.nih.gov/APFDaily/ViewDailyReport.aspx?FacilityID=3" target="_blank">FMC Daily Reports</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <%--NCI Surgery Branch 3W TIL Lab                       (TODO Delete this panel)--%>
                        <%--<div class="panel panel-default">
                                <div class="panel-heading" role="tab" id="headingSix">
                                    <h4 class="NCI1B42Hover panel-title petB1">
                                        <span class="accordion_link blackButtonTitle"><a href="NCI_3W_TIL_Lab_Main.aspx">NCI Surgery Branch 3W TIL Lab</a></span>
                                        <a class="collapsed blackButtonTitle" data-toggle="collapse" data-parent="#accordion" href="#collapseSix"
                                            aria-expanded="false" aria-controls="collapseSix"></a>
                                    </h4>

                                </div>
                                <div id="collapseSix" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingSix">
                                    <div class="card cardWidth">
                                        <ul>
                                            <li><a href="FacilityDashboard.aspx?FID=15">Facility Dashboard </a></li>
                                            <li><a href="FacilityDetailDashboard.aspx?FID=15" target="_self">Facility Detail Dashboard </a></li>
                                            <li><a href="apfdailyrep.aspx?FID=15" target="_self">Daily Reports</a></li>
                                            <li><a href="Images/NCI_SB_3W_TIL_Lab.pdf" target="_blank">Facility Diagram </a></li>
                                            <li><a href="CC-NMD_Radio_Main.aspx" target="_self">Description</a></li>
                                            <li><a href="CC-NMD_Radio_Documents.aspx" target="_self">Documents</a></li>
                                            <li><a href="CC-NMD_Radio_Pictures.aspx" target="_self">Pictures </a></li>
                                            <li><a href="#">APF Daily Reports</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>--%>

                        <%--NCI Surgery Branch TIL Modular Facility Panel--%>
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingeleven">
                                <h4 class="NCIModHover panel-title petB1">
                                    <span class="accordion_link blackButtonTitle"><a href="NCI-Mod_Main.aspx">NCI Surgery Branch TIL Modular T30</a></span>
                                    <a class="collapsed blackButtonTitle" data-toggle="collapse" data-parent="#accordion" href="#collapeEleven"
                                        aria-expanded="false" aria-controls="collapeEleven"></a>
                                </h4>

                            </div>
                            <div id="collapeEleven" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingeleven">
                                <div class="card cardWidth">
                                    <ul>
                                        <li><a href="FacilityDashboard.aspx?FID=11">Facility Dashboard </a></li>
                                    <%--    <li><a href="FacilityDetailDashboard.aspx?FID=11" target="_self">Facility Detail Dashboard </a></li>--%>
                                        <%--<li><a href="apfdailyrep.aspx?FID=11" target="_self">Daily Reports</a></li>--%>
                                       <li><asp:LinkButton ID="lnkTIL"  runat="server" CommandArgument="11" OnClick="lnkDoc_Click">Facility Diagram</asp:LinkButton></li>
                                        <li><a href="NCI_3W_TIL_Lab_Main.aspx" target="_self">Description</a></li>
                                        <li><a href="NCI_3W_TIL_Lab_Documents.aspx" target="_self">Documents</a></li>
                                        <li><a href="NCI_3W_TIL_Lab_Pictures.aspx" target="_self">Pictures </a></li>
<%--                                         <li><a href="https://dtrdata.orf.od.nih.gov/APFDaily/ViewDailyReport.aspx?FacilityID=15" target="_blank">FMC Daily Reports</a></li>--%>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <%--NCI Trailer 1 (10B) Panel                           (TODO Delete this panel)--%>
                        <%--<div class="panel panel-default">
                                <div class="panel-heading" role="tab" id="headingSeven">
                                    <h4 class="trailer1Hover panel-title petB1">
                                        <span class="accordion_link blackButtonTitle"><a href="NCI-Trailer1_Main.aspx">NCI Trailer 1 (10B)</a></span>
                                        <a class="collapsed blackButtonTitle" data-toggle="collapse" data-parent="#accordion" href="#collapseEight"
                                            aria-expanded="false" aria-controls="collapseEight"></a>
                                    </h4>

                                </div>
                                <div id="collapseEight" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingSeven">
                                    <div class="card cardWidth">
                                        <ul>
                                            <li><a href="FacilityDashboard.aspx?FID=12">Facility Dashboard </a></li>
                                            <li><a href="FacilityDetailDashboard.aspx?FID=12" target="_self">Facility Detail Dashboard </a></li>
                                            <li><a href="apfdailyrep.aspx?FID=12" target="_self">Daily Reports</a></li>
                                            <li><a href="Images/NCI_Trailer1-10B.pdf" target="_blank">Facility Diagram </a></li>
                                            <li><a href="CC-NMD_Radio_Main.aspx" target="_self">Description</a></li>
                                            <li><a href="CC-NMD_Radio_Documents.aspx" target="_self">Documents</a></li>
                                            <li><a href="CC-NMD_Radio_Pictures.aspx" target="_self">Pictures </a></li>
                                            <li><a href="#">APF Daily Reports</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>--%>

                        <%--NCI Hyperpolarized C-13 Facility                    (TODO Check if need rename to NCI Hyperpolarized Cell Labeling Lab--%>
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingTwenty">
                                <h4 class="NCI1B42Hover panel-title twoJbutton">
                                    <span class="accordion_link blackButtonTitle"><a href="NCY_Hyperpolarized_C13_Main.aspx">NCI Hyperpolarized C-13 Facility</a></span>

                                    <a class="collapsed blackButtonTitle" data-toggle="collapse" data-parent="#accordion" href="#collapsetenB"
                                        aria-expanded="false" aria-controls="collapseSix"></a>
                                </h4>

                            </div>
                            <div id="collapsetenB" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTwenty">
                                <div class="card cardWidth">
                                    <ul>
                                           <li><a href="FacilityDashboard.aspx?FID=19">Facility Dashboard </a></li>
                                      <%--  <li><a href="FacilityDetailDashboard.aspx?FID=19" target="_self">Facility Detail Dashboard </a></li>--%>
                                        <%--<li><a href="apfdailyrep.aspx?FID=11" target="_self">Daily Reports</a></li>--%>
                                       <li><asp:LinkButton ID="lnkNCI"  runat="server" CommandArgument="19" OnClick="lnkDoc_Click">Facility Diagram</asp:LinkButton></li>
                                        <li><a href="NCY_Hyperpolarized_C13_Main.aspx" target="_self">Description</a></li>
                                        <li><a href="NCY_Hyperpolarized_C13_Documents.aspx" target="_self">Documents</a></li>
                                        <li><a href="NCY_Hyperpolarized_C13_Pictures.aspx" target="_self">Pictures </a></li>
<%--                                        <li><a href="https://dtrdata.orf.od.nih.gov/apfdaily/viewdailyreport.aspx?facilityid=1" class="disabled" target="_blank" >FMC Daily Reports</a></li>--%>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <%--NIAID 29B Bioreactor Facility Panel                 (TODO Check if need rename to NIAID 29B Bioreactor Pilot Plant)--%>
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingTwentyOne">
                                <h4 class="NIAID29BHover panel-title petB1">
                                    <span class="accordion_link blackButtonTitle"><a href="NIAID_29B_Bio_Facility_Main.aspx">NIAID Pilot Bioproduction Facility </a></span>
                                    <a class="collapsed blackButtonTitle" data-toggle="collapse" data-parent="#accordion" href="#collapseTwentyOne"
                                        aria-expanded="false" aria-controls="collapseSix"></a>
                                </h4>

                            </div>
                            <div id="collapseTwentyOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTwentyOne">
                                <div class="card cardWidth">
                                  
                                        
                                    <ul>
                                        <%--    <li><a href="FacilityDashboard.aspx?FID=20">Facility Dashboard </a></li>
                                       <li><a href="FacilityDetailDashboard.aspx?FID=20" target="_self">Facility Detail Dashboard </a></li>--%>
                                        <%--<li><a href="apfdailyrep.aspx?FID=20" target="_self">Daily Reports</a></li>--%>
                                        <li><asp:LinkButton ID="lnkNIAID"  runat="server" CommandArgument="20" OnClick="lnkDoc_Click">Facility Diagram</asp:LinkButton></li>
                                        <li><a href="NIAID_29B_Bio_Facility_Main.aspx" target="_self">Description</a></li>
                                        <li><a href="NIAID_29B_Bio_Facility_Documents.aspx" target="_self">Documents</a></li>
                                        <li><a href="NIAID_29B_Bio_Facility_Pictures.aspx" target="_self">Pictures </a></li>
                                        <%--<li><a href="https://dtrdata.orf.od.nih.gov/apfdaily/viewdailyreport.aspx?facilityid=1" class="disabled" target="_blank">FMC Daily Reports</a></li>--%>
                                    </ul>
                                </div>
                            </div>
                            <script>
                                $(".NIAID29BHover").mouseover(function (e) {
                                    $(".fa-lab2").mouseover();
                                }).mouseout(function (e) {
                                    $(".fa-lab2").mouseout();
                                });
                            </script>
                        </div>

                        <%--NIAID Viral Seed Stock Panel                        (TODO Check if this needs to be deleted)--%>
                        <%--<div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingEight">
                                <h4 class="NIAIDVSSHover panel-title twoJbutton">
                                    <span class="accordion_link blackButtonTitle"><a href="NIAID_Viral_Main.aspx">NIAID Viral Seed Stock (Delete?) </a></span>

                                    <a class="collapsed blackButtonTitle" data-toggle="collapse" data-parent="#accordion" href="#collapsetenA"
                                        aria-expanded="false" aria-controls="collapseSix"></a>
                                </h4>

                            </div>
                            <div id="collapsetenA" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingEight">
                                <div class="card cardWidth">
                                    <ul>
                                        <li><a href="Images/NCI_Trailer1-10B.pdf" target="_blank">Facility Diagram </a></li>
                                        <li><a href="NIAID_Viral_Main.aspx" target="_self">Description</a></li>
                                        <li><a href="NIAID_Viral_Documents.aspx" target="_self">Documents</a></li>
                                        <li><a href="NIAID_Viral_Pictures.aspx" target="_self">Pictures </a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>--%>

                    </div>
                    <script>
                        $('.collapse').on('shown.bs.collapse', function () {
                            $(this).prev().addClass('collapsed');

                            var $panelsGroup2 = $('#panelsGroup2');
                            var $panelsGroup = $('#panelsGroup');
                            $panelsGroup2.on('show.bs.collapse', '.collapse', function () {
                                $panelsGroup2.find('.collapse.in').collapse('hide');
                                $panelsGroup.find('.collapse.in').collapse('hide');
                            });

                        });

                        $('.collapse').on('hidden.bs.collapse', function () {
                            $(this).prev().removeClass('collapsed');

                        });
                    </script>
                </div>     
    </div>
    </div>


</asp:Content>