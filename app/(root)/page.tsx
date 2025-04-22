import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import { dummyInterviews } from '@/constants';

const HomePage = () => {  
  return (
    <>
      <section className='card-cta'>

        <div className='flex flex-col gap-6 max-w-[600px]'>
          <h2>Be interview ready with AI_Powered Feedback</h2>
          <p>Get personalized feedback on your interview performance with our AI-powered platform.</p>
          <Button asChild className="btn-primary max sm:w-full">
            <Link href="/interview">Start Interview</Link>
          </Button>
        </div>

        <Image src="/robot.png" alt="robot" height={400} width={400}  />

      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>
        <div className='interview section' >
          {dummyInterviews}
        </div>
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take Interview</h2>
        <div className='interview section' >
          <p>No Interview available!</p>
        </div>
      </section>
    
    </>
  );
}
export default HomePage;
// This is a simple React component that serves as the home page of a web application.
