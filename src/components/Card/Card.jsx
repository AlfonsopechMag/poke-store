import React, { useEffect, useState } from "react";
import css from "./card.module.scss";
import axios from "axios";
import {
  URL_ESPECIES,
  URL_POKEMON,
} from "../../api/apiRest";

export default function Card({  card, rate, currency, addToCart }) {
  const [itemPokemon, setItemPokemon] = useState({});
  const [especiePokemon, setEspeciePokemon] = useState({});
  const [newRate, setNewRate] = useState(0)
  
  useEffect(() => {
    const dataPokemon = async () => {
      const api = await axios.get(`${URL_POKEMON}/${card.name}`);

      setItemPokemon(api.data);
    };
    dataPokemon();
  }, [card]);

  useEffect(()=>{
    handleExchange(itemPokemon.base_experience);
  }, [rate])

  useEffect(() => {
    const dataEspecie = async () => {
      const URL = card.url.split("/");

      const api = await axios.get(`${URL_ESPECIES}/${URL[6]}`);
      setEspeciePokemon({
        url_especie: api?.data?.evolution_chain,
        data: api?.data,
      });
    };
    dataEspecie();
    
  }, [card]);

  
  function handleExchange(value){
    let realExchange = 0;
    
    if (rate === 0) {
      realExchange = itemPokemon.base_experience
    }else{
      let makeExchage = value * rate;
      let rounded = Math.round((makeExchage + Number.EPSILON) * 100) / 100;
      realExchange = rounded;
      setNewRate(realExchange)
    }
    

    return realExchange;
  }

  return (
    <div className={css.card}>
      <img
        className={css.img_poke}
        src={itemPokemon?.sprites?.other["official-artwork"]?.front_default}
        alt="pokemon"
      />
      <div
        className={`bg-${especiePokemon?.data?.color?.name} ${css.sub_card}  `}
      >
        
        <strong className={css.name_card}> {itemPokemon.name} </strong>        
        <div className={css.div_stats}>
          {itemPokemon?.stats?.map((sta, index) => {
            return (
              <h6 key={index} className={css.item_stats}>
                <span className={css.name}> {sta.stat.name} </span>
                <progress value={sta.base_stat} max={110}></progress>
                <span className={css.numero}> {sta.base_stat} </span>
              </h6>
            );
          })}
          {rate === 0 ? 
          <span className={css.price_label}> Price: ${itemPokemon.base_experience} 
          <span className={css.currency_icon}>{currency}</span></span> :
          <span className={css.price_label}> Price: $ { newRate} 
          <span className={css.currency_icon}>{currency}</span></span> 
          }
          
          
          <div className="button_buy">
            <button type="button" onClick={()=>addToCart({image: itemPokemon?.sprites?.other["official-artwork"]?.front_default, name: itemPokemon.name ,
              originalPrice: itemPokemon.base_experience ,changePrice: currency !== "MXN" ? newRate : "", currency: currency })}>
                Comprar
            </button>
          </div> 
        </div>           
      </div>
    </div>
  );
}
