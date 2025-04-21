
import { AppLayout } from "@/components/layout/AppLayout";
import { Play, Star, BookOpen, BarChart, Clock, Lock, Filter } from "lucide-react";

const lessonCategories = [
  "All Lessons",
  "Fundamentals",
  "Structure",
  "Delivery",
  "Visual Aids",
  "Confidence",
  "Advanced",
];

const lessons = [
  {
    id: "1",
    title: "The Art of Introduction",
    description: "Learn how to craft a powerful opening that captivates your audience from the first moment.",
    category: "Fundamentals",
    duration: "10 minutes",
    rating: 5,
    level: "Beginner",
    locked: false,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHB1YmxpYyUyMHNwZWFraW5nfGVufDB8fDB8fHww",
  },
  {
    id: "2",
    title: "Eliminating Filler Words",
    description: "Practical techniques to reduce 'um', 'uh', and other filler words that diminish your authority.",
    category: "Delivery",
    duration: "8 minutes",
    rating: 4,
    level: "Beginner",
    locked: false,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNwZWFraW5nfGVufDB8fDB8fHww",
  },
  {
    id: "3",
    title: "Mastering Body Language",
    description: "Understand how to use gestures, posture, and movement to enhance your message.",
    category: "Delivery",
    duration: "15 minutes",
    rating: 5,
    level: "Intermediate",
    locked: false,
    image: "https://images.unsplash.com/photo-1569951715253-a11ff21c8465?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHN0YWdlfGVufDB8fDB8fHww",
  },
  {
    id: "4",
    title: "Storytelling for Impact",
    description: "Learn the structure of compelling stories and how to use them in presentations.",
    category: "Structure",
    duration: "12 minutes",
    rating: 5,
    level: "Intermediate",
    locked: false,
    image: "https://images.unsplash.com/photo-1505236252320-e5a56f299fe8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHN0b3J5fGVufDB8fDB8fHww",
  },
  {
    id: "5",
    title: "Persuasive Presentation Frameworks",
    description: "Advanced techniques to structure persuasive presentations for maximum impact.",
    category: "Advanced",
    duration: "20 minutes",
    rating: 4,
    level: "Advanced",
    locked: true,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJlc2VudGF0aW9ufGVufDB8fDB8fHww",
  },
  {
    id: "6",
    title: "Handling Q&A Sessions",
    description: "Strategies for managing challenging questions and maintaining control.",
    category: "Advanced",
    duration: "15 minutes",
    rating: 5,
    level: "Intermediate",
    locked: true,
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHF1ZXN0aW9ufGVufDB8fDB8fHww",
  },
];

const Lessons = () => {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-heading font-semibold">
            Lessons Library
          </h1>
          
          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search lessons..."
                className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            
            <button className="p-2 border rounded-md">
              <Filter className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
        
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {lessonCategories.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  index === 0
                    ? "bg-voicecraft-primary text-white"
                    : "bg-muted hover:bg-voicecraft-primary/10 hover:text-voicecraft-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="bg-card rounded-xl border shadow-sm overflow-hidden">
              <div className="relative h-40">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 flex items-center text-white">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">{lesson.category}</span>
                </div>
                <div className="absolute bottom-3 right-3 flex items-center text-white">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">{lesson.duration}</span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium px-2 py-0.5 bg-voicecraft-primary/10 text-voicecraft-primary rounded-full">
                    {lesson.level}
                  </span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < lesson.rating
                            ? "text-voicecraft-accent fill-voicecraft-accent"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <h3 className="font-medium text-lg mb-2">{lesson.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {lesson.description}
                </p>
                
                <button
                  className={`w-full flex items-center justify-center gap-2 py-2 rounded-md font-medium ${
                    lesson.locked
                      ? "bg-muted text-muted-foreground"
                      : "bg-voicecraft-primary text-white hover:bg-voicecraft-secondary"
                  } transition-colors`}
                >
                  {lesson.locked ? (
                    <>
                      <Lock className="h-4 w-4" />
                      Unlock Premium
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Start Lesson
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Lessons;
