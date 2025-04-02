import { useContext } from "react"
import { ItemListContext } from "../context/Items"
import ItemInterface from "../interface/ItemInterface";
import { ModelContext } from "../context/ModelContext";


const Cart = () => {
    const itemContext = useContext(ItemListContext);
    const modelContext = useContext(ModelContext);
    if (!itemContext) {
        throw new Error("ItemListContext must be used within ItemListProvider");
      }

      if(!modelContext) throw new Error("Something went wrong iwth model context");

      const { items,removeCartItem } = itemContext;
      const {toggle} = modelContext;

      const cartItems = items.filter((dat:ItemInterface)=>{
        return dat.selected;
      });

      const total = cartItems.reduce((total,item)=>total+(item.quantity * item.price),0);
      

  return (
    <div className="bg-white rounded-md p-4">
        <header className="text-2xl text-red-400 font-semibold mb-4">Your cart({cartItems.length})</header>
        {cartItems.length === 0 && 
        <div className="flex items-center justify-center flex-col">
            <img src="/images/illustration-empty-cart.svg" />
            <p className="text-rose-400">Your added item will appear here</p>
        </div>
        }

        {
            cartItems.length !== 0 &&
            <>
            <ul className="space-y-6 mb-6">
                {
            cartItems.map((item:ItemInterface)=>(
                        <li className="flex items-center justify-between border-b border-b-rose-200 pb-4">
                            <section>
                            <header className="text-rose-900 font-bold">
                                {item.name}
                            </header>
                            <p className="space-x-6">
                                <span className="text-red-400">{item.quantity}x</span>
                                <span className="text-rose-400">@{item.price}</span>
                                <span className="text-rose-500">${item.quantity * item.price}</span>
                            </p>
                            </section>
                            <button onClick={()=>removeCartItem(item.id)} type="button" className="cursor-pointer border border-rose-400 transition delay-75 ease-in hover:border-rose-900 rounded-full p-1">
                                <img src="/images/icon-remove-item.svg" className="w-2 h-2"/>
                            </button>
                        </li>
                ))
            }
            </ul>
            <p className="flex justify-between items-center mb-6">
            <span className="text-rose-500">Order</span><span className="inline-flex ms-auto text-2xl text-rose-900">${total}</span>
            </p>
            <div className="bg-rose-100 p-2 flex items-center justify-center text-xs gap-2 rounded mb-6">
                <span><img src="/images/icon-carbon-neutral.svg" className="w-5 h-5"/></span>
                <span className="">This is a <b>carbon-neutral</b> delivery</span>
            </div>
            <button className="cursor-pointer bg-red-400 text-center text-rose-100 w-full py-2 rounded-full hover:bg-red-700" onClick={toggle} type="button">
                Confirm Order
            </button>
            </>
        }
    </div>
  )
}

export default Cart