require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();

const Person = require("./model/person");

//middleware
app.use(express.json());
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

// app.use(morgan('tiny'));//middleware
app.use(
  morgan(
    ":method :url :status :res[content-length] :req[header] :response-time :body"
  )
); //middleware

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

app.get("/info", (req, res) => {
  res.send(
    `Phonebook has info of ${persons.length} people <br/> ${new Date()}`
  );
});

app.get("/", (req, res) => {
  res.send(
    "You are on the homepage of the phone directory got to /api/persons for numbers and information"
  );
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => res.json(person));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findOneAndRemove(req.params.id)
    .then(() => res.status(200).end())
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (body === undefined)
    return res.status(400).json({ error: "content missing" });

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((person) => {
    res.json(person);
  });
});

const errorHandler = (error, request, response, next) => {
  console.log(error);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);//it has to be the last middleware



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`app listening at port ${PORT}`);
});
