const mongoose = require("mongoose");
const Book = require("./book");

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

artistSchema.pre("deleteOne", { document: true }, function (next) {
  Book.findOne({ artist: this._id })
    .then((book) => {
      if (book) {
        next(new Error("This artist still has books"));
      } else {
        next();
      }
    })
    .catch((err) => {
      next(new Error(err));
    });
});

module.exports = mongoose.model("Artist", artistSchema);
