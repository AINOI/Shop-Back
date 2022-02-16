import mongoose from 'mongoose'
import md5 from 'md5'
import validator from 'validator'

const userSchema = new mongoose.Schema({
  account: {
    type: String,
    minlength: [6, '帳號長度需 6 字元以上。'],
    maxlength: [20, '帳號長度需 20 字元以下。'],
    unique: true,
    required: [true, '帳號欄位不得空白。']
  },
  password: {
    type: String,
    required: [true, '密碼欄位不得空白。']
  },
  email: {
    type: String,
    required: [true, 'E-mail欄位不得空白'],
    unique: true,
    validate: {
      validator (email) {
        return validator.isEmail(email)
      },
      message: '信箱格式不正確。'
    }
  },
  nickname: {
    type: String
  },
  avatarimg: {
    type: String
  },
  role: {
    // 0 = 用戶/創作者
    // 1 = 管理員
    type: Number,
    default: 0
  },
  tokens: {
    type: [String]
  },
  novelsbase: {
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
  emailswitch: {
    type: String
  },
  sex: {
    type: String,
    enum: {
      values: ['男性', '女性', '不公開', ''],
      message: '選擇公開與否'
    }
  },
  birthdayMon: {
    type: String
  },
  birthdayDate: {
    type: String
  }
}, { versionKey: false })

userSchema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    if (user.password.length >= 6 && user.password.length <= 20) {
      user.password = md5(user.password)
    } else {
      const error = new mongoose.Error.ValidationError(null)
      error.addError('password', new mongoose.Error.ValidatorError({ message: '密碼長度需在 6 至 20 字元內。' }))
      next(error)
      return
    }
  }
  next()
})

userSchema.pre('findOneAndUpdate', function (next) {
  const user = this._update
  if (user.password) {
    if (user.password.length >= 6 && user.password.length <= 20) {
      user.password = md5(user.password)
    } else {
      const error = new mongoose.Error.ValidationError(null)
      error.addError('password', new mongoose.Error.ValidatorError({ message: '密碼長度需在 6 至 20 字元內。' }))
      next(error)
      return
    }
  }
  next()
})

export default mongoose.model('users', userSchema)
