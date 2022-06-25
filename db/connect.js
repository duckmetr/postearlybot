import mongoose from 'mongoose'
import { MONGODB_URI } from '../config.js'

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.on('connected', () => console.log('mongoose connected..'))
mongoose.connection.on('error', (error) => console.log(`mongoose connection error: ${error}`))
mongoose.connection.on('disconnected', () => console.log('mongoose connection disconnected'))