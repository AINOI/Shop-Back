import mongoose from 'mongoose'

const novelSchema = new mongoose.Schema({
  image: {
    type: String
  },
  title: {
    type: String,
    required: [true, '請命名此篇文章']
  },
  summary: {
    type: String
  },
  novelType: {
    type: String,
    enum: {
      values: ['奇幻', '古風', '寫實', '玄怪', '恐怖', '愛情', '科幻', '同人', '西洋', '東方'],
      message: '風格分類不存在'
    }
  },
  text: {
    type: String
  },
  publishDate: {
    type: String
  },
  author: {
    type: String
  }
}, { versionKey: false })

export default mongoose.model('novels', novelSchema)
