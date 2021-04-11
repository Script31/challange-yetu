const Cars = require("../models/Cars");

class CarsController {
  async findAll(req, res) {
    const filters = {};

    if (req.query.price_min || req.query.price_max) {
      filters.price = {};

      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min;
      }
      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max;
      }
    }

    if (req.query.title) {
      filters.title = new RegExp(req.query.title, "i");
    }

    const cars = await Cars.paginate(
      filters,

      {
        page: req.query.page || 1,
        limit: 10,
        populate: ["owner"],
        sort: "-createdAt"
      }
    );

    return res.status(200).json(cars);
  }
  async find(req, res) {
    const car = await Cars.findById(req.params.id).populate("owner");

    if (!car) {
      return res.status(400).json({ error: "this car does not exist" });
    }

    return res.status(200).json(car);
  }
  async store(req, res) {
    const car = await Cars.create({ ...req.body, owner: req.userId });

    return res.status(200).json(car);
  }
  async update(req, res) {
    const car = await Cars.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.status(200).json(car);
  }
  async delete(req, res) {
    const car = await Cars.findByIdAndDelete(req.params.id);

    if (!car) {
      return res.status(400).json({ error: "this produt does not" });
    }
    return res.send();
  }
}

module.exports = new CarsController();
