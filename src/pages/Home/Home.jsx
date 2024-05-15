import React, { useEffect, useState } from "react";
import axios from "axios";
import css from "./home.module.scss";
import * as FaIcons from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../components/Header/Header"
import Card from "../../components/Card/Card";
import { URL_POKEMON, URL_DIVISAS } from "../../api/apiRest";


export default function Home() {
  const [arrayPokemon, setArrayPokemon] = useState([]);
  const [globalPokemon, setGlobalPokemon] = useState([]);
  const [xpage, setXpage] = useState(1);
  const [currency, setCurrency] = useState("MXN");
  const [rate, setRate] = useState(0);
  const [addCart, setAddCart] = useState([]);

  useEffect(() => {
    const api = async () => {
      const limit = 15;
      const xp = (xpage - 1) * limit;
      const apiPoke = await axios.get(
        `${URL_POKEMON}?offset=${xp}&limit=${limit}`
      );

      setArrayPokemon(apiPoke.data.results);
    };

    api();
    getGlobalPokemons();
  }, [xpage]);

  function handleCurrency(e){
    let currencyNew = e.target.value;         
  
    const apiExchange = async () => {
      const apiCurrency = await axios.get(
        `${URL_DIVISAS}base=MXN&target=${currencyNew === "" ? currency : currencyNew}`
      );
      let currencyChange = apiCurrency.data.exchange_rates;
      setCurrency(currencyNew)
      setRate(currencyChange[currencyNew]);
    };
      
    apiExchange();
}


  const getGlobalPokemons = async () => {
    const res = await axios.get(`${URL_POKEMON}?offset=0&limit=1000`);

    const promises = res.data.results.map((pokemon) => {
      return pokemon;
    });

    const results = await Promise.all(promises);
    setGlobalPokemon(results);
  };

  function handleAddToCart(newObj){ 
    
    let filteredItems = addCart.filter((item) => {
      return item.name === newObj.name;
    });
    if (filteredItems.length === 0) {
      setAddCart([...addCart, newObj])
      toast.success('Item added to Cart', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
    }else{
      toast.error('Cannot be added, duplicate element', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });            
    }
    
  }

  function deleteItems(taskId) {
    let filteredItems = addCart.filter((item) => {
      return item.name !== taskId;
    });
    setAddCart(filteredItems);
    toast.error('Item removed from Cart ', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });    
}


  return (
    <div className={css.layout}>
      <ToastContainer />
      
      <Header changeCurrency={handleCurrency} cartItems={addCart} deleteItems={deleteItems} currency={currency} setCartItems={setAddCart}/>
      <section className={css.section_pagination}>
        <div className={css.div_pagination}>
          <span className={css.item_izquierdo}
          
          onClick={() => {
            if (xpage === 1) {
              return console.log("no puedo retroceder");
            }
            setXpage(xpage - 1);
          }}
          
          >
            <FaIcons.FaAngleLeft />
          </span>
          <span className={css.item}> {xpage} </span>
          <span className={css.item}> DE </span>
          <span className={css.item}>
            {" "}
            {Math.round(globalPokemon?.length / 15)}{" "}
          </span>
          <span
            className={css.item_derecho}
            onClick={() => {
              if (xpage === 67) {
                return console.log("es el ultimo");
              }
              setXpage(xpage + 1);
            }}
          >
            {" "}
            <FaIcons.FaAngleRight />{" "}
          </span>
        </div>
      </section>

      <div className={css.card_content}>
        {arrayPokemon.map((card, index) => {          
          return <Card key={index} card={card} rate={rate} currency={currency} addToCart={handleAddToCart}/>;
        })}
      </div>
    </div>
  );
}
