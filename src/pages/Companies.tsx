import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Search, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const companies = [
  {
    id: 1,
    name: "Mozilla",
    logo: "🦊",
    description: "Building the open web with Firefox and related tools",
    githubUrl: "https://github.com/mozilla",
    techStacks: ["Rust", "JavaScript", "C++", "Python"],
    gsocYears: ["2024", "2023", "2022", "2021"],
    projects: 15
  },
  {
    id: 2,
    name: "TensorFlow",
    logo: "🧠",
    description: "Open-source machine learning framework by Google",
    githubUrl: "https://github.com/tensorflow",
    techStacks: ["Python", "C++", "JavaScript"],
    gsocYears: ["2024", "2023", "2022"],
    projects: 12
  },
  {
    id: 3,
    name: "Kubernetes",
    logo: "☸️",
    description: "Container orchestration platform",
    githubUrl: "https://github.com/kubernetes",
    techStacks: ["Go", "Python", "Shell"],
    gsocYears: ["2024", "2023", "2022", "2021"],
    projects: 20
  },
  {
    id: 4,
    name: "Apache Software Foundation",
    logo: "🪶",
    description: "Supporting open-source software projects",
    githubUrl: "https://github.com/apache",
    techStacks: ["Java", "Python", "C++", "Scala"],
    gsocYears: ["2024", "2023", "2022", "2021", "2020"],
    projects: 50
  },
  {
    id: 5,
    name: "Python Software Foundation",
    logo: "🐍",
    description: "Advancing Python and its ecosystem",
    githubUrl: "https://github.com/python",
    techStacks: ["Python", "C"],
    gsocYears: ["2024", "2023", "2022", "2021"],
    projects: 18
  },
  {
    id: 6,
    name: "CNCF",
    logo: "☁️",
    description: "Cloud Native Computing Foundation projects",
    githubUrl: "https://github.com/cncf",
    techStacks: ["Go", "Rust", "JavaScript", "Python"],
    gsocYears: ["2024", "2023", "2022"],
    projects: 25
  },
  {
    id: 7,
    name: "Wikimedia Foundation",
    logo: "📖",
    description: "Maintaining Wikipedia and sister projects",
    githubUrl: "https://github.com/wikimedia",
    techStacks: ["PHP", "JavaScript", "Python"],
    gsocYears: ["2024", "2023", "2022", "2021", "2020"],
    projects: 22
  },
  {
    id: 8,
    name: "Git",
    logo: "📦",
    description: "Distributed version control system",
    githubUrl: "https://github.com/git",
    techStacks: ["C", "Shell", "Perl"],
    gsocYears: ["2024", "2023", "2022"],
    projects: 8
  }
];

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStack, setSelectedStack] = useState<string | null>(null);

  const allTechStacks = Array.from(new Set(companies.flatMap(c => c.techStacks)));

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStack = !selectedStack || company.techStacks.includes(selectedStack);
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
            GSOC <span className="text-gradient">Organizations</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            Explore organizations participating in GSOC. Filter by tech stack to find companies matching your skills.
          </p>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search organizations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company, idx) => (
            <Card
              key={company.id}
              className="p-6 border-border bg-card hover-lift card-glow"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{company.logo}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{company.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {company.projects} active projects
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {company.description}
              </p>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Tech Stack:</p>
                <div className="flex flex-wrap gap-2">
                  {company.techStacks.map(tech => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">GSOC Participation:</p>
                <div className="flex flex-wrap gap-2">
                  {company.gsocYears.map(year => (
                    <Badge key={year} variant="outline" className="text-xs border-primary/30">
                      {year}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <a href={company.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button className="flex-1">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Projects
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;
