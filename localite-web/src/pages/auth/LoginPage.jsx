import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeSlash } from '@phosphor-icons/react';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[100dvh] flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-[400px] animate-fade-in-up">
        {/* Header */}
        <div className="mb-10">
          <Link to="/" className="text-xl font-semibold text-fg tracking-tight inline-block mb-8">
            localite
          </Link>
          <h1 className="text-title text-fg mb-2">Welcome back</h1>
          <p className="text-body-sm text-fg-muted">Sign in to your account to continue.</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-error-subtle text-error text-body-sm px-4 py-3 rounded-sm mb-6">{error}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-body-sm font-medium text-fg mb-2">
              Email
            </label>
            <input
              className="input-bordered"
              id="email"
              placeholder="you@example.com"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="text-body-sm font-medium text-fg">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-caption text-fg-muted hover:text-accent transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                className="input-bordered pr-10"
                id="password"
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-faint hover:text-fg-muted transition-colors"
              >
                {showPassword ? <EyeSlash size={18} weight="bold" /> : <Eye size={18} weight="bold" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-body-sm text-fg-muted text-center mt-8">
          New here?{' '}
          <Link to="/signup" className="text-accent font-medium hover:underline">
            Create an account
          </Link>
        </p>

        {/* Footer */}
        <p className="text-caption text-fg-faint text-center mt-12">
          By signing in, you agree to our{' '}
          <Link to="/terms" className="underline">
            Terms
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
