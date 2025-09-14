import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

interface HeaderProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const Header = ({ currentLanguage, onLanguageChange }: HeaderProps) => {
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
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
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  return (
    <header className="relative overflow-hidden">
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
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-6">
          {/* Government Logo Area */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-full"></div>
            </div>
            <div className="text-white">
              <div className="text-sm font-medium opacity-90">Government of India</div>
              <div className="text-xs opacity-75">भारत सरकार</div>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex flex-wrap gap-1">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                variant={currentLanguage === lang.code ? "secondary" : "ghost"}
                size="sm"
                className={`text-xs ${
                  currentLanguage === lang.code 
                    ? "bg-white/20 text-white border border-white/30" 
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {lang.nativeName}
              </Button>
            ))}
          </div>
        </div>

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
  );
};

export default Header;