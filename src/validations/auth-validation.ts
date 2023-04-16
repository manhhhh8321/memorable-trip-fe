import { z } from "zod";
import validator from 'validator'

export const LoginFormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid email",
    })
    .trim()
    .max(100, {
      message: "The email field can only enter less than 100 characters",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Invalid password",
    })
    .trim()
    .min(4, {
      message: "The password field can only enter more than 4 characters",
    })
    .max(32, {
      message: "The password field can only enter less than 32 characters",
    }),
});

export const ForgotPasswordFormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid email",
    })
    .trim()
    .max(48, {
      message: "Email max is 48",
    })
    .email(),
});

export const ResetPasswordFormSchema = z
  .object({
    code: z
      .string({
        required_error: "Code is required",
      })
      .length(6, {
        message: "Invalid Code",
      }),
    newPassword: z
      .string({
        required_error: "New password is required",
        invalid_type_error: "Invalid password",
      })
      .min(8, {
        message: "Password min is 8",
      }),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
        invalid_type_error: "Invalid password",
      })
      .min(8, {
        message: "Password min is 8",
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export const ChangePasswordFormSchema = z
  .object({
    oldPassword: z
      .string({
        required_error: "New password is required",
        invalid_type_error: "Invalid password",
      })
      .trim()
      .min(4, {
        message: "The password field can only enter more than 4 characters",
      })
      .max(32, {
        message: "The password field can only enter less than 32 characters",
      }),
    newPassword: z
      .string({
        required_error: "New password is required",
        invalid_type_error: "Invalid password",
      })
      .trim()
      .min(4, {
        message: "The password field can only enter more than 4 characters",
      })
      .max(32, {
        message: "The password field can only enter less than 32 characters",
      }),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
        invalid_type_error: "Invalid password",
      })
      .trim()
      .min(4, {
        message: "The password field can only enter more than 4 characters",
      })
      .max(32, {
        message: "The password field can only enter less than 32 characters",
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export const VerifyPinCodeFormSchema = z.object({
  code: z
    .string({
      required_error: "Pin code is required",
    })
    .length(6, {
      message: "Pin code must be 6 characters",
    }),
});

export const PhoneFormSchema = z.object({
  phone: z.string().refine(validator.isMobilePhone)
})

export const OTPFormSchema = z.object({
  otp: z.string({ required_error: 'OTP is required' })
    .min(4, "Please fill all otp")
})
export const FinishRegisterFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .trim()
    .min(1, 'Name is required')
    .max(100, {
      message: "The name field can only enter less than 100 characters",
    }),
  surname: z
    .string({
      required_error: "Surname is required"
    })
    .trim()
    .min(1, 'The Surname is required')
    .max(100, {
      message: "The Surname field can only enter less than 100 characters",
    }),
  dob: z
    .string({
      required_error: "The birthday is required",
    })
    .trim()
    .min(1, 'The birthday is required'),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid email",
    })
    .trim()
    .max(100, {
      message: "The email field can only enter less than 100 characters",
    })
    .email(),
});