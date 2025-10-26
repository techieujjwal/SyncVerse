import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const roadmaps = [
  {
    id: 1,
    title: "Full Stack Web Development",
    duration: "6 months",
    level: "Beginner",
    learners: 1234,
    techs: ["React", "Node.js", "PostgreSQL", "TypeScript"],
    description: "Complete path from HTML/CSS to deploying production apps"
  },
  {
    id: 2,
    title: "Frontend Development",
    duration: "5 months",
    level: "Beginner",
    learners: 892,
    techs: ["React", "Tailwind", "Next.js", "TypeScript"],
    description: "Master modern frontend with React ecosystem and best practices"
  },
  {
    id: 3,
    title: "Backend Engineering",
    duration: "6 months",
    level: "Intermediate",
    learners: 654,
    techs: ["Node.js", "Express", "MongoDB", "Redis"],
    description: "Build scalable APIs and microservices from scratch"
  },
  {
    id: 4,
    title: "Mobile Development",
    duration: "5 months",
    level: "Beginner",
    learners: 543,
    techs: ["React Native", "Expo", "Firebase"],
    description: "Create cross-platform mobile apps for iOS and Android"
  },
  {
    id: 5,
    title: "DevOps & Cloud",
    duration: "6 months",
    level: "Intermediate",
    learners: 432,
    techs: ["Docker", "Kubernetes", "AWS", "Terraform"],
    description: "Master deployment, CI/CD, and cloud infrastructure"
  },
  {
    id: 6,
    title: "AI/ML Engineering",
    duration: "6 months",
    level: "Advanced",
    learners: 789,
    techs: ["Python", "TensorFlow", "PyTorch", "Scikit-learn"],
    description: "Build and deploy machine learning models"
  }
];

const Roadmaps = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto">
        <div className="mb-12 animate-fade-in">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-flex items-center">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold mb-4">
            Learning <span className="text-gradient">Roadmaps</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Structured 5-6 month paths with month-by-month milestones, resources, and peer connections.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map((roadmap, idx) => (
            <Card 
              key={roadmap.id} 
              className="p-6 border-border bg-card hover-lift card-glow group cursor-pointer"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <Badge variant="outline" className="border-primary/30 text-primary">
                  {roadmap.level}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{roadmap.learners}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {roadmap.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {roadmap.description}
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Calendar className="h-4 w-4" />
                <span>{roadmap.duration}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {roadmap.techs.map(tech => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>

              <Button className="w-full group" variant="outline">
                View Roadmap
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmaps;
