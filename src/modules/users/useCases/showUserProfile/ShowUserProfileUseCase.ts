import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ShowUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const findUser = this.usersRepository.findById(user_id);

    if (!findUser) {
      const error = {
        status: 404,
        message: "User does not exist",
      };

      throw error;
    }

    return findUser;
  }
}

export { ShowUserProfileUseCase };
