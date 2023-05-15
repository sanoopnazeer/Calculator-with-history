import React, { useState } from "react";
import "./Calculator.css";
import { saveCalc } from "../axios/services/calculatorServices";
import CalculationHistory from "./CalculationHistory";

const Calculator = () => {
  const [calc, setCalc] = useState("0");
  const [result, setResult] = useState("0");
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);

  const handleChange = () => {
    setCount(count + 1);
  };

  const handleClick = (e) => {
    if (
      result === "Error" ||
      result === "NaN" ||
      result === "0" ||
      result === "Infinity"
    ) {
      setResult(e.target.name);
    } else {
      setCalc(result.concat(e.target.name));
      setResult(result.concat(e.target.name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let form = document.forms[1];
      let name = form.elements["name"].value;
      if (name) {
        await saveCalc({ name, calc, result });
        setName("");
        handleChange();
        clear();
      } else {
        window.alert("Enter calculation name to SAVE");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRecalculate = (data) => {
    setResult(data);
  };

  const clear = () => {
    setCalc("0");
    setResult("0");
  };

  const backspace = () => {
    setCalc(result.slice(0, -1));
    setResult(result.slice(0, -1));
  };

  const calculate = () => {
    try {
      if (result.includes("%")) {
        const resultWithoutPercent = result.replace("%", "");
        const ans = eval(resultWithoutPercent);
        const percentage = ans / 100;
        setCalc(result);
        setResult(percentage.toString());
      } else {
        setCalc(result);
        setResult(eval(result).toString());
      }
    } catch (err) {
      setResult("Error");
    }
  };

  return (
    <>
      <div className="calculator">
        <div className="title" style={{color : "white"}}>
          <h5>CALCULATOR</h5>
        </div>
        <form>
          <input type="text1" value={result} />
        </form>

        <div className="keypad">
          <button className="highlight1" onClick={clear}>
            AC
          </button>
          <button className="highlight1" onClick={backspace} id="backspace">
            &larr;
          </button>
          <button className="highlight1" name="%" onClick={handleClick}>
            %
          </button>
          <button className="highlight" name="/" onClick={handleClick}>
            &divide;
          </button>
          <button className="number" name="7" onClick={handleClick}>
            7
          </button>
          <button className="number" name="8" onClick={handleClick}>
            8
          </button>
          <button className="number" name="9" onClick={handleClick}>
            9
          </button>
          <button className="highlight" name="*" onClick={handleClick}>
            &times;
          </button>
          <button className="number" name="4" onClick={handleClick}>
            4
          </button>
          <button className="number" name="5" onClick={handleClick}>
            5
          </button>
          <button className="number" name="6" onClick={handleClick}>
            6
          </button>
          <button className="highlight" name="-" onClick={handleClick}>
            &ndash;
          </button>
          <button className="number" name="1" onClick={handleClick}>
            1
          </button>
          <button className="number" name="2" onClick={handleClick}>
            2
          </button>
          <button className="number" name="3" onClick={handleClick}>
            3
          </button>
          <button className="highlight" name="+" onClick={handleClick}>
            +
          </button>
          <button className="number" name="0" onClick={handleClick} id="zero">
            0
          </button>
          <button className="number" name="." onClick={handleClick}>
            .
          </button>
          <button className="highlight" onClick={calculate}>
            =
          </button>
        </div>
      </div>

      <div className="save-section">
        <div className="heading">
          <h5>CALCULATION NAME</h5>
        </div>

        <div className="input-section">
          <form>
            <input
              name="name"
              // id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </form>
          <div className="button">
            <button className="btn btn-sm btn-success" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="calculation-history-section" >
        <CalculationHistory count={count} sendData={handleRecalculate} />
      </div>
    </>
  );
};

export default Calculator;
