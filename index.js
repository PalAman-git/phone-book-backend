
const express = require("express");
const app = express();

app.use(express.json());

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
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(
    `Phonebook has info of ${persons.length} people <br/> ${new Date()}`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id); //extracting the id from request

  const note = persons.find((n) => n.id === id); //finding the note with the requested id

  note ? res.json(note) : res.status(404).send(" Page not found "); //if note presend send note else send 404
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((n) => n.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const id = Math.floor(Math.random()*1000);

  const person = req.body;
  console.log()
  res.json(person)  
});

const PORT = 3001;
app.listen(PORT, (req, res) => {
  console.log(`app listening at port ${PORT}`);
});
