import ApiError from "./ApiError.js";

export class NotFoundError extends ApiError {
  constructor(message = "Ma'lumot topilmadi.") {
    super(404, message);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Noto'g'ri so'rov formati yoki kiritilgan ma'lumot.") {
    super(400, message);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Avtorizatsiya talab qilinadi.") {
    super(401, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Ushbu amalni bajarishga huquqingiz yo'q.") {
    super(403, message);
  }
}
