const mongoose = require('mongoose');

const CubSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    phone: { 
        type: String,
        required: true
    },
    cni: { 
        type: String,
        required: true
    },
    service: { 
        type: String,
        required: true
    },
    contact_status: {
        type: String,
        required: false
    },
    observation: {
        type: String,
        required: false
    },
    quartier:{ 
        type: String,
        required: true
    },
    facebook:{ 
        type: String,
        required: true
    },
    status:{ //locataire ou propiétaire
        type: String,
        required: true
    },
    recommandation: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('ccontacts', CubSchema);