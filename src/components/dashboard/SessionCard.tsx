
import { CalendarDays, Clock } from "lucide-react";

interface SessionProps {
  date: string;
  duration: string;
  topic: string;
  score: number;
  feedback: string;
}

export function SessionCard({ date, duration, topic, score, feedback }: SessionProps) {
  return (
    <div className="card-stats">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-base">{topic}</h3>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground text-xs">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>{date}</span>
            <Clock className="h-3.5 w-3.5 ml-2" />
            <span>{duration}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <div 
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white",
              score >= 80 ? "bg-voicecraft-success" :
              score >= 60 ? "bg-voicecraft-accent" :
              "bg-voicecraft-warning"
            )}
          >
            {score}
          </div>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p className="line-clamp-2">{feedback}</p>
      </div>
      
      <button className="mt-3 text-sm font-medium text-voicecraft-primary hover:underline">
        View Details
      </button>
    </div>
  );
}

// Missing import
import { cn } from "@/lib/utils";
