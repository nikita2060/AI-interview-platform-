import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebass/admin";

export async function GET() {
    return Response.json({ success: true, data: 'THANK YOU!'}, {status:200});
}

export async function POST(request: Request){
    const { type, role , level, techstack, amount, profile, userid } = await request.json();
    
    try {
        const { text: questions } = await generateText({
          model: google("gemini-2.0-flash-001"),
          prompt: `Prepare questions for a job interview.
            The job role is ${role}.
            The job experience level is ${level}.
            The tech stack used in the job is: ${techstack}.
            The focus between behavioural and technical questions should lean towards: ${type}.
            The user's cv/resume profile is: ${profile}.
            The amount of questions required is: ${amount}.
            Please return only the questions, without any additional text.
            The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
            Return the questions formatted like this:
            ["Question 1", "Question 2", "Question 3"]
            
            Thank you! <3
        `,
        });
        
        // Extract JSON array from the response
        let parsedQuestions = [];
        try {
            // Try to find a JSON array in the response
            const jsonMatch = questions.match(/\[\s*".*"\s*\]/s);
            if (jsonMatch) {
                parsedQuestions = JSON.parse(jsonMatch[0]);
            } else {
                // Fallback: Split by newlines and clean up
                parsedQuestions = questions
                    .split('\n')
                    .filter(q => q.trim().length > 0)
                    .map(q => q.replace(/^\d+\.\s*/, '').trim()) // Remove numbering
                    .filter(q => q.length > 10); // Filter out short lines
            }
        } catch (error) {
            console.error("Error parsing questions:", error);
            // Provide default questions as fallback
            parsedQuestions = [
                `Tell me about your experience with ${techstack}`,
                `What challenges have you faced as a ${role}?`,
                `How do you stay updated with the latest trends in ${techstack}?`,
                `Describe a project where you used ${techstack}`,
                `What are your career goals as a ${level} ${role}?`
            ];
        }
        
        const interview = {
            role: role,
            type: type,
            level: level,
            profile: profile,
            techstack: techstack.split(","),
            questions: parsedQuestions,
            userId: userid,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString(),
        };

        await db.collection("interviews").add(interview);
        
        return Response.json({success: true}, {status:200});
    } catch (error) {
        console.error("API error:", error);
        return Response.json({success: false, error: "Failed to generate interview"}, {status:500});
    }
}