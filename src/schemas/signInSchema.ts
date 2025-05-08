//creating the schemas using {z} zod which is ts first lib
// https://zod.dev/
// Cheatsheet: https://dev.to/arafat4693/learn-zod-in-5-minutes-17pn

import {z} from "zod";

export const signInSchema = z.object ({
    identifier: z.string(),
    passwor: z.string(),
})


// export const demoSchema = z.object({
//   // Basic string with min and max length
//   username: z.string()
//     .min(3, "Username must be at least 3 characters")
//     .max(20, "Username cannot exceed 20 characters")
//     .trim(),

//   // Email format
//   email: z.string().email("Invalid email"),

//   // Password with regex and min length
//   password: z.string()
//     .min(8, "Password must be at least 8 characters")
//     .regex(/[A-Z]/, "Must contain an uppercase letter")
//     .regex(/[0-9]/, "Must contain a number"),

//   // Optional field
//   bio: z.string().max(160).optional(),

//   // Nullable field
//   website: z.string().url().nullable(),

//   // Number with constraints
//   age: z.number()
//     .int()
//     .min(13, "You must be at least 13")
//     .max(120),

//   // Enum
//   role: z.enum(["admin", "user", "moderator"]),

//   // Literal values
//   status: z.union([z.literal("active"), z.literal("inactive")]),

//   // Date validation
//   birthday: z.coerce.date().refine(date => date < new Date(), {
//     message: "Birthday must be in the past"
//   }),

//   // Arrays
//   tags: z.array(z.string()).max(5),

//   // Nested objects
//   address: z.object({
//     street: z.string(),
//     city: z.string(),
//     postalCode: z.string().length(6),
//   }),

//   // Tuple
//   coordinates: z.tuple([z.number(), z.number()]),

//   // Custom refinement
//   confirmPassword: z.string(),

//   // Optional union
//   preference: z.union([z.literal("email"), z.literal("sms")]).optional(),

// }).refine((data) => data.password === data.confirmPassword, {
//   path: ["confirmPassword"],
//   message: "Passwords do not match",
// });
