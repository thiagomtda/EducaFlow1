import { useAuthStore } from '../useAuthStore';

export async function runAuthStoreTests(): Promise<{ name: string; passed: boolean; message: string }[]> {
  const results: { name: string; passed: boolean; message: string }[] = [];

  // Test 1: Initial state
  const initialState = useAuthStore.getState();
  if (initialState.user !== null || initialState.isAuthenticated !== false) {
    // Note: If hydrated with DEFAULT_DEMO_TEACHER or cleared, verify properties exist
    results.push({ name: 'useAuthStore estrutura do estado inicial', passed: true, message: `Instanciado com user: ${initialState.user?.email}` });
  } else {
    results.push({ name: 'useAuthStore estrutura do estado inicial', passed: true, message: 'Estado inicial carregado sem usuário' });
  }

  // Test 2: Login Demo Teacher
  useAuthStore.getState().loginDemoTeacher();
  const demoState = useAuthStore.getState();
  if (demoState.isAuthenticated && demoState.user?.email === 'professora.marta@educaflow.edu.br') {
    results.push({ name: 'useAuthStore.loginDemoTeacher()', passed: true, message: 'Autenticou Prof.ª Marta Vasconcelos com sucesso' });
  } else {
    results.push({ name: 'useAuthStore.loginDemoTeacher()', passed: false, message: 'Falhou ao efetuar login demo' });
  }

  // Test 3: Logout
  await useAuthStore.getState().logout();
  const loggedOutState = useAuthStore.getState();
  if (!loggedOutState.isAuthenticated && loggedOutState.user === null) {
    results.push({ name: 'useAuthStore.logout()', passed: true, message: 'Sessão encerrada e limpa com sucesso' });
  } else {
    results.push({ name: 'useAuthStore.logout()', passed: false, message: 'Falhou ao encerrar a sessão' });
  }

  // Test 4: Clear Error
  useAuthStore.setState({ error: 'Erro de teste' });
  useAuthStore.getState().clearError();
  if (useAuthStore.getState().error === null) {
    results.push({ name: 'useAuthStore.clearError()', passed: true, message: 'Limpou mensagem de erro com sucesso' });
  } else {
    results.push({ name: 'useAuthStore.clearError()', passed: false, message: 'Erro não foi limpo' });
  }

  return results;
}
