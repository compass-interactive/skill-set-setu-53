import { useNavigate } from 'react-router-dom';
import LanguageSelector from "@/components/LanguageSelector";

const LanguagePage = () => {
  const navigate = useNavigate();

  const handleLanguageSelect = (language: string) => {
    navigate(`/${language}/method`);
  };

  return <LanguageSelector onLanguageSelect={handleLanguageSelect} />;
};

export default LanguagePage;
