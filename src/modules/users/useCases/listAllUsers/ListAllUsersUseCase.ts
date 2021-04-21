import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const isUserAdmin = this.usersRepository.findById(user_id);

    if (!isUserAdmin) {
      const error = {
        status: 400,
        message: "User does not exist",
      };

      throw error;
    }

    if (!isUserAdmin.admin) {
      const error = {
        status: 400,
        message: "User is not an admin. Access denied.",
      };

      throw error;
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
