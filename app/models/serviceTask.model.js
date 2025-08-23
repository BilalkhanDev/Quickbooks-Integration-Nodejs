const mongoose = require('mongoose');
const { search, paginate } = require('../shared/plugin');
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
    
    },
    isActive:{
        type:Boolean,
        default:true
    }
}, {
    timestamps: true,
});
ServiceTaskSchema.plugin(search, {
    refFields: {
        'maintanceCategories.categoryCode': ['title'],
        'maintanceCategories.systemCode': ['title'],
        'maintanceCategories.assemblyCode': ['title']
    }
});
ServiceTaskSchema.plugin(paginate);
module.exports = mongoose.model('ServiceTask', ServiceTaskSchema);
