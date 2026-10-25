import React, { useState } from 'react';
import { X, MapPin, Search, CheckCircle2, Building } from 'lucide-react';
import { RAJAHMUNDRY_LOCALITIES, Locality } from '../data/mockData';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocality: string;
  onSelectLocality: (locality: Locality) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocality,
  onSelectLocality,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filtered = RAJAHMUNDRY_LOCALITIES.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.ward.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[115] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#006c49] flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-heading font-bold text-slate-900">Select Rajahmundry Locality</h3>
              <p className="text-[11px] text-slate-500">Browse verified technicians in your municipal zone</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 flex flex-col gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search Rajahmundry neighborhood or ward..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49]"
            />
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Popular Localities (Ward 1 to 50)
            </span>
            <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto pr-1">
              {filtered.map((loc) => {
                const isSelected = currentLocality.includes(loc.name);
                return (
                  <button
                    key={loc.name}
                    type="button"
                    onClick={() => {
                      onSelectLocality(loc);
                      onClose();
                    }}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[#006c49] bg-emerald-50/50'
                        : 'border-slate-100 hover:border-[#006c49] hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin
                        className={`w-4 h-4 ${
                          isSelected ? 'text-[#006c49]' : 'text-slate-400'
                        }`}
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{loc.name}</span>
                        <span className="text-[11px] text-slate-500">
                          {loc.ward} {loc.isPopular ? '• Popular Hub' : ''}
                        </span>
                      </div>
                    </div>
                    {isSelected ? (
                      <span className="px-2 py-0.5 rounded-full bg-[#006c49] text-white text-[10px] font-bold">
                        Current
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-emerald-700">{loc.distance} away</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#006c49]" />
              <span>Rajahmundry Municipal Corp.</span>
            </span>
            <span>Ward 1 - 50 Supported</span>
          </div>
        </div>
      </div>
    </div>
  );
};
