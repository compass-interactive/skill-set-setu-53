import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle, Volume2, VolumeX, Loader2 } from "lucide-react";
import { getTranslations } from "@/lib/translations";
import AIVoice from "@/components/ui/ai-voice";
import Header from "@/components/Header";
import { sarvamAPI } from "@/lib/sarvamApi";

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
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
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

  // Clean up audio when component unmounts or step changes
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (currentAudioUrl) {
        sarvamAPI.revokeAudioUrl(currentAudioUrl);
        setCurrentAudioUrl(null);
      }
      setIsSpeaking(false);
      setIsLoadingAudio(false);
    };
  }, [currentStep]);

  // Clean up audio URL when it changes
  useEffect(() => {
    return () => {
      if (currentAudioUrl) {
        sarvamAPI.revokeAudioUrl(currentAudioUrl);
      }
    };
  }, [currentAudioUrl]);

  const speakQuestion = useCallback(async () => {
    try {
      if (isSpeaking && audioRef.current) {
        // Stop current audio
        audioRef.current.pause();
        setIsSpeaking(false);
        return;
      }

      if (isLoadingAudio) {
        return; // Prevent multiple simultaneous requests
      }

      setIsLoadingAudio(true);

      // Prepare text to speak
      const textToSpeak = `${currentQuestion.title}. ${currentQuestion.subtitle || ''}`;

      // Get audio from Sarvam API
      const base64Audio = await sarvamAPI.textToSpeech(textToSpeak, currentLanguage);
      
      if (!base64Audio) {
        throw new Error('No audio received from Sarvam API');
      }

      // Clean up previous audio URL
      if (currentAudioUrl) {
        sarvamAPI.revokeAudioUrl(currentAudioUrl);
      }

      // Create new audio URL
      const audioUrl = sarvamAPI.createAudioUrl(base64Audio);
      setCurrentAudioUrl(audioUrl);

      // Create and play audio
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onloadstart = () => {
        setIsLoadingAudio(false);
        setIsSpeaking(true);
      };

      audio.onended = () => {
        setIsSpeaking(false);
        setIsLoadingAudio(false);
      };

      audio.onerror = (error) => {
        console.error('Audio playback error:', error);
        setIsSpeaking(false);
        setIsLoadingAudio(false);
      };

      await audio.play();

    } catch (error) {
      console.error('Error in speakQuestion:', error);
      setIsSpeaking(false);
      setIsLoadingAudio(false);
      
      // Show user-friendly error message
      if (error instanceof Error && error.message.includes('API key')) {
        console.warn('Sarvam API key not configured. Please add VITE_SARVAM_API_KEY to your environment variables.');
      }
    }
  }, [currentQuestion.title, currentQuestion.subtitle, currentLanguage, isSpeaking, isLoadingAudio, currentAudioUrl]);

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
      variant={(isLoadingAudio || isSpeaking) ? "default" : "outline"}
      size="sm"
      className={`
        flex items-center gap-1.5 sm:gap-2 transition-all duration-200 ease-in-out
        ${(isLoadingAudio || isSpeaking)
          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg scale-105 border-blue-600' 
          : 'border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-800 hover:shadow-md dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/20 dark:hover:border-blue-700'
        }
        ${isSpeaking ? 'animate-pulse' : ''}
        font-medium min-w-[100px] sm:min-w-[140px] justify-center text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3
        touch-manipulation
      `}
      aria-label={
        isLoadingAudio ? "Loading audio..." : 
        isSpeaking ? "Stop reading question" :
        ('listenToQuestion' in t ? String(t.listenToQuestion) : "Listen to question")
      }
      disabled={isLoadingAudio}
    >
      {isLoadingAudio ? (
        <>
          <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin flex-shrink-0" />
          <span className="font-medium hidden sm:inline">Loading...</span>
          <span className="font-medium sm:hidden">...</span>
        </>
      ) : isSpeaking ? (
        <>
          <VolumeX className="w-3 h-3 sm:w-4 sm:h-4 animate-bounce flex-shrink-0" />
          <span className="font-medium hidden sm:inline">Stop</span>
          <span className="font-medium sm:hidden">Stop</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="font-medium hidden sm:inline">
            {'listenToQuestion' in t ? String(t.listenToQuestion) : 'Listen to question'}
          </span>
          <span className="font-medium sm:hidden">Listen</span>
        </>
      )}
    </Button>
  );

  const handleVoiceToggle = (newRecordingState: boolean) => {
    setIsRecording(newRecordingState);
  };

  const handleVoiceTranscript = (transcript: string) => {
    console.log('[QuizForm] Voice transcript received:', transcript);
    
    // Update the current field with the transcript
    if (currentQuestion.type === 'text') {
      setFormData(prev => ({
        ...prev,
        [currentQuestion.id]: transcript
      }));
    } else if (currentQuestion.type === 'select') {
      // For select fields, try to match transcript with available options
      const options = currentQuestion.options;
      if (options) {
        const transcriptLower = transcript.toLowerCase();
        
        // Try exact match first
        let matchedKey = Object.keys(options).find(key => 
          options[key].toLowerCase() === transcriptLower ||
          key.toLowerCase() === transcriptLower
        );
        
        // If no exact match, try partial match
        if (!matchedKey) {
          matchedKey = Object.keys(options).find(key => 
            options[key].toLowerCase().includes(transcriptLower) ||
            transcriptLower.includes(options[key].toLowerCase()) ||
            key.toLowerCase().includes(transcriptLower) ||
            transcriptLower.includes(key.toLowerCase())
          );
        }
        
        if (matchedKey) {
          setFormData(prev => ({
            ...prev,
            [currentQuestion.id]: matchedKey
          }));
        }
      }
    } else if (currentQuestion.type === 'multiselect') {
      // For multiselect, try to match transcript with available options
      const field = currentQuestion.id as 'skills' | 'interests';
      const options = currentQuestion.options as string[];
      
      const transcriptLower = transcript.toLowerCase();
      
      // Simple matching - look for option names in the transcript
      const matchedOptions = options.filter(option => 
        transcriptLower.includes(option.toLowerCase()) ||
        option.toLowerCase().includes(transcriptLower)
      );
      
      if (matchedOptions.length > 0) {
        setFormData(prev => ({
          ...prev,
          [field]: [...new Set([...prev[field], ...matchedOptions])]
        }));
      }
    }
    
    // Stop recording after processing transcript
    setIsRecording(false);
  };

  const VoiceComponent = () => (
    <AIVoice
      isRecording={isRecording}
      onToggle={handleVoiceToggle}
      onTranscript={handleVoiceTranscript}
      currentLanguage={currentLanguage}
      maxRecordingTime={15000} // 15 seconds max
      listenText={('stopRecording' in t ? String(t.stopRecording) : 'Recording your answer...')}
      clickText={`${t.answerWithVoice} for: "${currentQuestion.title}"`}
      className="py-1.5 sm:py-2"
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
          <div className="space-y-3 sm:space-y-4">
            <Input
              value={value as string}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={currentQuestion.subtitle}
              className="h-12 sm:h-14 text-base sm:text-lg"
              autoFocus
            />
            <VoiceComponent />
          </div>
        );

      case 'select':
        return (
          <div className="space-y-3 sm:space-y-4">
            <Select
              value={value as string}
              onValueChange={handleInputChange}
            >
              <SelectTrigger className="h-12 sm:h-14 text-base sm:text-lg">
                <SelectValue placeholder={t.selectOption} />
              </SelectTrigger>
              <SelectContent>
                {currentQuestion.options && Object.entries(currentQuestion.options).map(([key, label]) => (
                  <SelectItem key={key} value={key} className="text-base sm:text-lg py-2 sm:py-3">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <VoiceComponent />
          </div>
        );

      case 'multiselect':
        return (
          <div className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 gap-2 sm:gap-3">
              {Array.isArray(currentQuestion.options) && currentQuestion.options.map((option: string) => (
                <div
                  key={option}
                  className={`flex items-center space-x-3 p-3 sm:p-4 rounded-lg border cursor-pointer transition-all touch-manipulation ${
                    (value as string[]).includes(option)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 active:border-primary/70'
                  }`}
                  onClick={() => handleMultiSelect(option)}
                >
                  <Checkbox
                    checked={(value as string[]).includes(option)}
                    onChange={() => handleMultiSelect(option)}
                    className="flex-shrink-0"
                  />
                  <span className="text-sm sm:text-base font-medium leading-tight flex-1">{option}</span>
                  {(value as string[]).includes(option) && (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
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
      
      {/* Sticky Progress Section */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                <span>{t.question} {currentStep + 1} {t.of} {totalSteps}</span>
                <span>{Math.round(progress)}% {t.complete}</span>
              </div>
              <Progress value={progress} className="h-1.5 sm:h-2" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Question Card */}
        <Card className={`shadow-lg transition-all duration-300 ${
          isSpeaking ? 'ring-2 ring-blue-500 bg-blue-50/30 dark:bg-blue-900/10' : ''
        }`}>
          <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
              <div className="flex-1">
                <CardTitle className={`text-lg sm:text-xl md:text-2xl text-primary mb-2 leading-tight ${
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
                  <p className={`text-muted-foreground text-sm sm:text-base md:text-lg ${
                    isSpeaking ? 'text-blue-600/70 dark:text-blue-400/70' : ''
                  }`}>
                    {currentQuestion.subtitle}
                  </p>
                )}
              </div>
              <div className="flex justify-center sm:justify-end">
                <ListenButton />
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
            {renderQuestion()}
            
            {/* Navigation */}
            <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-6">
              <Button
                onClick={handlePrevious}
                variant="outline"
                disabled={currentStep === 0}
                className="flex items-center justify-center gap-2 h-12 sm:h-10 text-base sm:text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                {t.previous}
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="flex items-center justify-center gap-2 min-w-[140px] sm:min-w-[120px] h-12 sm:h-10 text-base sm:text-sm font-semibold"
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