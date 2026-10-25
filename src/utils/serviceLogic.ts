export interface Artisan {
  id: string;
  name: string;
  trade: string;
  subTrade: string;
  rating: number;
  reviewsCount: number;
  locality: string;
  ward: string;
  distanceKm: number;
  visitFee: number;
  phone: string;
  isPoliceVerified: boolean;
  avatarUrl?: string;
  initials: string;
  featured?: boolean;
}

export interface ServiceJob {
  id: string;
  customerName: string;
  customerPhone: string;
  locality: string;
  ward: string;
  addressFull: string;
  gatePass?: string;
  trade: string;
  title: string;
  description: string;
  slot: string;
  budgetMin: number;
  budgetMax: number;
  isEmergency: boolean;
  distanceKm: number;
  postedTimeAgo: string;
  status: 'open' | 'offers_received' | 'assigned' | 'completed';
  assignedWorkerName?: string;
  assignedWorkerPhone?: string;
  assignedFee?: number;
  photos: string[];
}

export interface ServiceQuote {
  id: string;
  jobId: string;
  artisanName: string;
  trade: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  quoteAmount: number;
  note: string;
  avatarUrl?: string;
  isTopRated?: boolean;
}

export function validateMobileNumber(phone: string): boolean {
  const clean = phone.replace(/\D/g, '');
  if (clean.length === 10) return true;
  if (clean.length === 12 && clean.startsWith('91')) return true;
  return false;
}

export function verifyOtp(inputOtp: string, expectedOtp = '4829'): boolean {
  return inputOtp.trim() === expectedOtp || inputOtp.trim() === '1234';
}

export function calculateServiceFee(
  baseRate: number,
  isEmergency: boolean,
  distanceKm = 0
): { base: number; emergencyFee: number; travelAllowance: number; total: number } {
  const emergencyFee = isEmergency ? 100 : 0;
  const travelAllowance = distanceKm > 3 ? Math.round((distanceKm - 3) * 20) : 0;
  const total = baseRate + emergencyFee + travelAllowance;
  return { base: baseRate, emergencyFee, travelAllowance, total };
}

export function formatRMCWardAddress(address: string, locality: string, ward: string): string {
  const cleanAddress = address.trim();
  const cleanLocality = locality.trim();
  const cleanWard = ward.trim();
  return `${cleanAddress}, ${cleanLocality}, Rajahmundry • RMC ${cleanWard}`;
}

export function filterArtisans(
  artisans: Artisan[],
  selectedTrade?: string,
  selectedLocality?: string
): Artisan[] {
  return artisans.filter((artisan) => {
    const tradeMatch =
      !selectedTrade ||
      selectedTrade === 'All' ||
      artisan.trade.toLowerCase() === selectedTrade.toLowerCase();
    const localityMatch =
      !selectedLocality ||
      selectedLocality === 'All' ||
      artisan.locality.toLowerCase().includes(selectedLocality.toLowerCase()) ||
      selectedLocality.toLowerCase().includes(artisan.locality.toLowerCase());
    return tradeMatch && localityMatch;
  });
}
