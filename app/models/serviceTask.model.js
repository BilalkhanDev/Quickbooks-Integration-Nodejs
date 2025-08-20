const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    description: {
        type: String,
    },
    maintanceCategories: {
        categoryCode: {
            type: Schema.Types.ObjectId,
            ref: 'CategoryCode',
            default:null
        },
        systemCode: {
            type: Schema.Types.ObjectId,
            ref: 'SystemCode',
            default:null
        },
        assemblyCode: {
            type: Schema.Types.ObjectId,
            ref: 'AssemblyCode',
            default:null

        },
        reasonToRepair: {
            type: Schema.Types.ObjectId,
            ref: 'ReasonCode',
            default:null

        },
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('ServiceTask', ServiceTaskSchema);
