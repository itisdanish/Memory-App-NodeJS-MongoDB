const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// MongoDB connection
mongoose.connect('mongodb+srv://itisdanish:data1234@datamemory.s3pds4k.mongodb.net/memory', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Define a simple mongoose model
const Item = mongoose.model('Item', { name: String });

// Routes
app.get('/', async (req, res) => {
  const items = await Item.find();
  res.render('index', { items });
});

app.post('/', async (req, res) => {
  const newItem = new Item({ name: req.body.name });
  await newItem.save();
  res.redirect('/');
});

app.post('/delete', async (req, res) => {
  const itemId = req.body.itemId;
  await Item.findByIdAndRemove(itemId);
  res.redirect('/');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
