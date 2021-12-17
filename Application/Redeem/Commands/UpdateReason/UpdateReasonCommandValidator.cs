using FluentValidation;

namespace Application.Redeem.Commands.UpdateReason
{
    public class EditReasonCommandValidator : AbstractValidator<UpdateReasonCommand>
    {
        public EditReasonCommandValidator()
        {
            RuleFor(x => x.Applicant.Reason)
                .MaximumLength(128).WithMessage("Reason can not be longer than 128 symbols.")
                .NotNull().WithMessage("Reason can not be null.");
        }
    }
}