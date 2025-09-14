import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Mic, ChevronLeft } from "lucide-react";
import { getTranslations } from "@/lib/translations";

interface MethodSelectorProps {
  currentLanguage: string;
  onSelectForm: () => void;
  onSelectVoice: () => void;
  onBack: () => void;
}

const MethodSelector = ({ currentLanguage, onSelectForm, onSelectVoice, onBack }: MethodSelectorProps) => {
  const t = getTranslations(currentLanguage).methodSelector;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          {t.back}
        </Button>

        {/* Main Card */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="text-center py-8 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardTitle className="text-3xl md:text-4xl text-primary mb-4">
              {t.title}
            </CardTitle>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Form Option */}
              <Card 
                className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/30"
                onClick={onSelectForm}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold text-primary mb-3">{t.formMethod}</h3>
                    <p className="text-muted-foreground text-lg">{t.formDescription}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {t.formFeatures.map((feature, index) => (
                      <span 
                        key={index}
                        className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <Button variant="outline" size="lg" className="w-full">
                    {t.startForm}
                  </Button>
                </CardContent>
              </Card>

              {/* Voice Option */}
              <Card 
                className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-voice/30"
                onClick={onSelectVoice}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-voice/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mic className="w-10 h-10 text-voice" />
                    </div>
                    <h3 className="text-2xl font-semibold text-voice mb-3">{t.voiceMethod}</h3>
                    <p className="text-muted-foreground text-lg">{t.voiceDescription}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {t.voiceFeatures.map((feature, index) => (
                      <span 
                        key={index}
                        className="text-sm bg-voice/10 text-voice px-3 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <Button variant="voice" size="lg" className="w-full">
                    {t.startVoice}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Big Voice Button for Emphasis */}
            <div className="mt-12 text-center">
              <Button
                onClick={onSelectVoice}
                variant="voice"
                size="lg"
                className="h-20 px-12 text-xl rounded-full shadow-lg hover:shadow-xl"
              >
                <Mic className="w-8 h-8 mr-4" />
                {t.voiceRecommendation}
              </Button>
              <p className="text-sm text-muted-foreground mt-3">
                {t.voiceNote}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MethodSelector;