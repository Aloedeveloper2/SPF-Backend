const mongoose = require('mongoose');
const moment = require('moment');

const ListeningSchema = new mongoose.Schema({
    post: {
        type: String,
        required: true
    },
    observation: {
        type: String,
        required: false
    },
    filePath: {
        type: String,
        required: false
    },
    created_at: {
        type: String,
        default: moment().format('YYYY-MM-DD')
    }
},  {
        toJSON: { 
            transform: function(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
)

module.exports = mongoose.model('Listenings', ListeningSchema);

