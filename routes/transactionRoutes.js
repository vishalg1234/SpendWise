const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionCtrl");

// router object
const router = express.Router();

// routes
// add transaction POST method

router.post("/add-transaction", addTransaction);

// get transaction
router.post("/get-transaction", getAllTransaction);

router.post("/delete-transaction", deleteTransaction);
router.post("/update-transaction", updateTransaction);

module.exports = router;
