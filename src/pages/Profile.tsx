
import { AppLayout } from "@/components/layout/AppLayout";
import { User, Star, BarChart4, Clock, Calendar, Settings } from "lucide-react";

const Profile = () => {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading font-semibold mb-8">
          Your Profile
        </h1>
        
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-voicecraft-primary to-voicecraft-secondary h-32"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-end -mt-16">
              <div className="rounded-full bg-white p-1.5 shadow-lg">
                <div className="bg-voicecraft-primary/10 rounded-full p-8">
                  <User className="h-16 w-16 text-voicecraft-primary" />
                </div>
              </div>
              
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-heading font-semibold">John Doe</h2>
                <p className="text-muted-foreground">Public Speaking Enthusiast</p>
              </div>
              
              <div className="md:ml-auto mt-4 md:mt-0">
                <button className="flex items-center gap-2 border rounded-md px-4 py-2 text-sm font-medium hover:bg-muted/50 transition-colors">
                  <Settings className="h-4 w-4" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-xl border shadow-sm p-6">
            <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-voicecraft-primary" />
              Achievements
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-voicecraft-primary/10 p-2 rounded-full">
                  <Mic className="h-5 w-5 text-voicecraft-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">First Practice</p>
                  <p className="text-xs text-muted-foreground">Completed your first practice session</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-voicecraft-primary/10 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-voicecraft-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">3-Day Streak</p>
                  <p className="text-xs text-muted-foreground">Practiced for 3 consecutive days</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-voicecraft-primary/10 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-voicecraft-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">10-Minute Master</p>
                  <p className="text-xs text-muted-foreground">Completed a 10+ minute session</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl border shadow-sm p-6">
            <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
              <BarChart4 className="h-5 w-5 text-voicecraft-primary" />
              Skill Progress
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-medium">Pace Control</span>
                  <span>75%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full rounded-full bg-voicecraft-primary" style={{ width: "75%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-medium">Filler Word Reduction</span>
                  <span>60%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full rounded-full bg-voicecraft-primary" style={{ width: "60%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-medium">Vocal Variety</span>
                  <span>82%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full rounded-full bg-voicecraft-primary" style={{ width: "82%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-medium">Structure</span>
                  <span>90%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full rounded-full bg-voicecraft-primary" style={{ width: "90%" }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl border shadow-sm p-6">
            <h3 className="font-medium text-lg mb-4">Stats Overview</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm">Total Practice Time</span>
                <span className="font-semibold">01:45:30</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm">Completed Sessions</span>
                <span className="font-semibold">12</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm">Average Score</span>
                <span className="font-semibold">78/100</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm">Best Score</span>
                <span className="font-semibold">92/100</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Lessons Completed</span>
                <span className="font-semibold">5/20</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl border shadow-sm p-6">
          <h3 className="font-medium text-lg mb-4">Your Learning Path</h3>
          
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-6">
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-voicecraft-primary flex items-center justify-center text-white font-bold">1</div>
                <div>
                  <h4 className="font-medium">Fundamentals</h4>
                  <p className="text-sm text-muted-foreground">Master the basics of clear communication</p>
                  <div className="mt-1 text-xs bg-voicecraft-success/10 text-voicecraft-success w-fit px-2 py-0.5 rounded-full">Completed</div>
                </div>
              </div>
              
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-voicecraft-primary flex items-center justify-center text-white font-bold">2</div>
                <div>
                  <h4 className="font-medium">Delivery & Presence</h4>
                  <p className="text-sm text-muted-foreground">Develop your speaking style and stage presence</p>
                  <div className="mt-1 text-xs bg-voicecraft-primary/10 text-voicecraft-primary w-fit px-2 py-0.5 rounded-full">In Progress (60%)</div>
                </div>
              </div>
              
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">3</div>
                <div>
                  <h4 className="font-medium text-muted-foreground">Advanced Techniques</h4>
                  <p className="text-sm text-muted-foreground">Learn persuasion, storytelling, and audience engagement</p>
                  <div className="mt-1 text-xs bg-gray-200 text-gray-500 w-fit px-2 py-0.5 rounded-full">Locked</div>
                </div>
              </div>
              
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">4</div>
                <div>
                  <h4 className="font-medium text-muted-foreground">Leadership Communication</h4>
                  <p className="text-sm text-muted-foreground">Develop executive presence and leadership communication</p>
                  <div className="mt-1 text-xs bg-gray-200 text-gray-500 w-fit px-2 py-0.5 rounded-full">Locked</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;

// Missing import
import { Mic } from "lucide-react";
