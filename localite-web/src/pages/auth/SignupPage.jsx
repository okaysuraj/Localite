import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeSlash } from '@phosphor-icons/react';

const SignupPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill all fields');
      return;
    }
    if (!agreeTerms) {
      setError('Please agree to the terms to continue');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await register(formData.username, formData.email, formData.password);
      navigate('/verify-email');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[100dvh] flex items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-[400px] animate-fade-in-up">
        {/* Header */}
        <div className="mb-10">
          <Link
            to="/"
            className="text-xl font-semibold text-fg tracking-tight inline-block mb-8"
          >
            localite
          </Link>
          <h1 className="text-title text-fg mb-2">Create your account</h1>
          <p className="text-body-sm text-fg-muted">
            Join the community and discover what's happening nearby.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-error-subtle text-error text-body-sm px-4 py-3 rounded-sm mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="full-name"
              className="block text-body-sm font-medium text-fg mb-2"
            >
              Full name
            </label>
            <input
              className="input-bordered"
              id="full-name"
              placeholder="Your name"
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-body-sm font-medium text-fg mb-2"
            >
              Email
            </label>
            <input
              className="input-bordered"
              id="email"
              placeholder="you@example.com"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-body-sm font-medium text-fg mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="input-bordered pr-10"
                id="password"
                placeholder="At least 8 characters"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-faint hover:text-fg-muted transition-colors"
              >
                {showPassword ? (
                  <EyeSlash size={18} weight="bold" />
                ) : (
                  <Eye size={18} weight="bold" />
                )}
              </button>
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-3">
            <input
              className="mt-1 w-4 h-4 rounded-sm border border-border text-accent accent-accent cursor-pointer"
              id="terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <label
              className="text-body-sm text-fg-muted cursor-pointer leading-snug"
              htmlFor="terms"
            >
              I agree to the{' '}
              <Link to="/terms" className="text-accent hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-accent hover:underline">
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        {/* Sign in link */}
        <p className="text-body-sm text-fg-muted text-center mt-8">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-accent font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignupPage;
