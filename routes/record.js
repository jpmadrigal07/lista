const express = require("express");
const router = express.Router();
const Record = require("../models/record");
const _ = require("lodash");

// @route   GET api/user
// @desc    Get All Record
// @access  Public
router.get("/", async (req, res) => {
  const condition = !_.isNil(req.query.condition) ? JSON.parse(req.query.condition) : {};
  if (_.isNil(condition.deletedAt)) {
      condition.deletedAt = {
          $exists: false
      }
  }
  try {
    const getAllRecord = await Record.find(condition);
    res.json({
      dbRes: getAllRecord,
      isSuccess: true
    });
  } catch (error) {
    res.json({
      dbRes: err,
      isSuccess: false
    });
  }
});

// @route   GET api/record/:id
// @desc    Get Single Record
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const getRecord = await Record.findById({
      _id: req.params.id,
      deletedAt: {
        $exists: false
      }
    });
    res.json({
      dbRes: getRecord,
      isSuccess: true
    });
  } catch (error) {
    res.json({
      dbRes: err,
      isSuccess: false
    });
  }
});

// @route   POST api/record/add
// @desc    Add A Record
// @access  Private
router.post("/", async (req, res) => {
  const isCredit = req.body.isCredit;
  const cost = req.body.cost;
  const name = req.body.name;
  const remarks = req.body.remarks;
  if (!_.isNil(isCredit) && !_.isNil(cost) && !_.isNil(name) && !_.isNil(remarks)) {
    const newRecord = new Record({
      isCredit,
      cost,
      name,
      remarks,
    });
    try {
      const getRecord = await Record.find({
        isCredit,
        cost,
        name,
        remarks,
        deletedAt: {
          $exists: false
        }
      });
      if (getRecord.length === 0) {
        const createRecord = await newRecord.save();
        res.json({
          dbRes: createRecord,
          isSuccess: true
        });
      } else {
        res.json({
          dbRes: "Record must be unique.",
          isSuccess: false
        });
      }
    } catch (err) {
      res.json({
        dbRes: err,
        isSuccess: false
      });
    }
  } else {
    res.json({
      dbRes: "Required values are either invalid or empty.",
      isSuccess: false
    });
  }
});

// @route   PATCH api/record/:id
// @desc    Update A Record
// @access  Private
router.patch("/:id", async (req, res) => {
  let toUpdate = {};
  const cost = req.body.cost;
  const name = req.body.name;
  const isCredit = req.body.isCredit;
  const remarks = req.body.remarks;
  if (name) toUpdate.name = name;
  if (cost) toUpdate.cost = cost;
  if (isCredit) toUpdate.isCredit = isCredit;
  if (remarks) toUpdate.remarks = remarks;
  if (!_.isNil(isCredit) && !_.isNil(cost) && !_.isNil(name) && !_.isNil(remarks)) {
    try {
        const updateRecord = await Record.findByIdAndUpdate(req.params.id, {
          $set: toUpdate,
          updatedAt: Date.now(),
        }, {new: true});
        res.json({
          dbRes: updateRecord,
          isSuccess: true
        });
    } catch (err) {
      res.json({
        dbRes: err.message,
        isSuccess: false
      });
    }
  } else {
    res.json({
      dbRes: "Required values are either invalid or empty",
      isSuccess: false
    });
  }
});

// @route   DELETE api/record/:id
// @desc    Delete A Record
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getRecord = await Record.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false
      }
    });
    if (getRecord.length > 0) {
      const deleteRecord = await Record.findByIdAndUpdate(req.params.id, {
        $set: {
          deletedAt: Date.now(),
        },
      });
      res.json({
        dbRes: deleteRecord,
        isSuccess: true
      });
    } else {
      res.json({
        dbRes: "Record is already deleted.",
        isSuccess: false
      });
    }
  } catch (error) {
    res.json({
      dbRes: err,
      isSuccess: false
    });
  }
});

module.exports = router;