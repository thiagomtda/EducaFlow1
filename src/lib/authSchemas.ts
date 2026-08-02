import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório.')
    .email('Digite um e-mail válido (ex: professor@educaflow.edu.br)'),
  password: z
    .string()
    .min(1, 'A senha é obrigatória.')
    .min(6, 'A senha deve conter no mínimo 6 caracteres.'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'O nome completo é obrigatório.')
      .min(3, 'O nome deve ter no mínimo 3 caracteres.'),
    email: z
      .string()
      .min(1, 'O e-mail é obrigatório.')
      .email('Digite um e-mail válido.'),
    schoolName: z
      .string()
      .min(1, 'O nome da escola é obrigatório.')
      .min(3, 'O nome da escola deve ter no mínimo 3 caracteres.'),
    password: z
      .string()
      .min(1, 'A senha é obrigatória.')
      .min(6, 'A senha deve conter no mínimo 6 caracteres.'),
    confirmPassword: z.string().min(1, 'Confirme a sua senha.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório.')
    .email('Digite um e-mail válido para envio da instrução de recuperação.'),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, 'A nova senha é obrigatória.')
      .min(6, 'A senha deve conter no mínimo 6 caracteres.'),
    confirmPassword: z.string().min(1, 'Confirme a nova senha.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
