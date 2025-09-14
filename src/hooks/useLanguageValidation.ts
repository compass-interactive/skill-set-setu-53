import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const VALID_LANGUAGES = ['en', 'hi', 'ta', 'te', 'kn', 'ml', 'bn', 'mr', 'gu', 'pa', 'or'];

export const useLanguageValidation = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    if (lang && !VALID_LANGUAGES.includes(lang)) {
      navigate('/language');
    }
  }, [lang, navigate]);

  return lang || 'en';
};

export default useLanguageValidation;
