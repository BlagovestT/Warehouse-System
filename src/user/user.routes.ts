import { Router, Request, Response } from "express";
import { validateData } from "../middleware/validation.middleware.js";
import { createUserSchema, updateUserSchema } from "./user.schema.js";
import UserService from "./user.service.js";
import { handleServiceError } from "../middleware/error-handler.middleware.js";

const router = Router();
const userService = new UserService();

// Get /api/user - Get all users
router.get("/", async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    handleServiceError(error, res, "fetching users");
  }
});

// Get /api/user/:id - Get user by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    handleServiceError(error, res, "fetching user");
  }
});

// POST /api/user - Create new user
router.post(
  "/",
  validateData(createUserSchema),
  async (req: Request, res: Response) => {
    try {
      const newUser = await userService.createUser(req.body);
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      handleServiceError(error, res, "creating user");
    }
  }
);

// PUT /api/user/:id - Update user
router.put(
  "/:id",
  validateData(updateUserSchema),
  async (req: Request, res: Response) => {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      handleServiceError(error, res, "updating user");
    }
  }
);

// DELETE /api/user/:id - Delete user
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    handleServiceError(error, res, "deleting user");
  }
});

export default router;
