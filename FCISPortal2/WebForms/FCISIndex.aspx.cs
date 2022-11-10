// using FCISPortal.Classes;
// using FCISPortal.Components;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace FCISPortal
{
    public partial class FCISIndex : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                LoadFacilityDiagram();
            }
        }
        protected void GetFacilityDocButton(int FacID, bool Visible)
        {

            switch (FacID)
            {
                case 1:
                    // code block
                    lnkPETRa.Enabled = Visible;
                    break;
                case 2:
                    // PET B3
                    lnkPETB3.Enabled = Visible;
                    break;
                case 3:
                    // 2J
                    lnkDoc2J.Enabled = Visible;
                    break;
                case 4:
                    // 12E
                    lnk12E.Enabled = Visible;
                    break;

                case 5:
                    // code block
                    lnkCCE.Enabled = Visible;
                    break;
                case 6:
                    // code block
                    lnkDLM.Enabled = Visible;
                    break;

                case 7:
                    lnkNMD.Enabled = Visible;
                    break;
                case 8:
                    // code block
                    lnkIIVAU.Enabled = Visible;
                    break;

                case 9:
                    // code block
                    break;
                case 10:
                    // code block
                    lnk1B42.Enabled = Visible;
                    break;

                case 11:
                    // code block
                    lnkTIL.Enabled = Visible;
                    break;
                case 12:
                    // code block
                    lnk10B.Enabled = Visible;
                    break;

                case 13:
                    // code block
                    lnk10A.Enabled = Visible;
                    break;
                case 14:
                    // lnkNCI.Enabled = Visible;
                    break;
                case 15:
                    // code block
                    // lnkNCI.Enabled = Visible;
                    break;
                case 16:
                    lnk3T.Enabled = Visible;
                    break;

                case 17:
                    lnkPIAU.Enabled = Visible;
                    break;
                case 18:
                    //lnkNIAID.Visible = Visible;
                    break;
                case 19:
                    lnkNCI.Enabled = Visible;
                    break;
                case 20:
                    lnkNIAID.Enabled = Visible;
                    break;
                case 21:
                    // code block
                    break;
                default:
                    // code block
                    break;

            }

        }
        private void LoadFacilityDiagram()
        {
            int FacID = 0; bool Visible = false;
            DataModule _dm = new DataModule();
            _dm.AddParameter("@facilityid", SqlDbType.Int, 0);
            DataSet ds = _dm.GetDataSet("selectfacilitylist");
            if (ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    FacID = Convert.ToInt16(row["facilityid"]);
                    _dm.AddParameter("@facilityid", SqlDbType.Int, FacID);//
                    _dm.AddParameter("@documenttypeid", SqlDbType.Int, 32);
                    DataSet ds2 = _dm.GetDataSet("SelectFacilityDocuments");
                    if (ds2.Tables[0] != null && ds2.Tables[0].Rows.Count > 0)
                    {
                        Visible = true;
                    }
                    else { Visible = false; }

                    GetFacilityDocButton(FacID, Visible);
                }
            }
        }
        private void ShowAttachment(int FacID)
        {
            int AttachmentID = 0;
            DataModule _dm2 = new DataModule();
            _dm2.AddParameter("@facilityid", SqlDbType.Int, FacID);//
            _dm2.AddParameter("@documenttypeid", SqlDbType.Int, 32);
            DataSet ds2 = _dm2.GetDataSet("SelectFacilityDocuments");
            if (ds2.Tables[0] != null && ds2.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow oRow2 in ds2.Tables[0].Rows)
                {
                    AttachmentID = Convert.ToInt16(oRow2["AttachmentID"]);

                }

                lnkDoc2J.Visible = true;
            }
            else
            {

                lnkDoc2J.Visible = false;
            }

            if (AttachmentID > 0)
            {
                DataModule dm2 = new DataModule();
                dm2.AddParameter("@attachmentid", SqlDbType.Int, System.Convert.ToInt32(AttachmentID));
                ds2 = dm2.GetDataSet("selectattachmentdetails");

                string strStoredFileName = ds2.Tables[0].Rows[0]["StoredFileName"].ToString();

                string strFileLocation = ConfigurationManager.AppSettings["AttachmentsFolder"].ToString() + '\\' + strStoredFileName;

                //byte[] aData;
                WebClient req = new WebClient();
                Response.Clear();
                Response.ClearHeaders();
                Response.ClearContent();
                Response.Buffer = true;
                Response.ContentType = ds2.Tables[0].Rows[0]["ContentType"].ToString();
                Response.AddHeader("Content-Disposition", "attachment; filename=" + ds2.Tables[0].Rows[0]["OriginalFileName"].ToString());
                byte[] aData = req.DownloadData(strFileLocation);
                Response.BinaryWrite(aData);
                //Response.TransmitFile(strFileLocation);
                //Response.Flush();
                Response.End();

                //following works from url
                //string strSaveFileAsPath = "attachmentsGSS/" + ds2.Tables[0].Rows[0]["StoredFileName"].ToString();
                //HttpContext.Current.Response.Redirect(strSaveFileAsPath, false); //gss added false

            }
            else
            {
                //string strSaveFileAsPath = FacilityDocumentHelper.GetFacilityDocument(FacID);
                //HttpContext.Current.Response.Redirect(strSaveFileAsPath, false); //gss added false
            }
        }


        protected void lnkDoc_Click(object sender, EventArgs e)
        {
            LinkButton btn = (LinkButton)(sender);
            int FacID = Convert.ToInt16(btn.CommandArgument);
            ShowAttachment(FacID);
        }
    }
}