const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const CarsSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

CarsSchema.plugin(mongoosePaginate);

module.exports = model("CarsSchema", CarsSchema);
