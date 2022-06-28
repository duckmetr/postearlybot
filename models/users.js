import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    id: Number,
    is_bot: Boolean,
    first_name: String,
    last_name: String,
    username: String,
    language_code: String,
    channels: {
      type: Array,
      default: []
    },
    isBanned: {
      state: {type: Boolean, default: false},
      description: String
    }
  },
  {
    timestamps: true,
    statics: {
      async findOneOrCreate(tg_info) {
        const user = await this.findOne({id: tg_info.id})
        if (!user) return await this.create({...tg_info})
        // throw new Error('user already exist')
      }
    }
  }
)

const User = mongoose.model('users', userSchema)

export default User