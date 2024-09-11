import React from "react";
import { Progress } from "antd";
const Analytics = ({ allTransaction }) => {
  // category
  const categories = [
    "salary",
    "food",
    "travel",
    "education",
    "shopping",
    "entertainment",
    "health",
    "utilities",
    "miscellaneous",
  ];

  // total transaction
  const totalTransaction = allTransaction.length;
  const totalIncomeTransactions = allTransaction.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransaction.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransaction) * 100;

  //total turnover
  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + parseInt(transaction.amount),
    0
  );
  const totalIncomeTurnover = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + parseInt(transaction.amount), 0);

  const totalExpenseTurnover = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + parseInt(transaction.amount), 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <div className="row m-3 text-lg">
        <div className="col-md-3">
          <div className="card block rounded-lg bg-white text-center  ">
            <div className="card-header  border-neutral-100 px-6 py-3 ">
              Total Transactions : {totalTransaction}
            </div>
            <div className="p-6">
              <div className="d-flex flex-column align-items-center">
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <h5 className="text-success p-2">
                  Income : {totalIncomeTransactions.length}
                </h5>
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2 mt-3"
                  percent={totalExpensePercent.toFixed(0)}
                />
                <h5 className="text-danger p-2">
                  Expense : {totalExpenseTransactions.length}
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card block rounded-lg bg-white text-center  ">
            <div className="card-header  border-neutral-100 px-6 py-3 ">
              Total TurnOver : {totalTurnover}
            </div>
            <div className="p-6">
              <div className="d-flex flex-column align-items-center">
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                />
                <h5 className="text-success p-2">
                  Income : {totalIncomeTurnover}
                </h5>
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2 mt-3"
                  percent={totalExpenseTurnoverPercent.toFixed(0)}
                />
                <h5 className="text-danger p-2">
                  Expense : {totalExpenseTurnover}
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card block rounded-lg bg-white text-center  ">
            <div className="card-header  border-neutral-100 px-6 py-3 ">
              Categorywise Income
            </div>
            <div className="p-2">
              {categories.map((category) => {
                const amount = allTransaction
                  .filter(
                    (transaction) =>
                      transaction.type === "income" &&
                      transaction.category === category
                  )
                  .reduce(
                    (acc, transaction) => acc + parseInt(transaction.amount),
                    0
                  );
                return (
                  amount > 0 && (
                    <div className="card mt-2">
                      <div className="card-body">
                        <h6>{category}</h6>
                        <Progress
                          percent={(
                            (amount / totalIncomeTurnover) *
                            100
                          ).toFixed(0)}
                        />
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card block rounded-lg bg-white text-center  ">
            <div className="card-header  border-neutral-100 px-6 py-3 ">
              Categorywise Expense
            </div>
            <div className="p-2">
              {categories.map((category) => {
                const amount = allTransaction
                  .filter(
                    (transaction) =>
                      transaction.type === "expense" &&
                      transaction.category === category
                  )
                  .reduce(
                    (acc, transaction) => acc + parseInt(transaction.amount),
                    0
                  );

                return (
                  amount > 0 && (
                    <div className="card mt-2">
                      <div className="card-body">
                        <h6>{category}</h6>
                        <Progress
                          percent={(
                            (amount / totalExpenseTurnover) *
                            100
                          ).toFixed(0)}
                        />
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3 analytics"></div>
    </>
  );
};

export default Analytics;
