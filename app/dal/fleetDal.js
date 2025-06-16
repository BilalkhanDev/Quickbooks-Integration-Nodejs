const { default: mongoose } = require('mongoose');
const Fleet = require('../models/fleet');
const axios = require('axios');
const redisClient = require("../utils/redis")
const FleetSpec = require('../models/specfication/index');
const { connectRedis } = require('../utils/redis');
const {
  addFleetIdToRedis,
  safeRedisGet,
  safeRedisSet
} = require('../utils/redis');
const createFleetDal = async (data) => {
  return await Fleet.create(data);
};






// const getAllFleetsDal = async (token) => {
//   try {
//     const redisKey = 'fleets:all';

//     const fleetResponse = await axios.get(`${process.env.FLEET_URL}`, {
//       headers: { Authorization: `JWT ${token}` }
//     })
//     const fleets = fleetResponse.data;

//     if (!Array.isArray(fleets)) {
//       throw new Error('Fleet data is not an array');
//     }

//     const fleetIds = fleets.map(f => f?._id);

//     for (const id of fleetIds) {
//       await addFleetIdToRedis(id.toString());
//     }

//     // 4. Fetch enriched FleetSpecs
//     const specs = await FleetSpec.find({ fleetId: { $in: fleetIds } })
//       .populate('engine')
//       .populate('wheel')
//       .populate('transmission')
//       .populate('weight')
//       .populate('fuelEconomy');

//     const specMap = {};
//     specs?.forEach(spec => {
//       specMap[spec?.fleetId] = spec?.toJSON(); 
//     });
 
//     const enrichedFleets = fleets?.map(fleet => ({
//       ...fleet,
//       specification: specMap[fleet?._id] || null
//     }));
 
//     // 5. Cache enriched fleets in Redis
//     await safeRedisSet(redisKey, JSON?.stringify(enrichedFleets), {
//       EX: 60 * 10 // TTL: 5 minutes
//     });

//     console.log('✅ Cached all fleet data in Redis');
//     return enrichedFleets;
//   } catch (error) {
//     console.error('❌ Error in getAllFleetsDal:', error.message);
//     return [];
//   }
// };

const getAllFleetsDal = async (token) => {
  try {
    const redisKey = 'fleets:all';

    // Fetch fleet data from the external API
    const fleetResponse = await axios.get(`${process.env.FLEET_URL}`, {
      headers: { Authorization: `JWT ${token}` }
    });

    const fleets = fleetResponse.data;

    if (!Array.isArray(fleets)) {
      throw new Error('Fleet data is not an array');
    }

    // Extract fleet IDs
    const fleetIds = fleets.map(f => f?._id);

    // Store the fleet IDs in Redis
    await safeRedisSet(redisKey, JSON.stringify(fleetIds));

    console.log('✅ Cached Fleet IDs in Redis');
    return fleets;
  } catch (error) {
    console.error('❌ Error in fetchFleetsAndStoreIdsDal:', error.message);
    return [];
  }
};
const fetchFleetSpecs = async (fleetId) => {
  try {
    const redisKey = 'fleets:all';

    // Check Redis for cached Fleet IDs
    const cachedFleetIds = await safeRedisGet(redisKey);

    // If cached Fleet IDs exist in Redis
    if (cachedFleetIds) {
      const storedFleetIds = JSON.parse(cachedFleetIds);

      // Check if the requested fleetId is part of the storedFleetIds in Redis
      if (storedFleetIds.includes(fleetId)) {
        console.log('✅ Fleet ID found in Redis');

        // Fetch fleet specifications from the DB for the specific fleetId
        const specs = await FleetSpec.find({ fleetId })
          .populate('engine')
          .populate('wheel')
          .populate('transmission')
          .populate('weight')
          .populate('fuelEconomy');

        const enrichedFleet = specs.length
          ? { fleetId, specification: specs[0].toJSON() }
          : { fleetId, specification: null };

        console.log('✅ Enriched fleet data');
        return enrichedFleet;
      } else {
        console.log('⚠️ Fleet ID missing in Redis, fetching from DB');
      }
    } else {
      console.log('⚠️ No fleet IDs found in Redis');
    }

    // If not found in Redis, fetch from the DB directly
    const specs = await FleetSpec.find({ fleetId })
      .populate('engine')
      .populate('wheel')
      .populate('transmission')
      .populate('weight')
      .populate('fuelEconomy');

    const enrichedFleet = specs.length
      ? { fleetId, specification: specs[0].toJSON() }
      : { fleetId, specification: null };

    console.log('✅ Enriched fleet data from DB');
    return enrichedFleet;

  } catch (error) {
    console.error('❌ Error in fetchFleetSpecs:', error.message);
    throw new Error('Error fetching fleet specifications');
  }
};
const getFleetByIdDal = async (id) => {
  return await Fleet.findById(id).populate('assigned_driver', 'username email');
};

const updateFleetDal = async (id, data) => {
  return await Fleet.findByIdAndUpdate(id, data, { new: true }).populate('assigned_driver', 'username email');
};

const deleteFleetDal = async (id) => {
  return await Fleet.findByIdAndDelete(id);
};

module.exports = {
  createFleetDal,
  getAllFleetsDal,
  getFleetByIdDal,
  updateFleetDal,
  deleteFleetDal,
  fetchFleetSpecs
};


