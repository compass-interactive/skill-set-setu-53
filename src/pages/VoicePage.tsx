import { useNavigate } from 'react-router-dom';
import VoiceConversation from "@/components/VoiceConversation";
import Header from "@/components/Header";
import { getTranslations } from "@/lib/translations";
import { useLanguageValidation } from "@/hooks/useLanguageValidation";

const VoicePage = () => {
  const navigate = useNavigate();
  const currentLanguage = useLanguageValidation();

  const t = getTranslations(currentLanguage);

  const handleComplete = (data: Record<string, unknown>) => {
    // Store voice data in sessionStorage for the recommendations page
    sessionStorage.setItem('voiceData', JSON.stringify(data));
    navigate(`/${currentLanguage}/recommendations`);
  };

  const handleBack = () => {
    navigate(`/${currentLanguage}/method`);
  };

  const handleLanguageChange = (newLanguage: string) => {
    navigate(`/${newLanguage}/voice`);
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
        <VoiceConversation
          currentLanguage={currentLanguage}
          onComplete={handleComplete}
          onBack={handleBack}
          onLanguageChange={handleLanguageChange}
        />
      </div>
    </div>
  );
};

export default VoicePage;
