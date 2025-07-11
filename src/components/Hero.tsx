import { ArrowRight, CreditCard, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import schoolFeesImg from "@/assets/school-fees.jpg";
import cafeteriaImg from "@/assets/cafeteria.jpg";
import hostelImg from "@/assets/hostel.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-accent rounded-full mix-blend-multiply animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-secondary rounded-full mix-blend-multiply animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6 animate-fade-in">
              <span className="inline-block bg-secondary/20 backdrop-blur-sm text-secondary px-4 py-2 rounded-full text-sm font-semibold border border-secondary/30">
                🎓 Kabarak University Official Platform
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Welcome to{' '}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Kabarak EasyPay
              </span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Pay all your bills at one place. A unified payment platform designed for Kabarak University students - streamlined, secure, and simple.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Button 
                size="lg" 
                className="group bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => window.location.href = '/auth'}
              >
                Get Started Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="glass" size="lg">
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap gap-6 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center gap-2 text-white/80">
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-sm">Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Zap className="w-5 h-5 text-secondary" />
                <span className="text-sm">Instant Processing</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <CreditCard className="w-5 h-5 text-accent" />
                <span className="text-sm">Multiple Payment Options</span>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Card */}
          <div className="flex justify-center lg:justify-end animate-slide-in-right">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-glow max-w-md animate-float">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">All-in-One Platform</h3>
                  <p className="text-white/80 text-sm mb-6">
                    School fees, cafeteria, hostel - everything in one secure dashboard
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <img src={schoolFeesImg} alt="School Fees" className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-white text-sm">School Fees</span>
                      </div>
                      <span className="text-accent text-sm font-semibold">✓ Available</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <img src={cafeteriaImg} alt="Cafeteria" className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-white text-sm">Cafeteria</span>
                      </div>
                      <span className="text-accent text-sm font-semibold">✓ Available</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <img src={hostelImg} alt="Hostel" className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-white text-sm">Hostel</span>
                      </div>
                      <span className="text-accent text-sm font-semibold">✓ Available</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-secondary rounded-full animate-pulse-glow"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-accent rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L50 105C100 90 200 60 300 45C400 30 500 30 600 37.5C700 45 800 60 900 67.5C1000 75 1100 75 1150 75L1200 75V120H1150C1100 120 1000 120 900 120C800 120 700 120 600 120C500 120 400 120 300 120C200 120 100 120 50 120H0V120Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;