const mongoose = require("mongoose");
const Book = require("./book");

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

tagSchema.pre("deleteOne", { document: true }, function (next) {
  Book.findOne({ tag: this._id })
    .then((book) => {
      if (book) {
        next(new Error("This tag still has books"));
      } else {
        next();
      }
    })
    .catch((err) => {
      next(new Error(err));
    });
});

module.exports = mongoose.model("Tag", tagSchema);
