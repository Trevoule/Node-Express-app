const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`));

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'invalid ID' });
  }

  next();
};

// Create a check body middleware
// Check if body contains name and price
// if not send 400 (bad request)
// Add it to the post handler

exports.checkBody = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Missing name or price' });
  }

  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);
  res.status(200).json({ status: 'success', data: { tour } });
};

exports.createTour = (req, res) => {
  //   body received because of middleware

  const newId = tours[tours.length - 1].id + 1;
  // eslint-disable-next-line prefer-object-spread
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    tour: '<Updated tour here...>',
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};
