using FluentValidation;

namespace Application.Listings.Commands.ChangeSuspensionStatusCommand
{
    public class ChangeSuspensionStatusCommandValidator : AbstractValidator<ChangeSuspensionStatusCommand>
    {
        public ChangeSuspensionStatusCommandValidator()
        {
            RuleFor(x => x.Applicant)
                .NotNull().WithMessage("Applicant username can not be null.");
        }
    }
}