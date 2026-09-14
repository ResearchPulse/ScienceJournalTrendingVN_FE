import QueryProvider from './QueryProvider';
import AuthProvider from './AuthProvider';

export default function AppProviders({ children }) {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryProvider>
  );
}

export { QueryProvider, AuthProvider };
