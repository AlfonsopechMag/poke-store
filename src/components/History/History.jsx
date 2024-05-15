import css from "./history.module.scss";

export default function History({historyPurchase,currency}){

    return(
        <div>
            <h1>Purchases History</h1>
            <div className={css.history_row}>
                <table>
                    <tr>
                        <th>Item</th>
                        <th>Name</th>
                        <th>Price</th>
                        
                    </tr>                            
                    {historyPurchase.map((item, id)=>{
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
                            <td>{"$"+item.originalPrice}<span className={css.currency_label}>{currency}</span></td>
                        </tr>
                        )
                    }) 
                    }
                </table> 
            </div>
        </div>
    )
}