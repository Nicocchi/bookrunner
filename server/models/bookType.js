const mongoose = require("mongoose");
const Book = require("./book");

const bookTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

bookTypeSchema.pre("deleteOne", { document: true }, function (next) {
  Book.findOne({ bookType: this._id })
    .then((book) => {
      if (book) {
        next(new Error("This type still has books"));
      } else {
        next();
      }
    })
    .catch((err) => {
      next(new Error(err));
    });
});

module.exports = mongoose.model("BookType", bookTypeSchema);
