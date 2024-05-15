import React, { useState, useEffect } from "react";
import { BsCart4 } from "react-icons/bs";
import { BiWallet } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FaCommentDollar } from "react-icons/fa";
import { Hourglass } from 'react-loader-spinner'
import css from "./header.module.scss";
import logo from "../../assets/pokemon.png";
import Modal from '../Modal/Modal';
import History from "../History/History";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Header({ changeCurrency, cartItems, deleteItems, currency, setCartItems }) {
    const [showAddFounds, setShowAddFounds] = useState(false);
    const [walletMoney, setWalletMoney] = useState(0);
    const [showCart, setShowCart] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [historyPurchase, setHistoryPurchase] = useState([]);
    
    useEffect(() => {
      loadPurchasesFromLocalStorage();
  }, [cartItems]);

  function loadPurchasesFromLocalStorage() {
    let loadedPurchases = localStorage.getItem("pokemon_purchase");
    let loadedMoney = localStorage.getItem("wallet")
    if (loadedPurchases != null) {
      let purchases = JSON.parse(loadedPurchases);
      setHistoryPurchase(purchases)
    }

    if (loadedMoney != null) {
      setWalletMoney(loadedMoney)
    }
    
}
    function showFounds(e){
        e.preventDefault()
        showAddFounds ? setShowAddFounds(false) : setShowAddFounds(true)
    }


    function handleRechargeWallet(e){
      e.preventDefault();
      let val = e.target.elements.wallet.value;
      let sumTotal = Number(walletMoney) + Number(val);
      if (val != "" && val > 0 ) {
        if (walletMoney != "") {        
          setShowAddFounds(false);
          setWalletMoney(sumTotal);  
          localStorage.setItem('wallet', sumTotal);
          toast.success('Added funds', {
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
          setWalletMoney(val);
          localStorage.setItem('wallet', sumTotal);
        }       
      }else{
        toast.error('The value cannot be blank or zero', {
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

    

    const sumall =
    cartItems?.map(item => item.changePrice === "" ? item.originalPrice : item.changePrice ).reduce((prev, curr) => prev + curr, 0);
    
    function finalizePurchase(){
      setShowLoader(true)
      setTimeout(() => {
        setShowLoader(false);
        if (walletMoney >= sumall) {

          toast.success('Purchase successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            if (historyPurchase != "") {
              let concatArray = historyPurchase.concat(cartItems)
              
              localStorage.setItem("pokemon_purchase", JSON.stringify(concatArray));  
            }else{
              localStorage.setItem("pokemon_purchase", JSON.stringify(cartItems));
            } 
            
            setWalletMoney(walletMoney - sumall)
            setCartItems([]);
            setShowCart(false);
        }else{          
          toast.error('You don´t have enough funds :(', {
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
      }, 1000);             
    }

  return (
    <nav className={css.header}>
      <div className={css.div_header}>
        <div className={css.div_logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={css.currency_container}>
            <div className="wallet_container">
              <div className={css.wallet_row}>                  
                  <BiWallet className={css.icon_wallet}/>                  
                  <span className={css.wallet_label}>{"$" + walletMoney}</span>                  
                </div>
            </div>
            <div className={css.div_currency}>
                <select className={css.currency} id="currency" onChange={(e)=>changeCurrency(e)}>
                    <option value="MXN">MXN</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="CAD">CAD</option>
                    <option value="GBP">GBP</option>
                </select>
            </div>

            <div className={css.div_market}>            
                <div className="">
                    <button
                        type="button"
                        id="button-market"
                        className={css.btn_market}
                        onClick={(e)=>showFounds(e)}
                        >
                        <FaCommentDollar className={css.icon_dollar}/>
                    </button>
                {showAddFounds && 
                    <Modal show={showAddFounds} handleClose={()=>setShowAddFounds(false)}>
                        <h1>Add Founds to Wallet</h1>
                        <form onSubmit={handleRechargeWallet}>
                            <label htmlFor="fname" className={css.quantity_label}>Quantity:</label><br/>
                            <input type="number" className={css.wallet_input} name="wallet" /><br/>
                            <div className={css.confirm_row}>
                              <button
                              id="add_founds"
                              >Confirm</button>
                            </div>
                            
                        </form>                                                
                    </Modal>
                }   
                </div>
            </div>

            <div className="cart">
                <div className="product-row">
                    <div className="info-cart-product">
                        
                        <button type="button" className={css.btn_cart} onClick={()=>setShowCart(!showCart)}>
                          <BsCart4 className={css.cart_icon} />
                        </button>
                       
                        
                    </div>

                    {showCart && 
                    <Modal show={showCart} handleClose={()=>setShowCart(false)} cartItems={true}>
                        <h1>Cart Items</h1>
                        
                        {showLoader ? 
                          <div className={css.loader_row}>                        
                            <Hourglass
                              visible={showLoader}
                              height="80"
                              width="80"
                              ariaLabel="hourglass-loading"
                              wrapperStyle={{}}
                              wrapperClass=""
                              colors={['#ffcb05', '#233f77']}
                            /> 
                          </div>
                          : 
                          <div className={css.table_row}>
                          {cartItems != "" ? 
                          <>
                          
                          <table>
                          <tr>
                            <th>Item</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                          </tr>                            
                          {cartItems.map((item, id)=>{
                            return(
                              <tr key={id}>
                                <td>
                                  <img
                                      className={css.img_poke}
                                      src={item.image}
                                      alt="pokemon"
                                    />
                                </td>
                                <td style={{textTransform:"capitalize"}}>{item.name}</td>
                                <td>{"$"+(item.changePrice === "" ? item.originalPrice: item.changePrice)}<span className={css.currency_label}>{currency}</span></td>
                                <td><button type="button" className={css.button_delete} onClick={()=>deleteItems(item.name)}><RiDeleteBin2Line className={css.icon_delete}/></button></td>
                              </tr>
                            )
                          }) 
                          }
                        </table> 
                        <div className={css.total_row}>
                          <span className={css.total_label}>{"Total:$" + Math.round((sumall + Number.EPSILON) * 100) / 100}<span className={css.currency_label}>{currency}</span></span>
                        </div>
                        
                        <button type="button" className={css.btn_checkout} onClick={()=>finalizePurchase()}>Finish</button>
                        </>
                        : <span>No items yet</span>
                        }
                        
                      </div>
                          }                                                
                    </Modal>}
                </div>
            </div>
            <div className={css.history_row}>
                <button type="button" onClick={()=>setShowHistory(!showHistory)}>
                    <span>History</span>                    
                </button>
                {showHistory && 
                  <Modal cartItems={true} handleClose={()=>setShowHistory(false)}> 
                    <History historyPurchase={historyPurchase} currency={currency}/>
                </Modal>
                }
                
            </div>
        </div>
      </div>
    </nav>
  );
}
