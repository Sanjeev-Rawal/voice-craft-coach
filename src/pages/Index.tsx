
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { SessionCard } from "@/components/dashboard/SessionCard";
import { BarChart, Clock, Mic, Calendar, ArrowRight, BookOpen, Star } from "lucide-react";

const Index = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalDuration: 0,
    streak: 3,
    averageScore: 0,
  });
  
  useEffect(() => {
    // Load sessions from localStorage or set default data
    const savedSessions = JSON.parse(localStorage.getItem("voiceCraftSessions") || "[]");
    
    // If no saved sessions, create demo data
    if (savedSessions.length === 0) {
      const demoSessions = [
        {
          id: "1",
          date: new Date(Date.now() - 86400000).toISOString(), // yesterday
          duration: 120,
          topic: "Leadership Principles",
          score: 82,
          feedback: "Good energy and clarity. Work on reducing filler words and improving pace variation.",
        },
        {
          id: "2",
          date: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
          duration: 180,
          topic: "Project Presentation",
          score: 78,
          feedback: "Clear structure and good engagement. Consider working on vocal variety and emphasizing key points.",
        },
        {
          id: "3",
          date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
          duration: 150,
          topic: "Introduction Speech",
          score: 73,
          feedback: "Good start with personal stories. Focus on maintaining energy throughout and reducing filler words.",
        },
      ];
      
      localStorage.setItem("voiceCraftSessions", JSON.stringify(demoSessions));
      setSessions(demoSessions);
      
      // Set demo stats
      setStats({
        totalSessions: 3,
        totalDuration: 450,
        streak: 3,
        averageScore: 77,
      });
    } else {
      setSessions(savedSessions);
      
      // Calculate real stats
      const totalDuration = savedSessions.reduce((sum: number, session: any) => sum + session.duration, 0);
      const scores = savedSessions.map((s: any) => s.score);
      const averageScore = Math.round(scores.reduce((sum: number, score: number) => sum + score, 0) / scores.length);
      
      setStats({
        totalSessions: savedSessions.length,
        totalDuration: totalDuration,
        streak: 3, // Mock streak data
        averageScore: averageScore,
      });
    }
  }, []);
  
  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3 gradient-text">
            Welcome to VoiceCraft Coach
          </h1>
          <p className="text-lg text-muted-foreground">
            Your AI-powered public speaking assistant. Practice, analyze, and improve your speaking skills.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Sessions" 
            value={stats.totalSessions} 
            icon={<Mic className="h-5 w-5 text-voicecraft-primary" />} 
          />
          <StatCard 
            title="Practice Time" 
            value={formatTime(stats.totalDuration)} 
            icon={<Clock className="h-5 w-5 text-voicecraft-primary" />} 
          />
          <StatCard 
            title="Day Streak" 
            value={stats.streak}
            trend={{ value: 15, isPositive: true }} 
            icon={<Calendar className="h-5 w-5 text-voicecraft-primary" />} 
          />
          <StatCard 
            title="Average Score" 
            value={stats.averageScore} 
            icon={<BarChart className="h-5 w-5 text-voicecraft-primary" />} 
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-1/2 bg-card rounded-xl border shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-heading font-medium">Start Practicing</h2>
              <Link 
                to="/practice" 
                className="text-sm text-voicecraft-primary hover:underline flex items-center gap-1"
              >
                All Modes <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            
            <Link 
              to="/practice" 
              className="bg-gradient-to-r from-voicecraft-primary to-voicecraft-secondary text-white rounded-xl p-6 flex flex-col items-center text-center mb-4 transition-transform hover:scale-[1.02] shadow-sm hover:shadow-md"
            >
              <Mic className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-medium mb-2">Start Practice Session</h3>
              <p className="text-sm text-white/80 mb-4">
                Record your speech and get instant AI feedback
              </p>
              <button className="px-4 py-2 bg-white text-voicecraft-primary rounded-md font-medium">
                Start Now
              </button>
            </Link>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-4 text-center hover:bg-muted/80 cursor-pointer">
                <BookOpen className="h-6 w-6 mx-auto mb-2 text-voicecraft-primary" />
                <h4 className="font-medium text-sm mb-1">Scripted</h4>
                <p className="text-xs text-muted-foreground">Practice with a script</p>
              </div>
              
              <div className="bg-muted rounded-lg p-4 text-center hover:bg-muted/80 cursor-pointer">
                <Mic className="h-6 w-6 mx-auto mb-2 text-voicecraft-primary" />
                <h4 className="font-medium text-sm mb-1">Freestyle</h4>
                <p className="text-xs text-muted-foreground">Impromptu speaking</p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 bg-card rounded-xl border shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-heading font-medium">Suggested Lessons</h2>
              <Link 
                to="/lessons" 
                className="text-sm text-voicecraft-primary hover:underline flex items-center gap-1"
              >
                All Lessons <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            
            <div className="space-y-3">
              <div className="bg-muted rounded-lg p-4 hover:bg-muted/80 cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-sm">Eliminating Filler Words</h3>
                  <div className="flex items-center">
                    <Star className="h-3.5 w-3.5 text-voicecraft-accent fill-voicecraft-accent" />
                    <Star className="h-3.5 w-3.5 text-voicecraft-accent fill-voicecraft-accent" />
                    <Star className="h-3.5 w-3.5 text-voicecraft-accent fill-voicecraft-accent" />
                    <Star className="h-3.5 w-3.5 text-gray-300" />
                    <Star className="h-3.5 w-3.5 text-gray-300" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Learn techniques to reduce "um", "uh", and other fillers.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-voicecraft-primary/10 text-voicecraft-primary px-2 py-0.5 rounded-full">
                    5 minutes
                  </span>
                  <button className="text-xs text-voicecraft-primary hover:underline">Start</button>
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-4 hover:bg-muted/80 cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-sm">Mastering Your Pace</h3>
                  <div className="flex items-center">
                    <Star className="h-3.5 w-3.5 text-voicecraft-accent fill-voicecraft-accent" />
                    <Star className="h-3.5 w-3.5 text-voicecraft-accent fill-voicecraft-accent" />
                    <Star className="h-3.5 w-3.5 text-voicecraft-accent fill-voicecraft-accent" />
                    <Star className="h-3.5 w-3.5 text-voicecraft-accent fill-voicecraft-accent" />
                    <Star className="h-3.5 w-3.5 text-gray-300" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Find the optimal speaking pace for maximum impact.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-voicecraft-primary/10 text-voicecraft-primary px-2 py-0.5 rounded-full">
                    8 minutes
                  </span>
                  <button className="text-xs text-voicecraft-primary hover:underline">Start</button>
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-4 hover:bg-muted/80 cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-sm">Storytelling Fundamentals</h3>
                  <div className="flex items-center">
                    <Star className="h-3.5 w-3.5 text-voicecraft-accent fill-voicecraft-accent" />
                    <Star className="h-3.5 w-3.5 text-voicecraft-accent fill-voicecraft-accent" />
                    <Star className="h-3.5 w-3.5 text-voicecraft-accent fill-voicecraft-accent" />
                    <Star className="h-3.5 w-3.5 text-voicecraft-accent fill-voicecraft-accent" />
                    <Star className="h-3.5 w-3.5 text-voicecraft-accent fill-voicecraft-accent" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Engage your audience with compelling stories.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-voicecraft-primary/10 text-voicecraft-primary px-2 py-0.5 rounded-full">
                    12 minutes
                  </span>
                  <button className="text-xs text-voicecraft-primary hover:underline">Start</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl border shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-heading font-medium">Recent Sessions</h2>
            <Link
              to="/progress" 
              className="text-sm text-voicecraft-primary hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          
          {sessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sessions.slice(0, 3).map((session) => (
                <SessionCard
                  key={session.id}
                  date={formatDate(session.date)}
                  duration={formatTime(session.duration)}
                  topic={session.topic}
                  score={session.score}
                  feedback={session.feedback}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No practice sessions yet. Start practicing to see your results!</p>
              <Link to="/practice" className="mt-4 inline-block bg-voicecraft-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-voicecraft-secondary transition-colors">
                Start Practice
              </Link>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
