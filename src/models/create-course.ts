import { z } from "zod";

export const createCourseSchema = z.object({
  subjectName: z.string().min(1, "subject name minimum one character required"),
});

export type LoginInput = z.infer<typeof createCourseSchema>;
