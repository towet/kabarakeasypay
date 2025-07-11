import { GraduationCap, Coffee, Home, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      icon: GraduationCap,
      title: "School Fees Payment",
      description: "Easily pay your school fees in one place, ensuring a seamless and hassle-free experience.",
      features: [
        "Secure online payments",
        "Payment history tracking",
        "Automatic receipts",
        "Installment options"
      ],
      color: "from-primary to-primary-light",
      delay: "0.2s"
    },
    {
      icon: Coffee,
      title: "Cafeteria Payments",
      description: "Enjoy quick and convenient payments for your meals at the cafeteria, all within the same platform.",
      features: [
        "Quick meal payments",
        "Pre-order capabilities",
        "Digital wallet top-up",
        "Meal plan management"
      ],
      color: "from-secondary to-secondary/80",
      delay: "0.4s"
    },
    {
      icon: Home,
      title: "Hostel Accommodation",
      description: "Manage and pay for your hostel accommodation effortlessly, ensuring a comfortable stay on campus.",
      features: [
        "Room booking system",
        "Accommodation payments",
        "Maintenance requests",
        "Utility bill management"
      ],
      color: "from-accent to-accent/80",
      delay: "0.6s"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our <span className="bg-gradient-primary bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need for your university payments, all in one convenient platform
          </p>
        </div>

        {/* Services Grid */}
        <div className="flex flex-col gap-8 mb-16 lg:grid lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative bg-gradient-card rounded-2xl p-8 shadow-card hover:shadow-elegant transition-all duration-500 hover:scale-105 animate-fade-in"
              style={{ animationDelay: service.delay }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse-glow`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary transition-all">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-float"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-primary rounded-2xl p-8 text-center shadow-glow">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to simplify your university payments?
            </h3>
            <p className="text-white/90 mb-6">
              Join thousands of students already using Kabarak EasyPay
            </p>
            <Button variant="secondary" size="lg" className="font-semibold">
              Get Started Today
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;