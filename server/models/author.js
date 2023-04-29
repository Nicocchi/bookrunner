const mongoose = require("mongoose");
const Book = require("./book");

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

authorSchema.pre("deleteOne", { document: true }, function (next) {
  Book.findOne({ author: this._id })
    .then((book) => {
      if (book) {
        next(new Error("This author still has books"));
      } else {
        next();
      }
    })
    .catch((err) => {
      next(new Error(err));
    });
});

module.exports = mongoose.model("Author", authorSchema);
