using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.IO;

namespace FCISUI.Models
{
    public partial class FCISPortalContext : DbContext
    {
        public FCISPortalContext()
        {
            Console.Write("Foo");
        }

        public FCISPortalContext(DbContextOptions<FCISPortalContext> options)
            : base(options)
        {
           // , AppSettings settings

        }

        public virtual DbSet<Attachment> Attachments { get; set; } = null!;
        public virtual DbSet<AttachmentType> AttachmentTypes { get; set; } = null!;

        // public virtual DbSet<DocCategory> DocCategories { get; set; } = null!;
        // public virtual DbSet<DocPhase> DocPhases { get; set; } = null!;
        public virtual DbSet<Errorlog> Errorlogs { get; set; } = null!;
        public virtual DbSet<Facility> Facilities { get; set; } = null!;
        public virtual DbSet<Gsfgrowth> Gsfgrowths { get; set; } = null!;
        public virtual DbSet<Person> People { get; set; } = null!;
        public virtual DbSet<PersonRole> PersonRoles { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Room> Rooms { get; set; } = null!;
        public virtual DbSet<RoomParameter> RoomParameters { get; set; } = null!;

        public virtual DbSet<SvgMap> SvgMaps { get; set; } = null!;
        public virtual DbSet<SvgMapPin> SvgMapPins { get; set; } = null!;
        public virtual DbSet<SvgMapArrow> SvgMapArrows { get; set; } = null!;
        // public virtual DbSet<TempPiuser> TempPiusers { get; set; } = null!;
        // public virtual DbSet<Temppigmpoperator> Temppigmpoperators { get; set; } = null!;

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

                entity.Property(e => e.FacilityId).HasColumnName("FacilityId");

                entity.Property(e => e.FileType)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LastEditDate).HasColumnType("datetime");

                entity.Property(e => e.LastEditPersonRoleId).HasColumnName("LastEditPersonRoleId");

                entity.Property(e => e.OriginalFileName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PriorRevisionDates)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.StoredFileName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UploadPersonRoleId).HasColumnName("UploadPersonRoleId");
            });

            modelBuilder.Entity<AttachmentType>(entity =>
            {
                entity.ToTable("AttachmentType");

                entity.Property(e => e.Description).HasMaxLength(255);
            });

            // modelBuilder.Entity<DocCategory>(entity =>
            // {
            //     entity.ToTable("DocCategory");

            //     entity.Property(e => e.DocCategoryId).HasColumnName("DocCategoryID");

            //     entity.Property(e => e.Category)
            //         .HasMaxLength(255)
            //         .IsUnicode(false);

            //     entity.Property(e => e.Comments)
            //         .HasMaxLength(255)
            //         .IsUnicode(false);
            // });

            // modelBuilder.Entity<DocPhase>(entity =>
            // {
            //     entity.ToTable("DocPhase");

            //     entity.Property(e => e.DocPhaseId).HasColumnName("DocPhaseID");

            //     entity.Property(e => e.Comments)
            //         .HasMaxLength(255)
            //         .IsUnicode(false);

            //     entity.Property(e => e.DocPhase1)
            //         .HasMaxLength(255)
            //         .IsUnicode(false)
            //         .HasColumnName("DocPhase");
            // });

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

                entity.Property(e => e.FacilityId).HasColumnName("FacilityId");

                entity.Property(e => e.Attribute)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CircleId)
                    .HasMaxLength(120)
                    .IsUnicode(false)
                    .HasColumnName("CircleId");

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

                entity.Property(e => e.FacilityIC)
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

                entity.Property(e => e.FacilityName)
                    .HasMaxLength(255)
                    .IsUnicode(false);
                    
                entity.Property(e=>e.EstimateOrActual)
                    .HasMaxLength(1)
                    .IsUnicode(false);
            });


            modelBuilder.Entity<Person>(entity =>
            {
                entity.ToTable("Person");

                entity.Property(e => e.PersonId).HasColumnName("PersonId");

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
                    .HasColumnName("UserId");
            });

            modelBuilder.Entity<PersonRole>(entity =>
            {
                entity.ToTable("PersonRole");

                entity.Property(e => e.PersonRoleId).HasColumnName("PersonRoleId");

                entity.Property(e => e.Comments)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.PersonId).HasColumnName("PersonId");

                entity.Property(e => e.RoleId).HasColumnName("RoleId");

                entity.Property(e => e.StartDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.RoleId).HasColumnName("RoleId");

                entity.Property(e => e.Comments)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.RoleName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Role");
            });

            modelBuilder.Entity<Room>(entity =>
            {
                entity.ToTable("Room");

                entity.Property(e => e.RoomId).HasColumnName("RoomId");

                entity.Property(e => e.Facility)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FacilityId).HasColumnName("FacilityId");

                entity.Property(e => e.RoomName)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.RoomNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Sq).HasColumnName("SQ");
            });

            modelBuilder.Entity<RoomParameter>(entity =>
            {
                entity.ToTable("RoomParameter");

                entity.Property(e => e.RoomParameterId).HasColumnName("RoomParameterId");
                entity.Property(e => e.RoomId).HasColumnName("RoomId");

                entity.Property(e => e.Facility)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Parameter)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Parameter");

                entity.Property(e => e.SensorLocation)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.CalibrationType)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.CalibrationPeriod)
                    .HasMaxLength(250)
                    .IsUnicode(false);
                
                entity.Property(e => e.NextCalibration)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                
                entity.Property(e => e.SiemensPointName)
                    .HasMaxLength(350)
                    .IsUnicode(false);
                
                entity.Property(e => e.JCIPointName)
                    .HasMaxLength(350)
                    .IsUnicode(false);

                entity.Property(e => e.RHTargetRange)
                    .HasMaxLength(50)
                    .IsUnicode(false);
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

            modelBuilder.Entity<SvgMapArrow>(entity => {
                entity.ToTable("SvgMapArrow");
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

            var pwd = Directory.GetCurrentDirectory();
            var seedDataFolder = Path.Combine(pwd,"Models","seedData");
            var loader = new JsonSeedDataLoader(seedDataFolder);

            var facilities = loader.GetFacilities();
            modelBuilder.Entity<Facility>().HasData(facilities);

            var rooms = loader.GetRooms();
            modelBuilder.Entity<Room>().HasData(rooms);

            var roomParameters = loader.GetRoomParameters();
            modelBuilder.Entity<RoomParameter>().HasData(roomParameters);

            var svgMaps = loader.GetSvgMap();
            modelBuilder.Entity<SvgMap>().HasData(svgMaps);

            var svgMapPins = loader.GetSvgMapPins();
            modelBuilder.Entity<SvgMapPin>().HasData(svgMapPins);

            var svgMapArrows = loader.GetSvgMapArrows();
            modelBuilder.Entity<SvgMapArrow>().HasData(svgMapArrows);

            var gsfGrowth = loader.GetGsfGrowth();
            modelBuilder.Entity<Gsfgrowth>().HasData(gsfGrowth);

            try{
                var attachmentTypes = loader.GetAttachmentTypes();
                modelBuilder.Entity<AttachmentType>().HasData(attachmentTypes);

                var attachments = loader.GetAttachments().ToList();
                modelBuilder.Entity<Attachment>().HasData(attachments);
            }
            catch(Exception ex) {
                Console.Write(ex);
            }

            var roles = loader.GetRoles();
            modelBuilder.Entity<Role>().HasData(roles);

            var people = loader.GetPeople();
            modelBuilder.Entity<Person>().HasData(people);

            var personRoles = loader.GetPersonRoles();
            modelBuilder.Entity<PersonRole>().HasData(personRoles);



            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}