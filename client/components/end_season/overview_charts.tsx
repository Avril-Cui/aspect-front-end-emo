import styles from "./overview_charts.module.css";
import { useState, useEffect } from "react";
import SectorTemplate from "./compGraph/sectorTemplate";

const OverviewChart = (props:any) => {
  const [category, setCategory] = useState(1);
  const [compGraph, setCompGraph] = useState(1);

  function handleCategory(num: any) {
    setCategory(num);
  }
  const [price_data, setPrice] = useState({
    ast: {
      end_price: 0,
      pct_change: 0,
    },
    dsc: {
      end_price: 0,
      pct_change: 0,
    },
    fsin: {
      end_price: 0,
      pct_change: 0,
    },
    hhw: {
      end_price: 0,
      pct_change: 0,
    },
    jky: {
      end_price: 0,
      pct_change: 0,
    },
    sgo: {
      end_price: 0,
      pct_change: 0,
    },
    wrkn: {
      end_price: 0,
      pct_change: 0,
    },
    index: {
      end_price: 0,
      pct_change: 0,
    },
  });
  const [isPrice, setIsPrice] = useState<boolean>(false);

  useEffect(() => {
    const axios = require("axios");
    axios({
      method: "POST",
      url: `${process.env.serverConnection}/end-game-prices`,
    })
      .then(function (response: any) {
        setPrice(response.data)
        setIsPrice(true);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div>
        <div
          className={styles.inline}
          style={{ marginLeft: "-0.75em", marginTop: "0.5em" }}
        >
          <button
            className={category == 1 ? styles.tyle_btn_shadow : styles.tyle_btn}
            onClick={() => handleCategory(1)}
          >
            <p>Indices</p>
          </button>
          <button
            className={category == 2 ? styles.tyle_btn_shadow : styles.tyle_btn}
            onClick={() => handleCategory(2)}
          >
            <p>I.T.</p>
          </button>
          <button
            className={category == 3 ? styles.tyle_btn_shadow : styles.tyle_btn}
            onClick={() => handleCategory(3)}
          >
            <p>Healthcare</p>
          </button>
          <button
            className={category == 4 ? styles.tyle_btn_shadow : styles.tyle_btn}
            onClick={() => handleCategory(4)}
          >
            <p>Financials</p>
          </button>
          <button
            className={category == 5 ? styles.tyle_btn_shadow : styles.tyle_btn}
            onClick={() => handleCategory(5)}
          >
            <p>Retail</p>
          </button>

          <button
            className={category == 6 ? styles.tyle_btn_shadow : styles.tyle_btn}
            onClick={() => handleCategory(6)}
          >
            <p>Cons. Disc.</p>
          </button>

          <button
            className={category == 7 ? styles.tyle_btn_shadow : styles.tyle_btn}
            onClick={() => handleCategory(7)}
          >
            <p>Communications</p>
          </button>
        </div>
      </div>
      {category === 1 && (
        <div
          style={{
            height: 580,
            width: 1240,
            marginTop: "2.25em",
            marginLeft: "0em",
          }}
        >
          <SectorTemplate
            compGraph={compGraph}
            setCompGraph={setCompGraph}
            category={category}
            comp_names={["APINX"]}
            price_data={price_data}
            isPrice={isPrice}
          />
        </div>
      )}

      {category === 2 && (
        <div
          style={{
            height: 580,
            width: 1240,
            marginTop: "2.25em",
            marginLeft: "0em",
          }}
        >
          <SectorTemplate
            compGraph={compGraph}
            setCompGraph={setCompGraph}
            category={category}
            comp_names={["WRKN"]}
            price_data={price_data}
            isPrice={isPrice}
          />
        </div>
      )}

      {category === 3 && (
        <div
          style={{
            height: 580,
            width: 1240,
            marginTop: "2.25em",
            marginLeft: "0em",
          }}
        >
          <SectorTemplate
            compGraph={compGraph}
            setCompGraph={setCompGraph}
            category={category}
            comp_names={["SGO"]}
            price_data={price_data}
            isPrice={isPrice}
          />
        </div>
      )}

      {category === 4 && (
        <div
          style={{
            height: 580,
            width: 1240,
            marginTop: "2.25em",
            marginLeft: "0em",
          }}
        >
          <SectorTemplate
            compGraph={compGraph}
            setCompGraph={setCompGraph}
            category={category}
            comp_names={["JKY"]}
            price_data={price_data}
            isPrice={isPrice}
          />
        </div>
      )}

      {category === 5 && (
        <div
          style={{
            height: 580,
            width: 1240,
            marginTop: "2.25em",
            marginLeft: "0em",
          }}
        >
          <SectorTemplate
            compGraph={compGraph}
            setCompGraph={setCompGraph}
            category={category}
            comp_names={["HHW"]}
            price_data={price_data}
            isPrice={isPrice}
          />
        </div>
      )}

      {category === 6 && (
        <div
          style={{
            height: 580,
            width: 1240,
            marginTop: "2.25em",
            marginLeft: "0em",
          }}
        >
          <SectorTemplate
            compGraph={compGraph}
            setCompGraph={setCompGraph}
            category={category}
            comp_names={["FSIN"]}
            price_data={price_data}
            isPrice={isPrice}
          />
        </div>
      )}

      {category === 7 && (
        <div
          style={{
            height: 580,
            width: 1240,
            marginTop: "2.25em",
            marginLeft: "0em",
          }}
        >
          <SectorTemplate
            compGraph={compGraph}
            setCompGraph={setCompGraph}
            category={category}
            comp_names={["DSC"]}
            price_data={price_data}
            isPrice={isPrice}
          />
        </div>
      )}
    </div>
  );
};

export default OverviewChart;
