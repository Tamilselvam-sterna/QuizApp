import { z } from "zod";

export const loginScema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().length(10, "Password Must Be Exact 10 Characters Long"),
});

export type LoginInput = z.infer<typeof loginScema>;
