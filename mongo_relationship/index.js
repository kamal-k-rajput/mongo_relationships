const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/library");
};

// book schema
//creating book schema
const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
      // required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      // required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// step-2 creating the model

const Book = mongoose.model("book", bookSchema); // book =>  books

// section schema
const sectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//section model
const Section = mongoose.model("section", sectionSchema); // section => sections
// author schema
const authorSchema = mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
//author model
const Author = mongoose.model("author", authorSchema);

//CRUD OPERATIONS
// READ ALL THE BOOKS
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find().lean().exec();

    return res.status(200).send({ books: books }); // []
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong .. try again later" });
  }
});

// books CRUD
// create
app.post("/book", async (req, res) => {
  try {
    const book = await Book.create(req.body);

    return res.status(201).send({ book: book });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
//read ONLY ONE
app.get("/book/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).lean().exec();
    return res.status(200).send({ book: book });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong .. try again later" });
  }
});
//update

app.patch("/book/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    // db.users.update({_id: Object('622893471b0065f917d24a38')}, {$set: {req.body}})

    return res.status(200).send({ book: book });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//delete

app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id).lean().exec();
    // db.users.deleteOne({_id: Object('622893471b0065f917d24a38')})

    return res.status(200).send(book);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//section crud operations
// read all the sections
app.get("/sections", async (req, res) => {
  try {
    const sections = await Section.find().lean().exec();
    return res.status(201).send({ sections: sections });
  } catch (err) {
    return res.status.send(500).send({ message: err.message });
  }
});
//create section
app.post("/sections", async (req, res) => {
  try {
    const section = await Section.create(req.body);
    return res.status(201).send({ section: section });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//get one section by id
app.get("/sections/:id", async (req, res) => {
  try {
    const section = await Section.findById(req.params.id).lean().exec();
    return res.status(201).send({ section: section });
  } catch (err) {
    return res.status.send(500).send({ message: err.message });
  }
});
// update section
app.patch("/section", async (req, res) => {
  try {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
//delete section
app.delete("/section", async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id)
      .lean()
      .exec();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
// author crud operations
// get all the author
app.get("/authors", async (req, res) => {
  try {
    const authors = await Author.find().lean().exec();
    return res.status(201).send({ authors: authors });
  } catch (err) {
    return res.status.send(500).send({ message: err.message });
  }
});

app.listen(7500, async () => {
  try {
    await connect();
    console.log("listining to the port 7500");
  } catch (err) {
    console.log(err);
  }
});
