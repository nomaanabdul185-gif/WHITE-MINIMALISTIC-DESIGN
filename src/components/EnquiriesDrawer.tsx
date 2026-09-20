import React from 'react';
import { X, Calendar, Phone, Mail, Building, Trash2, CheckCircle2, MessageSquare } from 'lucide-react';
import { Enquiry } from '../types';

interface EnquiriesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  enquiries: Enquiry[];
  onClearEnquiries: () => void;
}

export const EnquiriesDrawer: React.FC<EnquiriesDrawerProps> = ({
  isOpen,
  onClose,
  enquiries,
  onClearEnquiries,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs z-50 flex justify-end animate-in fade-in duration-200"
    >
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl text-[#202838] font-semibold">
              Your Design Enquiries
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {enquiries.length} submitted request{enquiries.length === 1 ? '' : 's'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of Enquiries */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {enquiries.length === 0 ? (
            <div className="text-center py-16 text-stone-400">
              <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-stone-300" />
              <p className="text-sm font-medium text-stone-600">No requests submitted yet</p>
              <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto">
                Explore our curated interior designs and request a consultation to get started.
              </p>
            </div>
          ) : (
            enquiries.map((enq, index) => (
              <div
                key={enq.id || index}
                className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 text-xs space-y-2.5 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-800 text-sm">{enq.name}</span>
                  <span className="text-[10px] font-mono bg-stone-200/70 text-stone-700 px-2 py-0.5 rounded">
                    {enq.id || `REQ-${index + 1}`}
                  </span>
                </div>

                {enq.design && (
                  <div className="text-[#e85c43] font-semibold text-[11px] bg-orange-50/70 px-2.5 py-1 rounded-md border border-orange-100">
                    Design: {enq.design}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 text-stone-600 pt-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <Phone className="w-3 h-3 text-stone-400 shrink-0" />
                    <span>{enq.phone}</span>
                  </div>
                  {enq.email && (
                    <div className="flex items-center gap-1.5 truncate">
                      <Mail className="w-3 h-3 text-stone-400 shrink-0" />
                      <span className="truncate">{enq.email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3 h-3 text-stone-400 shrink-0" />
                    <span>{enq.property}</span>
                  </div>
                  {enq.submittedAt && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-stone-400 shrink-0" />
                      <span>{new Date(enq.submittedAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {enq.message && (
                  <div className="pt-2 border-t border-stone-200/70 text-stone-500 flex items-start gap-1.5 text-[11px]">
                    <MessageSquare className="w-3 h-3 text-stone-400 shrink-0 mt-0.5" />
                    <p className="line-clamp-2">{enq.message}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 text-[10px] text-stone-400">
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Assigned to Design Team
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {enquiries.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
            <button
              type="button"
              onClick={onClearEnquiries}
              className="text-xs text-stone-500 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-[#202838] text-white text-xs font-semibold rounded-full hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
