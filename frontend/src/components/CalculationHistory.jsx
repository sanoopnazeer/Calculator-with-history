import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  allCalculations,
  deleteCalc,
} from "../axios/services/calculatorServices";

const CalculationHistory = ({ count, sendData }) => {
  const [allCalc, setAllCalc] = useState("");

  const fetchData = async () => {
    const calcHistory = await allCalculations();
    setAllCalc(calcHistory);
  };

  useEffect(() => {
    fetchData();
  }, [count]);

  const handleDelete = async (row) => {
    const calcId = row._id;
    await deleteCalc(calcId);
    fetchData();
  };

  const handleRecalculate = async (row) => {
    const recalc = row.calc;
    sendData(recalc)
  }

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Calculation",
      selector: (row) => row.calc,
    },
    {
      name: "Result",
      selector: (row) => row.result,
    },
    {
      name: "",
      selector: (row) => {
        return (
          <div onClick={() => handleRecalculate(row)}>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="blue"
              class="bi bi-arrow-clockwise"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
            </svg>
          </div>
        );
      },
    },
    {
      name: "",
      selector: (row) => {
        return (
          <div onClick={() => handleDelete(row)}>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="red"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
            </svg>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <h4>CALCULATION HISTORY</h4>
      <div className="history" style={{width: '850px'}}>
      <DataTable
        columns={columns}
        data={allCalc}
        // fixedHeader
        // fixedHeaderScrollHeight="500px"
        selectableRows
        // selectableRowsHighlight
        highlightOnHover
        // pagination
      />
      </div>
    </>
  );
};

export default CalculationHistory;
