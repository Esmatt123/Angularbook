using Application.Books;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class BookController : BaseApiController
    {
        private readonly IMediator _mediator;
       
        public BookController(IMediator mediator)
        {
            _mediator = mediator;
            
            
        }
        
        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            return HandleResult(await Mediator.Send(new List.Query())); //Invokes Query to get list of activities
        }

       
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(Guid id)
        {
          

            return HandleResult( await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateBook(Book book){
            return HandleResult(await Mediator.Send(new Create.Command {Book = book}));
        }

      
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBookAndQuote(Guid id, EditBookAndQuote.Command command)
        {
           command.Id = id;
           return HandleResult(await Mediator.Send(command));

        }


         // PUT api/book/{id}
    [HttpPut("edit/{id}")]
    public async Task<IActionResult> EditBook(Guid id, Edit.Command command)
    {
        command.Id = id;
        var result = await _mediator.Send(command);
        if (result.IsSuccess)
            return NoContent();
        return BadRequest(result.Error);
    }


       
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(Guid id)
        {
           
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        

        
    }
}