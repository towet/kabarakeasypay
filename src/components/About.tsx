import { Shield, Clock, CreditCard, Users, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Streamlined payment process",
      description: "for school fees"
    },
    {
      icon: Clock,
      title: "Convenient cafeteria payments",
      description: "with just a few clicks"
    },
    {
      icon: CreditCard,
      title: "Effortless management",
      description: "of hostel accommodation payments"
    }
  ];

  const stats = [
    { number: "5000+", label: "Active Students", icon: Users },
    { number: "99.9%", label: "Uptime", icon: Target },
    { number: "24/7", label: "Support", icon: Award }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <div className="mb-6">
              <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                Who We Are
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Simplifying Payments for{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Kabarak University
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We are dedicated to providing a unified payment platform for Kabarak University, 
              making it easier for students to manage their school fees, cafeteria payments, 
              and hostel accommodation in one place.
            </p>

            {/* Features List */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 animate-fade-in"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg" className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
              Read More
            </Button>
          </div>

          {/* Right Content - Stats & Visual */}
          <div className="animate-slide-in-right">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white rounded-2xl p-8 shadow-elegant">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Trusted by Students
                  </h3>
                  <p className="text-muted-foreground">
                    Join the growing community of satisfied users
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-6">
                  {stats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className="text-center group hover:scale-110 transition-transform duration-300"
                      style={{ animationDelay: `${1 + index * 0.2}s` }}
                    >
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:animate-pulse-glow">
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-primary mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress Bars */}
                <div className="mt-8 space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Payment Success Rate</span>
                      <span className="text-sm text-primary">99.8%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-primary h-2 rounded-full animate-[fade-in_1s_ease-out]" style={{ width: '99.8%', animationDelay: '1.5s' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Student Satisfaction</span>
                      <span className="text-sm text-accent">98.5%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-to-r from-accent to-accent/80 h-2 rounded-full animate-[fade-in_1s_ease-out]" style={{ width: '98.5%', animationDelay: '1.7s' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-secondary/20 rounded-full animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-pulse-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;