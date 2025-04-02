import { useContext } from "react";
import { ItemListContext } from "../context/Items";
import ItemInterface from "../interface/ItemInterface";
import { ModelContext } from "../context/ModelContext";

const Model = () => {

    const itemContext = useContext(ItemListContext);
    const modelContext = useContext(ModelContext);
    if(!itemContext){
        throw new Error('Something wrong with context');
    }

    if(!modelContext){
        throw new Error('Something wrong with model context');
    }

    const {items,reset} = itemContext;

    const {open,toggle} = modelContext;

    const cartItems = items.filter((dat:ItemInterface)=>{
        return dat.selected;
      });

      const total = cartItems.reduce((total,item)=>total+(item.quantity * item.price),0);

      const startNew=()=>{
        reset();
        toggle();
      }

      if(!open) return <></>;

  return (
    <div className='bg-black/50 z-20 fixed top-0 left-0 min-h-screen w-full flex items-center justify-center' onClick={toggle}>
          <article className='bg-white p-4 rounded-md w-full sm:w-auto sm:min-w-sm' onClick={(e) => e.stopPropagation()}>
            <img src="/images/icon-order-confirmed.svg"  className='w-8 h-8 mb-4'/>
            <header className="text-2xl font-bold text-rose-900">Order <br /> Confirmed</header>
            <p className="mb-6 text-xs text-rose-300">We hope you enjoy your food!</p>
            <ul className="bg-rose-100 w-full overflow-y-auto max-h-[70vh] px-2 rounded-t-md">
                {cartItems && cartItems.map((dat,index)=>{
                    const isLast = index === items.length - 1;
                    const name = dat.name.length >20? dat.name.slice(0,20)+"...":dat.name;
                    return (
                        <li key={dat.id} className={`flex items-center gap-2 py-5 ${!isLast ? "border-b border-b-rose-200" : ""}`}>
                            <img className="rounded-md" src={`/images/${dat.image.thumbnail}`} />
                            <div>
                            <div className="text-rose-900 font-bold">{name}</div>
                            <div className="flex items-center gap-4"><span className="text-red-400">{dat.quantity}x</span><span className="text-rose-500">@ ${dat.price}</span></div>
                            </div>
                            <div className="ms-auto">{dat.quantity * dat.price}</div>
                        </li>
                    )
                })}
            </ul>
                <div className="bg-rose-100 rounded-b-md border-t border-t-rose-200 w-full flex items-center mb-4 p-2 justify-between"><span className="text-rose-500">Order Total</span><span className="font-bold text-rose-900 text-2xl">${total}</span></div>
                <button type='button' className="py-1 text-rose-100 hover:bg-red-800 transition ease-in-out w-full text-center rounded-full bg-red-400" onClick={startNew}>Start New Order</button>
          </article>
      </div>
  )
}

export default Model