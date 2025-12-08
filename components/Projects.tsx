import React from 'react';
import { PROJECTS_DATA } from '../constants';
import { ExternalLink, Github, Layers } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-400">A collection of projects demonstrating my technical capabilities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project) => (
            <div key={project.id} className="group bg-secondary rounded-xl border border-white/5 overflow-hidden hover:border-accent/40 transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                <Layers size={48} className="text-gray-600 group-hover:text-accent transition-colors duration-300" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="p-2 bg-white rounded-full text-primary hover:bg-accent transition-colors">
                    <Github size={20} />
                  </button>
                  <button className="p-2 bg-white rounded-full text-primary hover:bg-accent transition-colors">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-2 py-1 text-xs font-medium rounded bg-accent/10 text-accent border border-accent/20">
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="space-y-2 mt-auto">
                  {project.description.slice(0, 3).map((desc, i) => ( // Limit to 3 bullets for card height consistency
                    <li key={i} className="text-gray-400 text-sm line-clamp-2">
                       • {desc}
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

export default Projects;