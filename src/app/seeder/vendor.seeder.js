const mongoose = require('mongoose');
const Vendor = require('../models/common/vendor.model');  
// Default vendor data
const defaultVendors = [
  { name: 'Beverly Smog Test Only', address: { name: '2036 Beverly Boulevard', city: 'Los Angeles', state: 'CA', coords: [34.0736, -118.4775] }, classification: ['service'] },
  { name: 'Midway Group', address: { name: '1319 West 11th Street', city: 'Los Angeles', state: 'CA', coords: [34.0345, -118.2699] }, classification: ['service'] },
  { name: 'Samys Tires & Smog Check', address: { name: '1828 East 4th Street', city: 'Los Angeles', state: 'CA', coords: [34.0432, -118.2273] }, classification: ['service', 'fuel'] },
  { name: '410 Garage', address: { name: '410 West College Street', city: 'Los Angeles', state: 'CA', coords: [34.0211, -118.4913] }, classification: ['service'] },
  { name: 'Pacific Coast Tires', address: { name: '3056 E BANDINI BLVD', city: 'Los Angeles', state: 'CA', coords: [33.9812, -118.2176] }, classification: ['service', 'fuel'] },
  { name: 'University Tire & Auto Service', address: { name: '2908 Vermont Avenue', city: 'Los Angeles', state: 'CA', coords: [34.0244, -118.2886] }, classification: ['service'] },
  { name: 'Midway Auto Center', address: { name: '3737 BEVERLY BLVD', city: 'Los Angeles', state: 'CA', coords: [34.0801, -118.2912] }, classification: ['service', 'charging'] },
  { name: 'Felix Chevrolet', address: { name: '3330 South Figueroa Street', city: 'Los Angeles', state: 'CA', coords: [34.0291, -118.2769] }, classification: ['service'] },
  { name: 'Frontino Auto Service', address: { name: '3085 East 4th Street', city: 'Los Angeles', state: 'CA', coords: [34.0468, -118.2451] }, classification: ['service'] },
  { name: "Avo's Automotive", address: { name: '2740 E Olympic Blvd', subAddress: 'Unit C', city: 'Los Angeles', state: 'CA', coords: [34.0401, -118.2250] }, classification: ['service'] },
  { name: 'L.A Auto Center', address: { name: '1129 W Washington Blvd', city: 'Los Angeles', state: 'CA', coords: [34.0312, -118.2762] }, classification: ['service'] },
  // Add more vendors as needed
];

// Seeder function
const seedVendors = async () => {
  try {
    const count = await Vendor.countDocuments();
    if (count === 0) {
      const payload = defaultVendors.map((vendor) => ({
        ...vendor,
        labels: [],  // Add any labels you want to include (if applicable)
        phone: Math.floor(Math.random() * 1000000000), // Generate random phone numbers for the vendors
        contactName: "John Doe",  // Replace with actual contact name if needed
        contactPhone: Math.floor(Math.random() * 1000000000),  // Random phone number for contact
        email: `${vendor.name.toLowerCase().replace(/\s/g, '')}@example.com`, // Dummy email generation
        archived: false,  // You can set this based on your data
        isActive: true,  // Set based on your data
      }));

      // Insert the vendors into the database
      await Vendor.insertMany(payload);
      console.log('✅ Vendors seeded successfully');
    } else {
      console.log('ℹ️ Vendors already exist, skipping seed');
    }
  } catch (error) {
    console.error('❌ Error seeding vendors:', error);
  }
};

module.exports = seedVendors;
