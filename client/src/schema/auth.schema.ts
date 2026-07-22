import { z } from 'zod';

export const validMessaging = {
    usernameMin: "Username should be greatar than 3 character",
    usernameMax: "Username should be less than 50 character",
    emailFormat: "Invalid email format",
    requiredPassword: "Password is required",
    requiredUsername: "Username is required",
    requiredEmail: "Email is required",
    requiredConfirmPassword: "Confirm password is required",
    passwordMin: 'Password should be greatar than 8 character',
    passwordMax: "Password should be less than 50 character",
    confirmPasswordMin: "Confirm password should be greatar than 8 character",
    confirmPasswordMax: "Confirm password should be less than 50 character",

}

export const registerSchema = z.object({
    username: z.string().min(1,validMessaging.requiredUsername).min(3, validMessaging.usernameMin).max(50, validMessaging.usernameMax),
    email: z.string().min(1,validMessaging.requiredEmail).email(validMessaging.requiredEmail),
    password: z.string().min(1,validMessaging.requiredPassword).min(8, validMessaging.passwordMin).max(50, validMessaging.passwordMax)
});
export const loginSchema = z.object({
    email: z.string().min(1,validMessaging.requiredEmail).email(validMessaging.requiredEmail),
    password: z.string().min(1,validMessaging.requiredPassword).min(8, validMessaging.passwordMin).max(50, validMessaging.passwordMax)
});
export const forgotPasswordSchema = z.object({
    email: z.string().min(1,validMessaging.requiredEmail).email(validMessaging.requiredEmail),
});

export const resetPasswordSchema = z.object({
    password: z.string().min(1,validMessaging.requiredPassword).min(8, validMessaging.passwordMin).max(50, validMessaging.passwordMax),
    confirmPassword: z.string().min(1,validMessaging.requiredConfirmPassword).min(8, validMessaging.confirmPasswordMin).max(50, validMessaging.confirmPasswordMax),
    token: z.string()
}).refine((data) => data.password !== data.confirmPassword, {
    message: "Password doesn't mismatch",
    path: ["confirmPassword"]
})