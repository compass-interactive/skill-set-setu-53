export const getTranslations = (language: string) => {
  const translations = {
    en: {
      methodSelector: {
        title: "Choose Your Method",
        subtitle: "Select the easiest way for you to find your perfect internship",
        back: "Back to Language",
        formMethod: "Fill Smart Form",
        voiceMethod: "Voice Conversation", 
        formDescription: "Answer questions step by step in a guided format",
        voiceDescription: "Have a natural conversation with our AI assistant",
        formFeatures: ["Quick", "Structured", "Precise"],
        voiceFeatures: ["Easy", "Natural", "Conversational"],
        startForm: "Start Form",
        startVoice: "Start Voice Chat",
        voiceRecommendation: "Find Internships by Voice - Super Easy!",
        voiceNote: "Best option for users with limited digital experience"
      },
      quizForm: {
        back: "Back",
        question: "Question",
        of: "of",
        complete: "Complete",
        previous: "Previous",
        next: "Next",
        submit: "Get My Recommendations",
        selectOption: "Select an option",
        answerWithVoice: "Answer with Voice",
        questions: {
          name: {
            title: "What's your name?",
            subtitle: "Enter your full name"
          },
          education: {
            title: "What's your education level?",
            subtitle: "Select your current education status",
            options: {
              "12th": "12th Grade/Higher Secondary",
              "diploma": "Diploma",
              "undergraduate": "Undergraduate",
              "graduate": "Graduate",
              "postgraduate": "Post Graduate"
            }
          },
          field: {
            title: "What's your field of study?",
            subtitle: "e.g., Computer Science, Commerce, Arts, Engineering"
          },
          skills: {
            title: "What skills do you have?",
            subtitle: "Select all skills that apply to you",
            options: ["Communication", "Leadership", "Teamwork", "Problem Solving", "Computer Skills", "Programming", "Data Analysis", "Marketing", "Sales", "Design", "Writing", "Research", "Language Skills", "Customer Service"]
          },
          interests: {
            title: "What areas interest you?",
            subtitle: "Choose fields you'd like to work in",
            options: ["Technology", "Finance", "Healthcare", "Education", "Government", "NGO/Social Work", "Marketing", "Media", "Manufacturing", "Agriculture", "Retail", "Tourism", "Sports", "Arts & Culture"]
          },
          location: {
            title: "Where would you like to work?",
            subtitle: "Enter your preferred location or 'Remote'"
          },
          duration: {
            title: "How long do you want the internship?",
            subtitle: "Select your preferred duration",
            options: {
              "1-3": "1-3 months",
              "3-6": "3-6 months",
              "6+": "6+ months",
              "flexible": "Flexible"
            }
          }
        }
      },
      voiceConversation: {
        title: "Voice Conversation",
        description: "Tell us about yourself and your internship preferences using voice",
        back: "Back to Methods"
      },
      recommendations: {
        title: "Your Personalized Recommendations",
        back: "Back to Methods",
        newSearch: "New Search"
      }
    },
    hi: {
      methodSelector: {
        title: "अपनी विधि चुनें",
        subtitle: "अपनी आदर्श इंटर्नशिप खोजने के लिए सबसे आसान तरीका चुनें",
        back: "भाषा पर वापस",
        formMethod: "स्मार्ट फॉर्म भरें",
        voiceMethod: "आवाज़ बातचीत",
        formDescription: "निर्देशित प्रारूप में चरणबद्ध तरीके से प्रश्नों के उत्तर दें",
        voiceDescription: "हमारे AI सहायक के साथ प्राकृतिक बातचीत करें",
        formFeatures: ["तेज़", "संरचित", "सटीक"],
        voiceFeatures: ["आसान", "प्राकृतिक", "बातचीत"],
        startForm: "फॉर्म शुरू करें",
        startVoice: "वॉयस चैट शुरू करें",
        voiceRecommendation: "आवाज़ से इंटर्नशिप खोजें - बहुत आसान!",
        voiceNote: "सीमित डिजिटल अनुभव वाले उपयोगकर्ताओं के लिए सबसे अच्छा विकल्प"
      },
      quizForm: {
        back: "वापस",
        question: "प्रश्न",
        of: "का",
        complete: "पूर्ण",
        previous: "पिछला",
        next: "अगला",
        submit: "मेरी सिफारिशें प्राप्त करें",
        selectOption: "एक विकल्प चुनें",
        answerWithVoice: "आवाज़ से उत्तर दें",
        questions: {
          name: {
            title: "आपका नाम क्या है?",
            subtitle: "अपना पूरा नाम दर्ज करें"
          },
          education: {
            title: "आपकी शिक्षा का स्तर क्या है?",
            subtitle: "अपनी वर्तमान शिक्षा स्थिति चुनें",
            options: {
              "12th": "12वीं कक्षा/उच्चतर माध्यमिक",
              "diploma": "डिप्लोमा",
              "undergraduate": "स्नातक",
              "graduate": "स्नातक",
              "postgraduate": "स्नातकोत्तर"
            }
          },
          field: {
            title: "आपके अध्ययन का क्षेत्र क्या है?",
            subtitle: "जैसे, कंप्यूटर साइंस, वाणिज्य, कला, इंजीनियरिंग"
          },
          skills: {
            title: "आपके पास कौन से कौशल हैं?",
            subtitle: "आप पर लागू होने वाले सभी कौशल चुनें",
            options: ["संवाद", "नेतृत्व", "टीमवर्क", "समस्या समाधान", "कंप्यूटर कौशल", "प्रोग्रामिंग", "डेटा विश्लेषण", "मार्केटिंग", "बिक्री", "डिजाइन", "लेखन", "अनुसंधान", "भाषा कौशल", "ग्राहक सेवा"]
          },
          interests: {
            title: "आपको कौन से क्षेत्र दिलचस्प लगते हैं?",
            subtitle: "वे क्षेत्र चुनें जिनमें आप काम करना चाहते हैं",
            options: ["प्रौद्योगिकी", "वित्त", "स्वास्थ्य सेवा", "शिक्षा", "सरकार", "एनजीओ/सामाजिक कार्य", "मार्केटिंग", "मीडिया", "निर्माण", "कृषि", "खुदरा", "पर्यटन", "खेल", "कला और संस्कृति"]
          },
          location: {
            title: "आप कहाँ काम करना चाहते हैं?",
            subtitle: "अपना पसंदीदा स्थान दर्ज करें या 'रिमोट'"
          },
          duration: {
            title: "आप कितने समय की इंटर्नशिप चाहते हैं?",
            subtitle: "अपनी पसंदीदा अवधि चुनें",
            options: {
              "1-3": "1-3 महीने",
              "3-6": "3-6 महीने",
              "6+": "6+ महीने",
              "flexible": "लचीला"
            }
          }
        }
      },
      voiceConversation: {
        title: "आवाज़ द्वारा बातचीत",
        description: "आवाज़ का उपयोग करके अपने बारे में और अपनी इंटर्नशिप प्राथमिकताओं के बारे में बताएं",
        back: "विधियों पर वापस"
      },
      recommendations: {
        title: "आपकी व्यक्तिगत सिफारिशें",
        back: "विधियों पर वापस",
        newSearch: "नई खोज"
      }
    },
    // Add other languages with basic translations
    ta: {
      methodSelector: {
        title: "உங்கள் முறையைத் தேர்ந்தெடுக்கவும்",
        subtitle: "உங்கள் சரியான பயிற்சியைக் கண்டறிய எளிதான வழியைத் தேர்ந்தெடுக்கவும்",
        back: "மொழிக்கு திரும்பு",
        formMethod: "ஸ்மார்ட் படிவம் நிரப்புங்கள்",
        voiceMethod: "குரல் உரையாடல்",
        formDescription: "வழிகாட்டுதல் வடிவத்தில் படிப்படியாக கேள்விகளுக்கு பதிலளிக்கவும்",
        voiceDescription: "எங்கள் AI உதவியாளருடன் இயற்கையான உரையாடலை நடத்துங்கள்",
        formFeatures: ["விரைவான", "கட்டமைக்கப்பட்ட", "துல்லியமான"],
        voiceFeatures: ["எளிய", "இயற்கை", "உரையாடல்"],
        startForm: "படிவத்தைத் தொடங்கு",
        startVoice: "குரல் சாட்டைத் தொடங்கு",
        voiceRecommendation: "குரல் மூலம் பயிற்சிகளைக் கண்டறியுங்கள் - மிக எளிது!",
        voiceNote: "குறைந்த டிஜிட்டல் அனுபவம் உள்ள பயனர்களுக்கு சிறந்த விकल்பம்"
      },
      quizForm: {
        back: "திரும்பு",
        question: "கேள்வி",
        of: "இல்",
        complete: "முடிந்தது",
        previous: "முந்தைய",
        next: "அடுத்த",
        submit: "என் பரிந்துரைகளைப் பெறு",
        selectOption: "ஒரு விकல்பத்தைத் தேர்ந்தெடுக்கவும்",
        answerWithVoice: "குரலுடன் பதிலளிக்கவும்",
        questions: {
          name: {
            title: "உங்கள் பெயர் என்ன?",
            subtitle: "உங்கள் முழு பெயரை உள்ளிடவும்"
          },
          education: {
            title: "உங்கள் கல்வி நிலை என்ன?",
            subtitle: "உங்கள் தற்போதைய கல்வி நிலையைத் தேர்ந்தெடுக்கவும்",
            options: {
              "12th": "12வது வகுப்பு/உயர்நிலை இடைநிலை",
              "diploma": "டிப்ளோமா",
              "undergraduate": "இளங்கலை",
              "graduate": "பட்டதாரி",
              "postgraduate": "முதுகலை"
            }
          },
          field: {
            title: "உங்கள் படிப்பின் துறை என்ன?",
            subtitle: "எ.கா., கணினி அறிவியல், வணிகம், கலை, பொறியியல்"
          },
          skills: {
            title: "உங்களிடம் என்ன திறமைகள் உள்ளன?",
            subtitle: "உங்களுக்குப் பொருந்தும் அனைத்து திறமைகளையும் தேர்ந்தெடுக்கவும்",
            options: ["தொடர்பு", "தலைமைத்துவம்", "குழுப்பணி", "சிக்கல் தீர்வு", "கணினி திறமைகள்", "நிரலாக்கம்", "தரவு பகுப்பாய்வு", "சந்தைப்படுத்தல்", "விற்பனை", "வடிவமைப்பு", "எழுத்து", "ஆராய்ச்சி", "மொழி திறமைகள்", "வாடிக்கையாளர் சேவை"]
          },
          interests: {
            title: "எந்தத் துறைகள் உங்களுக்கு ஆர்வமாக உள்ளன?",
            subtitle: "நீங்கள் வேலை செய்ய விரும்பும் துறைகளைத் தேர்ந்தெடுக்கவும்",
            options: ["தொழில்நுட்பம்", "நிதி", "சுகாதாரம்", "கல்வி", "அரசாங்கம்", "என்ஜிஓ/சமூக பணி", "சந்தைப்படுத்தல்", "ஊடகம்", "உற்பத்தி", "விவசாயம்", "சில்லறை விற்பனை", "சுற்றுலா", "விளையாட்டு", "கலை மற்றும் கலாச்சாரம்"]
          },
          location: {
            title: "நீங்கள் எங்கு வேலை செய்ய விரும்புகிறீர்கள்?",
            subtitle: "உங்கள் விருப்பமான இடத்தை உள்ளிடவும் அல்லது 'ரிமோட்'"
          },
          duration: {
            title: "நீங்கள் எவ்வளவு காலம் பயிற்சி பெற விரும்புகிறீர்கள்?",
            subtitle: "உங்கள் விருப்பமான காலத்தைத் தேர்ந்தெடுக்கவும்",
            options: {
              "1-3": "1-3 மாதங்கள்",
              "3-6": "3-6 மாதங்கள்",
              "6+": "6+ மாதங்கள்",
              "flexible": "நெகிழ்வான"
            }
          }
        }
      },
      voiceConversation: {
        title: "குரல் உரையாடல்",
        description: "குரலைப் பயன்படுத்தி உங்களைப் பற்றியும் உங்கள் பயிற்சி விருப்பங்களைப் பற்றியும் எங்களிடம் கூறுங்கள்",
        back: "முறைகளுக்குத் திரும்பு"
      },
      recommendations: {
        title: "உங்கள் தனிப்பயனாக்கப்பட்ட பரிந்துரைகள்",
        back: "முறைகளுக்குத் திரும்பு",
        newSearch: "புதிய தேடல்"
      }
    }
    // Add simplified versions for other languages
  };

  // Return the requested language or fall back to English
  return translations[language as keyof typeof translations] || translations.en;
};