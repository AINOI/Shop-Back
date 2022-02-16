import mongoose from 'mongoose'

const createSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'users'
  },
  novels: {
    type: [
      {
        novel: {
          type: mongoose.ObjectId,
          ref: 'novels',
          required: [true, '缺少作品 ID']
        }
      }
    ]
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

export default mongoose.model('orders', createSchema)
