const User = require('../models/User')

module.exports = {
    findById: async (req, res) => {
        const _id = req.params.id
        await User.findById({_id})
          .then((user) => {
            res.status(200).send({data: user});
          })
          .catch((err) => {
            console.log("Get product by id error:", err);
            res.status(500).json({
              errorMessage: err,
            });
          });
      },
}