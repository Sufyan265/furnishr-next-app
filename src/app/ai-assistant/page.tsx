'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Sparkles, Send, User } from 'lucide-react';
import { productQuery } from '@/ai/flows/product-query-flow';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

type FormValues = {
  prompt: string;
};

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!data.prompt) return;

    const userMessage: Message = { role: 'user', content: data.prompt };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    reset();

    try {
      const result = await productQuery({ question: data.prompt });
      const assistantMessage: Message = { role: 'assistant', content: result.answer };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Assistant Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "Sorry, I'm having a little trouble right now. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-secondary/30 min-h-screen">
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Sparkles className="h-12 w-12 mx-auto text-primary" />
          <h1 className="mt-4 font-headline text-4xl md:text-5xl font-bold">AI Assistant</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Ask me anything about our products! I can help you with questions about materials, dimensions, stock, and more.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto mt-12 shadow-lg">
          <CardContent className="p-0 flex flex-col h-[70vh]">
            <ScrollArea className="flex-grow p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                   <Sparkles className="h-10 w-10 mb-4"/>
                   <p className="text-lg">Welcome to your AI Assistant!</p>
                   <p>Ask a question like "Which desks are made of walnut?" or "Tell me about the Urban Elegance sofa".</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div key={index} className={`flex items-start gap-4 mb-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                    {message.role === 'assistant' && (
                      <Avatar className="bg-primary text-primary-foreground">
                        <AvatarFallback><Sparkles className="h-5 w-5"/></AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-lg p-3 max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                     {message.role === 'user' && (
                      <Avatar>
                        <AvatarFallback><User/></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))
              )}
               {isLoading && (
                  <div className="flex items-start gap-4">
                     <Avatar className="bg-primary text-primary-foreground">
                        <AvatarFallback><Loader2 className="h-5 w-5 animate-spin"/></AvatarFallback>
                      </Avatar>
                    <div className="rounded-lg p-3 bg-muted">
                      <p className="text-sm">Thinking...</p>
                    </div>
                  </div>
                )}
            </ScrollArea>
            <div className="p-4 border-t bg-background/50">
              <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
                <Input
                  {...register('prompt')}
                  placeholder="Ask about a product..."
                  autoComplete="off"
                  disabled={isLoading}
                  className="flex-grow"
                />
                <Button type="submit" size="icon" disabled={isLoading}>
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}