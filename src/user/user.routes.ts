import { Router, Request, Response } from "express";
import { validateData } from "../middleware/validation.middleware.js";
import { createUserSchema, updateUserSchema } from "./user.schema.js";
import UserService from "./user.service.js";

const router = Router();
const userService = new UserService();

// Get /api/user - Get all users
router.get("/", async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Get /api/user/:id - Get user by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);

    if (error instanceof Error && error.message === "User not found") {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(500).json({ message: "Error fetching user" });
  }
});

// POST /api/user - Create new user
router.post(
  "/",
  validateData(createUserSchema),
  async (req: Request, res: Response) => {
    try {
      const { companyId, username, email, password } = req.body;

      const newUser = await userService.createUser({
        companyId,
        username,
        email,
        password,
      });
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      console.error("Error creating user:", error);

      if (error instanceof Error && error.message === "User already exists") {
        return res.status(400).json({ message: "User already exists" });
      }

      res.status(500).json({ message: "Error creating user" });
    }
  }
);

// PUT /api/user/:id - Update user
router.put(
  "/:id",
  validateData(updateUserSchema),
  async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;

      const updatedUser = await userService.updateUser(req.params.id, {
        username,
        email,
        password,
      });
      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);

      if (error instanceof Error && error.message === "User not found") {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(500).json({ message: "Error updating user" });
    }
  }
);

// DELETE /api/user/:id - Delete user
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteUser(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting user:", error);

    if (error instanceof Error && error.message === "User not found") {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(500).json({ message: "Error deleting user" });
  }
});

export default router;
