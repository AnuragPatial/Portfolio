import React from 'react';
import { SKILLS_DATA, EDUCATION_DATA } from '../constants';
import { CheckCircle2, GraduationCap } from 'lucide-react';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Skills Column */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-accent rounded-full"></span>
              Technical Skills
            </h2>
            <div className="space-y-8">
              {SKILLS_DATA.map((category) => (
                <div key={category.category} className="bg-secondary p-6 rounded-xl border border-white/5">
                  <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2 bg-primary px-3 py-2 rounded-lg border border-gray-700 text-sm text-gray-300 hover:border-accent hover:text-accent transition-colors cursor-default">
                        <CheckCircle2 size={14} className="text-accent" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
             <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-accent rounded-full"></span>
              Education
            </h2>
            <div className="space-y-6">
              {EDUCATION_DATA.map((edu, index) => (
                <div key={index} className="flex gap-4">
                   <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                         <GraduationCap size={20} />
                      </div>
                      {index !== EDUCATION_DATA.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-800 my-2"></div>
                      )}
                   </div>
                   <div className="pb-8">
                      <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                      <div className="text-accent">{edu.institution}</div>
                      <div className="flex gap-4 text-sm text-gray-500 mt-1">
                        <span>{edu.year}</span>
                        <span>•</span>
                        <span className="text-gray-400 font-medium">{edu.score}</span>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;