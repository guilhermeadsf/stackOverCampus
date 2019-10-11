const { Schema, model } = require('mongoose');

const ThemeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    course: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Themes', ThemeSchema);
