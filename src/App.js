import React, { useState, useEffect } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const App = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://wizard-world-api.herokuapp.com/houses"
        );
        setHouses(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  let arr = [];
  if (!houses.length) {
    return;
  }
  const someMagic = (stringTosplit) => {
    let newItem = stringTosplit.split(" ");
    let newItemLowercase = newItem.map((color) => color.toLowerCase());
    newItemLowercase = newItemLowercase.filter((e) => e !== "and");
    return newItemLowercase;
  };
  houses.map((item) => {
    arr.push({
      animal: item.animal,
      founder: item.founder,
      houseColours: someMagic(item.houseColours),
      name: item.name,
    });
  });

  function isColorValid(color) {
    const div = document.createElement("div");
    div.style.color = color;
    return div.style.color !== "";
  }

  return (
    <div>
      <h1>Houses</h1>
      {loading ? (
        <ClipLoader css={override} size={150} />
      ) : (
        <div>
          {arr.map((house) => (
            <div
              style={{
                width: "500px",
                border: "2px solid white",
                marginTop: "20px",
                borderRadius: "8px",

                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  margin: "10px",
                }}>
                <h2 style={{}}>{house.name}</h2>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginRight: "5px",
                  }}>
                  {house.animal}
                </p>
              </div>
              <div
                key={house.id}
                className='house-card'
                style={{
                  background: `linear-gradient(0.25turn, ${
                    isColorValid(house.houseColours[0])
                      ? house.houseColours[0]
                      : "white"
                  }, ${
                    isColorValid(house.houseColours[1])
                      ? house.houseColours[1]
                      : "black"
                  })`,
                  height: "20px",
                  width: "95%",
                  marginLeft: "10px",
                  display: "flex",
                  justifyContent: "center",
                  border: "2px solid white",
                  borderRadius: "4px",
                }}
              />
              <div style={{ margin: "10px", display: "flex" }}>
                <p style={{ marginRight: "5px" }}>Founder: </p>
                <p style={{ fontWeight: "700" }}>{house.founder}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
