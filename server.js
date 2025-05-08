// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dns = require('dns');
const bodyParser = require('body-parser');
const { URL } = require('url');

const app = express();

// Basic Config
const PORT = process.env.PORT || 3000;
const MONGO_URI = "mongodb+srv://varmashankar:%24h%4000Shankar@cluster0.jhxi4bz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const urlSchema = new mongoose.Schema({
  original_url: String,
  short_url: Number
});

const Url = mongoose.model('Url', urlSchema);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

let counter = 1;

app.post('/api/shorturl', async (req, res) => {
    let inputUrl;
  
    try {
      inputUrl = new URL(req.body.url);
      if (!/^https?:\/\//.test(req.body.url)) throw new Error();
    } catch {
      return res.json({ error: 'invalid url' });
    }
  
    dns.lookup(inputUrl.hostname, async (err) => {
      if (err) return res.json({ error: 'invalid url' });
  
      const existing = await Url.findOne({ original_url: inputUrl.href });
      if (existing) {
        return res.json({
          original_url: existing.original_url,
          short_url: existing.short_url
        });
      }
  
      const count = await Url.countDocuments({});
      const newUrl = new Url({
        original_url: inputUrl.href,
        short_url: count + 1
      });
  
      await newUrl.save();
  
      res.json({
        original_url: newUrl.original_url,
        short_url: newUrl.short_url
      });
    });
  });
  

app.get('/api/shorturl/:short', async (req, res) => {
  const short = parseInt(req.params.short);
  const found = await Url.findOne({ short_url: short });
  if (found) return res.redirect(found.original_url);
  res.status(404).send('URL not found');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
