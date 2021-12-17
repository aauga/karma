using System;

namespace Application.Exceptions
{
    public class UnknownException : Exception
    {
        public UnknownException(string message)
            : base(message)
        {
        }
    }
}