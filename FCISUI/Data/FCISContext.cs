using System;
using FCISUI.Models;
using Microsoft.EntityFrameworkCore;

public class FCISContext : DbContext
{
    public FCISContext(DbContextOptions options) 
        : base(options)
    {

    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }
    //entities
    public DbSet<Facility> Facilities { get; set; }
    public DbSet<Room> Rooms { get; set; }
    public DbSet<Gsfgrowth> Gsfgrowths { get; set; }

}
