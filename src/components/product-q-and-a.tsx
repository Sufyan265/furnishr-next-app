
'use client';

import { useState } from 'react';
import { useUser, useFirestore, useAuth, useCollection, useMemoFirebase } from '@/firebase';
import { addDoc, collection, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { ThumbsUp, MessageCircle, Send, User } from 'lucide-react';
import type { Question } from '@/lib/types';
import { errorEmitter, FirestorePermissionError } from '@/firebase';

interface QandAProps {
  productId: string;
}

const QuestionItem = ({ question, productId }: { question: Question, productId: string }) => {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const answersQuery = useMemoFirebase(() => 
    query(collection(firestore, 'products', productId, 'questions', question.id, 'answers'), orderBy('createdAt', 'desc')), 
    [firestore, productId, question.id]
  );
  const { data: answers, isLoading: answersLoading } = useCollection(answersQuery);

  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerText.trim() || !user || !firestore) return;

    setIsSubmitting(true);
    const answerData = {
      customerId: user.uid,
      authorName: user.displayName || user.email,
      answerText,
      createdAt: serverTimestamp(),
      isOfficial: false, // This could be logic-driven for admins
    };

    const answersCollectionRef = collection(firestore, 'products', productId, 'questions', question.id, 'answers');
    
    addDoc(answersCollectionRef, answerData)
        .then(() => {
            toast({ title: 'Answer submitted!' });
            setAnswerText('');
            setShowAnswerForm(false);
        })
        .catch(error => {
             const permissionError = new FirestorePermissionError({
                path: answersCollectionRef.path,
                operation: 'create',
                requestResourceData: answerData,
            });
            errorEmitter.emit('permission-error', permissionError);
        })
        .finally(() => {
            setIsSubmitting(false);
        });
  };

  return (
    <div className="py-6 border-b">
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarFallback>
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <p className="font-semibold">{question.authorName} <span className="text-sm text-muted-foreground font-normal">asked a question</span></p>
          <p className="mt-2 text-muted-foreground">{question.questionText}</p>
          <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
            {user && (
              <Button variant="ghost" size="sm" onClick={() => setShowAnswerForm(!showAnswerForm)}>
                <MessageCircle className="mr-2 h-4 w-4" /> Answer
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Answer Form */}
      {showAnswerForm && (
        <form onSubmit={handleAnswerSubmit} className="ml-16 mt-4 space-y-2">
          <Textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Write your answer..."
            className="min-h-[80px]"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting || !answerText.trim()}>
              {isSubmitting ? 'Submitting...' : 'Submit Answer'}
            </Button>
          </div>
        </form>
      )}

      {/* Answers */}
      <div className="ml-16 mt-4 space-y-4">
        {answersLoading && <p className="text-sm text-muted-foreground">Loading answers...</p>}
        {answers && answers.map((answer: any) => (
          <div key={answer.id} className="flex items-start gap-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-grow bg-secondary/50 p-3 rounded-lg">
              <p className="font-semibold text-sm">{answer.authorName}</p>
              <p className="mt-1 text-sm text-muted-foreground">{answer.answerText}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ProductQandA({ productId }: QandAProps) {
  const { user } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [questionText, setQuestionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questionsQuery = useMemoFirebase(() => 
    query(collection(firestore, 'products', productId, 'questions'), orderBy('createdAt', 'desc')),
    [firestore, productId]
  );
  const { data: questions, isLoading, error } = useCollection<Question>(questionsQuery);
  
  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim() || !user || !firestore) return;

    setIsSubmitting(true);
    
    const questionData = {
      customerId: user.uid,
      authorName: user.displayName || user.email,
      questionText,
      createdAt: serverTimestamp(),
    };

    const questionsCollectionRef = collection(firestore, 'products', productId, 'questions');
    addDoc(questionsCollectionRef, questionData)
        .then(() => {
            toast({ title: 'Question submitted!', description: "We'll notify you when it's answered." });
            setQuestionText('');
        })
        .catch(error => {
            const permissionError = new FirestorePermissionError({
                path: questionsCollectionRef.path,
                operation: 'create',
                requestResourceData: questionData,
            });
            errorEmitter.emit('permission-error', permissionError);
        })
        .finally(() => {
            setIsSubmitting(false);
        });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Questions & Answers</CardTitle>
      </CardHeader>
      <CardContent>
        {user ? (
          <form onSubmit={handleQuestionSubmit} className="space-y-4">
            <Textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Ask a question about this product..."
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting || !questionText.trim()}>
                    {isSubmitting ? 'Submitting...' : 'Ask Question'}
                </Button>
            </div>
          </form>
        ) : (
          <div className="text-center p-4 border rounded-lg bg-secondary/30">
            <p className="text-muted-foreground">You must be logged in to ask a question.</p>
          </div>
        )}

        <div className="mt-8">
          {isLoading && <p>Loading questions...</p>}
          {error && <p className="text-destructive">Error loading questions.</p>}
          {questions && questions.length > 0 ? (
            <div className="divide-y">
              {questions.map(q => <QuestionItem key={q.id} question={q as any} productId={productId} />)}
            </div>
          ) : (
            !isLoading && <p className="text-center text-muted-foreground py-8">No questions have been asked yet. Be the first!</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
