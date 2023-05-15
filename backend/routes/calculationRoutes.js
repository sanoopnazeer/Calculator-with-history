const express = require("express");
const calculationModel = require("../models/calculationModel");
const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const { name, calc, result } = req.body;
    const data = await calculationModel.create({
      name,
      calc,
      result,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getAllCalculations", async (req, res) => {
  try {
    const allCalculations = await calculationModel
      .find()
      .sort({ createdAt: -1 });
    res.status(200).json(allCalculations);
  } catch (error) {
    console.log(error);
  }
});

router.post('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const calculations = await calculationModel.deleteOne({_id : id})
        res.status(200).json(calculations)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
