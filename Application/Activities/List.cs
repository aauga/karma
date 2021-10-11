using Application.Core;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<Item>>>
        {
            
        }
        public class Handler : IRequestHandler<Query, Result<List<Item>>>
        {
            private readonly ItemDbContext _context;
          //  private readonly ILogger<List> _logger;
            public Handler(ItemDbContext context, ILogger<List> logger)
            {
                _context = context;
               // _logger = logger;
            }

            public async Task<Result<List<Item>>> Handle(Query request, CancellationToken cancellationToken)
            {
               /* try
                {
                    for(var i = 0; i < 10; i++)
                    {
                        cancellationToken.ThrowIfCancellationRequested();
                        await Task.Delay(100, cancellationToken);
                        _logger.LogInformation($"Task {i} has completed");
                    }
                }
                catch (Exception ex) when (ex is TaskCanceledException)
                {
                    _logger.LogInformation("Task was cancelled");
                }*/
                return Result<List<Item>>.Success(await _context.Items.ToListAsync(cancellationToken));
            }
        }
    }
}
