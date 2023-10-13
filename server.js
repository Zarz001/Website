const express = require('express');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const upload = multer({ storage });

const app = express();

app.listen(8080, () => console.log('listening at 8080'));

app.use(express.static('stuff'));
app.use(express.json({ limit: '1mb' }));
app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(express.static('public'));

const dataFilePath = 'database.json';

function loadData() {
  try {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveData(data) {
  try {
    const dataStr = JSON.stringify(data, null, 2);
    fs.writeFileSync(dataFilePath, dataStr);
  } catch (err) {}
}

app.get('/api', (request, response) => {
  const data = loadData();
  response.json(data);
});

app.post('/api', upload.single('image'), (request, response) => {
  const { text } = request.body;
  const { other } = request.body;
  const { price } = request.body;
  const image = request.file;
  const imageUrl = image ? `/uploads/${image.filename}` : null;
  const data = {
    text, other, price, imageUrl,
  };
  const allData = loadData();
  allData.push(data);
  saveData(allData);
  response.json(data);
});

function loadReviews() {
  try {
    const data = fs.readFileSync('./reviews.json');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveReview(review) {
  try {
    const reviews = loadReviews();
    reviews.push(review);
    const dataStr = JSON.stringify(reviews, null, 2);
    fs.writeFileSync('./reviews.json', dataStr);
  } catch (err) {
  }
}

app.post('/api/reviews', (req, res) => {
  const review = {
    name: req.body.name,
    review: req.body.review,
  };
  saveReview(review);
  res.send('Review saved!');
});

app.get('/api/reviews', (req, res) => {
  const reviews = loadReviews();
  res.json(reviews);
});

function loadpart() {
  try {
    const data = fs.readFileSync('./database1.json');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function savepart(part) {
  try {
    const parts = loadpart();
    parts.push(part);
    const dataStr = JSON.stringify(parts, null, 2);
    fs.writeFileSync('./database1.json', dataStr);
  } catch (err) {

  }
}

app.post('/api/part', upload.single('image1'), (request, response) => {
  const { text1 } = request.body;
  const { other1 } = request.body;
  const { price1 } = request.body;
  const image1 = request.file;
  const imageUrl = image1 ? `/uploads/${image1.filename}` : null;
  const part = {
    text1, other1, price1, imageUrl,
  };
  savepart(part);
  response.json(part);
});

app.get('/api/part', (req, res) => {
  const parts = loadpart();
  res.json(parts);
});
