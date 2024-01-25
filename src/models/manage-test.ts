import { z } from "zod";

export const managetestSchema = z.object({
  subjectName: z.string().min(1, "select any  one"),
});

export type LoginInput = z.infer<typeof managetestSchema>;
