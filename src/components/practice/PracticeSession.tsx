
import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Play, Stop } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PracticeMode = "freestyle" | "scripted" | "roleplay" | "interview";

interface PracticeSessionProps {
  mode?: PracticeMode;
  onSessionComplete?: (data: any) => void;
}

export function PracticeSession({ 
  mode = "freestyle", 
  onSessionComplete 
}: PracticeSessionProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState<string>("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const { toast } = useToast();
  
  const startRecording = async () => {
    try {
      // Reset state
      audioChunksRef.current = [];
      setRecordingTime(0);
      setTranscript("");
      setAudioBlob(null);
      setAudioURL(null);
      
      // Start recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };
      
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        
        // Simulate transcription and analysis
        simulateTranscription(audioBlob);
      };
      
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      
      // Start timer
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error("Error starting recording:", error);
      toast({
        title: "Recording Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };
  
  const stopRecording = () => {
    if (!mediaRecorder) return;
    
    mediaRecorder.stop();
    setIsRecording(false);
    
    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Stop tracks
    mediaRecorder.stream.getTracks().forEach(track => track.stop());
  };
  
  const simulateTranscription = (blob: Blob) => {
    setIsProcessing(true);
    
    // Simulating API call for transcription
    setTimeout(() => {
      // Mock transcript
      const mockTranscript = 
        "Thank you for this opportunity to speak. I believe that effective communication is the cornerstone of success in any field. " +
        "Um, when we look at great leaders throughout history, we see that their ability to articulate their vision was um, critical to their success. " +
        "I think that by practicing regularly and seeking feedback, we can all improve our public speaking skills and become more confident communicators.";
      
      setTranscript(mockTranscript);
      setIsProcessing(false);
      
      // Generate feedback
      const mockAnalysis = generateMockAnalysis(mockTranscript);
      
      // If callback provided, send session data
      if (onSessionComplete) {
        onSessionComplete({
          transcript: mockTranscript,
          audioBlob: blob,
          audioURL: audioURL,
          duration: recordingTime,
          analysis: mockAnalysis,
          timestamp: new Date().toISOString(),
        });
      }
    }, 2000);
  };
  
  const generateMockAnalysis = (text: string) => {
    // Count filler words
    const fillerWords = ["um", "uh", "like", "you know", "actually"];
    const fillerCount = fillerWords.reduce((count, word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = text.match(regex);
      return count + (matches ? matches.length : 0);
    }, 0);
    
    // Calculate words per minute (assuming average 150 WPM)
    const words = text.split(' ').length;
    const minutes = recordingTime / 60;
    const wpm = Math.round(words / minutes);
    
    // Mock scores
    return {
      pacing: {
        wpm,
        score: wpm > 140 && wpm < 170 ? 85 : 70,
        feedback: wpm > 170 
          ? "Your pace was a bit fast. Try to slow down for clarity." 
          : wpm < 140 
            ? "Your pace was a bit slow. Try to be more dynamic." 
            : "Great pacing, very natural and easy to follow.",
      },
      clarity: {
        score: 78,
        feedback: "Good clarity overall. Focus on enunciating key terms more precisely.",
      },
      fillers: {
        count: fillerCount,
        score: fillerCount < 3 ? 90 : fillerCount < 6 ? 75 : 60,
        feedback: fillerCount > 5 
          ? "Work on reducing filler words like 'um' and 'uh'." 
          : "Good control of filler words.",
      },
      energy: {
        score: 82,
        feedback: "Your energy level was engaging. Maintain this enthusiasm throughout.",
      },
      overall: {
        score: 79,
        feedback: "Strong presentation with good energy. Focus on reducing filler words and maintaining ideal pacing for maximum impact.",
      }
    };
  };
  
  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl bg-card rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-2xl font-heading mb-4">
          {mode === "freestyle" ? "Freestyle Practice" :
           mode === "scripted" ? "Scripted Practice" :
           mode === "roleplay" ? "Roleplay Practice" :
           "Interview Simulation"}
        </h2>
        
        <div className="p-6 flex flex-col items-center justify-center bg-muted rounded-lg mb-6">
          {isRecording ? (
            <>
              <div className="relative mb-4">
                <div className="w-20 h-20 bg-voicecraft-error rounded-full flex items-center justify-center animate-recording-pulse">
                  <Mic className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-voicecraft-error text-white text-xs font-bold px-2 py-1 rounded-full">
                  LIVE
                </div>
              </div>
              <p className="text-2xl font-bold mb-2">{formatTime(recordingTime)}</p>
              <button
                onClick={stopRecording}
                className="flex items-center gap-2 bg-voicecraft-error text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-red-600 transition-colors"
              >
                <Stop className="h-5 w-5" />
                Stop Recording
              </button>
            </>
          ) : (
            <>
              <div className="mb-6 text-center">
                {audioURL ? (
                  <div className="flex flex-col items-center">
                    <p className="text-lg mb-2">Recording Complete: {formatTime(recordingTime)}</p>
                    <audio src={audioURL} className="mb-4" controls />
                    {isProcessing ? (
                      <p className="text-sm animate-pulse">Processing your speech...</p>
                    ) : transcript ? (
                      <div className="text-sm bg-white p-4 rounded-md border mt-2 max-h-32 overflow-y-auto w-full">
                        <h3 className="font-medium mb-1">Transcript:</h3>
                        <p>{transcript}</p>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <>
                    <Mic className="h-16 w-16 text-voicecraft-primary mb-2" />
                    <h3 className="text-xl font-medium mb-1">Ready to practice</h3>
                    <p className="text-muted-foreground mb-4">Click the button below to start recording your speech</p>
                  </>
                )}
              </div>
              
              <button
                onClick={startRecording}
                disabled={isProcessing}
                className="flex items-center gap-2 bg-voicecraft-primary text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-voicecraft-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {audioURL ? (
                  <>
                    <Play className="h-5 w-5" />
                    Practice Again
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5" />
                    Start Practice
                  </>
                )}
              </button>
            </>
          )}
        </div>
        
        {mode === "scripted" && !isRecording && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Script (Optional)</h3>
            <textarea 
              className="w-full h-32 p-3 border rounded-md" 
              placeholder="Paste your script here or start without a script..."
            />
          </div>
        )}
        
        <div className="mt-6 text-sm text-muted-foreground">
          <p className="mb-2">Tips:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Speak clearly and at a moderate pace</li>
            <li>Use pauses effectively for emphasis</li>
            <li>Minimize filler words like "um" and "uh"</li>
            <li>Practice in a quiet environment for better audio quality</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
