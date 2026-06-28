export class AppError extends Error {
  constructor(public message: string, public statusCode = 500) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError  extends AppError { constructor(m = 'Validation failed')   { super(m, 400) } }
export class UnauthorizedError extends AppError { constructor(m = 'Unauthorized')        { super(m, 401) } }
export class ForbiddenError    extends AppError { constructor(m = 'Forbidden')           { super(m, 403) } }
export class NotFoundError     extends AppError { constructor(m = 'Resource not found')  { super(m, 404) } }
export class ConflictError     extends AppError { constructor(m = 'Conflict')            { super(m, 409) } }
