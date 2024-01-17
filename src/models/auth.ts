import { z } from "zod";

export const loginScema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password should be minimum 6 characters"),
});

export type LoginInput = z.infer<typeof loginScema>;
