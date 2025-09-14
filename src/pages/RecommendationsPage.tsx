import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import RecommendationCards from "@/components/RecommendationCards";
import Header from "@/components/Header";
import { getTranslations } from "@/lib/translations";
import { useLanguageValidation } from "@/hooks/useLanguageValidation";

const RecommendationsPage = () => {
  const navigate = useNavigate();
  const currentLanguage = useLanguageValidation();

  const t = getTranslations(currentLanguage);

  const handleBackToMethod = () => {
    navigate(`/${currentLanguage}/method`);
  };

  const handleNewSearch = () => {
    // Clear stored data
    sessionStorage.removeItem('formData');
    sessionStorage.removeItem('voiceData');
    navigate(`/${currentLanguage}/method`);
  };

  const handleLanguageChange = (newLanguage: string) => {
    navigate(`/${newLanguage}/recommendations`);
  };

  // Get stored data (could be from form or voice)
  const formData = sessionStorage.getItem('formData');
  const voiceData = sessionStorage.getItem('voiceData');
  
  // Parse data if available
  let userData = null;
  if (formData) {
    userData = JSON.parse(formData);
  } else if (voiceData) {
    userData = JSON.parse(voiceData);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onBack={handleBackToMethod}
        backLabel={t.recommendations.back}
        showHero={false}
      />
      
      <div className="p-4 mt-20">
        <div className="max-w-4xl mx-auto">
          <RecommendationCards 
            currentLanguage={currentLanguage}
            recommendations={[]}
          />
          
          <div className="text-center mt-8">
            <Button onClick={handleNewSearch} variant="hero" size="lg">
              <Sparkles className="w-5 h-5 mr-2" />
              {t.recommendations.newSearch}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;
