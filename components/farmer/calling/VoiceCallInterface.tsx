'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface VoiceCallInterfaceProps {
  userId: string;
}

export function VoiceCallInterface({ userId }: VoiceCallInterfaceProps) {
  const router = useRouter();
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [callActive, setCallActive] = useState(true);

  useEffect(() => {
    if (!callActive) return;
    
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [callActive]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (!callActive) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
        <div className="absolute top-4 left-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-white hover:bg-green-200 dark:hover:bg-green-800"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
        <Card className="p-8 text-center max-w-sm">
          <h2 className="text-2xl font-bold mb-2">Call Ended</h2>
          <p className="text-muted-foreground mb-6">Duration: {formatTime(callDuration)}</p>
          <Button onClick={() => router.back()} className="w-full bg-green-600 hover:bg-green-700">
            Back to Messages
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 flex flex-col">
      {/* Header with Back Button */}
      <div className="p-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="md:hidden"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold flex-1 text-center">Voice Call</h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Main Call Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="max-w-sm w-full">
          <div className="p-8 text-center space-y-6">
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-green-600 shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop"
                  alt="Caller"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Caller Name */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">Nandani Singh</h2>
              <p className="text-muted-foreground mt-1">Farmer</p>
            </div>

            {/* Call Duration */}
            <div className="text-4xl font-bold text-green-600">
              {formatTime(callDuration)}
            </div>

            {/* Call Status */}
            <p className="text-sm text-muted-foreground">Active call</p>

            {/* Control Buttons */}
            <div className="flex justify-center gap-4 pt-4">
              <Button
                variant={isMuted ? 'destructive' : 'outline'}
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="h-12 w-12 rounded-full"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant={!isAudioEnabled ? 'destructive' : 'outline'}
                size="icon"
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className="h-12 w-12 rounded-full"
                title={isAudioEnabled ? 'Mute Speaker' : 'Unmute Speaker'}
              >
                {isAudioEnabled ? (
                  <Volume2 className="h-5 w-5" />
                ) : (
                  <VolumeX className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="destructive"
                size="icon"
                onClick={() => setCallActive(false)}
                className="h-12 w-12 rounded-full bg-red-600 hover:bg-red-700"
              >
                <PhoneOff className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
