'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { vapi } from '@/lib/vapi.sdk';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Loading from './Loading';

// Define the interview form state
interface InterviewForm {
  type: string;
  role: string;
  level: string;
  techstack: string;
  amount: number;
  profile: string;
}

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

const Agent = ({ userName, userId, type }: AgentProps) => {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [interviewForm, setInterviewForm] = useState<InterviewForm>({
    type: 'technical',
    role: '',
    level: 'junior',
    techstack: '',
    amount: 5,
    profile: '',
  });

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
    const onMessage = (message: Message) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
        
        // Process the message to extract interview details
        if (message.role === 'user') {
          // Extract role, level, etc. from user messages
          processUserMessage(message.transcript);
        }
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.log('Error', error);
    
    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);
    vapi.on('error', onError);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
      vapi.off('error', onError);
    };
  }, []);

  // Process user messages to extract interview details
  const processUserMessage = (content: string) => {
    // This is a simplified example - you would need more sophisticated parsing
    if (content.includes('role') || content.includes('position')) {
      const roleMatch = content.match(/(?:role|position)(?:\s+is)?\s+(\w+)/i);
      if (roleMatch && roleMatch[1]) {
        setInterviewForm(prev => ({ ...prev, role: roleMatch[1] }));
      }
    }
    
    if (content.includes('tech') || content.includes('stack')) {
      const techMatch = content.match(/(?:tech|stack)(?:\s+is)?\s+([^.]+)/i);
      if (techMatch && techMatch[1]) {
        setInterviewForm(prev => ({ ...prev, techstack: techMatch[1].trim() }));
      }
    }
    
    // Add more parsing logic as needed
  };

  // Save the interview using the existing endpoint
  const saveInterview = async () => {
    try {
      const response = await fetch('/api/google-auth/vapi/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...interviewForm,
          userid: userId,
          profile: interviewForm.profile || 'Not provided'
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        router.push('/dashboard');
      } else {
        console.error('Failed to save interview');
      }
    } catch (error) {
      console.error('Error saving interview:', error);
    }
  };

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      if (type === 'generate') {
        saveInterview();
      }
    }
  }, [callStatus, type]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    
    if (type === 'generate') {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId,
        },
      });
    }
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const latestMessage = messages[messages.length - 1]?.content;
  const isCallInactiveOrFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

  return (
    <>
      <div className='call-view'>
        {isRedirecting && (
          <div>
            <Loading />
          </div>
        )}
        <div className='card-interviewer'>
          <div className='avatar size-[130px]'>
            <Image 
              src="/profile1.webp" 
              alt="Shilpa" 
              width={123} 
              height={65} 
              className='object-cover rounded-full'
            />
            {isSpeaking && <span className='animate-speak'/>}
          </div>
          <h3>Shilpa</h3>
          <h4>Virtual Interviewer</h4>
        </div>
        <div className='card-border'>
          <div className='card-content'>
            <Image 
              src="/user-avatar.png" 
              width={543} 
              height={540} 
              className="rounded-full object-cover size-[120px]" 
              alt="user" 
            /> 
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className='transcript-border'>
          <div className='transcript'>
            <p 
              key={latestMessage} 
              className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}
            >
              {latestMessage}
            </p>
          </div>
        </div>
      )}

      <div className='w-full flex justify-center'>
        {callStatus !== 'ACTIVE' ? (
          <button className='realtive btn-call' onClick={handleCall}>
            <span 
              className={cn('absolute animate-ping rounded-full opacity-75', callStatus !== 'CONNECTING' && 'hidden')}
            />
            <span>
              {isCallInactiveOrFinished ? 'Call' : '. . .'}
            </span>
          </button>
        ) : (
          <button className='btn-disconnect' onClick={handleDisconnect}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
