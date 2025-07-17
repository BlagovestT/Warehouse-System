import UserModel from "./user.model.js";

class UserService {
  private userModel: typeof UserModel;

  constructor(userModel: typeof UserModel = UserModel) {
    this.userModel = userModel;
  }

  // Get all users
  async getAllUsers() {
    const result = await this.userModel.findAll();
    if (!result) {
      throw new Error("No users found");
    }
    return result;
  }

  // Get user by ID
  async getUserById(id: string) {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  // Create a new user
  async createUser(userData: {
    companyId: string;
    username: string;
    email: string;
    password: string;
  }) {
    const { companyId, username, email, password } = userData;

    const existingUser = await this.userModel.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new Error("User already exists");
    }
    return await this.userModel.create({
      companyId,
      username,
      email,
      password,
    });
  }

  // Update user by ID
  async updateUser(
    id: string,
    updateData: {
      username: string;
      email: string;
      password: string;
    }
  ) {
    const { username, email, password } = updateData;
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }
    await user.update({ username, email, password });
    return user;
  }
  //Todo: add check for existing delatedAt
  // Delete user by ID
  async deleteUser(id: string) {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.deletedAt) {
      throw new Error("User already deleted");
    }

    await user.destroy();
    return { message: "User deleted successfully" };
  }
}

export default UserService;
