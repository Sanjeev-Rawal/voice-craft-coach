
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PracticeSession } from "@/components/practice/PracticeSession";
import { FeedbackDisplay } from "@/components/practice/FeedbackDisplay";
import { useToast } from "@/hooks/use-toast";

const Practice = () => {
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);
  const { toast } = useToast();
  
  const handleSessionComplete = (data: any) => {
    setSessionData(data);
    setSessionComplete(true);
    
    // Store session data in mock storage
    const savedSessions = JSON.parse(localStorage.getItem("voiceCraftSessions") || "[]");
    const newSessions = [
      {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        duration: data.duration,
        topic: "Freestyle Practice",
        score: data.analysis.overall.score,
        feedback: data.analysis.overall.feedback,
        analysis: data.analysis,
      },
      ...savedSessions,
    ].slice(0, 20); // Keep only last 20 sessions
    
    localStorage.setItem("voiceCraftSessions", JSON.stringify(newSessions));
    
    toast({
      title: "Practice session saved!",
      description: "Your session has been analyzed and saved.",
    });
  };
  
  const handleNewSession = () => {
    setSessionComplete(false);
    setSessionData(null);
  };
  
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading font-semibold mb-6">
          Practice Your Speaking
        </h1>
        
        {sessionComplete && sessionData ? (
          <FeedbackDisplay 
            transcript={sessionData.transcript}
            audioURL={sessionData.audioURL}
            duration={sessionData.duration}
            analysis={sessionData.analysis}
            onStartNewSession={handleNewSession}
          />
        ) : (
          <PracticeSession 
            onSessionComplete={handleSessionComplete}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default Practice;
