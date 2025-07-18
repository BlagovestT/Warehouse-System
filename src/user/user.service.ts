import UserModel, { UserAttributes } from "./user.model.js";
import { BaseService } from "../utils/base.service.js";

type CreateUserData = Pick<
  UserAttributes,
  "companyId" | "username" | "email" | "password"
>;
type UpdateUserData = Pick<UserAttributes, "username" | "email" | "password">;

class UserService extends BaseService<UserModel> {
  constructor(userModel: typeof UserModel = UserModel) {
    super(userModel);
  }

  protected getEntityName(): string {
    return "User";
  }

  async getAllUsers() {
    return this.getAll();
  }

  async getUserById(id: string) {
    return this.getById(id);
  }

  async createUser(userData: CreateUserData) {
    const { email } = userData;

    const existingUser = await this.model.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    return await this.model.create(userData);
  }

  async updateUser(id: string, updateData: UpdateUserData) {
    const { email } = updateData;

    const user = await this.getById(id); // Reuse base method

    if (email !== user.email) {
      const existingUser = await this.model.findOne({
        where: { email },
      });

      if (existingUser) {
        throw new Error("Email already exists");
      }
    }

    await user.update(updateData);
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.getById(id);

    if (user.deletedAt) {
      throw new Error("User already deleted");
    }

    await user.destroy();
    return { message: "User deleted successfully" };
  }
}

export default UserService;
