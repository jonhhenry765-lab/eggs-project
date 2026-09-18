import React from 'react';
import { CheckCircle, MessageSquareQuote, Star } from 'lucide-react';
import { INITIAL_REVIEWS } from '../../data/initialData';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-emerald-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full">
            Real Customer Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-emerald-950 font-display tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-sm sm:text-base text-zinc-600">
            Trusted by over 50,000+ Pakistani households, commercial bakeries, breakfast cafes, and fitness professionals.
          </p>
        </div>

        {/* 6 Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FBFDFB] hover:bg-white rounded-3xl p-7 border border-emerald-100/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Stars and Quote */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <MessageSquareQuote className="w-6 h-6 text-emerald-200 group-hover:text-emerald-400 transition-colors" />
                </div>

                {/* Review Text */}
                <p className="text-sm text-zinc-700 leading-relaxed italic">
                  “{rev.text}”
                </p>
              </div>

              {/* Customer Info */}
              <div className="pt-5 mt-4 border-t border-emerald-100/70 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.customerName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-emerald-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-1">
                      <span>{rev.customerName}</span>
                    </h4>
                    <p className="text-xs text-zinc-500">{rev.location}</p>
                  </div>
                </div>

                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
