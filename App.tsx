import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ResumeChat from './components/ResumeChat';

const App: React.FC = () => {
  return (
    <div className="antialiased text-slate-400 bg-primary selection:bg-accent selection:text-primary">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <ResumeChat />
    </div>
  );
};

export default App;