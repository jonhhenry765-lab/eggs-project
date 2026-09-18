import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../../data/initialData';
import { useStore } from '../../context/StoreContext';

export const FaqSection: React.FC = () => {
  const { getWhatsAppOrderUrl, settings } = useStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FBFDFB] border-t border-emerald-100/60" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full">
            Help & Information
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-emerald-950 font-display tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-zinc-600">
            Have questions about our flock care, delivery schedules, or quality guarantee? Here are all the details.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-emerald-100/90 shadow-2xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-emerald-50/40 transition-colors"
                >
                  <span className="text-base font-bold text-emerald-950 flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center shrink-0">
                      Q{idx + 1}
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-700 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-zinc-600 leading-relaxed border-t border-emerald-50 animate-in fade-in duration-200 pl-16">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 bg-emerald-900 rounded-3xl p-6 sm:p-8 text-center text-white space-y-4 shadow-lg">
          <h3 className="text-xl font-bold font-display">Still have questions or special requirements?</h3>
          <p className="text-xs sm:text-sm text-emerald-200 max-w-lg mx-auto">
            Our customer farm liaison team is ready to answer questions about wholesale crates, nutritional queries, or delivery times.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href={getWhatsAppOrderUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-950" />
              <span>Ask on WhatsApp ({settings.displayPhone})</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
