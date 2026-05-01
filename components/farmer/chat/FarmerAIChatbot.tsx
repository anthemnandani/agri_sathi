'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  X, 
  MessageCircle, 
  Loader, 
  ThumbsUp, 
  ThumbsDown,
  Lightbulb,
  Leaf,
  Cloud,
  Droplet
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  helpful?: boolean;
}

interface FarmerAIChatbotProps {
  isOpen?: boolean;
  onClose?: () => void;
  farmerId?: string;
}

export function FarmerAIChatbot({ isOpen = false, onClose, farmerId }: FarmerAIChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'नमस्ते जी! 👋 मैं आपका कृषि सहायक हूँ। मुझसे अपने खेत, मौसम, फसलों और खाद के बारे में कुछ भी पूछें। कैसे मदद कर सकता हूँ?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(Math.random().toString(36).substr(2, 9));
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Sample quick suggestions for farmers
  const quickSuggestions = [
    { label: 'गेहूँ की खेती', icon: Leaf },
    { label: 'सिंचाई की सलाह', icon: Droplet },
    { label: 'मौसम की जानकारी', icon: Cloud },
    { label: 'खाद का उपयोग', icon: Lightbulb },
  ];

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Simulate AI response (replace with actual API call)
      const assistantResponse = await generateFarmerResponse(text);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: assistantResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        type: 'assistant',
        content: 'मुझे माफ करें, मुझे आपके सवाल का जवाब देने में परेशानी हो रही है। कृपया दोबारा कोशिश करें।',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFarmerResponse = async (userInput: string): Promise<string> => {
    // Simulate API response delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const responses: { [key: string]: string[] } = {
      wheat: [
        'गेहूँ की खेती के लिए:\n• तापमान: 15-25°C\n• सिंचाई: 4-5 बार\n• बीज दर: 100-125 किग्रा/हेक्टेयर\n• कटाई का समय: मार्च-अप्रैल',
      ],
      irrigation: [
        'सिंचाई की सलाह:\n• गर्मी में 7-10 दिन का अंतराल\n• सर्दी में 20-25 दिन का अंतराल\n• मिट्टी की नमी जांचें\n• बारिश के मौसम में सावधानी रखें',
      ],
      weather: [
        'अभी आपके क्षेत्र में मौसम:\n• तापमान: 28-32°C\n• आर्द्रता: 65-70%\n• हवा की गति: 10-15 किमी/घंटा\n• वर्षा: इस सप्ताह संभावना 40%',
      ],
      fertilizer: [
        'खाद का सही उपयोग:\n• यूरिया: 100-150 किग्रा/हेक्टेयर\n• डीएपी: 50-75 किग्रा/हेक्टेयर\n• पोटाश: 40-60 किग्रा/हेक्टेयर\n• जैव खाद: 5-10 टन/हेक्टेयर',
      ],
    };

    // Simple keyword matching for demo
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('गेहूँ') || lowerInput.includes('wheat') || lowerInput.includes('गेहूँ की')) {
      return responses.wheat[0];
    } else if (
      lowerInput.includes('सिंचाई') ||
      lowerInput.includes('पानी') ||
      lowerInput.includes('irrigation')
    ) {
      return responses.irrigation[0];
    } else if (
      lowerInput.includes('मौसम') ||
      lowerInput.includes('weather') ||
      lowerInput.includes('तापमान')
    ) {
      return responses.weather[0];
    } else if (
      lowerInput.includes('खाद') ||
      lowerInput.includes('खाद') ||
      lowerInput.includes('fertilizer')
    ) {
      return responses.fertilizer[0];
    }

    return `आपका सवाल: "${userInput}"\n\nमुझे इस विषय पर विस्तृत जानकारी नहीं है, लेकिन आप अपने स्थानीय कृषि अधिकारी से संपर्क कर सकते हैं। मैं आपकी और भी मदद करने के लिए तैयार हूँ!`;
  };

  const handleQuickSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const handleHelpful = (messageId: string, helpful: boolean) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, helpful } : msg
      )
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-end p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Chatbot Card */}
      <Card className="relative w-full sm:w-[420px] h-[90vh] sm:h-[600px] flex flex-col shadow-2xl border-2">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg">कृषि सहायक</CardTitle>
                <CardDescription className="text-green-100 text-xs">
                  AI द्वारा संचालित कृषि सलाह
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-white/20 text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4 space-y-4">
            <div className="space-y-4">
              {messages.length === 1 && (
                <div className="mb-4">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 mb-3">
                    सुझाव: आप यह पूछ सकते हैं
                  </Badge>
                  <div className="grid grid-cols-2 gap-2">
                    {quickSuggestions.map((suggestion, idx) => {
                      const IconComponent = suggestion.icon;
                      return (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickSuggestion(suggestion.label)}
                          className="text-xs h-auto py-2 px-2 text-left justify-start flex items-center gap-2"
                        >
                          <IconComponent className="w-4 h-4 flex-shrink-0" />
                          <span className="line-clamp-2">{suggestion.label}</span>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.type === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">
                      A
                    </div>
                  )}

                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-muted text-foreground rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs mt-2 opacity-70">
                      {message.timestamp.toLocaleTimeString('hi-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>

                    {message.type === 'assistant' && message.helpful !== undefined && (
                      <div className="mt-2 flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`h-6 px-2 ${
                            message.helpful
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-muted-foreground'
                          }`}
                          onClick={() => handleHelpful(message.id, true)}
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`h-6 px-2 ${
                            message.helpful === false
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-muted-foreground'
                          }`}
                          onClick={() => handleHelpful(message.id, false)}
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                      </div>
                    )}

                    {message.type === 'assistant' && message.helpful === undefined && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        क्या यह उपयोगी था?
                      </div>
                    )}
                  </div>

                  {message.type === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                      आप
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">
                    A
                  </div>
                  <div className="max-w-xs bg-muted text-foreground px-4 py-3 rounded-lg rounded-bl-none flex gap-2 items-center">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span className="text-sm">सोच रहा हूँ...</span>
                  </div>
                </div>
              )}
            </div>
            <div ref={scrollRef} />
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-4 space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(inputValue);
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="अपना सवाल पूछें..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="text-sm"
              />
              <Button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                size="icon"
                className="bg-green-500 hover:bg-green-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center">
              कृषि सलाह के लिए हमेशा स्थानीय विशेषज्ञों से परामर्श लें
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
