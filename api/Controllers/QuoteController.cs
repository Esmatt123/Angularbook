using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Quotes;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class QuoteController : BaseApiController
    {
         private readonly IMediator _mediator;
       
        public QuoteController(IMediator mediator)
        {
            _mediator = mediator;
            
            
        }
        [HttpGet]
        public async Task<IActionResult> GetQuotes()
        {
            return HandleResult(await Mediator.Send(new List.Query())); //Invokes Query to get list of activities
        }

       
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuote(Guid id)
        {
          

            return HandleResult( await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
public async Task<IActionResult> CreateQuote(Create.Command command)
{
    var result = await Mediator.Send(command);

    if (result.IsSuccess)
    {
        return Ok(); 
    }

    return BadRequest(result.Error);
}

      
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditQuote(Guid id, Edit.Command command)
        {
            command.QuoteId = id;
            var result = await _mediator.Send(command);
            if (result.IsSuccess)
            return NoContent();

            return BadRequest(result.Error);//Returns 200Ok if successful and edits the entity

        }

       
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuote(Guid id)
        {
           
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPut("toggle-favourite/{id}")]
        public async Task<IActionResult> ToggleFavouriteQuote(Guid id)
        {
           
            return HandleResult(await Mediator.Send(new ToggleFavourite.Command{Id = id}));
        }

        [HttpGet("favourite")]
        public async Task<IActionResult> GetFavouriteQuotes()
        {
           var quotes = await Mediator.Send(new GetFavouriteQuotes.Query());
           var result = Result<List<QuoteDto>>.Success(quotes);
           return HandleResult(result);
        
        }
    }
}