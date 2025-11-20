import { Github, Instagram, Linkedin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const teamMembers = [
  {
    name: "Anubhab Pradhan",
    role: "Lead Developer & ML Engineer",
    description: "Specializes in ML model development, backend architecture, and predictive analytics.",
    github: "#",
    instagram: "#",
    linkedin: "#",
  },
  {
    name: "Rakesh Ranjan",
    role: "Full Stack Developer & UI/UX Designer",
    description: "Expert in frontend design, intuitive UI, and ML dashboards.",
    github: "#",
    instagram: "#",
    linkedin: "#",
  },
];

export function TeamSection() {
  return (
    <section className="py-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Meet Our Team
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Passionate developers building AI-driven student performance tools.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {teamMembers.map((member, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)] hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                {member.name}
              </CardTitle>
              <CardDescription className="text-base font-medium text-secondary">
                {member.role}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <p className="text-muted-foreground mb-6">
                {member.description}
              </p>
              
              <div className="flex gap-4">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)]"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted/50 hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_-5px_hsl(var(--secondary)/0.5)]"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted/50 hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_-5px_hsl(var(--accent)/0.5)]"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
