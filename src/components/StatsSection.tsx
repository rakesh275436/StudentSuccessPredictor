import { useEffect, useState } from "react";
import { Target, Users, TrendingUp, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    icon: Target,
    value: 94.8,
    suffix: "%",
    label: "Prediction Accuracy",
    color: "text-primary",
  },
  {
    icon: Users,
    value: 1250,
    suffix: "+",
    label: "Students Analyzed",
    color: "text-secondary",
  },
  {
    icon: TrendingUp,
    value: 89,
    suffix: "%",
    label: "Improvement Rate",
    color: "text-accent",
  },
];

const testimonials = [
  {
    name: "Prof. Sarah Johnson",
    role: "Department Head, Computer Science",
    content: "This tool has transformed how we identify at-risk students. The predictions are remarkably accurate and the recommendations are actionable.",
    rating: 5,
  },
  {
    name: "Dr. Michael Chen",
    role: "Academic Coordinator",
    content: "The AI-powered insights help us intervene early and provide targeted support. Our pass rates have improved significantly.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Student Counselor",
    content: "Finally, a tool that combines data with meaningful recommendations. It's become an essential part of our student success program.",
    rating: 5,
  },
];

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 2000;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end]);

  return (
    <span className="text-4xl md:text-5xl font-bold">
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      {/* Stats Grid */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Proven Results
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered predictions help educators make data-driven decisions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)] hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardContent className="relative z-10 p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                
                <div className={`mb-2 ${stat.color}`}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            What Educators Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by educators and institutions worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden backdrop-blur-sm bg-card/50 border-border/50 hover:border-secondary/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(var(--secondary)/0.3)] hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardContent className="relative z-10 p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-accent text-accent"
                    />
                  ))}
                </div>
                
                <p className="text-sm text-foreground mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
