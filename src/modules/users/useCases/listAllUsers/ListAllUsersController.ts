import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const id = request.headers.user_id as string;
    const user_id = id;

    try {
      const all = this.listAllUsersUseCase.execute({ user_id });

      return response.send(all);
    } catch (err) {
      return response.status(err.status).json({ error: err.message });
    }
  }
}

export { ListAllUsersController };
