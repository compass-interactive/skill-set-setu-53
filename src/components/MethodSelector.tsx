import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Mic, ChevronLeft } from "lucide-react";
import { getTranslations } from "@/lib/translations";
import Header from "@/components/Header";

interface MethodSelectorProps {
  currentLanguage: string;
  onSelectForm: () => void;
  onSelectVoice: () => void;
  onBack: () => void;
  onLanguageChange: (language: string) => void;
}

const MethodSelector = ({ currentLanguage, onSelectForm, onSelectVoice, onBack, onLanguageChange }: MethodSelectorProps) => {
  const t = getTranslations(currentLanguage).methodSelector;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header with fixed navigation and back button */}
      <Header 
        currentLanguage={currentLanguage} 
        onLanguageChange={onLanguageChange}
        onBack={onBack}
        backLabel={t.back}
        showHero={false}
      />
      
      <div className="container mx-auto px-4 py-12 mt-16">
        {/* Main Card */}
        <Card className="shadow-2xl border-0 bg-white/98 backdrop-blur-sm max-w-5xl mx-auto overflow-hidden">
          <CardHeader className="text-center py-10 bg-gradient-to-r from-primary/8 via-primary/5 to-accent/8 border-b border-gray-100">
            <div className="max-w-3xl mx-auto">
              <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {t.title}
              </CardTitle>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t.subtitle}
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="p-10">
            <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {/* Form Option */}
              <Card 
                className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-2 border-gray-200 hover:border-primary/50 group bg-gradient-to-br from-white to-gray-50/50"
                onClick={onSelectForm}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/15 group-hover:to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300">
                      <FileText className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.formMethod}</h3>
                    <p className="text-gray-600 text-base leading-relaxed">{t.formDescription}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {t.formFeatures.map((feature, index) => (
                      <span 
                        key={index}
                        className="text-xs font-semibold bg-primary/10 text-primary px-3 py-2 rounded-full border border-primary/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <Button 
                    variant="default" 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {t.startForm}
                  </Button>
                </CardContent>
              </Card>

              {/* Voice Option */}
              <Card 
                className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-2 border-gray-200 hover:border-voice/50 group bg-gradient-to-br from-white to-gray-50/50"
                onClick={onSelectVoice}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-voice/10 to-voice/5 group-hover:from-voice/15 group-hover:to-voice/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300">
                      <Mic className="w-12 h-12 text-voice" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.voiceMethod}</h3>
                    <p className="text-gray-600 text-base leading-relaxed">{t.voiceDescription}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {t.voiceFeatures.map((feature, index) => (
                      <span 
                        key={index}
                        className="text-xs font-semibold bg-voice/10 text-voice px-3 py-2 rounded-full border border-voice/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <Button 
                    variant="voice" 
                    size="lg" 
                    className="w-full bg-voice hover:bg-voice/90 text-white font-semibold h-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {t.startVoice}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Access Section */}
            <div className="mt-16 text-center border-t border-gray-200 pt-12">
              <div className="mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Quick Access</h4>
                <p className="text-base text-gray-600">Recommended for users with limited digital experience</p>
              </div>
              <Button
                onClick={onSelectVoice}
                variant="voice"
                size="lg"
                className="h-16 px-10 text-lg rounded-2xl shadow-xl hover:shadow-2xl bg-gradient-to-r from-voice to-voice/90 hover:from-voice/90 hover:to-voice/80 text-white font-bold transition-all duration-300 transform hover:scale-105"
              >
                <Mic className="w-6 h-6 mr-4" />
                {t.voiceRecommendation}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MethodSelector;