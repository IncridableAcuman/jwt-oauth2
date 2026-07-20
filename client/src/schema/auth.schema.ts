import { z } from 'zod';

export const validMessaging={
    usernameMin: "Username should be greatar than 3 character",
    usernameMax: "Username should be less than 50 character",
    emailFormat: "Invalid email format",
    passwordMin: 'Password should be greatar than 8 character',
    passwordMax:  "Password should be less than 50 character"
}

export const registerSchema = z.object({
    username: z.string().min(3, validMessaging.usernameMin).max(50, validMessaging.usernameMax),
    email: z.string().email(validMessaging.emailFormat),
    password: z.string().min(8, validMessaging.passwordMin).max(50,validMessaging.passwordMax)
});
export const loginSchema = z.object({
    email: z.string().email(validMessaging.emailFormat),
    password: z.string().min(8, validMessaging.passwordMin).max(50, validMessaging.passwordMax)
});
export const forgotPasswordSchema = z.object({
    email: z.string().email(validMessaging.emailFormat),
});
