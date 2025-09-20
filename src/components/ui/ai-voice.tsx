"use client";

/**
 * @author: @kokonutui
 * @description: AI Voice with Speech-to-Text
 * @version: 2.0.0
 * @date: 2025-09-20
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { Mic, Square, Loader2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { sarvamAPI } from "@/lib/sarvamApi";

interface AIVoiceProps {
  onToggle?: (isRecording: boolean) => void;
  onTranscript?: (transcript: string) => void;
  isRecording?: boolean;
  className?: string;
  listenText?: string;
  clickText?: string;
  currentLanguage?: string;
  maxRecordingTime?: number;
}

export default function AIVoice({ 
  onToggle, 
  onTranscript,
  isRecording: externalIsRecording, 
  className,
  listenText = "Listening...",
  clickText = "Click to speak",
  currentLanguage = "en",
  maxRecordingTime = 10000
}: AIVoiceProps) {
  const [internalIsRecording, setInternalIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [time, setTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use external state if provided, otherwise use internal state
  const isRecording = externalIsRecording !== undefined ? externalIsRecording : internalIsRecording;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleClick = useCallback(async () => {
    if (isProcessing) return; // Prevent clicking while processing
    
    if (isRecording) {
      // Stop recording and process
      const newRecordingState = false;
      
      if (externalIsRecording === undefined) {
        setInternalIsRecording(newRecordingState);
      }
      
      onToggle?.(newRecordingState);
      
      // Process the recording
      setIsProcessing(true);
      setError(null);
      
      try {
        console.log('[AI Voice] Stopping recording and processing...');
        const audioBlob = await sarvamAPI.stopRecording();
        console.log('[AI Voice] Audio recorded, size:', audioBlob.size);
        
        if (audioBlob.size === 0) {
          throw new Error('No audio data recorded');
        }
        
        const transcript = await sarvamAPI.speechToText(audioBlob, currentLanguage);
        console.log('[AI Voice] Transcript received:', transcript);
        
        if (transcript && transcript.trim()) {
          onTranscript?.(transcript.trim());
        } else {
          setError('No speech detected. Please try again.');
        }
      } catch (error) {
        console.error('[AI Voice] Error processing speech:', error);
        if (error instanceof Error) {
          if (error.message.includes('microphone')) {
            setError('Microphone access denied. Please allow microphone permissions.');
          } else if (error.message.includes('No active recording')) {
            setError('Recording was not started properly. Please try again.');
          } else {
            setError('Failed to process speech. Please try again.');
          }
        } else {
          setError('Failed to process speech. Please try again.');
        }
      } finally {
        setIsProcessing(false);
      }
    } else {
      // Start recording
      try {
        await sarvamAPI.startRecording();
        
        const newRecordingState = true;
        
        if (externalIsRecording === undefined) {
          setInternalIsRecording(newRecordingState);
        }
        
        onToggle?.(newRecordingState);
        setError(null);
      } catch (error) {
        console.error('[AI Voice] Error starting recording:', error);
        setError('Failed to start recording. Please check microphone permissions.');
      }
    }
  }, [isRecording, isProcessing, externalIsRecording, onToggle, onTranscript, currentLanguage]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRecording) {
      intervalId = setInterval(() => {
        setTime((t) => {
          const newTime = t + 1;
          // Auto-stop at max recording time
          if (newTime >= maxRecordingTime / 1000) {
            handleClick(); // This will stop the recording
          }
          return newTime;
        });
      }, 1000);
    } else {
      setTime(0);
    }

    return () => clearInterval(intervalId);
  }, [isRecording, maxRecordingTime, handleClick]);

  // Add keyboard shortcut (Space bar)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && event.target === document.body) {
        event.preventDefault();
        handleClick();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleClick]);

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative max-w-xl w-full mx-auto flex items-center flex-col gap-4">
        {/* Main Voice Button */}
        <button
          className={cn(
            "group relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 border-2 focus:outline-none focus:ring-4 focus:ring-offset-2",
            isProcessing
              ? "bg-blue-500 border-blue-500 text-white shadow-lg cursor-not-allowed"
              : isRecording
              ? "bg-red-500 hover:bg-red-600 border-red-500 text-white shadow-lg scale-105 focus:ring-red-300"
              : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg focus:ring-blue-300"
          )}
          type="button"
          onClick={handleClick}
          disabled={isProcessing}
          aria-label={
            isProcessing ? "Processing speech..." :
            isRecording ? `Stop recording - ${formatTime(time)}` : clickText
          }
          aria-pressed={isRecording}
        >
          {isProcessing ? (
            <Loader2 className="w-8 h-8 animate-spin" />
          ) : isRecording ? (
            <>
              <Square className="w-8 h-8" fill="currentColor" />
              {/* Pulse animation ring */}
              <div className="absolute inset-0 rounded-full bg-red-500/30 animate-ping"></div>
            </>
          ) : (
            <Mic className="w-8 h-8 transition-transform group-hover:scale-110" />
          )}
        </button>

        {/* Timer */}
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "font-mono text-lg font-semibold transition-opacity duration-300",
              isProcessing
                ? "text-blue-500 dark:text-blue-400"
                : isRecording
                ? "text-red-500 dark:text-red-400"
                : "text-gray-400 dark:text-gray-500"
            )}
          >
            {formatTime(time)}
          </span>
          {(isRecording || isProcessing) && (
            <div className={cn(
              "w-2 h-2 rounded-full animate-pulse",
              isProcessing ? "bg-blue-500" : "bg-red-500"
            )}></div>
          )}
        </div>

        {/* Wave Visualization */}
        <div className="h-6 w-full md:w-80 flex items-center justify-center gap-1 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {[...Array(48)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-0.5 rounded-full transition-all duration-300",
                isProcessing
                  ? "bg-blue-500/70 animate-pulse"
                  : isRecording
                  ? "bg-red-500/70 animate-pulse"
                  : "bg-gray-300 dark:bg-gray-600 h-1"
              )}
              style={
                (isRecording || isProcessing) && isClient
                  ? {
                      height: `${20 + Math.random() * 80}%`,
                      animationDelay: `${i * 0.05}s`,
                    }
                  : undefined
              }
            />
          ))}
        </div>

        {/* Status Text */}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {isProcessing 
              ? "Processing your speech..." 
              : isRecording 
              ? listenText 
              : clickText
            }
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {isProcessing 
              ? "Please wait while we convert your speech to text"
              : isRecording 
              ? "Tap the red square button to stop recording" 
              : "Tap the microphone button to start voice input"
            }
          </p>
          {maxRecordingTime && (
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Max recording time: {Math.floor(maxRecordingTime / 1000)} seconds
            </p>
          )}
          {!isRecording && !isProcessing && (
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Keyboard shortcut: Press Spacebar
            </p>
          )}
          {error && (
            <p className="text-xs text-red-500 dark:text-red-400 mt-2 font-medium">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
