import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Search, Calendar, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const programs = [
  {
    id: 1,
    name: "Google Summer of Code",
    shortName: "GSOC",
    logo: "🌟", // Placeholder for logo
    stipend: "$3000 - $6000",
    duration: "12 weeks",
    deadline: "April 2025",
    techStacks: ["Python", "JavaScript", "Go", "Rust", "C++"],
    description: "Work with open-source organizations on meaningful projects",
    difficulty: "Medium"
  },
  {
    id: 2,
    name: "MLH Fellowship",
    shortName: "MLH",
    logo: "🏆",
    stipend: "$5000",
    duration: "12 weeks",
    deadline: "Rolling",
    techStacks: ["React", "Node.js", "Python", "DevOps"],
    description: "Remote internship alternative for aspiring technologists",
    difficulty: "Medium"
  },
  {
    id: 3,
    name: "Outreachy",
    shortName: "Outreachy",
    logo: "🌍",
    stipend: "$7000",
    duration: "13 weeks",
    techStacks: ["Python", "Ruby", "JavaScript", "Rust"],
    deadline: "January 2025",
    description: "Internships in open source and open science",
    difficulty: "Medium"
  },
  {
    id: 4,
    name: "Linux Foundation Mentorship",
    shortName: "LF Mentorship",
    logo: "🐧",
    stipend: "$3000 - $6000",
    duration: "12 weeks",
    deadline: "March 2025",
    techStacks: ["Linux", "Kubernetes", "Go", "C"],
    description: "Mentorship programs across LF projects",
    difficulty: "Hard"
  },
  {
    id: 5,
    name: "Season of KDE",
    shortName: "SoK",
    logo: "💙",
    stipend: "Volunteer",
    duration: "3 months",
    deadline: "December 2024",
    techStacks: ["C++", "Qt", "QML", "Python"],
    description: "Contribute to KDE community projects",
    difficulty: "Easy"
  },
  {
    id: 6,
    name: "GitHub Externship",
    shortName: "GitHub",
    logo: "🐙",
    stipend: "$6000",
    duration: "10 weeks",
    deadline: "February 2025",
    techStacks: ["JavaScript", "TypeScript", "Ruby", "Go"],
    description: "Work on GitHub's open-source projects",
    difficulty: "Hard"
  }
];

const Programs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStack, setSelectedStack] = useState<string | null>(null);

  const allTechStacks = Array.from(new Set(programs.flatMap(p => p.techStacks)));

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStack = !selectedStack || program.techStacks.includes(selectedStack);
    return matchesSearch && matchesStack;
  });

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto">
        <div className="mb-12 animate-fade-in">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-flex items-center">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold mb-4">
            Top <span className="text-gradient">Internship Programs</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            Discover prestigious programs like GSOC, MLH, and more. Filter by your tech stack and get structured prep roadmaps.
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tech Stack Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge
              variant={selectedStack === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedStack(null)}
            >
              All Stacks
            </Badge>
            {allTechStacks.map(stack => (
              <Badge
                key={stack}
                variant={selectedStack === stack ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedStack(stack)}
              >
                {stack}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredPrograms.map((program, idx) => (
            <Card
              key={program.id}
              className="p-6 border-border bg-card hover-lift card-glow"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{program.logo}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">{program.name}</h3>
                      <p className="text-sm text-muted-foreground">{program.shortName}</p>
                    </div>
                    <Badge variant="outline" className={
                      program.difficulty === "Easy" ? "border-green-500/30 text-green-500" :
                      program.difficulty === "Medium" ? "border-yellow-500/30 text-yellow-500" :
                      "border-red-500/30 text-red-500"
                    }>
                      {program.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {program.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span>{program.stipend}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{program.duration}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Deadline: {program.deadline}</p>
                <div className="flex flex-wrap gap-2">
                  {program.techStacks.map(tech => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" variant="outline">
                  View Prep Guide
                </Button>
                <Button className="flex-1">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Apply
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Programs;
