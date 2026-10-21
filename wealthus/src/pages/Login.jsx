import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { auth } from '../config/firebase';

export default function Login() {
  const { t } = useLanguage();
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(t('loginPage.errorMsg'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    const provider = new GoogleAuthProvider();
    
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(t('loginPage.errorMsg'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-24 min-h-[80vh] flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#f8f9fa] border border-[#e5e7eb] p-10 rounded-[2rem] shadow-sm"
      >
        <h1 className="text-3xl font-serif text-[#14532d] mb-8 text-center">
          {isLogin ? t('loginPage.loginTitle') : t('loginPage.signUpTitle')}
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center font-medium fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#0a0a0a]">{t('loginPage.emailLabel')}</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#0a0a0a]">{t('loginPage.passwordLabel')}</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="bg-[#14532d] text-white py-3 rounded-full font-medium hover:bg-[#0f3f22] transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? "..." : (isLogin ? t('loginPage.submitLogin') : t('loginPage.submitSignUp'))}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500 font-medium">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-[#0a0a0a] py-3 rounded-full font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 mb-6"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {t('loginPage.googleBtn')}
        </button>

        <p className="text-center text-sm text-[#0a0a0a]">
          {isLogin ? t('loginPage.noAccountText') : t('loginPage.hasAccountText')}{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#14532d] font-semibold hover:underline"
          >
            {isLogin ? t('loginPage.switchSignUp') : t('loginPage.switchLogin')}
          </button>
        </p>
      </motion.div>
    </div>
  );
}