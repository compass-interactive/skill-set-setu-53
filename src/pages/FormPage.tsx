import { useNavigate } from 'react-router-dom';
import QuizForm from "@/components/QuizForm";
import Header from "@/components/Header";
import { getTranslations } from "@/lib/translations";
import { useLanguageValidation } from "@/hooks/useLanguageValidation";

interface FormData {
  name: string;
  education: string;
  field: string;
  skills: string[];
  interests: string[];
  location: string;
  duration: string;
}

const FormPage = () => {
  const navigate = useNavigate();
  const currentLanguage = useLanguageValidation();

  const t = getTranslations(currentLanguage);

  const handleSubmit = (data: FormData) => {
    // Store form data in sessionStorage for the recommendations page
    sessionStorage.setItem('formData', JSON.stringify(data));
    navigate(`/${currentLanguage}/recommendations`);
  };

  const handleBack = () => {
    navigate(`/${currentLanguage}/method`);
  };

  const handleLanguageChange = (newLanguage: string) => {
    navigate(`/${newLanguage}/form`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onBack={handleBack}
        backLabel={t.methodSelector.back}
        showHero={false}
      />
      
      <div className="p-4 mt-20">
        <QuizForm
          currentLanguage={currentLanguage}
          onSubmit={handleSubmit}
          onBack={handleBack}
          onLanguageChange={handleLanguageChange}
        />
      </div>
    </div>
  );
};

export default FormPage;
