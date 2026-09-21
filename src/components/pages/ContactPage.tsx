import React, { useState } from 'react';
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { settings, addToast, getWhatsAppOrderUrl } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Bulk Order Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      addToast('Missing Details', 'Please fill in your name, phone, and inquiry message.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast(
        'Message Sent Successfully!',
        'Thank you for reaching out. Our farm liaison officer will call or WhatsApp you within 2 hours.',
        'success'
      );
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }, 600);
  };

  return (
    <div className="bg-[#FBFDFB] min-h-screen py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            <span>Farm Direct Communications</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-950 font-display tracking-tight">
            Get In Touch With Our Farm
          </h1>
          <p className="text-sm sm:text-base text-zinc-600">
            Have questions about wholesale restaurant crates, daily subscription deliveries, or flock nutrition? We are here to help.
          </p>
        </div>

        {/* 2-Column Content: Left Contact Info, Right Interactive Form */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-emerald-950 font-display">
                Farm Liaison Headquarters
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950">Farm Location</h4>
                    <p className="text-zinc-600 mt-0.5 leading-relaxed">
                      {settings.address}, {settings.city}, {settings.province}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950">Order Hotline & Phone</h4>
                    <a
                      href={`tel:${settings.displayPhone}`}
                      className="text-emerald-800 font-bold hover:underline mt-0.5 block"
                    >
                      {settings.displayPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950">Instant WhatsApp</h4>
                    <a
                      href={getWhatsAppOrderUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-800 font-bold hover:underline mt-0.5 block"
                    >
                      +{settings.whatsappNumber} (Fast response)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950">Official Email</h4>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-emerald-800 font-bold hover:underline mt-0.5 block"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950">Harvest & Dispatch Hours</h4>
                    <p className="text-zinc-600 mt-0.5 leading-relaxed">
                      {settings.businessHours}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-100">
                <a
                  href={getWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Start WhatsApp Live Chat</span>
                </a>
              </div>
            </div>

            {/* Visual Farm Map / Location Card */}
            <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Punjab Agricultural Belt Hub</span>
              </h4>
              <div className="w-full h-48 rounded-2xl overflow-hidden bg-emerald-900 relative">
                <iframe
                  title="Alrehman Farm Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d435521.4089924558!2d72.76632420489953!3d31.482635227743207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392242a895a55ca9%3A0xdec58f88932671c6!2sFaisalabad%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-5"
            >
              <div>
                <h3 className="text-2xl font-bold text-emerald-950 font-display">
                  Send Us An Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  Fill in your details below and our team will get back to you promptly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Muhammad Aslam"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Phone / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
                  >
                    <option value="Bulk Order Inquiry">Bulk Wholesale Order (Crates)</option>
                    <option value="Household Subscription">Household Daily/Weekly Subscription</option>
                    <option value="Bakery / Restaurant Supply">Bakery & Restaurant Partnership</option>
                    <option value="Farm Feed Supply">Feed & Poultry Farming Supplies</option>
                    <option value="General Question">Other Questions & Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Your Message or Specific Requirements <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about the quantity you need, your city, or any specific questions..."
                  className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-emerald-600 bg-zinc-50/50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>{isSubmitting ? 'Submitting Inquiry...' : 'Submit Farm Inquiry'}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>We respect your privacy. No spam guaranteed.</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
