using FluentValidation;

namespace Application.Items.Commands.CreateItem
{
    public class CreateItemCommandValidator : AbstractValidator<CreateItemCommand>
    {
        public CreateItemCommandValidator()
        {
            RuleFor(x => x.Item.Name)
                .NotNull()
                .Length(1, 64);
        }
    }
}