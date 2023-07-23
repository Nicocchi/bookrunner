const mongoose = require("mongoose");
const Book = require("./book");

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

genreSchema.pre("deleteOne", { document: true }, function (next) {
  Book.findOne({ genre: this._id })
    .then((book) => {
      if (book) {
        next(new Error("This genre still has books"));
      } else {
        next();
      }
    })
    .catch((err) => {
      next(new Error(err));
    });
});

module.exports = mongoose.model("Genre", genreSchema);
