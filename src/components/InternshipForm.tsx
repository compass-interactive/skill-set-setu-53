import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface FormData {
  name: string;
  education: string;
  field: string;
  skills: string[];
  interests: string[];
  location: string;
  duration: string;
  additional: string;
}

interface InternshipFormProps {
  currentLanguage: string;
  onSubmit: (data: FormData) => void;
}

const InternshipForm = ({ currentLanguage, onSubmit }: InternshipFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    education: '',
    field: '',
    skills: [],
    interests: [],
    location: '',
    duration: '',
    additional: ''
  });

  const translations = {
    en: {
      title: "Tell Us About Yourself",
      description: "Fill in your details to get personalized internship recommendations",
      name: "Full Name",
      education: "Education Level",
      field: "Field of Study",
      skills: "Skills (Select all that apply)",
      interests: "Areas of Interest",
      location: "Preferred Location",
      duration: "Preferred Duration",
      additional: "Additional Information",
      submit: "Find My Internships",
      namePlaceholder: "Enter your full name",
      fieldPlaceholder: "e.g., Computer Science, Commerce, Arts",
      additionalPlaceholder: "Any specific requirements or preferences...",
      educationOptions: {
        "12th": "12th Grade/Higher Secondary",
        "diploma": "Diploma",
        "undergraduate": "Undergraduate",
        "graduate": "Graduate",
        "postgraduate": "Post Graduate"
      },
      skillOptions: [
        "Communication", "Leadership", "Teamwork", "Problem Solving",
        "Computer Skills", "Programming", "Data Analysis", "Marketing",
        "Sales", "Design", "Writing", "Research"
      ],
      interestOptions: [
        "Technology", "Finance", "Healthcare", "Education", "Government",
        "NGO/Social Work", "Marketing", "Media", "Manufacturing", "Agriculture"
      ],
      durationOptions: {
        "1-3": "1-3 months",
        "3-6": "3-6 months", 
        "6+": "6+ months",
        "flexible": "Flexible"
      }
    },
    hi: {
      title: "अपने बारे में बताएं",
      description: "व्यैयक्तिकृत इंटर्नशिप सुझाव पाने के लिए अपना विवरण भरें",
      name: "पूरा नाम",
      education: "शिक्षा स्तर",
      field: "अध्ययन का क्षेत्र", 
      skills: "कौशल (सभी लागू का चयन करें)",
      interests: "रुचि के क्षेत्र",
      location: "पसंदीदा स्थान",
      duration: "पसंदीदा अवधि",
      additional: "अतिरिक्त जानकारी",
      submit: "मेरी इंटर्नशिप खोजें",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      fieldPlaceholder: "जैसे, कंप्यूटर साइंस, कॉमर्स, आर्ट्स",
      additionalPlaceholder: "कोई विशिष्ट आवश्यकताएं या प्राथमिकताएं...",
      educationOptions: {
        "12th": "12वीं कक्षा/उच्चतर माध्यमिक",
        "diploma": "डिप्लोमा",
        "undergraduate": "स्नातक",
        "graduate": "स्नातक",
        "postgraduate": "स्नातकोत्तर"
      },
      skillOptions: [
        "संवाद", "नेतृत्व", "टीमवर्क", "समस्या समाधान",
        "कंप्यूटर कौशल", "प्रोग्रामिंग", "डेटा विश्लेषण", "मार्केटिंग",
        "बिक्री", "डिजाइन", "लेखन", "अनुसंधान"
      ],
      interestOptions: [
        "प्रौद्योगिकी", "वित्त", "स्वास्थ्य सेवा", "शिक्षा", "सरकार",
        "एनजीओ/सामाजिक कार्य", "मार्केटिंग", "मीडिया", "निर्माण", "कृषि"
      ],
      durationOptions: {
        "1-3": "1-3 महीने",
        "3-6": "3-6 महीने",
        "6+": "6+ महीने", 
        "flexible": "लचीला"
      }
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary-glow/5 border-b">
        <CardTitle className="text-2xl text-primary">{t.title}</CardTitle>
        <CardDescription className="text-base">{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-medium">{t.name}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder={t.namePlaceholder}
              required
              className="h-11"
            />
          </div>

          {/* Education Level */}
          <div className="space-y-2">
            <Label className="text-base font-medium">{t.education}</Label>
            <Select value={formData.education} onValueChange={(value) => setFormData(prev => ({ ...prev, education: value }))}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(t.educationOptions).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Field of Study */}
          <div className="space-y-2">
            <Label htmlFor="field" className="text-base font-medium">{t.field}</Label>
            <Input
              id="field"
              value={formData.field}
              onChange={(e) => setFormData(prev => ({ ...prev, field: e.target.value }))}
              placeholder={t.fieldPlaceholder}
              className="h-11"
            />
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <Label className="text-base font-medium">{t.skills}</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {t.skillOptions.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={skill}
                    checked={formData.skills.includes(skill)}
                    onCheckedChange={() => handleSkillToggle(skill)}
                  />
                  <Label
                    htmlFor={skill}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {skill}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <Label className="text-base font-medium">{t.interests}</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {t.interestOptions.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest}
                    checked={formData.interests.includes(interest)}
                    onCheckedChange={() => handleInterestToggle(interest)}
                  />
                  <Label
                    htmlFor={interest}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {interest}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Location and Duration */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-base font-medium">{t.location}</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Delhi, Mumbai, Remote"
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-base font-medium">{t.duration}</Label>
              <Select value={formData.duration} onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(t.durationOptions).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-2">
            <Label htmlFor="additional" className="text-base font-medium">{t.additional}</Label>
            <Textarea
              id="additional"
              value={formData.additional}
              onChange={(e) => setFormData(prev => ({ ...prev, additional: e.target.value }))}
              placeholder={t.additionalPlaceholder}
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="hero" size="lg" className="w-full text-lg py-6">
            {t.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InternshipForm;