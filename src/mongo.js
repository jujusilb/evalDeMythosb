import mongoose from 'mongoose';

const creatureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  creatorId: Number,
  origine: String,
  isValid: Boolean,
  TestimonyId: Number
});

const testimonySchema = new mongoose.Schema({
    creatureId: Number,
    authorId: Number,
    description: { type: String, default: "" },
    status: { type: String, enum: ['PENDING', 'VALIDATED', 'REJECTED'], default: 'PENDING'},
    validatedBy: Number,
    validatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
})

export const create = mongoose.model("creature", creatureSchema)
export const testimony = mongoose.model("testimony", testimonySchema)
