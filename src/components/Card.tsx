import { useContext } from "react"
import ItemInterface from "../interface/ItemInterface"
import { ItemListContext } from "../context/Items"
const Card = ({ item }: { item: ItemInterface }) => {
    const itemContext = useContext(ItemListContext);
    if(!itemContext){
        throw new Error('Something wrong with context');
    }

    const {addItem,decreaseQuantity,increaseQuantity} = itemContext;

    return (
        <article className="">
            <div className="relative">
            <div className="w-full mb-6 h-48 overflow-hidden rounded-md">
                <picture className="w-full h-full object-fill block">
                    <source media="(min-width:650px)" srcSet={`/images/${item.image?.tablet}`} />
                    <source media="(min-width:465px)" srcSet={`/images/${item.image?.mobile}`} />
                    <img
                        src={`/images/${item.image?.desktop}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                    />
                </picture>
                </div>
                {
            !item.selected && 
            <button type="button" className="group cursor-pointer w-fit border border-red-400 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10 bg-white py-2 px-4 flex items-center justify-center rounded-full gap-2 text-center" onClick={()=>addItem(item.id)}>
                <img src="/images/icon-add-to-cart.svg" className="w-5 h-5" />
                <span className="text-nowrap text-rose-900 transition delay-75 ease-in-out group-hover:text-red-400">
                Add to Cart
                </span>
                </button>
            }
            {
                item.selected && 
                <div className="w-fit border border-red-400 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10 bg-red-400 text-rose-100 py-2 px-4 flex items-center justify-between rounded-full gap-2 text-center">
                    <button type="button" className="cursor-pointer" onClick={()=>decreaseQuantity(item.id)}>
                        <img src="/images/icon-decrement-quantity.svg" className="h-4 w-4"/>
                        </button>
                    <input type="disabled" value={item.quantity} className="w-[4ch] text-center"/>
                    <button type="button" className="cursor-pointer" onClick={()=>increaseQuantity(item.id)}>
                        <img src="/images/icon-increment-quantity.svg" className="h-4 w-4"/>
                    </button>
                </div>
            }
            </div>
            
            
            <p className="text-xs text-rose-500">{item.category}</p>
            <header className="text-rose-900">{item.name}</header>
            <p className="text-red-400">${item.price}</p>
        </article>
    )
}

export default Card