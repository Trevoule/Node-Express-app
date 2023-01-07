const fs = require('fs');
const express = require('express');

const app = express();

// middleware
app.use(express.json());

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello for server', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'invalid ID' });
  }

  res.status(200).json({ status: 'success', data: { tour } });
});

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
});

app.post('/api/v1/tours', (req, res) => {
  //   body received because of middleware

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id;

  if (id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'invalid ID' });
  }

  res.status(200).json({ status: 'success', tour: '<Updated tour here...>' });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  res.status(204).json({ status: 'success', data: null });
});

const port = '3000';
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
