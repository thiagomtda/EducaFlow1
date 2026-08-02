import { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } from '../authSchemas';

export function runAuthSchemaTests(): { name: string; passed: boolean; message: string }[] {
  const results: { name: string; passed: boolean; message: string }[] = [];

  // Test 1: Valid login schema
  try {
    const validLogin = loginSchema.parse({
      email: 'professora.marta@educaflow.edu.br',
      password: '123456password',
    });
    results.push({ name: 'loginSchema parsing com dados válidos', passed: true, message: 'Sucesso: ' + validLogin.email });
  } catch (err: unknown) {
    results.push({ name: 'loginSchema parsing com dados válidos', passed: false, message: String(err) });
  }

  // Test 2: Invalid email in login schema
  try {
    loginSchema.parse({
      email: 'email-invalido',
      password: '123',
    });
    results.push({ name: 'loginSchema rejeição de e-mail inválido', passed: false, message: 'Deveria ter falhado' });
  } catch {
    results.push({ name: 'loginSchema rejeição de e-mail inválido', passed: true, message: 'Rejeitou e-mail e senha curta corretamente' });
  }

  // Test 3: Password mismatch in register schema
  try {
    registerSchema.parse({
      name: 'Marta Vasconcelos',
      email: 'marta@educaflow.com',
      schoolName: 'Escola Modelo',
      password: 'senha123password',
      confirmPassword: 'senhaOutraPassword',
    });
    results.push({ name: 'registerSchema senhas divergentes', passed: false, message: 'Deveria ter falhado por divergência de senhas' });
  } catch {
    results.push({ name: 'registerSchema senhas divergentes', passed: true, message: 'Rejeitou senhas não coincidentes com sucesso' });
  }

  // Test 4: Valid forgot password schema
  try {
    const validForgot = forgotPasswordSchema.parse({
      email: 'marta@educaflow.edu.br',
    });
    results.push({ name: 'forgotPasswordSchema com e-mail válido', passed: true, message: 'Validou: ' + validForgot.email });
  } catch (err: unknown) {
    results.push({ name: 'forgotPasswordSchema com e-mail válido', passed: false, message: String(err) });
  }

  // Test 5: Valid reset password schema
  try {
    resetPasswordSchema.parse({
      password: 'novaSenhaSegura123',
      confirmPassword: 'novaSenhaSegura123',
    });
    results.push({ name: 'resetPasswordSchema com senhas iguais', passed: true, message: 'Validou redefinição de senha com sucesso' });
  } catch (err: unknown) {
    results.push({ name: 'resetPasswordSchema com senhas iguais', passed: false, message: String(err) });
  }

  return results;
}
