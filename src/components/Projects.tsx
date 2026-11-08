import React, { useState } from 'react';
import { PortfolioConfig, ProjectItem } from '../data/portfolioConfig';

interface ProjectsProps {
  config: PortfolioConfig;
}

export const Projects: React.FC<ProjectsProps> = ({ config }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Interactive Project Simulator State
  const [voterAge, setVoterAge] = useState<number>(20);
  const [calcExpr, setCalcExpr] = useState<string>('12 * 8 + 4');
  const [calcResult, setCalcResult] = useState<string>('100');
  const [atmBalance, setAtmBalance] = useState<number>(10000);
  const [atmAmount, setAtmAmount] = useState<number>(1500);
  const [atmLog, setAtmLog] = useState<string[]>(['Account initialized with ₹10,000 balance']);
  const [gradeMarks, setGradeMarks] = useState<number[]>([88, 92, 79, 95]);

  const handleAtmWithdraw = () => {
    if (atmAmount <= 0) return;
    if (atmAmount > atmBalance) {
      setAtmLog(prev => [`Insufficient funds: Cannot withdraw ₹${atmAmount}`, ...prev]);
    } else {
      const newBal = atmBalance - atmAmount;
      setAtmBalance(newBal);
      setAtmLog(prev => [`Success: Dispensed ₹${atmAmount}. Remaining: ₹${newBal}`, ...prev]);
    }
  };

  const handleCalcEval = () => {
    try {
      // Safe sanitized arithmetic evaluation for standard digits and operators
      const sanitized = calcExpr.replace(/[^0-9+\-*/.()]/g, '');
      // eslint-disable-next-line no-new-func
      const res = Function(`'use strict'; return (${sanitized})`)();
      setCalcResult(String(res));
    } catch {
      setCalcResult('Error in expression');
    }
  };

  const calculateGrade = () => {
    const avg = gradeMarks.reduce((a, b) => a + b, 0) / gradeMarks.length;
    let grade = 'F';
    if (avg >= 90) grade = 'A+ (Outstanding)';
    else if (avg >= 80) grade = 'A (Excellent)';
    else if (avg >= 70) grade = 'B (Good)';
    else if (avg >= 60) grade = 'C (Satisfactory)';
    else if (avg >= 50) grade = 'D (Pass)';
    return { avg: avg.toFixed(1), grade };
  };

  return (
    <section id="projects" className="relative py-32 bg-[#030303] border-t border-white/10 overflow-hidden">
      {/* Ambient crimson lighting */}
      <div className="absolute left-1/4 top-1/2 w-96 h-96 bg-[#A30A19]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-sm tracking-[0.3em] text-[#A30A19]">
            [{config.projects.sectionNumber}]
          </span>
          <div className="h-[1px] w-12 bg-[#A30A19]" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#929292]">
            Selected Works
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase leading-[1.08] mb-20 max-w-4xl">
          IDEAS TURNED <span className="text-[#A30A19]">INTO</span> PROJECTS.
        </h2>

        {/* Asymmetric 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {config.projects.items.map((project, idx) => {
            // Asymmetric spans: 01 & 04 are 7-col, 02 & 03 are 5-col
            const colSpan = idx % 3 === 0 ? 'lg:col-span-7' : 'lg:col-span-5';

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`${colSpan} group cursor-pointer flex flex-col justify-between border border-white/10 bg-[#070102]/60 hover:border-[#A30A19] transition-all duration-500 overflow-hidden relative`}
              >
                {/* Large Rectangular Project Image Container */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/60">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 group-hover:brightness-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80" />

                  {/* Project Number Watermark */}
                  <div className="absolute top-4 left-4 font-display text-3xl md:text-4xl text-white/40 group-hover:text-[#A30A19] transition-colors">
                    {project.number}
                  </div>

                  {/* Top-Right Category Label */}
                  <div className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#929292] bg-black/70 px-2.5 py-1 border border-white/10">
                    {project.category}
                  </div>
                </div>

                {/* Project Details Footer */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-[#ff334b] transition-colors">
                        {project.title}
                      </h3>
                      {/* Animated Arrow Icon */}
                      <span className="font-mono text-sm text-[#929292] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                        ↗
                      </span>
                    </div>

                    <p className="text-[#929292] font-sans text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Unboxed Metadata */}
                  <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                    <div className="flex items-center gap-2 text-[#b5b5b5]">
                      {project.techStack.map((tech, tIdx) => (
                        <span key={tech} className="flex items-center gap-2">
                          {tIdx > 0 && <span className="text-[#A30A19]">·</span>}
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>

                    <span className="text-[#A30A19] group-hover:underline text-[11px] uppercase tracking-wider">
                      Launch Simulation →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Inspector & Interactive Simulator Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#030303]/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0204] border border-[#A30A19] shadow-[0_0_50px_rgba(163,10,25,0.4)] p-6 md:p-10">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6 mb-8">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#A30A19] mb-1">
                  PROJECT {selectedProject.number} // {selectedProject.category}
                </div>
                <h3 className="font-heading text-2xl md:text-4xl text-white font-bold tracking-tight">
                  {selectedProject.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white hover:text-[#A30A19] hover:border-[#A30A19] transition-colors cursor-pointer text-lg"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
              <div className="md:col-span-6">
                <div className="aspect-[16/10] overflow-hidden border border-white/10 mb-4">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[#b5b5b5] font-sans text-sm leading-relaxed mb-4">
                  {selectedProject.longDescription}
                </p>

                <div className="space-y-2 text-xs font-mono text-[#929292]">
                  <div className="text-white font-medium">Core Highlights:</div>
                  {selectedProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[#A30A19]">▹</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Logic Simulation Sandbox */}
              <div className="md:col-span-6 bg-black/60 border border-white/10 p-5 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-[#A30A19] uppercase tracking-wider mb-3">
                    LIVE LOGIC SIMULATOR
                  </div>

                  {/* Simulator for Voter Checker */}
                  {selectedProject.id === 'voter-checker' && (
                    <div className="space-y-4">
                      <div className="text-xs text-[#929292] font-mono">
                        Test voter qualification algorithm:
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="text-sm font-mono text-white">Enter Age:</label>
                        <input
                          type="number"
                          value={voterAge}
                          onChange={(e) => setVoterAge(Number(e.target.value))}
                          className="w-20 px-3 py-1.5 bg-black border border-white/20 text-white font-mono text-center focus:border-[#A30A19] focus:outline-none"
                        />
                      </div>
                      <div className="p-4 border border-white/10 mt-4">
                        <div className="text-xs font-mono text-[#929292] uppercase">Computed Result:</div>
                        <div className={`text-lg font-heading font-bold mt-1 ${voterAge >= 18 ? 'text-emerald-400' : 'text-[#ff334b]'}`}>
                          {voterAge >= 18 ? '✔ ELIGIBLE TO VOTE' : '✖ NOT ELIGIBLE TO VOTE (Age < 18)'}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Simulator for Calculator */}
                  {selectedProject.id === 'calculator-app' && (
                    <div className="space-y-4">
                      <div className="text-xs text-[#929292] font-mono">
                        Test computational engine:
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={calcExpr}
                          onChange={(e) => setCalcExpr(e.target.value)}
                          className="flex-grow px-3 py-1.5 bg-black border border-white/20 text-white font-mono focus:border-[#A30A19] focus:outline-none"
                        />
                        <button
                          onClick={handleCalcEval}
                          className="px-4 py-1.5 bg-[#A30A19] hover:bg-[#c20c1f] text-white font-mono text-xs cursor-pointer"
                        >
                          EVALUATE
                        </button>
                      </div>
                      <div className="p-4 border border-white/10 mt-2 font-mono">
                        <span className="text-xs text-[#929292]">OUTPUT: </span>
                        <span className="text-xl text-white font-bold">{calcResult}</span>
                      </div>
                    </div>
                  )}

                  {/* Simulator for ATM System */}
                  {selectedProject.id === 'atm-system' && (
                    <div className="space-y-4">
                      <div className="flex justify-between font-mono text-xs">
                        <span className="text-[#929292]">Current Balance:</span>
                        <span className="text-white font-bold">₹{atmBalance}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={atmAmount}
                          onChange={(e) => setAtmAmount(Number(e.target.value))}
                          placeholder="Amount"
                          className="w-32 px-3 py-1.5 bg-black border border-white/20 text-white font-mono focus:border-[#A30A19] focus:outline-none"
                        />
                        <button
                          onClick={handleAtmWithdraw}
                          className="px-4 py-1.5 bg-[#A30A19] hover:bg-[#c20c1f] text-white font-mono text-xs cursor-pointer"
                        >
                          WITHDRAW CASH
                        </button>
                      </div>
                      <div className="p-3 border border-white/10 h-28 overflow-y-auto font-mono text-[11px] text-[#929292] space-y-1">
                        {atmLog.map((log, i) => (
                          <div key={i}>&gt; {log}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Simulator for Grade Calculator */}
                  {selectedProject.id === 'grade-calculator' && (
                    <div className="space-y-4">
                      <div className="text-xs text-[#929292] font-mono">
                        Input subject marks (out of 100):
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {gradeMarks.map((m, idx) => (
                          <input
                            key={idx}
                            type="number"
                            value={m}
                            onChange={(e) => {
                              const updated = [...gradeMarks];
                              updated[idx] = Number(e.target.value);
                              setGradeMarks(updated);
                            }}
                            className="p-2 bg-black border border-white/20 text-white font-mono text-center text-sm focus:border-[#A30A19] focus:outline-none"
                          />
                        ))}
                      </div>
                      <div className="p-4 border border-white/10 mt-2 font-mono">
                        <div className="text-xs text-[#929292]">AGGREGATE EVALUATION:</div>
                        <div className="text-base text-white mt-1">Average: {calculateGrade().avg}%</div>
                        <div className="text-lg text-[#ff334b] font-bold">Grade: {calculateGrade().grade}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#929292] hover:text-white flex items-center gap-1.5"
                  >
                    <span>View Repository ↗</span>
                  </a>
                  <span className="text-[#A30A19]">Validated Pure Python Logic</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-4 border-t border-white/10 pt-6">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 border border-white/20 text-white font-mono text-xs hover:border-white transition-colors cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
