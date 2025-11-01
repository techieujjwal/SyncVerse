import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Sparkles,
  Loader2,
  CheckCircle2,
  Users,
  Mail,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const dummyPeers = [
  { id: 1, name: "Priya Sharma", city: "Mumbai", email: "priya.sharma@email.com", lastActive: "5 days ago", topic: "machine learning" },
  { id: 2, name: "Rohan Mehta", city: "Delhi", email: "rohan.mehta@email.com", lastActive: "2 days ago", topic: "data science" },
  { id: 3, name: "Ananya Verma", city: "Bangalore", email: "ananya.verma@email.com", lastActive: "1 day ago", topic: "machine learning" },
  { id: 4, name: "Karan Patel", city: "Pune", email: "karan.patel@email.com", lastActive: "3 hours ago", topic: "web development" },
  { id: 5, name: "Neha Gupta", city: "Chennai", email: "neha.gupta@email.com", lastActive: "6 hours ago", topic: "cybersecurity" },
  { id: 6, name: "Aarav Singh", city: "Hyderabad", email: "aarav.singh@email.com", lastActive: "2 days ago", topic: "blockchain" },
  { id: 7, name: "Ishita Nair", city: "Kochi", email: "ishita.nair@email.com", lastActive: "8 hours ago", topic: "UI/UX design" },
  { id: 8, name: "Rahul Jain", city: "Indore", email: "rahul.jain@email.com", lastActive: "10 days ago", topic: "android development" },
  { id: 9, name: "Tanvi Deshmukh", city: "Nagpur", email: "tanvi.deshmukh@email.com", lastActive: "1 day ago", topic: "cloud computing" },
  { id: 10, name: "Manav Kapoor", city: "Lucknow", email: "manav.kapoor@email.com", lastActive: "12 hours ago", topic: "artificial intelligence" },
  { id: 11, name: "Diya Chatterjee", city: "Kolkata", email: "diya.chatterjee@email.com", lastActive: "4 days ago", topic: "data analytics" },
  { id: 12, name: "Harsh Raj", city: "Patna", email: "harsh.raj@email.com", lastActive: "3 hours ago", topic: "web development" },
  { id: 13, name: "Simran Kaur", city: "Amritsar", email: "simran.kaur@email.com", lastActive: "7 days ago", topic: "machine learning" },
  { id: 14, name: "Aditya Joshi", city: "Jaipur", email: "aditya.joshi@email.com", lastActive: "6 hours ago", topic: "blockchain" },
  { id: 15, name: "Ritika Das", city: "Guwahati", email: "ritika.das@email.com", lastActive: "9 days ago", topic: "AI ethics" },
  { id: 16, name: "Sarthak Bansal", city: "Noida", email: "sarthak.bansal@email.com", lastActive: "2 days ago", topic: "cloud computing" },
  { id: 17, name: "Aditi Rao", city: "Surat", email: "aditi.rao@email.com", lastActive: "1 hour ago", topic: "frontend development" },
  { id: 18, name: "Vivek Mishra", city: "Varanasi", email: "vivek.mishra@email.com", lastActive: "4 hours ago", topic: "backend development" },
  { id: 19, name: "Kavya Pillai", city: "Thiruvananthapuram", email: "kavya.pillai@email.com", lastActive: "3 days ago", topic: "mobile app development" },
  { id: 20, name: "Tanishq Sinha", city: "Ranchi", email: "tanishq.sinha@email.com", lastActive: "9 hours ago", topic: "IoT" },
  { id: 21, name: "Pooja Yadav", city: "Bhopal", email: "pooja.yadav@email.com", lastActive: "11 hours ago", topic: "data science" },
  { id: 22, name: "Rajeev Menon", city: "Coimbatore", email: "rajeev.menon@email.com", lastActive: "5 days ago", topic: "AI/ML" },
  { id: 23, name: "Sneha Tiwari", city: "Kanpur", email: "sneha.tiwari@email.com", lastActive: "8 days ago", topic: "blockchain" },
  { id: 24, name: "Anshul Gaur", city: "Ghaziabad", email: "anshul.gaur@email.com", lastActive: "3 hours ago", topic: "full stack development" },
  { id: 25, name: "Mitali Borkar", city: "Nashik", email: "mitali.borkar@email.com", lastActive: "2 days ago", topic: "AI research" },
  { id: 26, name: "Yash Chauhan", city: "Vadodara", email: "yash.chauhan@email.com", lastActive: "7 hours ago", topic: "cloud computing" },
  { id: 27, name: "Divya Pandey", city: "Agra", email: "divya.pandey@email.com", lastActive: "5 days ago", topic: "web development" },
  { id: 28, name: "Naman Arora", city: "Chandigarh", email: "naman.arora@email.com", lastActive: "3 hours ago", topic: "data engineering" },
  { id: 29, name: "Sia Kapoor", city: "Delhi", email: "sia.kapoor@email.com", lastActive: "1 day ago", topic: "cloud security" },
  { id: 30, name: "Aryan Khanna", city: "Gurgaon", email: "aryan.khanna@email.com", lastActive: "2 hours ago", topic: "DevOps" },
];


const RoadmapGenerator = () => {
  const [topic, setTopic] = useState("");
  const [currentKnowledge, setCurrentKnowledge] = useState("");
  const [roadmap, setRoadmap] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [matchedPeers, setMatchedPeers] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const { toast } = useToast();

  const normalize = (text) =>
    text.toLowerCase().replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();

  useEffect(() => {
    if (!topic.trim()) {
      setMatchedPeers([]);
      return;
    }
    const peers = dummyPeers.filter((peer) =>
      normalize(peer.topic).includes(normalize(topic))
    );
    setMatchedPeers(peers);
  }, [topic]);

  const parseWeeks = (text) => {
    const lines = text.split("\n");
    const weeksArr = [];
    let current = null;

    lines.forEach((line) => {
      const weekMatch = line.match(/week\s*(\d+):?\s*(.*)/i);
      if (weekMatch) {
        if (current) weeksArr.push(current);
        current = {
          week: weekMatch[1],
          title: weekMatch[2] || "Untitled",
          details: [],
          completed: false,
          project: "",
        };
      } else if (current && line.trim() !== "") {
        current.details.push(line.trim());
      }
    });

    if (current) weeksArr.push(current);
    return weeksArr;
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter what you want to learn",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setRoadmap("");
    setWeeks([]);

    try {
      const { data, error } = await supabase.functions.invoke("generate-roadmap", {
        body: { topic, currentKnowledge },
      });

      if (error) throw error;
      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      setRoadmap(data.roadmap);
      const parsed = parseWeeks(data.roadmap);
      setWeeks(parsed);
      toast({
        title: "Success!",
        description: "Your personalized roadmap is ready with progress tracker 🚀",
      });
    } catch (error) {
      console.error("Error generating roadmap:", error);
      toast({
        title: "Error",
        description: "Failed to generate roadmap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWeekCompletion = (index) => {
    const updated = weeks.map((w, i) =>
      i === index ? { ...w, completed: !w.completed } : w
    );
    setWeeks(updated);
    const done = updated.filter((w) => w.completed).length;
    setProgress((done / updated.length) * 100);
  };

  const handleProjectChange = (index, value) => {
    const updated = [...weeks];
    updated[index].project = value;
    setWeeks(updated);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const formatRoadmap = (text) => {
    if (!text) return null;
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    return lines.map((line, index) => {
      const withLinks = line.replace(
        /(https?:\/\/[^\s]+)/g,
        (url) =>
          `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-primary/80">${url}</a>`
      );

      if (/month\s*\d+/i.test(line)) {
        return (
          <h3
            key={index}
            className="text-2xl font-semibold mt-6 mb-3 text-primary border-b border-border pb-1"
            dangerouslySetInnerHTML={{ __html: withLinks }}
          />
        );
      }

      if (/^[-*•]/.test(line.trim())) {
        return (
          <li
            key={index}
            className="leading-relaxed text-muted-foreground ml-4"
            dangerouslySetInnerHTML={{
              __html: withLinks.replace(/^[-*•]\s*/, ""),
            }}
          />
        );
      }

      return (
        <p
          key={index}
          className="leading-relaxed text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: withLinks }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link
          to="/"
          className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-2 animate-fade-in"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4">
            AI-Powered <span className="text-gradient">Roadmap Generator</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Get a structured roadmap + track progress every week!
          </p>
        </div>

        {/* Input Section */}
        <Card className="p-8 border-border bg-card card-glow mb-8 animate-fade-in">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topic">What do you want to learn?</Label>
              <Input
                id="topic"
                placeholder="e.g., Frontend Development, AI, etc."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="knowledge">What do you already know?</Label>
              <Textarea
                id="knowledge"
                placeholder="e.g., HTML/CSS basics..."
                value={currentKnowledge}
                onChange={(e) => setCurrentKnowledge(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>

            <Button onClick={handleGenerate} disabled={isLoading} size="lg" className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Roadmap
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Peers Section */}
        {matchedPeers.length > 0 && (
          <Card className="p-8 border-border bg-card card-glow mb-8 animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
              <Users className="h-5 w-5" /> Peers Learning {topic}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {matchedPeers.map((peer) => (
                <Card key={peer.id} className="p-4 border border-border/40 bg-background/60">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-lg">{peer.name}</p>
                      <p className="text-sm text-muted-foreground">{peer.city}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1 gap-1">
                        <Mail className="h-3 w-3" /> {peer.email}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Connect</Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* Progress Tracker Card */}
        {weeks.length > 0 && (
          <Card
            className="p-6 border-border bg-card card-glow mb-8 cursor-pointer transition-all"
            onClick={() => setExpanded(!expanded)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Overall Progress: {Math.round(progress)}%</h3>
                <Progress value={progress} className="h-3 mt-2" />
              </div>
              {expanded ? <ChevronUp /> : <ChevronDown />}
            </div>

            {expanded && (
              <div className="mt-6 space-y-4">
                {weeks.map((w, i) => (
                  <div key={i} className="p-4 border border-border/50 rounded-xl bg-background/70">
                    <h4 className="font-semibold mb-2">Week {w.week}: {w.title}</h4>
                    <ul className="ml-6 text-sm text-muted-foreground list-disc">
                      {w.details.map((d, j) => <li key={j}>{d}</li>)}
                    </ul>
                    <div className="mt-3 flex flex-col sm:flex-row items-center gap-3">
                      <Input
                        placeholder="Add project link"
                        value={w.project}
                        onChange={(e) => handleProjectChange(i, e.target.value)}
                      />
                      <Button
                        variant={w.completed ? "default" : "outline"}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWeekCompletion(i);
                        }}
                      >
                        {w.completed ? "✅ Done" : "Mark Done"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* Original AI Roadmap Display */}
        {roadmap && (
          <Card className="p-8 border-border bg-card card-glow animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-primary" /> Full Roadmap
            </h2>
            <div className="prose prose-invert max-w-none space-y-3">
              <ul className="list-disc list-inside space-y-2">
                {formatRoadmap(roadmap)}
              </ul>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RoadmapGenerator;
