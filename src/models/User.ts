import { Schema, model, Document, Model } from 'mongoose'
import { hash, compare } from 'bcrypt'
import { BCRYPT_WORK_FACTOR,   } from '../config'

export interface UserDocument extends Document {
  email: string
  name: string
  password: string
  verifiedAt: Date
  matchesPassword: (password: string) => Promise<boolean>
  verificationUrl: () => string
}

interface UserModel extends Model<UserDocument> {
  signVerificationUrl: (url: string) => string
  hasValidVerificationUrl: (path: string, query: any) => boolean
}

const userSchema = new Schema({
  email: String,
  name: String,
  password: String,
  verifiedAt: Date
}, {
  timestamps: true
})

userSchema.pre<UserDocument>('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, BCRYPT_WORK_FACTOR)
  }
})

userSchema.methods.matchesPassword = function (password: string) {
  return compare(password, this.password)
}

export const User = model<UserDocument>('User', userSchema);