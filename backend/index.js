const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((connection) => {
    console.log('Connected to MongoDB');
  }).catch((error) => console.error('Error connecting to MongoDB:', error)
  )

const Item = mongoose.model('Item', new mongoose.Schema({
    title: { type: String, required: true }
}));


app.get('/tasks', async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

app.post('/tasks', async (req, res) => {
    console.log( req.body.title);
  const item =new Item({
    title: req.body.title
});
  await item.save();
  res.send(item);
});

app.delete("/tasks/:id", (req, res)=> {
    Item.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "task supprimé !" }))
      .catch((error) => res.status(500).json({ error }));
  })

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});