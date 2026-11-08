import React, { useState } from 'react';
import { PortfolioConfig, savePortfolioConfig, resetPortfolioConfig } from '../data/portfolioConfig';

interface ConfigEditorModalProps {
  isOpen: boolean;
  config: PortfolioConfig;
  onClose: () => void;
  onSave: (newConfig: PortfolioConfig) => void;
}

export const ConfigEditorModal: React.FC<ConfigEditorModalProps> = ({
  isOpen,
  config,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<PortfolioConfig>(config);
  const [activeTab, setActiveTab] = useState<'personal' | 'about' | 'projects' | 'contact'>('personal');

  if (!isOpen) return null;

  const handlePersonalChange = (field: keyof typeof formData.personal, value: string) => {
    setFormData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    savePortfolioConfig(formData);
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    if (window.confirm("Reset all customizations to default configuration?")) {
      resetPortfolioConfig();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#030303]/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col bg-[#080204] border border-[#A30A19] shadow-[0_0_50px_rgba(163,10,25,0.4)]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#A30A19]">
              DEVELOPER SETTINGS
            </div>
            <h2 className="font-heading text-xl text-white font-bold">
              Portfolio Configuration Store
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-[#A30A19] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-white/10 px-6 font-mono text-xs">
          <button
            onClick={() => setActiveTab('personal')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'personal'
                ? 'border-[#A30A19] text-white'
                : 'border-transparent text-[#929292] hover:text-white'
            }`}
          >
            Personal Brand
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'about'
                ? 'border-[#A30A19] text-white'
                : 'border-transparent text-[#929292] hover:text-white'
            }`}
          >
            About & Bio
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'contact'
                ? 'border-[#A30A19] text-white'
                : 'border-transparent text-[#929292] hover:text-white'
            }`}
          >
            Social & Contact
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-grow font-mono text-xs">
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[#929292] mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.personal.fullName}
                  onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-white/15 text-white focus:border-[#A30A19] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#929292] mb-1">Hero Display Text (Background Anton Watermark)</label>
                <input
                  type="text"
                  value={formData.personal.heroDisplayText}
                  onChange={(e) => handlePersonalChange('heroDisplayText', e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-white/15 text-white focus:border-[#A30A19] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#929292] mb-1">Monogram</label>
                <input
                  type="text"
                  value={formData.personal.monogram}
                  onChange={(e) => handlePersonalChange('monogram', e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-white/15 text-white focus:border-[#A30A19] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#929292] mb-1">Main Tagline</label>
                <textarea
                  value={formData.personal.tagline}
                  onChange={(e) => handlePersonalChange('tagline', e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-white/15 text-white focus:border-[#A30A19] focus:outline-none"
                  rows={2}
                />
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[#929292] mb-1">About Heading</label>
                <input
                  type="text"
                  value={formData.about.heading}
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      about: { ...prev.about, heading: e.target.value }
                    }))
                  }
                  className="w-full px-3 py-2 bg-black border border-white/15 text-white focus:border-[#A30A19] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#929292] mb-1">Introduction Paragraph 1</label>
                <textarea
                  value={formData.about.introParagraph1}
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      about: { ...prev.about, introParagraph1: e.target.value }
                    }))
                  }
                  rows={3}
                  className="w-full px-3 py-2 bg-black border border-white/15 text-white focus:border-[#A30A19] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#929292] mb-1">Supporting Tagline</label>
                <input
                  type="text"
                  value={formData.about.tagline}
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      about: { ...prev.about, tagline: e.target.value }
                    }))
                  }
                  className="w-full px-3 py-2 bg-black border border-white/15 text-white focus:border-[#A30A19] focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[#929292] mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.personal.email}
                  onChange={(e) => handlePersonalChange('email', e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-white/15 text-white focus:border-[#A30A19] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#929292] mb-1">LinkedIn Profile URL</label>
                <input
                  type="text"
                  value={formData.personal.linkedin}
                  onChange={(e) => handlePersonalChange('linkedin', e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-white/15 text-white focus:border-[#A30A19] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#929292] mb-1">GitHub Profile URL</label>
                <input
                  type="text"
                  value={formData.personal.github}
                  onChange={(e) => handlePersonalChange('github', e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-white/15 text-white focus:border-[#A30A19] focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="text-xs text-red-400 hover:text-red-300 underline font-mono cursor-pointer"
          >
            Reset to Defaults
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-white/20 text-white font-mono text-xs hover:border-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-[#A30A19] hover:bg-[#c20c1f] text-white font-mono text-xs tracking-wider transition-colors cursor-pointer"
            >
              Save Overrides
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
