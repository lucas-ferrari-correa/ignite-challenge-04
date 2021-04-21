import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => {
      return user.id === id;
    });

    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => {
      return user.email === email;
    });

    return user;
  }

  turnAdmin(receivedUser: User): User {
    const updatedUser = {
      ...receivedUser,
      admin: true,
      updated_at: new Date(),
    };

    this.users.splice(this.users.indexOf(receivedUser), 1);
    this.users.push(updatedUser);

    return updatedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
