module.exports = mongoose => {
    const Tutorial = mongoose.model(
      "tutorial",
      mongoose.Schema(
        {
          title: String,
          description: String,
          published: Boolean
        },
        { timestamps: true }
      ).method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      })
    );
  
    return Tutorial;
  };