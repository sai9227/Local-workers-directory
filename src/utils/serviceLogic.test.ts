import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateMobileNumber,
  verifyOtp,
  calculateServiceFee,
  formatRMCWardAddress,
  filterArtisans,
  type Artisan
} from './serviceLogic.ts';

test('validateMobileNumber validates Indian 10-digit mobile numbers', () => {
  assert.equal(validateMobileNumber('9876543210'), true);
  assert.equal(validateMobileNumber('+91 94401 23456'), true);
  assert.equal(validateMobileNumber('12345'), false);
  assert.equal(validateMobileNumber(''), false);
});

test('verifyOtp checks valid 4-digit code', () => {
  assert.equal(verifyOtp('4829'), true);
  assert.equal(verifyOtp('1234'), true);
  assert.equal(verifyOtp('0000'), false);
});

test('calculateServiceFee applies emergency and distance surcharges', () => {
  const normal = calculateServiceFee(299, false, 1.5);
  assert.equal(normal.base, 299);
  assert.equal(normal.emergencyFee, 0);
  assert.equal(normal.total, 299);

  const emergency = calculateServiceFee(299, true, 5);
  assert.equal(emergency.emergencyFee, 100);
  assert.equal(emergency.travelAllowance, 40); // (5-3)*20 = 40
  assert.equal(emergency.total, 439);
});

test('formatRMCWardAddress formats standard Rajahmundry address', () => {
  const formatted = formatRMCWardAddress(
    'Krishna Residency, Flat #402',
    'Danavaipeta',
    'Ward 14'
  );
  assert.equal(
    formatted,
    'Krishna Residency, Flat #402, Danavaipeta, Rajahmundry • RMC Ward 14'
  );
});

test('filterArtisans filters by trade and locality correctly', () => {
  const mockArtisans: Artisan[] = [
    {
      id: '1',
      name: 'Ramesh Kumar',
      trade: 'Electrician',
      subTrade: 'Master Electrician',
      rating: 4.9,
      reviewsCount: 184,
      locality: 'Danavaipeta',
      ward: 'Ward 14',
      distanceKm: 0.6,
      visitFee: 299,
      phone: '+91 98345 67812',
      isPoliceVerified: true,
      initials: 'RK'
    },
    {
      id: '2',
      name: 'Suresh Gowda',
      trade: 'Plumber',
      subTrade: 'Sanitary Specialist',
      rating: 4.8,
      reviewsCount: 96,
      locality: 'Danavaipeta',
      ward: 'Ward 14',
      distanceKm: 1.2,
      visitFee: 249,
      phone: '+91 98450 12891',
      isPoliceVerified: true,
      initials: 'SG'
    },
    {
      id: '3',
      name: 'Ariave Godfrey',
      trade: 'Carpenter',
      subTrade: 'Furniture & Woodwork',
      rating: 4.9,
      reviewsCount: 142,
      locality: 'Prakash Nagar',
      ward: 'Ward 21',
      distanceKm: 1.4,
      visitFee: 450,
      phone: '+91 98234 56711',
      isPoliceVerified: true,
      initials: 'AG'
    }
  ];

  const electricians = filterArtisans(mockArtisans, 'Electrician');
  assert.equal(electricians.length, 1);
  assert.equal(electricians[0].name, 'Ramesh Kumar');

  const danavaipeta = filterArtisans(mockArtisans, 'All', 'Danavaipeta');
  assert.equal(danavaipeta.length, 2);

  const prakashNagarCarpenters = filterArtisans(mockArtisans, 'Carpenter', 'Prakash Nagar');
  assert.equal(prakashNagarCarpenters.length, 1);
  assert.equal(prakashNagarCarpenters[0].name, 'Ariave Godfrey');
});
