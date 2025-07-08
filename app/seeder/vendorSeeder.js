const Vendor = require('../models/vendor');

const defaultVendors = [
  { name: 'Beverly Smog Test Only', address: '2036 Beverly Boulevard', city: 'Los Angeles', state: 'CA' },
  { name: 'Midway Group', address: '1319 West 11th Street', city: 'Los Angeles', state: 'CA' },
  { name: 'Samys Tires & Smog Check', address: '1828 East 4th Street', city: 'Los Angeles', state: 'CA' },
  { name: '410 Garage', address: '410 West College Street', city: 'Los Angeles', state: 'CA' },
  { name: 'Pacific Coast Tires', address: '3056 E BANDINI BLVD', city: 'Los Angeles', state: 'CA' },
  { name: 'University Tire & Auto Service', address: '2908 Vermont Avenue', city: 'Los Angeles', state: 'CA' },
  { name: 'Midway Auto Center', address: '3737 BEVERLY BLVD', city: 'Los Angeles', state: 'CA' },
  { name: 'Felix Chevrolet', address: '3330 South Figueroa Street', city: 'Los Angeles', state: 'CA' },
  { name: 'Frontino Auto Service', address: '3085 East 4th Street', city: 'Los Angeles', state: 'CA' },
  { name: "Avo's Automotive", address: '2740 E Olympic Blvd', subAddrress: 'Unit C', city: 'Los Angeles', state: 'CA' },
  { name: 'L.A Auto Center', address: '1129 W Washington Blvd', city: 'Los Angeles', state: 'CA' },
  { name: 'La Cdjr', address: '2025 South Figueroa Street', city: 'Los Angeles', state: 'CA' },
  { name: 'Ford Of Downtown La', address: '1929 South Figueroa Street', city: 'Los Angeles', state: 'CA' },
  { name: 'Volkswagen Of Downtown L.A.', address: '1900 S. FIGUEROA ST.', city: 'Los Angeles', state: 'CA' },
  { name: 'Toyota Of Downtown La', address: '1901 South Figueroa Street', city: 'Los Angeles', state: 'CA' },
  { name: 'J & S Auto Service', address: '2028 S SAN PEDRO ST', city: 'Los Angeles', state: 'CA' },
  { name: 'Mercedes Benz Of Los Angeles', address: '1801 S Figueroa St', city: 'Los Angeles', state: 'CA' },
  { name: 'Ford Of Downtown La', address: '1540 S FIGUEROA ST', city: 'Los Angeles', state: 'CA' },
  { name: 'Holiday Auto Center Llc', address: '2213 WHITTIER BLVD', city: 'Los Angeles', state: 'CA' },
  { name: "Bill's Automotive", address: '1796 N SPRING ST', city: 'Los Angeles', state: 'CA' },
  { name: 'E & L Auto Body', address: '715 Witmer Street', city: 'Los Angeles', state: 'CA' },
  { name: 'Witmer Auto Service Inc', address: '500 WITMER ST', city: 'Los Angeles', state: 'CA' },
  { name: 'Bulls Truck Wash', address: '500 South Alameda Street', city: 'Los Angeles', state: 'CA' },
  { name: 'Pep Boys', address: '3904 FOUNTAIN AVENUE', city: 'Los Angeles', state: 'CA', status: 1 },
  { name: 'Midas', address: '2424 S FIGUEROA ST', city: 'Los Angeles', state: 'CA', status: 1 },
  { name: 'Hovson Tires & Automotive Center', address: '4385 W SUNSET BLVD', city: 'Los Angeles', state: 'CA' },
  { name: 'Jiffy Lube', address: '4020 SUNSET BLVD.', city: 'Los Angeles', state: 'CA', status: 1 },
  { name: 'Pep Boys', address: '1200 W WASHINGTON BLVD', city: 'Los Angeles', state: 'CA', status: 1 },
  { name: 'Chrysler Servicenet', address: '2025 S Figueroa St', city: 'Los Angeles', state: 'CA', status: 1 },
  { name: 'J T Mechanic & Body Shop', address: '2729 North Main Street', city: 'Los Angeles', state: 'CA', status: 1 },
];

const seedVendors = async () => {
  try {
    const count = await Vendor.countDocuments();
    if (count === 0) {
      const payload = defaultVendors.map((item) => ({
        ...item,
        classification: 0,
      }));
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
