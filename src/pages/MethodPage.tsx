import { useNavigate } from 'react-router-dom';
import MethodSelector from "@/components/MethodSelector";
import { useLanguageValidation } from "@/hooks/useLanguageValidation";

const MethodPage = () => {
  const navigate = useNavigate();
  const currentLanguage = useLanguageValidation();

  const handleSelectForm = () => {
    navigate(`/${currentLanguage}/form`);
  };

  const handleSelectVoice = () => {
    navigate(`/${currentLanguage}/voice`);
  };

  const handleBack = () => {
    navigate('/language');
  };

  const handleLanguageChange = (newLanguage: string) => {
    navigate(`/${newLanguage}/method`);
  };

  return (
    <MethodSelector
      currentLanguage={currentLanguage}
      onSelectForm={handleSelectForm}
      onSelectVoice={handleSelectVoice}
      onBack={handleBack}
      onLanguageChange={handleLanguageChange}
    />
  );
};

export default MethodPage;
