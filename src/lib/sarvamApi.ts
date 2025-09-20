interface SarvamTTSRequest {
  inputs: string[];
  target_language_code: string;
  speaker: string;
  pitch: number;
  pace: number;
  loudness: number;
  speech_sample_rate: number;
  enable_preprocessing: boolean;
  model: string;
}

interface SarvamTTSResponse {
  audios: string[]; // Base64 encoded audio
}

class SarvamAPIService {
  private apiKey: string;
  private baseUrl = 'https://api.sarvam.ai';

  constructor() {
    this.apiKey = import.meta.env.VITE_SARVAM_API_KEY || '';
    if (!this.apiKey) {
      console.warn('Sarvam API key not found. Please add VITE_SARVAM_API_KEY to your environment variables.');
    }
  }

  // Language mapping for Sarvam API
  private getLanguageCode(lang: string): string {
    const langMap: Record<string, string> = {
      'en': 'en-IN',
      'hi': 'hi-IN',
      'ta': 'ta-IN',
      'te': 'te-IN',
      'kn': 'kn-IN',
      'ml': 'ml-IN',
      'bn': 'bn-IN',
      'mr': 'mr-IN',
      'gu': 'gu-IN',
      'pa': 'pa-IN',
      'or': 'or-IN'
    };
    
    return langMap[lang] || 'en-IN';
  }

  // Get appropriate speaker for the language
  private getSpeaker(lang: string): string {
    // Only use 'meera' speaker for better compatibility
    return 'meera';
  }

  async textToSpeech(text: string, language: string): Promise<string | null> {
    if (!this.apiKey) {
      throw new Error('Sarvam API key is not configured');
    }

    try {
      const languageCode = this.getLanguageCode(language);
      const speaker = this.getSpeaker(language);
      
      console.log(`[Sarvam TTS] Language: ${language} -> ${languageCode}, Speaker: ${speaker}`);
      
      const requestBody: SarvamTTSRequest = {
        inputs: [text],
        target_language_code: languageCode,
        speaker: speaker,
        pitch: 0,
        pace: 1.0,
        loudness: 1.0,
        speech_sample_rate: 8000,
        enable_preprocessing: true,
        model: "bulbul:v1"
      };

      console.log('[Sarvam TTS] Request body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(`${this.baseUrl}/text-to-speech`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API-Subscription-Key': this.apiKey, // Back to original case
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[Sarvam TTS] API error:', response.status, response.statusText, errorText);
        
        // If specific language fails, try fallback to English for these problematic languages
        if ((language === 'ta' || language === 'te' || language === 'ml' || language === 'or') && languageCode !== 'en-IN') {
          console.log(`[Sarvam TTS] Falling back to English for language: ${language}`);
          return this.textToSpeech(text, 'en');
        }
        
        throw new Error(`Sarvam API error: ${response.status} - ${errorText}`);
      }

      const data: SarvamTTSResponse = await response.json();
      console.log('[Sarvam TTS] Response received:', data.audios?.length || 0, 'audio(s)');
      
      if (data.audios && data.audios.length > 0) {
        return data.audios[0]; // Return base64 encoded audio
      }

      return null;
    } catch (error) {
      console.error('[Sarvam TTS] Error calling Sarvam TTS API:', error);
      
      // Additional fallback for problematic languages
      if (language === 'ta' || language === 'te' || language === 'ml' || language === 'or') {
        console.log(`[Sarvam TTS] Attempting English fallback for ${language} due to error`);
        try {
          return await this.textToSpeech(text, 'en');
        } catch (fallbackError) {
          console.error('[Sarvam TTS] Fallback to English also failed:', fallbackError);
        }
      }
      
      throw error;
    }
  }

  // Convert base64 audio to playable audio URL
  createAudioUrl(base64Audio: string): string {
    const audioBlob = new Blob(
      [Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0))],
      { type: 'audio/wav' }
    );
    return URL.createObjectURL(audioBlob);
  }

  // Clean up audio URL to prevent memory leaks
  revokeAudioUrl(url: string): void {
    URL.revokeObjectURL(url);
  }
}

export const sarvamAPI = new SarvamAPIService();