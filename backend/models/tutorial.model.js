module.exports = mongoose => {
  let schema = mongoose.Schema(
    {
      pumperCode: String,
      pumperName: String,
      pulseDuration: Number,
      driveTimes: Array,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutorial = mongoose.model("board", schema);
  return Tutorial;
};