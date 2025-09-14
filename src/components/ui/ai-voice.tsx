"use client";

/**
 * @author: @kokonutui
 * @description: AI Voice
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { Mic, Square } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface AIVoiceProps {
  onToggle?: (isRecording: boolean) => void;
  isRecording?: boolean;
  className?: string;
  listenText?: string;
  clickText?: string;
}

export default function AIVoice({ 
  onToggle, 
  isRecording: externalIsRecording, 
  className,
  listenText = "Listening...",
  clickText = "Click to speak"
}: AIVoiceProps) {
  const [internalIsRecording, setInternalIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [isClient, setIsClient] = useState(false);

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

  const handleClick = useCallback(() => {
    const newRecordingState = !isRecording;
    
    if (externalIsRecording === undefined) {
      setInternalIsRecording(newRecordingState);
    }
    
    onToggle?.(newRecordingState);
  }, [isRecording, externalIsRecording, onToggle]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRecording) {
      intervalId = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else {
      setTime(0);
    }

    return () => clearInterval(intervalId);
  }, [isRecording]);

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
            isRecording
              ? "bg-red-500 hover:bg-red-600 border-red-500 text-white shadow-lg scale-105 focus:ring-red-300"
              : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg focus:ring-blue-300"
          )}
          type="button"
          onClick={handleClick}
          aria-label={isRecording ? `Stop recording - ${formatTime(time)}` : clickText}
          aria-pressed={isRecording}
        >
          {isRecording ? (
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
              isRecording
                ? "text-red-500 dark:text-red-400"
                : "text-gray-400 dark:text-gray-500"
            )}
          >
            {formatTime(time)}
          </span>
          {isRecording && (
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </div>

        {/* Wave Visualization */}
        <div className="h-6 w-full md:w-80 flex items-center justify-center gap-1 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {[...Array(48)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-0.5 rounded-full transition-all duration-300",
                isRecording
                  ? "bg-red-500/70 animate-pulse"
                  : "bg-gray-300 dark:bg-gray-600 h-1"
              )}
              style={
                isRecording && isClient
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
            {isRecording ? listenText : clickText}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {isRecording 
              ? "Tap the red square button to stop recording" 
              : "Tap the microphone button to start voice input"
            }
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Keyboard shortcut: Press Spacebar
          </p>
        </div>
      </div>
    </div>
  );
}
