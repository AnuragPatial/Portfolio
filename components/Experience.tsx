import React from 'react';
import { EXPERIENCE_DATA } from '../constants';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Professional Experience</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="relative border-l border-gray-700 ml-3 md:ml-6 space-y-12">
          {EXPERIENCE_DATA.map((exp) => (
            <div key={exp.id} className="relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <div className="absolute -left-1.5 top-2 h-3 w-3 rounded-full bg-accent border border-primary shadow-[0_0_0_4px_rgba(56,189,248,0.2)]"></div>
              
              <div className="bg-secondary rounded-xl p-6 border border-white/5 hover:border-accent/30 transition-all duration-300 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <div className="text-accent font-medium text-lg">{exp.company}</div>
                  </div>
                  <div className="flex flex-col md:items-end mt-2 md:mt-0 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin size={14} />
                      {exp.location}
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 flex-shrink-0" />
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;