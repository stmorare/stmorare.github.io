'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { Mail, Phone, MapPin, Github, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="academic-grid-bg py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Direct Inquiry"
          title="Contact"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 space-y-4"
          >
            <Card className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>Contact Details</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <a
                  href="mailto:morarest@outlook.com"
                  className="flex items-center gap-3 p-3 rounded-lg bg-blue-950/40 border border-blue-900/50 text-slate-200 hover:text-blue-300 hover:border-blue-700 transition-all group"
                >
                  <div className="p-2 rounded-md bg-blue-900/60 text-blue-400 group-hover:scale-105 transition-transform shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-mono uppercase">Email Address</span>
                    <span className="font-semibold">morarest@outlook.com</span>
                  </div>
                </a>

                <a
                  href="tel:0677288381"
                  className="flex items-center gap-3 p-3 rounded-lg bg-blue-950/40 border border-blue-900/50 text-slate-200 hover:text-blue-300 hover:border-blue-700 transition-all group"
                >
                  <div className="p-2 rounded-md bg-blue-900/60 text-blue-400 group-hover:scale-105 transition-transform shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-mono uppercase">Phone Number</span>
                    <span className="font-semibold">067 728 8381</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-950/40 border border-blue-900/50 text-slate-200">
                  <div className="p-2 rounded-md bg-blue-900/60 text-blue-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-mono uppercase">Location</span>
                    <span className="font-semibold">Springs, Gauteng, 1575</span>
                  </div>
                </div>

                <a
                  href="https://github.com/stmorare"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-blue-950/40 border border-blue-900/50 text-slate-200 hover:text-blue-300 hover:border-blue-700 transition-all group"
                >
                  <div className="p-2 rounded-md bg-blue-900/60 text-blue-400 group-hover:scale-105 transition-transform shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-mono uppercase">GitHub Profile</span>
                    <span className="font-semibold">github.com/stmorare</span>
                  </div>
                </a>
              </div>
            </Card>
          </motion.div>

          {/* Interactive Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <Card>
              <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-4">
                Send Direct Message
              </h3>

              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    key="submitted"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-6 rounded-xl bg-blue-950/60 border border-blue-800 text-center space-y-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-900 border border-blue-500 flex items-center justify-center text-blue-300 mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-100">Inquiry Received</h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      Thank you for reaching out! Your message has been logged. Simphiwe will respond to your email at <strong className="text-blue-300">{formData.email || 'your address'}</strong> promptly.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-2 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-slate-100 hover:bg-blue-600 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 text-xs sm:text-sm"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block font-medium text-slate-300 mb-1">
                          Your Name / Organization
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Sarah Jenkins (Senior Recruiter)"
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:outline-hidden focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block font-medium text-slate-300 mb-1">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="sarah@company.com"
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:outline-hidden focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block font-medium text-slate-300 mb-1">
                        Subject / Role Inquiry
                      </label>
                      <input
                        id="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. IT Service Desk Analyst Opportunity"
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:outline-hidden focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block font-medium text-slate-300 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Specify role details, contract terms, or request full resume PDF..."
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:outline-hidden focus:border-blue-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wide transition-all shadow-md hover:shadow-blue-900/40"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry</span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
