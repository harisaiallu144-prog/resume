import React, { useState } from 'react';
import { PortfolioConfig } from '../data/portfolioConfig';

interface ContactProps {
  config: PortfolioConfig;
}

export const Contact: React.FC<ContactProps> = ({ config }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (formErrors[e.target.name]) {
      setFormErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) errors.name = 'Please provide your name';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errors.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errors.message = 'Please write a message with at least 10 characters';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Client-side validated submission confirmation
    setSubmitStatus('success');
  };

  return (
    <section id="contact" className="relative py-32 bg-[#030303] border-t border-white/10 overflow-hidden">
      {/* Background radial crimson wash */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#A30A19]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-sm tracking-[0.3em] text-[#A30A19]">
            [{config.contact.sectionNumber}]
          </span>
          <div className="h-[1px] w-12 bg-[#A30A19]" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#929292]">
            Get In Touch
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Heading, Subtitle & Direct Links */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase leading-[1.08] mb-6">
                LET&apos;S BUILD <span className="text-[#A30A19]">SOMETHING</span> EXTRAORDINARY.
              </h2>
              <p className="text-[#929292] font-sans text-base leading-relaxed mb-12">
                {config.contact.subtitle}
              </p>

              {/* Direct Reachout Channels */}
              <div className="space-y-6 border-t border-white/10 pt-8">
                {config.contact.social.map((item) => (
                  <div key={item.platform} className="group">
                    <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#929292] mb-1">
                      {item.platform}
                    </div>
                    <a
                      href={item.url}
                      target={item.platform === 'Email' ? undefined : '_blank'}
                      rel="noreferrer"
                      className="font-heading text-lg text-white hover:text-[#ff334b] transition-colors flex items-center gap-2"
                    >
                      <span>{item.label}</span>
                      <span className="text-xs text-[#A30A19] group-hover:translate-x-1 transition-transform">↗</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 text-xs font-mono text-[#929292]">
              DIRECT INBOX: <a href={`mailto:${config.personal.email}`} className="text-[#A30A19] underline">{config.personal.email}</a>
            </div>
          </div>

          {/* Right Column: Minimal Validated Contact Form */}
          <div className="lg:col-span-7 bg-[#070102] border border-white/10 p-8 md:p-12 relative">
            <h3 className="font-heading text-xl text-white font-bold tracking-tight uppercase mb-8">
              SEND DIRECT MESSAGE
            </h3>

            {submitStatus === 'success' ? (
              <div className="p-8 border border-[#A30A19] bg-[#A30A19]/10 text-center space-y-4">
                <div className="font-display text-2xl text-white tracking-wider">
                  MESSAGE READY TO DISPATCH
                </div>
                <p className="text-sm font-sans text-[#b5b5b5] max-w-md mx-auto">
                  Thank you for reaching out, <span className="text-white font-medium">{formData.name}</span>!
                  This demonstration verifies your message inputs client-side. To deliver this directly to Allu Kumarswami right now:
                </p>
                <div className="pt-2">
                  <a
                    href={`mailto:${config.personal.email}?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#A30A19] text-white font-mono text-xs uppercase tracking-widest hover:bg-[#c20c1f] transition-colors"
                  >
                    Open in Your Email Client ↗
                  </a>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitStatus('idle');
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="text-xs font-mono text-[#929292] hover:text-white underline"
                  >
                    Send another note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[#929292] mb-2">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Maya Chen"
                    className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white placeholder-white/20 font-sans text-sm focus:border-[#A30A19] focus:outline-none transition-colors"
                  />
                  {formErrors.name && (
                    <p className="text-xs text-[#ff334b] font-mono mt-1">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[#929292] mb-2">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="maya@example.com"
                    className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white placeholder-white/20 font-sans text-sm focus:border-[#A30A19] focus:outline-none transition-colors"
                  />
                  {formErrors.email && (
                    <p className="text-xs text-[#ff334b] font-mono mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[#929292] mb-2">
                    PROJECT / MESSAGE DETAILS
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your idea, collaboration opportunity, or project..."
                    className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white placeholder-white/20 font-sans text-sm focus:border-[#A30A19] focus:outline-none transition-colors resize-none"
                  />
                  {formErrors.message && (
                    <p className="text-xs text-[#ff334b] font-mono mt-1">{formErrors.message}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 border border-[#A30A19] bg-[#A30A19]/20 hover:bg-[#A30A19] hover:shadow-[0_0_30px_rgba(163,10,25,0.6)] text-white font-mono text-xs uppercase tracking-[0.25em] transition-all duration-300 cursor-pointer"
                  >
                    SEND MESSAGE →
                  </button>
                  <div className="text-[10px] font-mono text-[#929292] text-center mt-3">
                    Validated client-side submission with instant mailto handoff.
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
