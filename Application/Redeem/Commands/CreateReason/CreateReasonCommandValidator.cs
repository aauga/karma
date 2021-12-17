using FluentValidation;

namespace Application.Redeem.Commands.CreateReason
{
    public class CreateReasonCommandValidator : AbstractValidator<CreateReasonCommand>
    {
        public CreateReasonCommandValidator()
        {
            RuleFor(x => x.Applicant.Reason)
                .MaximumLength(128).WithMessage("Reason can not be longer than 128 symbols.")
                .NotNull().WithMessage("Reason can not be null.");
        }
    }
}