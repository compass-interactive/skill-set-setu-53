import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle, Volume2, VolumeX } from "lucide-react";
import { getTranslations } from "@/lib/translations";
import AIVoice from "@/components/ui/ai-voice";
import Header from "@/components/Header";

interface QuizFormProps {
  currentLanguage: string;
  onSubmit: (data: FormData) => void;
  onBack: () => void;
  onLanguageChange?: (language: string) => void;
}

interface FormData {
  name: string;
  education: string;
  field: string;
  skills: string[];
  interests: string[];
  location: string;
  duration: string;
}

const QuizForm = ({ currentLanguage, onSubmit, onBack, onLanguageChange }: QuizFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    education: '',
    field: '',
    skills: [],
    interests: [],
    location: '',
    duration: ''
  });

  const t = getTranslations(currentLanguage).quizForm;
  const totalSteps = 7;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const questions = [
    {
      id: 'name',
      title: t.questions.name.title,
      subtitle: t.questions.name.subtitle,
      type: 'text'
    },
    {
      id: 'education',
      title: t.questions.education.title,
      subtitle: t.questions.education.subtitle,
      type: 'select',
      options: t.questions.education.options
    },
    {
      id: 'field',
      title: t.questions.field.title,
      subtitle: t.questions.field.subtitle,
      type: 'text'
    },
    {
      id: 'skills',
      title: t.questions.skills.title,
      subtitle: t.questions.skills.subtitle,
      type: 'multiselect',
      options: t.questions.skills.options
    },
    {
      id: 'interests',
      title: t.questions.interests.title,
      subtitle: t.questions.interests.subtitle,
      type: 'multiselect',
      options: t.questions.interests.options
    },
    {
      id: 'location',
      title: t.questions.location.title,
      subtitle: t.questions.location.subtitle,
      type: 'text'
    },
    {
      id: 'duration',
      title: t.questions.duration.title,
      subtitle: t.questions.duration.subtitle,
      type: 'select',
      options: t.questions.duration.options
    }
  ];

  const currentQuestion = questions[currentStep];

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
      
      // Debug: Log available voices
      const logVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log('Available voices:', voices.map(v => ({
          name: v.name,
          lang: v.lang,
          default: v.default
        })));
      };
      
      // Wait for voices to load
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', logVoices, { once: true });
      } else {
        logVoices();
      }
    }
  }, []);

  // Stop speech when component unmounts or step changes
  useEffect(() => {
    return () => {
      if (speechSynthesis) {
        speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    };
  }, [speechSynthesis, currentStep]);

  // Text-to-speech functions
  const getLanguageCode = useCallback((lang: string) => {
    // Primary language mappings with regional variants
    const langMap: Record<string, string[]> = {
      'en': ['en-US', 'en-GB', 'en-AU', 'en'],
      'hi': ['hi-IN', 'hi'],
      'ta': ['ta-IN', 'ta-LK', 'ta'],
      'te': ['te-IN', 'te'],
      'kn': ['kn-IN', 'kn'],
      'ml': ['ml-IN', 'ml'],
      'bn': ['bn-IN', 'bn-BD', 'bn'],
      'mr': ['mr-IN', 'mr'],
      'gu': ['gu-IN', 'gu'],
      'pa': ['pa-IN', 'pa-PK', 'pa'],
      'or': ['or-IN', 'or']
    };
    
    const variants = langMap[lang] || ['en-US'];
    return variants[0]; // Return the primary variant
  }, []);

  const findBestVoice = useCallback((targetLang: string) => {
    if (!speechSynthesis) return null;
    
    const voices = speechSynthesis.getVoices();
    const langMap: Record<string, string[]> = {
      'en': ['en-US', 'en-GB', 'en-AU', 'en'],
      'hi': ['hi-IN', 'hi'],
      'ta': ['ta-IN', 'ta-LK', 'ta'],
      'te': ['te-IN', 'te'],
      'kn': ['kn-IN', 'kn'],
      'ml': ['ml-IN', 'ml'],
      'bn': ['bn-IN', 'bn-BD', 'bn'],
      'mr': ['mr-IN', 'mr'],
      'gu': ['gu-IN', 'gu'],
      'pa': ['pa-IN', 'pa-PK', 'pa'],
      'or': ['or-IN', 'or']
    };
    
    const possibleLangCodes = langMap[targetLang] || ['en-US'];
    
    // Try each language variant in order of preference
    for (const langCode of possibleLangCodes) {
      // Try exact match
      let voice = voices.find(v => v.lang === langCode);
      if (voice) return voice;
      
      // Try case-insensitive match
      voice = voices.find(v => v.lang.toLowerCase() === langCode.toLowerCase());
      if (voice) return voice;
    }
    
    // Try language base matching (e.g., 'hi' from 'hi-IN')
    const languageBase = possibleLangCodes[0].split('-')[0];
    let voice = voices.find(v => v.lang.toLowerCase().startsWith(languageBase.toLowerCase()));
    if (voice) return voice;
    
    // Try partial matching
    voice = voices.find(v => v.lang.toLowerCase().includes(languageBase.toLowerCase()));
    if (voice) return voice;
    
    // Fallback to default system voice or first available
    if (voices.length > 0) {
      voice = voices.find(v => v.default) || voices[0];
      console.warn(`No suitable voice found for language ${targetLang}, using fallback:`, voice?.name, voice?.lang);
      return voice;
    }
    
    return null;
  }, [speechSynthesis]);

  const speakQuestion = useCallback(() => {
    if (!speechSynthesis) return;

    if (isSpeaking) {
      // Stop current speech
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Create new speech
    const textToSpeak = `${currentQuestion.title}. ${currentQuestion.subtitle || ''}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Set language and voice
    const languageCode = getLanguageCode(currentLanguage);
    const voice = findBestVoice(currentLanguage);
    
    utterance.lang = languageCode;
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.rate = 0.8; // Slightly slower for better clarity
    utterance.pitch = 1;
    utterance.volume = 1;

    // Event listeners
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (error) => {
      console.warn('Speech synthesis error:', error);
      setIsSpeaking(false);
    };

    // Ensure voices are loaded before speaking
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.addEventListener('voiceschanged', () => {
        speechSynthesis.speak(utterance);
      }, { once: true });
    } else {
      speechSynthesis.speak(utterance);
    }
  }, [speechSynthesis, isSpeaking, currentQuestion.title, currentQuestion.subtitle, currentLanguage, getLanguageCode, findBestVoice]);

  // Add keyboard shortcut for text-to-speech (Ctrl/Cmd + L)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'l') {
        event.preventDefault();
        speakQuestion();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [speakQuestion]);

  const ListenButton = () => (
    <Button
      onClick={speakQuestion}
      variant={isSpeaking ? "default" : "outline"}
      size="sm"
      className={`
        flex items-center gap-2 transition-all duration-200 ease-in-out
        ${isSpeaking 
          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg scale-105 animate-pulse border-blue-600' 
          : 'border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-800 hover:shadow-md dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/20 dark:hover:border-blue-700'
        }
        font-medium min-w-[140px] justify-center
      `}
      aria-label={isSpeaking ? 
        ('stopListening' in t ? String(t.stopListening) : "Stop reading question") : 
        ('listenToQuestion' in t ? String(t.listenToQuestion) : "Listen to question")
      }
      disabled={!speechSynthesis}
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-4 h-4 animate-bounce" />
          <span className="text-sm font-medium">
            {'stopListening' in t ? String(t.stopListening) : 'Stop'}
          </span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4" />
          <span className="text-sm font-medium">
            {'listenToQuestion' in t ? String(t.listenToQuestion) : 'Listen to question'}
          </span>
        </>
      )}
    </Button>
  );

  const handleVoiceToggle = (newRecordingState: boolean) => {
    setIsRecording(newRecordingState);
    if (newRecordingState) {
      // TODO: Implement actual voice recording start logic
      console.log('Starting voice recording');
    } else {
      // TODO: Implement actual voice recording stop logic
      console.log('Stopping voice recording');
    }
  };

  const VoiceComponent = () => (
    <AIVoice
      isRecording={isRecording}
      onToggle={handleVoiceToggle}
      listenText={('stopRecording' in t ? String(t.stopRecording) : 'Recording your answer...')}
      clickText={`${t.answerWithVoice} for: "${currentQuestion.title}"`}
      className="py-2"
    />
  );

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleMultiSelect = (option: string) => {
    const field = currentQuestion.id as 'skills' | 'interests';
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(option)
        ? prev[field].filter(item => item !== option)
        : [...prev[field], option]
    }));
  };

  const isStepValid = () => {
    const value = formData[currentQuestion.id as keyof FormData];
    if (currentQuestion.type === 'multiselect') {
      return Array.isArray(value) && value.length > 0;
    }
    return typeof value === 'string' && value.trim() !== '';
  };

  const renderQuestion = () => {
    const value = formData[currentQuestion.id as keyof FormData];

    switch (currentQuestion.type) {
      case 'text':
        return (
          <div className="space-y-4">
            <Input
              value={value as string}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={currentQuestion.subtitle}
              className="h-14 text-lg"
              autoFocus
            />
            <VoiceComponent />
          </div>
        );

      case 'select':
        return (
          <Select
            value={value as string}
            onValueChange={handleInputChange}
          >
            <SelectTrigger className="h-14 text-lg">
              <SelectValue placeholder={t.selectOption} />
            </SelectTrigger>
            <SelectContent>
              {currentQuestion.options && Object.entries(currentQuestion.options).map(([key, label]) => (
                <SelectItem key={key} value={key} className="text-lg py-3">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'multiselect':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Array.isArray(currentQuestion.options) && currentQuestion.options.map((option: string) => (
                <div
                  key={option}
                  className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all ${
                    (value as string[]).includes(option)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleMultiSelect(option)}
                >
                  <Checkbox
                    checked={(value as string[]).includes(option)}
                    onChange={() => handleMultiSelect(option)}
                  />
                  <span className="text-base font-medium">{option}</span>
                  {(value as string[]).includes(option) && (
                    <CheckCircle className="w-5 h-5 text-primary ml-auto" />
                  )}
                </div>
              ))}
            </div>
            <VoiceComponent />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header with fixed navigation and back button */}
      <Header 
        currentLanguage={currentLanguage} 
        onLanguageChange={onLanguageChange || (() => {})}
        onBack={onBack}
        backLabel={t.back}
        showHero={false}
      />
      
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-2xl mx-auto">
          {/* Progress Section */}
          <div className="mb-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{t.question} {currentStep + 1} {t.of} {totalSteps}</span>
                <span>{Math.round(progress)}% {t.complete}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <Card className={`shadow-lg transition-all duration-300 ${
          isSpeaking ? 'ring-2 ring-blue-500 bg-blue-50/30 dark:bg-blue-900/10' : ''
        }`}>
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className={`text-2xl text-primary mb-2 ${
                  isSpeaking ? 'text-blue-600 dark:text-blue-400' : ''
                }`}>
                  {currentQuestion.title}
                  {isSpeaking && (
                    <span className="ml-2 inline-flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    </span>
                  )}
                </CardTitle>
                {currentQuestion.subtitle && (
                  <p className={`text-muted-foreground text-lg ${
                    isSpeaking ? 'text-blue-600/70 dark:text-blue-400/70' : ''
                  }`}>
                    {currentQuestion.subtitle}
                  </p>
                )}
              </div>
              <ListenButton />
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {renderQuestion()}
            
            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button
                onClick={handlePrevious}
                variant="outline"
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                {t.previous}
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="flex items-center gap-2 min-w-[120px]"
              >
                {currentStep === totalSteps - 1 ? t.submit : t.next}
                {currentStep < totalSteps - 1 && <ChevronRight className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizForm;