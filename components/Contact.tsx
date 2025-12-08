import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-secondary rounded-2xl border border-white/5 overflow-hidden flex flex-col md:flex-row">
          
          {/* Contact Info */}
          <div className="w-full md:w-2/5 p-8 md:p-12 bg-gradient-to-br from-gray-800 to-gray-900">
            <h2 className="text-3xl font-bold text-white mb-6">Let's Connect</h2>
            <p className="text-gray-400 mb-12 leading-relaxed">
              I'm currently available for full-time roles or freelance projects. 
              If you have a project in mind or just want to say hi, feel free to reach out.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/5 rounded-lg text-accent">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-300">Email</h4>
                  <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-white hover:text-accent transition-colors">
                    {SOCIAL_LINKS.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/5 rounded-lg text-accent">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-300">Phone</h4>
                  <a href={`tel:${SOCIAL_LINKS.phone}`} className="text-white hover:text-accent transition-colors">
                    {SOCIAL_LINKS.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/5 rounded-lg text-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-300">Location</h4>
                  <span className="text-white">{SOCIAL_LINKS.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <a href={`https://${SOCIAL_LINKS.github}`} className="p-3 bg-white/5 rounded-full hover:bg-accent hover:text-primary text-white transition-all">
                <Github size={20} />
              </a>
              <a href={`https://${SOCIAL_LINKS.linkedin}`} className="p-3 bg-white/5 rounded-full hover:bg-accent hover:text-primary text-white transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="w-full md:w-3/5 p-8 md:p-12 bg-secondary">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <input type="text" id="name" className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input type="email" id="email" className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" placeholder="john@example.com" />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                <input type="text" id="subject" className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" placeholder="Project Inquiry" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea id="message" rows={4} className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none" placeholder="Tell me about your project..."></textarea>
              </div>

              <button type="submit" className="w-full bg-accent text-primary font-bold py-4 rounded-lg hover:bg-accent/90 transition-colors">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
      
      <div className="text-center text-gray-600 text-sm mt-20 pb-4">
        © {new Date().getFullYear()} Anurag Patial. Built with React & Tailwind.
      </div>
    </section>
  );
};

export default Contact;