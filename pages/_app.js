// pages/_app.js
import { AuthProvider } from '../hooks/useAuth';
import '../styles/globals.css'
import '../styles/SilderStyles.css'

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
