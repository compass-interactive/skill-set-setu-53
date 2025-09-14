import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Building, Star, ExternalLink, Heart } from "lucide-react";

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  type: string;
  skills: string[];
  description: string;
  matchScore: number;
  stipend?: string;
  remote: boolean;
}

interface RecommendationCardsProps {
  currentLanguage: string;
  recommendations: Internship[];
}

const RecommendationCards = ({ currentLanguage, recommendations }: RecommendationCardsProps) => {
  const translations = {
    en: {
      title: "Recommended Internships for You",
      description: "Based on your profile, here are the best matches",
      matchScore: "Match Score",
      remote: "Remote",
      onsite: "On-site",
      hybrid: "Hybrid",
      apply: "Apply Now",
      learnMore: "Learn More",
      skills: "Skills Required",
      noRecommendations: "No recommendations found. Please try again with different preferences."
    },
    hi: {
      title: "आपके लिए सुझाई गई इंटर्नशिप",
      description: "आपकी प्रोफ़ाइल के आधार पर, यहाँ सबसे अच्छे मैच हैं",
      matchScore: "मैच स्कोर",
      remote: "रिमोट",
      onsite: "ऑन-साइट",
      hybrid: "हाइब्रिड",
      apply: "अभी आवेदन करें",
      learnMore: "और जानें",
      skills: "आवश्यक कौशल",
      noRecommendations: "कोई सिफारिश नहीं मिली। कृपया अलग प्राथमिकताओं के साथ पुनः प्रयास करें।"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  // Mock data if no recommendations provided
  const mockRecommendations: Internship[] = [
    {
      id: "1",
      title: "Software Development Intern",
      company: "Tech Mahindra",
      location: "Bangalore",
      duration: "3 months",
      type: "hybrid",
      skills: ["Python", "Web Development", "Problem Solving"],
      description: "Work on real-world software projects with experienced developers. Learn modern web technologies and contribute to enterprise applications.",
      matchScore: 95,
      stipend: "₹15,000/month",
      remote: false
    },
    {
      id: "2", 
      title: "Digital Marketing Intern",
      company: "Flipkart",
      location: "Remote",
      duration: "4 months",
      type: "remote",
      skills: ["Social Media", "Content Creation", "Analytics"],
      description: "Help create and execute digital marketing campaigns for one of India's largest e-commerce platforms.",
      matchScore: 88,
      stipend: "₹12,000/month",
      remote: true
    },
    {
      id: "3",
      title: "Data Analytics Intern", 
      company: "ICICI Bank",
      location: "Mumbai",
      duration: "6 months",
      type: "onsite",
      skills: ["Excel", "Data Analysis", "Communication"],
      description: "Analyze customer data and market trends to support business decisions in India's leading private bank.",
      matchScore: 82,
      stipend: "₹18,000/month", 
      remote: false
    },
    {
      id: "4",
      title: "Government Policy Research Intern",
      company: "NITI Aayog",
      location: "New Delhi", 
      duration: "3 months",
      type: "onsite",
      skills: ["Research", "Writing", "Policy Analysis"],
      description: "Contribute to policy research and development for national development programs.",
      matchScore: 78,
      stipend: "₹10,000/month",
      remote: false
    },
    {
      id: "5",
      title: "Social Media Content Intern",
      company: "Paytm",
      location: "Noida",
      duration: "2 months", 
      type: "hybrid",
      skills: ["Content Writing", "Design", "Social Media"],
      description: "Create engaging content for social media platforms and help build brand awareness.",
      matchScore: 75,
      stipend: "₹8,000/month",
      remote: false
    }
  ];

  const displayRecommendations = recommendations.length > 0 ? recommendations : mockRecommendations;

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 80) return "text-blue-600 bg-blue-50 border-blue-200";
    if (score >= 70) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-gray-600 bg-gray-50 border-gray-200";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'remote': return '🏠';
      case 'hybrid': return '🔄';
      default: return '🏢';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'remote': return t.remote;
      case 'hybrid': return t.hybrid;
      default: return t.onsite;
    }
  };

  if (displayRecommendations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">{t.noRecommendations}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary mb-2">{t.title}</h2>
        <p className="text-muted-foreground text-lg">{t.description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {displayRecommendations.slice(0, 5).map((internship, index) => (
          <Card key={internship.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200">
                    {internship.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-base mt-1">
                    <Building className="w-4 h-4" />
                    {internship.company}
                  </CardDescription>
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-semibold ${getMatchScoreColor(internship.matchScore)}`}>
                  <Star className="w-3 h-3 fill-current" />
                  {internship.matchScore}%
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Location and Duration */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {internship.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {internship.duration}
                </div>
                <div className="flex items-center gap-1">
                  <span>{getTypeIcon(internship.type)}</span>
                  {getTypeLabel(internship.type)}
                </div>
              </div>

              {/* Stipend */}
              {internship.stipend && (
                <div className="text-lg font-semibold text-success">
                  {internship.stipend}
                </div>
              )}

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {internship.description}
              </p>

              {/* Skills */}
              <div>
                <div className="text-sm font-medium text-foreground mb-2">{t.skills}</div>
                <div className="flex flex-wrap gap-1">
                  {internship.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button variant="hero" className="flex-1" size="sm">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  {t.apply}
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  {t.learnMore}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendationCards;