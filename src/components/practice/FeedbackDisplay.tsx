
import { useState } from "react";
import { Clock, BarChart, Mic, BookOpen, ArrowRight } from "lucide-react";

interface FeedbackMetric {
  score: number;
  feedback: string;
}

interface FeedbackData {
  pacing: FeedbackMetric & { wpm: number };
  clarity: FeedbackMetric;
  fillers: FeedbackMetric & { count: number };
  energy: FeedbackMetric;
  overall: FeedbackMetric;
}

interface FeedbackDisplayProps {
  transcript: string;
  audioURL: string | null;
  duration: number;
  analysis: FeedbackData;
  onStartNewSession?: () => void;
}

export function FeedbackDisplay({
  transcript,
  audioURL,
  duration,
  analysis,
  onStartNewSession,
}: FeedbackDisplayProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "transcript" | "detailed">("summary");
  
  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Helper to render score indicator
  const renderScoreIndicator = (score: number) => {
    const getColor = () => {
      if (score >= 80) return "bg-voicecraft-success";
      if (score >= 65) return "bg-voicecraft-accent";
      return "bg-voicecraft-warning";
    };
    
    return (
      <div className="flex items-center gap-2">
        <div className={`w-10 h-10 rounded-full ${getColor()} flex items-center justify-center text-white font-semibold`}>
          {score}
        </div>
        <div className="w-full max-w-xs bg-gray-200 h-2 rounded-full">
          <div 
            className={`h-full rounded-full ${getColor()}`} 
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    );
  };
  
  return (
    <div className="w-full max-w-4xl bg-card rounded-xl shadow-sm border">
      <div className="border-b">
        <div className="flex">
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "summary"
                ? "border-b-2 border-voicecraft-primary text-voicecraft-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("summary")}
          >
            Summary
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "transcript"
                ? "border-b-2 border-voicecraft-primary text-voicecraft-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("transcript")}
          >
            Transcript
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "detailed"
                ? "border-b-2 border-voicecraft-primary text-voicecraft-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("detailed")}
          >
            Detailed Feedback
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {activeTab === "summary" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-heading">Speech Analysis</h2>
              <div className="px-3 py-1 bg-muted rounded-full text-xs flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {formatTime(duration)}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart className="h-5 w-5 text-voicecraft-primary" />
                  <h3 className="font-medium">Overall Score</h3>
                </div>
                <div className="flex justify-center my-4">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold ${
                    analysis.overall.score >= 80 ? "bg-voicecraft-success" :
                    analysis.overall.score >= 65 ? "bg-voicecraft-accent" :
                    "bg-voicecraft-warning"
                  }`}>
                    {analysis.overall.score}
                  </div>
                </div>
                <p className="text-sm text-center">{analysis.overall.feedback}</p>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <Mic className="h-4 w-4 text-voicecraft-primary" />
                      <span className="text-sm font-medium">Filler Words</span>
                    </div>
                    {renderScoreIndicator(analysis.fillers.score)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {analysis.fillers.count} filler words detected
                  </p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-voicecraft-primary" />
                      <span className="text-sm font-medium">Pacing</span>
                    </div>
                    {renderScoreIndicator(analysis.pacing.score)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {analysis.pacing.wpm} words per minute
                  </p>
                </div>
              </div>
            </div>
            
            {audioURL && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Recording</h3>
                <audio src={audioURL} className="w-full" controls />
              </div>
            )}
            
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onStartNewSession}
                className="flex items-center justify-center gap-2 bg-voicecraft-primary text-white px-6 py-3 rounded-md font-medium hover:bg-voicecraft-secondary transition-colors"
              >
                <Mic className="h-5 w-5" />
                Start New Practice
              </button>
              <button
                onClick={() => setActiveTab("detailed")}
                className="flex items-center justify-center gap-2 border border-voicecraft-primary text-voicecraft-primary px-6 py-3 rounded-md font-medium hover:bg-voicecraft-primary/5 transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                See Detailed Feedback
              </button>
            </div>
          </div>
        )}
        
        {activeTab === "transcript" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-heading">Transcript</h2>
            <div className="bg-muted p-4 rounded-lg">
              <p className="whitespace-pre-line">{transcript}</p>
            </div>
            {audioURL && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Recording</h3>
                <audio src={audioURL} className="w-full" controls />
              </div>
            )}
          </div>
        )}
        
        {activeTab === "detailed" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-heading">Detailed Feedback</h2>
            
            <div className="space-y-4">
              <div className="bg-muted p-5 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Mic className="h-5 w-5 text-voicecraft-primary" />
                  Filler Words
                </h3>
                {renderScoreIndicator(analysis.fillers.score)}
                <p className="mt-3 text-sm">
                  {analysis.fillers.feedback} You used {analysis.fillers.count} filler words during your speech.
                </p>
                <div className="mt-3 bg-white p-3 rounded border text-sm">
                  <h4 className="font-medium mb-1">Improvement Tips:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Practice pausing instead of using fillers</li>
                    <li>Record yourself regularly to build awareness</li>
                    <li>Prepare key points in advance</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-muted p-5 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-voicecraft-primary" />
                  Pacing
                </h3>
                {renderScoreIndicator(analysis.pacing.score)}
                <p className="mt-3 text-sm">
                  {analysis.pacing.feedback} Your pace was {analysis.pacing.wpm} words per minute.
                </p>
                <div className="mt-3 bg-white p-3 rounded border text-sm">
                  <h4 className="font-medium mb-1">Improvement Tips:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Aim for 140-170 words per minute for optimal clarity</li>
                    <li>Practice with a metronome to develop rhythm</li>
                    <li>Use strategic pauses to create emphasis</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-muted p-5 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-voicecraft-primary" />
                  Clarity
                </h3>
                {renderScoreIndicator(analysis.clarity.score)}
                <p className="mt-3 text-sm">
                  {analysis.clarity.feedback}
                </p>
                <div className="mt-3 bg-white p-3 rounded border text-sm">
                  <h4 className="font-medium mb-1">Improvement Tips:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Practice articulation exercises daily</li>
                    <li>Record yourself reading complex passages</li>
                    <li>Focus on proper breathing techniques</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-muted p-5 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <ArrowRight className="h-5 w-5 text-voicecraft-primary" />
                  Energy
                </h3>
                {renderScoreIndicator(analysis.energy.score)}
                <p className="mt-3 text-sm">
                  {analysis.energy.feedback}
                </p>
                <div className="mt-3 bg-white p-3 rounded border text-sm">
                  <h4 className="font-medium mb-1">Improvement Tips:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Practice varying your vocal tone and volume</li>
                    <li>Use gestures to enhance your verbal message</li>
                    <li>Find natural places to add emphasis</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={onStartNewSession}
                className="flex items-center justify-center gap-2 bg-voicecraft-primary text-white px-6 py-3 rounded-md font-medium hover:bg-voicecraft-secondary transition-colors"
              >
                <Mic className="h-5 w-5" />
                Start New Practice
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
