import { CreditCard, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary to-primary-light text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <CreditCard className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Kabarak EasyPay</h3>
                <p className="text-white/80 text-sm">University Payment Hub</p>
              </div>
            </div>
            <p className="text-white/90 mb-6 leading-relaxed">
              Simplifying university payments for Kabarak University students. 
              One platform for all your school fees, cafeteria, and hostel payments.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                'School Fees Payment',
                'Cafeteria Payments', 
                'Hostel Accommodation',
                'Payment History',
                'Support Center',
                'FAQ'
              ].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/80 hover:text-secondary transition-colors hover:translate-x-1 transform inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                'Online Payments',
                'Mobile Money',
                'Bank Transfers',
                'Payment Plans',
                'Receipt Management',
                'Account Management'
              ].map((service) => (
                <li key={service}>
                  <a href="#" className="text-white/80 hover:text-secondary transition-colors hover:translate-x-1 transform inline-block">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white/90 text-sm">
                    Kabarak University<br />
                    Private Bag - 20157<br />
                    Kabarak, Kenya
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <p className="text-white/90 text-sm">+254 51 343 351</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <p className="text-white/90 text-sm">support@kabarakeaspay.ac.ke</p>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="mt-8">
              <h5 className="font-semibold mb-3">Stay Updated</h5>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <button className="px-4 py-2 bg-secondary text-primary font-semibold rounded-lg hover:bg-secondary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/80 text-sm">
            © 2024 Kabarak EasyPay. All rights reserved. | Powered by Kabarak University
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/80 hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/80 hover:text-secondary transition-colors">Terms of Service</a>
            <a href="#" className="text-white/80 hover:text-secondary transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;