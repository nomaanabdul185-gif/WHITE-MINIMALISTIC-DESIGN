import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Mail, User, Building, MessageSquare, Sparkles } from 'lucide-react';
import { PropertyType, Enquiry } from '../types';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDesignTitle?: string;
  defaultProperty?: PropertyType;
  onSuccessSubmit: (enquiry: Enquiry) => void;
}

export const RequestModal: React.FC<RequestModalProps> = ({
  isOpen,
  onClose,
  selectedDesignTitle,
  defaultProperty = 'Residential',
  onSuccessSubmit,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [property, setProperty] = useState<PropertyType>(defaultProperty);
  const [message, setMessage] = useState('');
  const [designTitle, setDesignTitle] = useState(selectedDesignTitle || '');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  // Sync if selectedDesignTitle changes
  React.useEffect(() => {
    if (selectedDesignTitle) {
      setDesignTitle(selectedDesignTitle);
    }
  }, [selectedDesignTitle]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const refId = 'REQ-' + Math.floor(100000 + Math.random() * 900000);
    const newEnquiry: Enquiry = {
      id: refId,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      property,
      message: message.trim(),
      design: designTitle || undefined,
      submittedAt: new Date().toISOString(),
    };

    // Maintain backwards compatibility with original plain script structure
    try {
      const stored = JSON.parse(localStorage.getItem('enquiries') || '[]');
      stored.push({
        id: refId,
        name: newEnquiry.name,
        phone: newEnquiry.phone,
        email: newEnquiry.email,
        property: newEnquiry.property,
        message: newEnquiry.message,
        design: newEnquiry.design || '',
        submittedAt: newEnquiry.submittedAt,
      });
      localStorage.setItem('enquiries', JSON.stringify(stored));
    } catch (err) {
      console.error('Error saving enquiry to localStorage:', err);
    }

    setSubmittedRef(refId);
    setIsSubmitted(true);
    onSuccessSubmit(newEnquiry);
  };

  const handleCloseAndReset = () => {
    setIsSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setErrors({});
    onClose();
  };

  return (
    <div
      id="formModal"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCloseAndReset();
      }}
      className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-6 sm:p-9 shadow-2xl border border-stone-200 relative">
        <button
          type="button"
          onClick={handleCloseAndReset}
          className="absolute right-4 top-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors cursor-pointer"
          title="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-[#e85c43]" />
                <h2 className="font-serif text-2xl sm:text-3xl text-[#202838] tracking-tight">
                  Start Your Project
                </h2>
              </div>
              <p className="text-stone-500 text-xs sm:text-sm">
                Share your details and our senior interior architect will contact you within 24 hours.
              </p>
            </div>

            {designTitle && (
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-stone-400 font-medium">Selected Design:</span>
                  <span className="font-semibold text-stone-900">{designTitle}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setDesignTitle('')}
                  className="text-stone-400 hover:text-stone-700 underline text-[11px] cursor-pointer"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Name input */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  placeholder="e.g. Aditi Sharma"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-stone-50/50 focus:bg-white focus:outline-none transition-colors ${
                    errors.name ? 'border-rose-400 focus:border-rose-500' : 'border-stone-300 focus:border-stone-800'
                  }`}
                />
              </div>
              {errors.name && <p className="text-rose-500 text-[11px] mt-1">{errors.name}</p>}
            </div>

            {/* Phone input */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  placeholder="e.g. +91 98765 43210"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-stone-50/50 focus:bg-white focus:outline-none transition-colors ${
                    errors.phone ? 'border-rose-400 focus:border-rose-500' : 'border-stone-300 focus:border-stone-800'
                  }`}
                />
              </div>
              {errors.phone && <p className="text-rose-500 text-[11px] mt-1">{errors.phone}</p>}
            </div>

            {/* Email input */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                Email Address <span className="text-stone-400 text-[10px] font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. aditi@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-stone-800 text-xs sm:text-sm bg-stone-50/50 focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Property select */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                Property Type
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <select
                  id="prop"
                  value={property}
                  onChange={(e) => setProperty(e.target.value as PropertyType)}
                  className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-stone-300 focus:border-stone-800 text-xs sm:text-sm bg-stone-50/50 focus:bg-white focus:outline-none transition-colors cursor-pointer appearance-none"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Farm Stays">Farm Stays</option>
                </select>
                <div className="absolute right-3.5 top-3.5 pointer-events-none text-stone-400 text-xs">▼</div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                Project Notes & Specific Requirements
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <textarea
                  id="msg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your floor plan, targeted handover date, or any specific materials you prefer..."
                  rows={3}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-stone-800 text-xs sm:text-sm bg-stone-50/50 focus:bg-white focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-full bg-[#202838] hover:bg-[#151c29] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Submit Request</span>
              </button>
              <p className="text-center text-[10px] text-stone-400 mt-2">
                We respect your privacy. No spam, only personalized design consultations.
              </p>
            </div>
          </form>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
                Request Confirmed
              </span>
              <h3 className="font-serif text-2xl text-[#202838] mt-3">
                Thank You, {name}!
              </h3>
              <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
                Your design inquiry has been logged successfully. Our design partner will reach out to you at <span className="font-semibold text-stone-800">{phone}</span>.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-left text-xs space-y-1.5 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-stone-400">Reference:</span>
                <span className="font-mono font-bold text-stone-800">{submittedRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Property:</span>
                <span className="font-medium text-stone-800">{property}</span>
              </div>
              {designTitle && (
                <div className="flex justify-between">
                  <span className="text-stone-400">Selected Design:</span>
                  <span className="font-medium text-stone-800">{designTitle}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleCloseAndReset}
              className="px-6 py-2.5 bg-[#202838] text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
