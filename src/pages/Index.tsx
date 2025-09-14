import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import MethodSelector from "@/components/MethodSelector";
import QuizForm from "@/components/QuizForm";
import VoiceConversation from "@/components/VoiceConversation";
import RecommendationCards from "@/components/RecommendationCards";
import { getTranslations } from "@/lib/translations";

type Screen = 'language' | 'method' | 'form' | 'voice' | 'recommendations';

interface FormData {
  name: string;
  education: string;
  field: string;
  skills: string[];
  interests: string[];
  location: string;
  duration: string;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('language');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState<FormData | Record<string, unknown> | null>(null);

  const t = getTranslations(currentLanguage);

  const handleLanguageSelect = (language: string) => {
    setCurrentLanguage(language);
    setCurrentScreen('method');
  };

  const handleMethodSelect = (method: 'form' | 'voice') => {
    setCurrentScreen(method);
  };

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setCurrentScreen('recommendations');
  };

  const handleVoiceComplete = (data: Record<string, unknown>) => {
    setFormData(data);
    setCurrentScreen('recommendations');
  };

  const handleBackToLanguage = () => {
    setCurrentScreen('language');
  };

  const handleBackToMethod = () => {
    setCurrentScreen('method');
  };

  const handleNewSearch = () => {
    setFormData(null);
    setCurrentScreen('method');
  };

  // Render different screens based on state
  switch (currentScreen) {
    case 'language':
      return <LanguageSelector onLanguageSelect={handleLanguageSelect} />;

    case 'method':
      return (
        <MethodSelector
          currentLanguage={currentLanguage}
          onSelectForm={() => handleMethodSelect('form')}
          onSelectVoice={() => handleMethodSelect('voice')}
          onBack={handleBackToLanguage}
          onLanguageChange={setCurrentLanguage}
        />
      );

    case 'form':
      return (
        <QuizForm
          currentLanguage={currentLanguage}
          onSubmit={handleFormSubmit}
          onBack={handleBackToMethod}
          onLanguageChange={setCurrentLanguage}
        />
      );

    case 'voice':
      return (
        <VoiceConversation
          currentLanguage={currentLanguage}
          onComplete={handleVoiceComplete}
          onBack={handleBackToMethod}
          onLanguageChange={setCurrentLanguage}
        />
      );

    case 'recommendations':
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 text-center">
              <Button
                onClick={handleBackToMethod}
                variant="outline"
                className="mb-4"
              >
                ← {t.recommendations.back}
              </Button>
            </div>
            
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
      );

    default:
      return <LanguageSelector onLanguageSelect={handleLanguageSelect} />;
  }
};

export default Index;
