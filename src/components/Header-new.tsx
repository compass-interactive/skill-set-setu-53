import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, Globe } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

interface HeaderProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  onBack?: () => void;
  backLabel?: string;
  showHero?: boolean;
}

const Header = ({ currentLanguage, onLanguageChange, onBack, backLabel, showHero = true }: HeaderProps) => {
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  ];

  const translations = {
    en: {
      title: "PM Internship Scheme",
      subtitle: "Find Your Perfect Internship Match",
      description: "AI-powered recommendations for internships across India"
    },
    hi: {
      title: "पीएम इंटर्नशिप योजना",
      subtitle: "अपना आदर्श इंटर्नशिप मैच खोजें",
      description: "भारत भर में इंटर्नशिप के लिए एआई-संचालित सिफारिशें"
    },
    bn: {
      title: "পিএম ইন্টার্নশিপ স্কিম",
      subtitle: "আপনার নিখুঁত ইন্টার্নশিপ ম্যাচ খুঁজুন",  
      description: "ভারত জুড়ে ইন্টার্নশিপের জন্য এআই-চালিত সুপারিশ"
    },
    te: {
      title: "పిఎం ఇంటర్న్‌షిప్ స్కీమ్",
      subtitle: "మీ పర్ఫెక్ట్ ఇంటర్న్‌షిప్ మ్యాచ్ కనుగొనండి",
      description: "భారతదేశం అంతటా ఇంటర్న్‌షిప్‌ల కోసం AI-ఆధారిత సిఫార్సులు"
    },
    ta: {
      title: "பிஎம் பயிற்சித் திட்டம்",
      subtitle: "உங்கள் சரியான பயிற்சி பொருத்தத்தைக் கண்டறியுங்கள்",
      description: "இந்தியா முழுவதும் பயிற்சிகளுக்கான AI-இயங்கும் பரிந்துரைகள்"
    },
    mr: {
      title: "पीएम इंटर्नशिप योजना", 
      subtitle: "तुमचा परफेक्ट इंटर्नशिप मॅच शोधा",
      description: "संपूर्ण भारतातील इंटर्नशिपसाठी AI-चालित शिफारसी"
    },
    gu: {
      title: "પીએમ ઇન્ટર્નશિપ સ્કીમ",
      subtitle: "તમારો પરફેક્ટ ઇન્ટર્નશિપ મેચ શોધો",
      description: "સમગ્ર ભારતમાં ઇન્ટર્નશિપ માટે AI-સંચાલિત ભલામણો"
    },
    kn: {
      title: "ಪಿಎಂ ಇಂಟರ್ನ್‌ಶಿಪ್ ಯೋಜನೆ",
      subtitle: "ನಿಮ್ಮ ಪರಿಪೂರ್ಣ ಇಂಟರ್ನ್‌ಶಿಪ್ ಹೊಂದಾಣಿಕೆಯನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ",
      description: "ಭಾರತದಾದ್ಯಂತ ಇಂಟರ್ನ್‌ಶಿಪ್‌ಗಳಿಗಾಗಿ AI-ಚಾಲಿತ ಶಿಫಾರಸುಗಳು"
    },
    ml: {
      title: "പിഎം ഇന്റേൺഷിപ്പ് സ്കീം",
      subtitle: "നിങ്ങളുടെ പെർഫെക്റ്റ് ഇന്റേൺഷിപ്പ് മാച്ച് കണ്ടെത്തുക",
      description: "ഇന്ത്യയിലുടനീളമുള്ള ഇന്റേൺഷിപ്പുകൾക്കായി AI-പവേർഡ് ശുപാർശകൾ"
    },
    pa: {
      title: "ਪੀਐਮ ਇੰਟਰਨਸ਼ਿਪ ਸਕੀਮ",
      subtitle: "ਆਪਣਾ ਸੰਪੂਰਨ ਇੰਟਰਨਸ਼ਿਪ ਮੈਚ ਲੱਭੋ",
      description: "ਪੂਰੇ ਭਾਰਤ ਵਿੱਚ ਇੰਟਰਨਸ਼ਿਪਾਂ ਲਈ AI-ਸੰਚਾਲਿਤ ਸਿਫ਼ਾਰਸ਼ਾਂ"
    },
    or: {
      title: "ପିଏମ୍ ଇଣ୍ଟର୍ନସିପ୍ ସ୍କିମ୍",
      subtitle: "ଆପଣଙ୍କର ପରଫେକ୍ଟ ଇଣ୍ଟର୍ନସିପ୍ ମ୍ୟାଚ୍ ଖୋଜନ୍ତୁ",
      description: "ସମଗ୍ର ଭାରତରେ ଇଣ୍ଟର୍ନସିପ୍ ପାଇଁ AI-ଚାଳିତ ସୁପାରିଶ"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;
  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <>
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Left side: Back button or Government Logo */}
            <div className="flex items-center space-x-3">
              {onBack ? (
                <Button
                  onClick={onBack}
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary hover:bg-primary/10 dark:text-gray-300 dark:hover:text-primary"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">{backLabel || 'Back'}</span>
                </Button>
              ) : (
                <>
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">Government of India</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">भारत सरकार</div>
                  </div>
                </>
              )}
            </div>

            {/* Center Title */}
            <div className="hidden md:block text-center">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                PM Internship Scheme
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Find Your Perfect Match
              </p>
            </div>

            {/* Language Selector Dropdown */}
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <Select value={currentLanguage} onValueChange={onLanguageChange}>
                <SelectTrigger className="w-[140px] border-gray-300 dark:border-gray-600 focus:border-primary">
                  <SelectValue>
                    <span className="text-sm">{currentLang.nativeName}</span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 max-h-[300px]">
                  {languages.map((lang) => (
                    <SelectItem 
                      key={lang.code} 
                      value={lang.code}
                      className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{lang.nativeName}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{lang.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with proper top margin - only show if showHero is true */}
      {showHero && (
        <header className="relative overflow-hidden mt-16">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img 
              src={heroBanner} 
              alt="PM Internship Scheme Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
            {/* Main Title */}
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
                {t.title}
              </h1>
              <h2 className="text-xl md:text-2xl text-white/90 mb-4 font-medium">
                {t.subtitle}
              </h2>
              <p className="text-white/80 text-lg max-w-lg">
                {t.description}
              </p>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
