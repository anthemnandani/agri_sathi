'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Disc3,
  MessageSquare,
  MoreVertical,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface VideoCallInterfaceProps {
  userId: string;
}

export function VideoCallInterface({ userId }: VideoCallInterfaceProps) {
  const router = useRouter();
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
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
      <div className="h-screen flex flex-col items-center justify-center bg-gray-900">
        <Card className="p-8 text-center max-w-sm bg-white dark:bg-slate-900 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Call Ended</h2>
            <p className="text-muted-foreground">Duration: {formatTime(callDuration)}</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => router.push(`/farmer/messages`)} 
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Open Chat
            </Button>
            <Button 
              onClick={() => router.back()} 
              variant="outline"
              className="flex-1"
            >
              Back
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Header with Timer and Back Button */}
      <div className="p-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="text-white hover:bg-gray-800 md:hidden"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold flex-1 text-center">Video Call</h1>
        <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full text-sm">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
          {formatTime(callDuration)}
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Remote Video (Full Screen) */}
        <div className="relative w-full h-full bg-gray-800">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop"
            alt="Remote Video"
            fill
            className="object-cover"
          />

          {/* Remote User Info - Top Left */}
          <div className="absolute top-4 left-4 bg-green-700 rounded-lg p-3 flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
                alt="Remote"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-sm">Nandani Singh</p>
              <p className="text-xs opacity-90">Farmer</p>
            </div>
          </div>

          {/* Local Video (PIP) - Bottom Right */}
          <div className="absolute bottom-20 right-4 w-40 h-48 rounded-lg overflow-hidden border-4 border-white shadow-lg bg-gray-900">
            <Image
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=192&fit=crop"
              alt="Your Video"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Control Bar - Bottom */}
      <div className="bg-gray-800 p-6 flex items-center justify-center gap-4">
        {/* Audio Control */}
        <Button
          variant={isMuted ? 'destructive' : 'secondary'}
          size="lg"
          className="h-12 w-12 rounded-full p-0"
          onClick={() => setIsMuted(!isMuted)}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <MicOff className="h-6 w-6" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </Button>

        {/* Video Control */}
        <Button
          variant={!isVideoEnabled ? 'destructive' : 'secondary'}
          size="lg"
          className="h-12 w-12 rounded-full p-0"
          onClick={() => setIsVideoEnabled(!isVideoEnabled)}
          title={isVideoEnabled ? 'Stop Video' : 'Start Video'}
        >
          {isVideoEnabled ? (
            <Video className="h-6 w-6" />
          ) : (
            <VideoOff className="h-6 w-6" />
          )}
        </Button>

        {/* Screen Share */}
        <Button
          variant="secondary"
          size="lg"
          className="h-12 w-12 rounded-full p-0"
          title="Share Screen"
        >
          <Monitor className="h-6 w-6" />
        </Button>

        {/* End Call Button - Red */}
        <Button
          variant="destructive"
          size="lg"
          className="h-12 w-12 rounded-full p-0 bg-red-600 hover:bg-red-700"
          onClick={() => setCallActive(false)}
          title="End Call"
        >
          <PhoneOff className="h-6 w-6" />
        </Button>

        {/* Recording */}
        <Button
          variant={isRecording ? 'destructive' : 'secondary'}
          size="lg"
          className="h-12 w-12 rounded-full p-0"
          onClick={() => setIsRecording(!isRecording)}
          title={isRecording ? 'Stop Recording' : 'Start Recording'}
        >
          <Disc3 className="h-6 w-6" />
        </Button>

        {/* Chat */}
        <Link href={`/farmer/messages?user=${userId}`}>
          <Button
            variant="secondary"
            size="lg"
            className="h-12 w-12 rounded-full p-0"
            title="Chat"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </Link>

        {/* More Options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="lg"
              className="h-12 w-12 rounded-full p-0"
            >
              <MoreVertical className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Block User</DropdownMenuItem>
            <DropdownMenuItem>Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
