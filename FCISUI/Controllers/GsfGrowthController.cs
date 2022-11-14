using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FCISUI.Models;

namespace FCISUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GsfGrowthController : ControllerBase
    {
        private readonly FCISPortalContext _context;

        public GsfGrowthController(FCISPortalContext context)
        {
            _context = context;
        }

        // GET: api/GsfGrowth
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gsfgrowth>>> GetGsfgrowths()
        {
          if (_context.Gsfgrowths == null)
          {
              return NotFound();
          }
            return await _context.Gsfgrowths.ToListAsync();
        }

        // GET: api/GsfGrowth/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Gsfgrowth>> GetGsfgrowth(int id)
        {
          if (_context.Gsfgrowths == null)
          {
              return NotFound();
          }
            var gsfgrowth = await _context.Gsfgrowths.FindAsync(id);

            if (gsfgrowth == null)
            {
                return NotFound();
            }

            return gsfgrowth;
        }

        // PUT: api/GsfGrowth/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGsfgrowth(int id, Gsfgrowth gsfgrowth)
        {
            if (id != gsfgrowth.GsfgrowthId)
            {
                return BadRequest();
            }

            _context.Entry(gsfgrowth).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GsfgrowthExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/GsfGrowth
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Gsfgrowth>> PostGsfgrowth(Gsfgrowth gsfgrowth)
        {
          if (_context.Gsfgrowths == null)
          {
              return Problem("Entity set 'FCISPortalContext.Gsfgrowths'  is null.");
          }
            _context.Gsfgrowths.Add(gsfgrowth);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGsfgrowth", new { id = gsfgrowth.GsfgrowthId }, gsfgrowth);
        }

        // DELETE: api/GsfGrowth/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGsfgrowth(int id)
        {
            if (_context.Gsfgrowths == null)
            {
                return NotFound();
            }
            var gsfgrowth = await _context.Gsfgrowths.FindAsync(id);
            if (gsfgrowth == null)
            {
                return NotFound();
            }

            _context.Gsfgrowths.Remove(gsfgrowth);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GsfgrowthExists(int id)
        {
            return (_context.Gsfgrowths?.Any(e => e.GsfgrowthId == id)).GetValueOrDefault();
        }
    }
}
