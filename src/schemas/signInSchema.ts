import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.string(),
  passwor: z.string(),
});
