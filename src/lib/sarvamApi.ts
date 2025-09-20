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

interface SarvamSTTRequest {
  model: string;
  language_code: string;
  with_timestamps: boolean;
  enable_preprocessing: boolean;
}

interface SarvamSTTResponse {
  transcript: string;
  language_code?: string;
  timestamps?: Array<{
    start: number;
    end: number;
    text: string;
  }>;
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

  // Speech-to-Text functionality
  async speechToText(audioBlob: Blob, language: string): Promise<string | null> {
    if (!this.apiKey) {
      throw new Error('Sarvam API key is not configured');
    }

    try {
      const languageCode = this.getLanguageCode(language);
      console.log(`[Sarvam STT] Language: ${language} -> ${languageCode}`);
      console.log(`[Sarvam STT] Audio blob size: ${audioBlob.size} bytes, type: ${audioBlob.type}`);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav');
      formData.append('model', 'saarika:v2.5');
      formData.append('language_code', languageCode);
      formData.append('with_timestamps', 'false');
      formData.append('enable_preprocessing', 'true');

      console.log('[Sarvam STT] Sending request with language:', languageCode);

      const response = await fetch(`${this.baseUrl}/speech-to-text`, {
        method: 'POST',
        headers: {
          'API-Subscription-Key': this.apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[Sarvam STT] API error:', response.status, response.statusText, errorText);
        throw new Error(`Sarvam STT API error: ${response.status} - ${errorText}`);
      }

      const data: SarvamSTTResponse = await response.json();
      console.log('[Sarvam STT] Response received:', data);
      
      return data.transcript || null;
    } catch (error) {
      console.error('[Sarvam STT] Error calling Sarvam STT API:', error);
      throw error;
    }
  }

  // Helper method to start recording audio from microphone
  private mediaRecorder: MediaRecorder | null = null;
  private recordingStream: MediaStream | null = null;
  private audioChunks: Blob[] = [];

  async startRecording(): Promise<void> {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      return; // Already recording
    }

    try {
      this.recordingStream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        } 
      });
      
      this.mediaRecorder = new MediaRecorder(this.recordingStream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      this.audioChunks = [];
      
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };
      
      this.mediaRecorder.start();
      console.log('[Sarvam API] Recording started');
      
    } catch (error) {
      throw new Error('Failed to access microphone: ' + error);
    }
  }

  async stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || this.mediaRecorder.state !== 'recording') {
        reject(new Error('No active recording'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        
        // Clean up
        if (this.recordingStream) {
          this.recordingStream.getTracks().forEach(track => track.stop());
          this.recordingStream = null;
        }
        this.mediaRecorder = null;
        this.audioChunks = [];
        
        console.log('[Sarvam API] Recording stopped, blob size:', audioBlob.size);
        resolve(audioBlob);
      };
      
      this.mediaRecorder.onerror = (event) => {
        // Clean up
        if (this.recordingStream) {
          this.recordingStream.getTracks().forEach(track => track.stop());
          this.recordingStream = null;
        }
        this.mediaRecorder = null;
        reject(new Error('MediaRecorder error: ' + event.error));
      };
      
      this.mediaRecorder.stop();
    });
  }

  // Helper method to record audio from microphone (legacy - keeping for backward compatibility)
  async recordAudio(duration: number = 5000): Promise<Blob> {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        } 
      }).then(stream => {
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'audio/webm;codecs=opus'
        });
        
        const audioChunks: Blob[] = [];
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };
        
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          stream.getTracks().forEach(track => track.stop());
          resolve(audioBlob);
        };
        
        mediaRecorder.onerror = (event) => {
          stream.getTracks().forEach(track => track.stop());
          reject(new Error('MediaRecorder error: ' + event.error));
        };
        
        mediaRecorder.start();
        
        // Stop recording after specified duration
        setTimeout(() => {
          if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
          }
        }, duration);
        
      }).catch(error => {
        reject(new Error('Failed to access microphone: ' + error));
      });
    });
  }
}

export const sarvamAPI = new SarvamAPIService();