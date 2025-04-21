
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { BarChart, BarChart4, Calendar, Clock, Mic, Calendar as CalendarIcon } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

const Progress = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalDuration: 0,
    averageScore: 0,
    bestScore: 0,
  });
  
  useEffect(() => {
    // Load sessions from localStorage
    const savedSessions = JSON.parse(localStorage.getItem("voiceCraftSessions") || "[]");
    setSessions(savedSessions);
    
    if (savedSessions.length > 0) {
      // Calculate stats
      const totalDuration = savedSessions.reduce((sum: number, session: any) => sum + session.duration, 0);
      const scores = savedSessions.map((s: any) => s.score);
      const averageScore = Math.round(scores.reduce((sum: number, score: number) => sum + score, 0) / scores.length);
      const bestScore = Math.max(...scores);
      
      setStats({
        totalSessions: savedSessions.length,
        totalDuration: totalDuration,
        averageScore: averageScore,
        bestScore: bestScore,
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
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-heading font-semibold">
            Your Progress
          </h1>
          
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-white border rounded-md text-sm font-medium">
              Last 7 days
            </button>
            <button className="px-4 py-2 bg-white border rounded-md text-sm font-medium">
              Last 30 days
            </button>
            <button className="px-4 py-2 bg-white border rounded-md text-sm font-medium">
              All time
            </button>
          </div>
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
            title="Average Score" 
            value={stats.averageScore} 
            icon={<BarChart className="h-5 w-5 text-voicecraft-primary" />} 
          />
          <StatCard 
            title="Best Score" 
            value={stats.bestScore} 
            icon={<BarChart4 className="h-5 w-5 text-voicecraft-primary" />} 
          />
        </div>
        
        <div className="bg-card rounded-xl border shadow-sm p-6 mb-8">
          <h2 className="text-xl font-heading font-medium mb-4">Recent Sessions</h2>
          
          {sessions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Topic</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Duration</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Score</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session) => (
                    <tr key={session.id} className="border-b hover:bg-muted/30">
                      <td className="py-3 px-4 text-sm">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          {formatDate(session.date)}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{session.topic}</td>
                      <td className="py-3 px-4 text-sm">{formatTime(session.duration)}</td>
                      <td className="py-3 px-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold
                          ${session.score >= 80 ? "bg-voicecraft-success" :
                            session.score >= 65 ? "bg-voicecraft-accent" :
                            "bg-voicecraft-warning"}`}>
                          {session.score}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <button className="text-voicecraft-primary hover:underline">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No practice sessions yet. Start practicing to see your progress!</p>
              <button className="mt-4 bg-voicecraft-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-voicecraft-secondary transition-colors">
                Start Practice
              </button>
            </div>
          )}
        </div>
        
        <div className="bg-card rounded-xl border shadow-sm p-6">
          <h2 className="text-xl font-heading font-medium mb-4">Skill Development</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium text-base mb-3">Pacing</h3>
              <div className="h-4 bg-gray-200 rounded-full mb-2">
                <div className="h-full bg-voicecraft-primary rounded-full" style={{ width: "68%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Level 2</span>
                <span>68%</span>
              </div>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium text-base mb-3">Clarity</h3>
              <div className="h-4 bg-gray-200 rounded-full mb-2">
                <div className="h-full bg-voicecraft-primary rounded-full" style={{ width: "75%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Level 3</span>
                <span>75%</span>
              </div>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium text-base mb-3">Energy</h3>
              <div className="h-4 bg-gray-200 rounded-full mb-2">
                <div className="h-full bg-voicecraft-primary rounded-full" style={{ width: "82%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Level 3</span>
                <span>82%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Progress;
