import { z } from "zod";

export const createuserSchema = z.object({
  firstName: z.string().min(1, "Enter First Name"),
  lastName: z.string().min(1, "Enter Last Name"),
  email: z.string().email("Invalid Email"),
  mobile: z.string().min(1, "Enter First Name"),
  roleId: z.string().min(1, "Enter First Name"),

  date: z.date().optional(),
  subjectName: z.string().min(1, "select any  one").optional(),
  degree: z.string().min(1, "Enter First Name").optional(),
  college: z.string().min(1, "Enter College Name").optional(),
  specialization: z.string().min(1, "Enter specilization").optional(),
  positionId: z.string().min(1, "Enter First Name").optional(),
  experience: z.string().min(1, "Enter First Name").optional(),
  isexperience: z.string().min(1, "Enter First Name").optional(),
});

export type CreateUserInput = z.infer<typeof createuserSchema>;

export type CreateAdminUserInput = Pick<
  CreateUserInput,
  "firstName" | "lastName" | "email" | "mobile" | "roleId"
>;
