using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FCISUI.Models;
using Microsoft.AspNetCore.Authorization;

namespace FCISUI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class PersonController : ControllerBase
    {

        private readonly FCISPortalContext _context;
        private readonly IConfiguration _config;

        public PersonController(FCISPortalContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // GET: api/Person
        [HttpGet]
        public ActionResult<IEnumerable<Person>> GetPersons()
        {
            var userName = User.Identity.Name;
            return _context.People.ToList();
        }

        // GET: api/Person/5
        [HttpGet("{id}")]
        public ActionResult<Person> GetPerson(int id)
        {
            var person = _context.People.Find(id);

            if (person == null)
            {
                return NotFound();
            }

            return person;
        }

        // POST: api/Person
        [HttpPost]
        public ActionResult<Person> CreatePerson(Person person)
        {
            _context.People.Add(person);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetPerson), new { id = person.PersonId }, person);
        }

        // PUT: api/Person/5
        [HttpPut("{id}")]
        public IActionResult UpdatePerson(int id, Person updatedPerson)
        {
            var person = _context.People.Find(id);

            if (person == null)
            {
                return NotFound();
            }

            person.FirstName = updatedPerson.FirstName;
            person.LastName = updatedPerson.LastName;
            // Update other properties as needed

            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/Person/5
        [HttpDelete("{id}")]
        public IActionResult DeletePerson(int id)
        {
            var person = _context.People.Find(id);

            if (person == null)
            {
                return NotFound();
            }

            _context.People.Remove(person);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
