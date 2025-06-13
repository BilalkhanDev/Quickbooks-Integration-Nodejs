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






const getAllFleetsDal = async (token) => {
  try {
    const redisKey = 'fleets:all';

    const fleetResponse = await axios.get(`${process.env.FLEET_URL}`, {
      headers: { Authorization: `JWT ${token}` }
    })
    const fleets = fleetResponse.data;

    if (!Array.isArray(fleets)) {
      throw new Error('Fleet data is not an array');
    }

    const fleetIds = fleets.map(f => f?._id);

    for (const id of fleetIds) {
      await addFleetIdToRedis(id.toString());
    }

    // 4. Fetch enriched FleetSpecs
    const specs = await FleetSpec.find({ fleetId: { $in: fleetIds } })
      .populate('engine')
      .populate('wheel')
      .populate('transmission')
      .populate('weight')
      .populate('fuelEconomy');

    const specMap = {};
    specs?.forEach(spec => {
      specMap[spec?.fleetId] = spec?.toJSON(); 
    });
 
    const enrichedFleets = fleets?.map(fleet => ({
      ...fleet,
      specification: specMap[fleet?._id] || null
    }));
 
    // 5. Cache enriched fleets in Redis
    await safeRedisSet(redisKey, JSON?.stringify(enrichedFleets), {
      EX: 60 * 10 // TTL: 5 minutes
    });

    console.log('✅ Cached all fleet data in Redis');
    return enrichedFleets;
  } catch (error) {
    console.error('❌ Error in getAllFleetsDal:', error.message);
    return [];
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
};


