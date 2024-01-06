import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";

const Calculator = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [expression, setExpression] = useState<string>("");
  const inputValor = watch("input-valor", "");

  const onSubmit = (data: { "input-valor": string }) => {
    setExpression(data["input-valor"]);
  };

  const handleButtonClick = (value: string) => {
    setValue("input-valor", (prevValue: any) => prevValue + value);
  };

  const handleOperatorClick = (operator: string) => {
    setValue("input-valor", (prevValue: any) => prevValue + operator);
  };

  const handleClearClick = () => {
    setValue("input-valor", "");
  };

  const handleEqualsClick = () => {
    try {
      const result = eval(expression);
      setValue("input-valor", result);
    } catch (error) {
      alert("Erro na expressão");
    }
  };

  const inputProps = register("input-valor");

  return (
    <section id="calculadora">
      <form onSubmit={handleSubmit(onSubmit)}>
        <header className="top">
          <div className="input-valor" {...inputProps}></div>
        </header>
        <ul className="key">
          {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."].map((value) => (
            <li key={value} onClick={() => handleButtonClick(String(value))}>
              {value}
            </li>
          ))}
          {["/", "*", "-", "+"].map((operator) => (
            <li
              key={operator}
              className="operador"
              onClick={() => handleOperatorClick(operator)}
            >
              {operator}
            </li>
          ))}
          <li onClick={handleClearClick}>c</li>
          <li className="verificar" onClick={handleEqualsClick}>
            =
          </li>
        </ul>
        <div className="contribuição">
          <fieldset>
            <legend>Contribuição: </legend>
            {[17, 20, 25].map((percentage) => (
              <div key={percentage}>
                <label htmlFor={`${percentage}%`}>
                  <input
                    type="radio"
                    id={`${percentage}%`}
                    name="contribuicao"
                    value={percentage}
                    // ref={register}
                  />
                  {`${percentage}%`}
                </label>
              </div>
            ))}
          </fieldset>
        </div>
        <div>
          Valor final: <span className="valor-final">{inputValor}</span>
        </div>
      </form>
    </section>
  );
};

export default Calculator;
