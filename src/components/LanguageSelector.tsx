import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Languages } from "lucide-react";

interface LanguageSelectorProps {
  onLanguageSelect: (language: string) => void;
}

const LanguageSelector = ({ onLanguageSelect }: LanguageSelectorProps) => {
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full shadow-xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center py-8 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <Languages className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl md:text-4xl text-primary mb-2">
            PM Internship Scheme
          </CardTitle>
          <div className="text-lg text-muted-foreground mb-4">
            पीएम इंटर्नशिप योजना
          </div>
          <div className="flex items-center justify-center gap-2 text-primary/80">
            <Globe className="w-5 h-5" />
            <span className="text-lg font-medium">Select Your Language | अपनी भाषा चुनें</span>
          </div>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                onClick={() => onLanguageSelect(lang.code)}
                variant="outline"
                className="h-16 flex-col gap-1 hover:bg-primary/5 hover:border-primary/30 hover:scale-105 transition-all duration-200"
              >
                <span className="font-semibold text-sm text-foreground">
                  {lang.name}
                </span>
                <span className="text-lg font-medium text-primary">
                  {lang.nativeName}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageSelector;