const mongoose = require("mongoose");
const path = require("path");

const coverImageBasePath = "uploads/bookCovers";
const bookFileBasePath = "uploads/books";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    // change to format
    bookType: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "BookType",
    },
    tags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    }],
    artist: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
    }],
    publishDate: {
      type: Date,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    coverImage: {
      type: String
    },
    file: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    author: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Author",
    }],
    public: {
      type: Boolean,
      required: true,
    }
  },
  { timestamps: true }
);

bookSchema.virtual("coverImagePath").get(function () {
  if (this.coverImage != null) {
    return path.join("/", coverImageBasePath, this.coverImage);
  }
});

bookSchema.virtual("bookPath").get(function () {
  if (this.file != null) {
    return path.join("/", bookFileBasePath, this.file);
  }
});

module.exports = mongoose.model("Book", bookSchema);
module.exports.coverImageBasePath = coverImageBasePath;
module.exports.bookFileBasePath = bookFileBasePath;