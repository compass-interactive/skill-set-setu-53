import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, MessageCircle, Volume2 } from "lucide-react";

interface VoiceConversationProps {
  currentLanguage: string;
  onComplete: (data: any) => void;
}

const VoiceConversation = ({ currentLanguage, onComplete }: VoiceConversationProps) => {
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const translations = {
    en: {
      title: "Voice Conversation",
      description: "Tell us about yourself and your internship preferences using voice",
      startListening: "Start Voice Conversation",
      stopListening: "Stop Listening",
      processing: "Processing...",
      instructions: "Click the microphone button and tell us:",
      bulletPoints: [
        "Your name and education background",
        "Skills you have or want to learn", 
        "What type of work interests you",
        "Your preferred location and duration",
        "Any specific requirements"
      ],
      example: "Example: 'Hi, I'm Rajesh from Delhi. I just completed my 12th grade and I'm interested in technology and computers. I want to learn programming and work in IT companies. I prefer internships in Delhi or remote work for 3-6 months.'",
      aiResponse: "Our AI assistant will ask follow-up questions to better understand your preferences and suggest the best internships for you."
    },
    hi: {
      title: "आवाज़ द्वारा बातचीत",
      description: "आवाज़ का उपयोग करके अपने बारे में और अपनी इंटर्नशिप प्राथमिकताओं के बारे में बताएं",
      startListening: "आवाज़ बातचीत शुरू करें",
      stopListening: "सुनना बंद करें", 
      processing: "प्रसंस्करण...",
      instructions: "माइक्रोफ़ोन बटन दबाएं और हमें बताएं:",
      bulletPoints: [
        "आपका नाम और शिक्षा पृष्ठभूमि",
        "आपके पास कौशल हैं या सीखना चाहते हैं",
        "किस प्रकार का काम आपको दिलचस्प लगता है",
        "आपका पसंदीदा स्थान और अवधि",
        "कोई विशिष्ट आवश्यकताएं"
      ],
      example: "उदाहरण: 'नमस्ते, मैं दिल्ली से राजेश हूं। मैंने अभी 12वीं कक्षा पूरी की है और मुझे टेक्नोलॉजी और कंप्यूटर में रुचि है। मैं प्रोग्रामिंग सीखना चाहता हूं और आईटी कंपनियों में काम करना चाहता हूं। मैं दिल्ली या रिमोट वर्क में 3-6 महीने की इंटर्नशिप पसंद करता हूं।'",
      aiResponse: "हमारा एआई सहायक आपकी प्राथमिकताओं को बेहतर ढंग से समझने और आपके लिए सबसे अच्छी इंटर्नशिप सुझाने के लिए अनुवर्ती प्रश्न पूछेगा।"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  const handleStartListening = () => {
    setIsListening(true);
    // TODO: Implement actual voice recognition
    // For now, we'll simulate the conversation
    simulateVoiceConversation();
  };

  const handleStopListening = () => {
    setIsListening(false);
  };

  const simulateVoiceConversation = async () => {
    setIsProcessing(true);
    
    // Simulate conversation flow
    const responses = [
      "AI: Hello! I'm here to help you find the perfect internship. Please tell me your name and what you're studying.",
      "You: [Speaking...]",
      "AI: Great! What skills do you have or want to develop?",
      "You: [Speaking...]", 
      "AI: Interesting! What type of work environment interests you most?",
      "You: [Speaking...]",
      "AI: Perfect! Based on our conversation, I'm finding the best internship matches for you..."
    ];

    for (let i = 0; i < responses.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setConversation(prev => [...prev, responses[i]]);
    }

    setIsProcessing(false);
    setIsListening(false);

    // Simulate completion with mock data
    setTimeout(() => {
      onComplete({
        name: "Voice User",
        education: "12th",
        field: "Technology",
        skills: ["Communication, Problem Solving"],
        interests: ["Technology", "Programming"],
        location: "Delhi",
        duration: "3-6",
        source: "voice"
      });
    }, 1000);
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-voice/5 to-voice-glow/5 border-b">
        <CardTitle className="text-2xl text-voice flex items-center gap-2">
          <MessageCircle className="w-6 h-6" />
          {t.title}
        </CardTitle>
        <CardDescription className="text-base">{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Instructions */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3">{t.instructions}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {t.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Voice Control */}
          <div className="text-center space-y-4">
            <Button
              onClick={isListening ? handleStopListening : handleStartListening}
              variant="voice"
              size="lg"
              disabled={isProcessing}
              className="h-16 w-64 text-lg rounded-full"
            >
              {isListening ? (
                <>
                  <MicOff className="w-6 h-6 mr-2" />
                  {t.stopListening}
                </>
              ) : (
                <>
                  <Mic className="w-6 h-6 mr-2" />
                  {isProcessing ? t.processing : t.startListening}
                </>
              )}
            </Button>

            {isListening && (
              <div className="flex justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-8 bg-voice rounded-full animate-pulse"></div>
                  <div className="w-2 h-6 bg-voice-glow rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-10 bg-voice rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  <div className="w-2 h-4 bg-voice-glow rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Conversation Display */}
          {conversation.length > 0 && (
            <div className="bg-card border rounded-lg p-4 max-h-64 overflow-y-auto">
              <div className="flex items-center gap-2 mb-3">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Conversation</span>
              </div>
              <div className="space-y-2">
                {conversation.map((message, index) => (
                  <div key={index} className="text-sm">
                    <span className={`font-medium ${
                      message.startsWith('AI:') ? 'text-primary' : 'text-voice'
                    }`}>
                      {message}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Example */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <h4 className="font-semibold text-accent mb-2">💡 {currentLanguage === 'hi' ? 'उदाहरण' : 'Example'}</h4>
            <p className="text-sm text-muted-foreground italic">
              "{t.example}"
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {t.aiResponse}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceConversation;