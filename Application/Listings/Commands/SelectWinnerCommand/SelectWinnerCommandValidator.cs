using FluentValidation;

namespace Application.Listings.Commands
{
    public class SelectWinnerCommandValidator : AbstractValidator<SelectWinnerCommand.SelectWinnerCommand>
    {
        public SelectWinnerCommandValidator()
        {
            RuleFor(x => x.Applicant)
                .NotNull().WithMessage("Applicant username can not be null.");
        }
    }
}