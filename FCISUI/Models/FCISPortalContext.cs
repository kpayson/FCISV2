using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FCISUI.Models
{
    public partial class FCISPortalContext : DbContext
    {
        public FCISPortalContext()
        {
        }

        public FCISPortalContext(DbContextOptions<FCISPortalContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Attachment> Attachments { get; set; } = null!;
        public virtual DbSet<AttachmentType> AttachmentTypes { get; set; } = null!;
        public virtual DbSet<DocCategory> DocCategories { get; set; } = null!;
        public virtual DbSet<DocPhase> DocPhases { get; set; } = null!;
        public virtual DbSet<Errorlog> Errorlogs { get; set; } = null!;
        public virtual DbSet<Facility> Facilities { get; set; } = null!;
        public virtual DbSet<Gsfgrowth> Gsfgrowths { get; set; } = null!;
        public virtual DbSet<Person> People { get; set; } = null!;
        public virtual DbSet<PersonRole> PersonRoles { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Room> Rooms { get; set; } = null!;
        public virtual DbSet<RoomOld> RoomOlds { get; set; } = null!;
        public virtual DbSet<SvgMap> SvgMaps { get; set; } = null!;
        public virtual DbSet<SvgMapPin> SvgMapPins { get; set; } = null!;
        public virtual DbSet<Temp> Temps { get; set; } = null!;
        public virtual DbSet<TempPiuser> TempPiusers { get; set; } = null!;
        public virtual DbSet<Temppigmpoperator> Temppigmpoperators { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=NCATS-2170893-P\\SQLEXPRESS;Initial Catalog=FCISPortal;Integrated Security=SSPI;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Attachment>(entity =>
            {
                entity.ToTable("Attachment");

                entity.Property(e => e.AttachmentId).HasColumnName("AttachmentID");

                entity.Property(e => e.AttachmentTypeId).HasColumnName("AttachmentTypeID");

                entity.Property(e => e.Author)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Comments)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ControlledCopyLocation)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.DocPhaseId).HasColumnName("DocPhaseID");

                entity.Property(e => e.DocTitle)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.EffectiveDate).HasColumnType("datetime");

                entity.Property(e => e.ExpirationDate).HasColumnType("datetime");

                entity.Property(e => e.FacilityId).HasColumnName("FacilityID");

                entity.Property(e => e.FileType)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LastEditDate).HasColumnType("datetime");

                entity.Property(e => e.LastEditPersonRoleId).HasColumnName("LastEditPersonRoleID");

                entity.Property(e => e.OriginalFileName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PriorRevisionDates)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.StoredFileName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UploadPersonRoleId).HasColumnName("UploadPersonRoleID");
            });

            modelBuilder.Entity<AttachmentType>(entity =>
            {
                entity.ToTable("AttachmentType");

                entity.Property(e => e.AttachmentTypeId).HasColumnName("AttachmentTypeID");

                entity.Property(e => e.AttachmentType1)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("AttachmentType");

                entity.Property(e => e.Comments)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DocCategoryId).HasColumnName("DocCategoryID");
            });

            modelBuilder.Entity<DocCategory>(entity =>
            {
                entity.ToTable("DocCategory");

                entity.Property(e => e.DocCategoryId).HasColumnName("DocCategoryID");

                entity.Property(e => e.Category)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Comments)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<DocPhase>(entity =>
            {
                entity.ToTable("DocPhase");

                entity.Property(e => e.DocPhaseId).HasColumnName("DocPhaseID");

                entity.Property(e => e.Comments)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DocPhase1)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("DocPhase");
            });

            modelBuilder.Entity<Errorlog>(entity =>
            {
                entity.ToTable("errorlog");

                entity.Property(e => e.Errorlogid).HasColumnName("errorlogid");

                entity.Property(e => e.Aspprocedurename)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("aspprocedurename");

                entity.Property(e => e.Errordate)
                    .HasColumnType("datetime")
                    .HasColumnName("errordate");

                entity.Property(e => e.Errormessage)
                    .HasMaxLength(8000)
                    .IsUnicode(false)
                    .HasColumnName("errormessage");

                entity.Property(e => e.Errortrace)
                    .HasMaxLength(8000)
                    .IsUnicode(false)
                    .HasColumnName("errortrace");

                entity.Property(e => e.Personroleid).HasColumnName("personroleid");

                entity.Property(e => e.Reportid).HasColumnName("reportid");

                entity.Property(e => e.Sqlprocedurename)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("sqlprocedurename");

                entity.Property(e => e.Sqltext)
                    .HasMaxLength(8000)
                    .IsUnicode(false)
                    .HasColumnName("sqltext");
            });

            modelBuilder.Entity<Facility>(entity =>
            {
                entity.ToTable("Facility");

                entity.Property(e => e.FacilityId).HasColumnName("FacilityID");

                entity.Property(e => e.Attribute)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Circleid)
                    .HasMaxLength(120)
                    .IsUnicode(false)
                    .HasColumnName("circleid");

                entity.Property(e => e.Comments)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FacilityAbbrName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FacilityBuilding)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FacilityFullName)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.FacilityIc)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("FacilityIC");

                entity.Property(e => e.FacilityLocation)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FacilityName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FacilityRepName)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.FacilitySection)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FacilityType)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PiPath)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Gsfgrowth>(entity =>
            {
                entity.ToTable("GSFGrowth");

                entity.Property(e => e.GsfgrowthId).HasColumnName("GSFGrowthID");

                entity.Property(e => e.FacilityName)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Person>(entity =>
            {
                entity.ToTable("Person");

                entity.Property(e => e.PersonId).HasColumnName("PersonID");

                entity.Property(e => e.Active).HasDefaultValueSql("((1))");

                entity.Property(e => e.Comments)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Ic)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("IC");

                entity.Property(e => e.LastName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Miname)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MIName");

                entity.Property(e => e.Nihid)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("NIHID");

                entity.Property(e => e.Org)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.OrgAbbr)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UserId)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("UserID");
            });

            modelBuilder.Entity<PersonRole>(entity =>
            {
                entity.ToTable("PersonRole");

                entity.Property(e => e.PersonRoleId).HasColumnName("PersonRoleID");

                entity.Property(e => e.Comments)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.PersonId).HasColumnName("PersonID");

                entity.Property(e => e.RoleId).HasColumnName("RoleID");

                entity.Property(e => e.StartDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.RoleId).HasColumnName("RoleID");

                entity.Property(e => e.Comments)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Role1)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Role");
            });

            modelBuilder.Entity<Room>(entity =>
            {
                entity.ToTable("Room");

                entity.Property(e => e.RoomId).HasColumnName("RoomID");

                // entity.Property(e => e.Attribute)
                //     .HasMaxLength(50)
                //     .IsUnicode(false);

                // entity.Property(e => e.CalibrationPeriod)
                //     .HasMaxLength(250)
                //     .IsUnicode(false);

                // entity.Property(e => e.CalibrationType)
                //     .HasMaxLength(250)
                //     .IsUnicode(false);

                // entity.Property(e => e.Column1)
                //     .HasMaxLength(350)
                //     .IsUnicode(false);

                // entity.Property(e => e.ConnectingRoom)
                //     .HasMaxLength(50)
                //     .IsUnicode(false);

                entity.Property(e => e.Facility)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FacilityId).HasColumnName("FacilityID");

                // entity.Property(e => e.FormatedName)
                //     .HasMaxLength(200)
                //     .IsUnicode(false);

                // entity.Property(e => e.Htte10)
                //     .IsUnicode(false)
                //     .HasColumnName("HTTE10");

                // entity.Property(e => e.Iso)
                //     .HasMaxLength(3)
                //     .IsUnicode(false)
                //     .HasColumnName("ISO");

                // entity.Property(e => e.Isoorder).HasColumnName("ISOOrder");

                // entity.Property(e => e.JcipointName)
                //     .HasMaxLength(350)
                //     .IsUnicode(false)
                //     .HasColumnName("JCIPointName");

                // entity.Property(e => e.NextCalibration)
                //     .HasMaxLength(50)
                //     .IsUnicode(false);

                // entity.Property(e => e.Parameter)
                //     .HasMaxLength(50)
                //     .IsUnicode(false);

                // entity.Property(e => e.PiPath)
                //     .HasMaxLength(200)
                //     .IsUnicode(false);

                // entity.Property(e => e.RhtargetRange)
                //     .HasMaxLength(50)
                //     .IsUnicode(false)
                //     .HasColumnName("RHTargetRange");

                entity.Property(e => e.RoomName)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.RoomNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                // entity.Property(e => e.SensorLocation)
                //     .HasMaxLength(250)
                //     .IsUnicode(false);

                // entity.Property(e => e.SensorType)
                //     .HasMaxLength(250)
                //     .IsUnicode(false);

                // entity.Property(e => e.SiemensPointName)
                //     .HasMaxLength(350)
                //     .IsUnicode(false);

                entity.Property(e => e.Sq).HasColumnName("SQ");
            });

            modelBuilder.Entity<RoomOld>(entity =>
            {
                entity.HasKey(e => e.RoomId)
                    .HasName("PK__Room__328639197430B856");

                entity.ToTable("Room_Old");

                entity.Property(e => e.RoomId).HasColumnName("RoomID");

                entity.Property(e => e.Attribute)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EquipmentId).HasColumnName("EquipmentID");

                entity.Property(e => e.FacilityId).HasColumnName("FacilityID");

                entity.Property(e => e.Iso)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("ISO");

                entity.Property(e => e.Isoorder).HasColumnName("ISOOrder");

                entity.Property(e => e.PiPath)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.RoomNumber)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Sq).HasColumnName("SQ");
            });

            modelBuilder.Entity<SvgMap>(entity => {
                entity.ToTable("SvgMap");
            });

            modelBuilder.Entity<SvgMapPin>(entity => {
                entity.ToTable("SvgMapPin");
                // .HasOne<SvgMap>(s => s.SvgMap)
                // .WithMany(m=> m.SvgMapPins)
                // .HasForeignKey(s => s.SvgMapId);
            });


            modelBuilder.Entity<Temp>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("temp");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TempPiuser>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("tempPIUser");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Temppigmpoperator>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("temppigmpoperators ");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
