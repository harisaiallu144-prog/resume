/**
 * Allu Kumarswami | Cinematic 3D Particle Portfolio
 *
 * Production WebGL & React Application
 */

import React, { useState, useCallback } from 'react';
import { getPortfolioConfig, PortfolioConfig } from './data/portfolioConfig';
import { Navbar } from './components/Navbar';
import { HeroScene } from './components/HeroScene';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Journey } from './components/Journey';
import { Philosophy } from './components/Philosophy';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ConfigEditorModal } from './components/ConfigEditorModal';

export default function App() {
  const [config, setConfig] = useState<PortfolioConfig>(getPortfolioConfig);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  const handleExploreClick = useCallback(() => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-[#A30A19] selection:text-white">
      <Navbar
        config={config}
        onEditConfigClick={() => setIsConfigModalOpen(true)}
      />

      {/* Section 00: Main Hero */}
      <section id="home">
        <HeroScene
          config={config}
          onExploreClick={handleExploreClick}
        />
      </section>

        {/* Section 01: About Me */}
        <About config={config} />

        {/* Section 02: Technical Skills */}
        <Skills config={config} />

        {/* Section 04: Featured Projects */}
        <Projects config={config} />

        {/* Section 05: Journey & Experience */}
        <Journey config={config} />

        {/* Section 06: Personal Philosophy */}
        <Philosophy config={config} />

        {/* Section 07: Contact */}
        <Contact config={config} />

        {/* Section 18: Footer */}
        <Footer config={config} />

        {/* Developer Personal Information Configuration Modal */}
        <ConfigEditorModal
          isOpen={isConfigModalOpen}
          config={config}
          onClose={() => setIsConfigModalOpen(false)}
          onSave={(newConf) => setConfig(newConf)}
        />
    </div>
  );
}
