import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Mic, CheckCircle } from "lucide-react";
import { getTranslations } from "@/lib/translations";

interface QuizFormProps {
  currentLanguage: string;
  onSubmit: (data: any) => void;
  onBack: () => void;
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

const QuizForm = ({ currentLanguage, onSubmit, onBack }: QuizFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
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
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Mic className="w-4 h-4" />
              {t.answerWithVoice}
            </Button>
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
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Mic className="w-4 h-4" />
              {t.answerWithVoice}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {t.back}
          </Button>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{t.question} {currentStep + 1} {t.of} {totalSteps}</span>
              <span>{Math.round(progress)}% {t.complete}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-primary">
              {currentQuestion.title}
            </CardTitle>
            {currentQuestion.subtitle && (
              <p className="text-muted-foreground text-lg">
                {currentQuestion.subtitle}
              </p>
            )}
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