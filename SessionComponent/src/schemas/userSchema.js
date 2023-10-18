import z from "zod";

const USERNAME_REGEX = /^[a-zA-Z0-9_\-.]+$/;
const QUESTIONS_REGEX = /^[a-zA-Z0-9./@\-_\s]+$/;

const addUserSchema = z.object({
  profiles: z.array(z.string().min(3).max(20)).min(1),
  user: z.string().min(5).max(10).regex(USERNAME_REGEX),
  email: z.string().email().toLowerCase(),
  password: z.string().min(8).max(20),
  questions: z
    .array(
      z.object({
        question: z
          .string()
          .min(3)
          .max(70)
          .regex(QUESTIONS_REGEX)
          .toLowerCase(),
        answer: z.string().min(3).max(70).regex(QUESTIONS_REGEX).toLowerCase(),
      })
    )
    .min(2)
    .max(6)
});

export const verifyAddUser = async ({ data }) =>
  await addUserSchema.safeParseAsync(data);

export const verifyUpdateUser = async ({ data }) =>
  await addUserSchema.safeParseAsync(data);
