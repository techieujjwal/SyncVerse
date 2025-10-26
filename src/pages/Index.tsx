import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code2, Users, Rocket, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-gradient">TechPath</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/roadmaps" className="text-sm hover:text-primary transition-colors">
              Roadmaps
            </Link>
            <Link to="/programs" className="text-sm hover:text-primary transition-colors">
              Programs
            </Link>
            <Link to="/companies" className="text-sm hover:text-primary transition-colors">
              Companies
            </Link>
            <Button variant="default" size="sm">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 animate-fade-in">
            <span className="text-sm text-primary">🚀 Your Tech Journey Starts Here</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
            Master Tech with <br />
            <span className="text-gradient glow-text">Structured Learning</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            From roadmaps to internships, connect with peers and accelerate your tech career with AI-powered guidance.
          </p>
          <div className="flex gap-4 justify-center animate-fade-in">
            <Button size="lg" className="group">
              Explore Roadmaps
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              View Programs
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-8 border-border bg-card hover-lift card-glow group">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Structured Roadmaps</h3>
              <p className="text-muted-foreground">
                Month-by-month learning paths with curated resources for every tech stack.
              </p>
            </Card>

            <Card className="p-8 border-border bg-card hover-lift card-glow group">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Peer Learning</h3>
              <p className="text-muted-foreground">
                Connect with students learning the same stack. Study together, build together.
              </p>
            </Card>

            <Card className="p-8 border-border bg-card hover-lift card-glow group">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Top Internships</h3>
              <p className="text-muted-foreground">
                GSOC, MLH, and more. Find programs matching your tech stack with prep guides.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="p-12 text-center bg-gradient-to-br from-primary/10 via-card to-card border-primary/20 card-glow">
            <h2 className="text-4xl font-bold mb-4">
              Ready to <span className="text-gradient">Level Up</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of students already accelerating their tech journey with structured learning and peer support.
            </p>
            <Button size="lg" className="group">
              Start Learning Today
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
