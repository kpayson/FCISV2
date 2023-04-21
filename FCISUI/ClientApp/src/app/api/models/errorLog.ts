// public partial class Errorlog
// {
//     public int Errorlogid { get; set; }
//     public int? Personroleid { get; set; }
//     public int? Reportid { get; set; }
//     public string? Aspprocedurename { get; set; }
//     public string? Sqlprocedurename { get; set; }
//     public string? Errormessage { get; set; }
//     public string? Errortrace { get; set; }
//     public string? Sqltext { get; set; }
//     public DateTime? Errordate { get; set; }
// }

export interface ErrorLog {
    errorLogId: number;
    errorMessage?: string;
    errorTrace?: string;
    errorDate?: Date;
}