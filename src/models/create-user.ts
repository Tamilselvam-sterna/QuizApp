import { z } from "zod";

export const createUserSchema = z.object({
  roleId: z.string().min(1, "Select Any One Role"),
  firstName: z.string().min(1, "Enter First Name"),
  lastName: z.string().min(1, "Enter Last Name"),
  email: z.string().email("Invalid Email"),
  mobile: z
    .string()
    .min(10, "Enter 10 Digit Mobile Number")
    .max(10, "Enter 10 Digit Mobile Number")
    .optional(),
  dob: z.date().optional(),
  college: z.string().min(1, "Enter College Name").optional(),
  degree: z.string().min(1, "Enter Degree").optional(),
  specialization: z.string().min(1, "Enter Specialization").optional(),
  positionId: z.string().min(1, "Select Position").optional(),
  isFresher: z.string().min(1, "Select Any One Experience Level").optional(),
  yearsOfExperience: z
    .number()
    .min(1, "Enter Years Of Experience In Numeric Value")
    .optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type CreateAdminUserInput = Pick<
  CreateUserInput,
  "firstName" | "lastName" | "email" | "mobile" | "roleId"
>;
