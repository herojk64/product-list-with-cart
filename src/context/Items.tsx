import { createContext, ReactNode, useEffect, useState } from "react";
import ItemInterface from "../interface/ItemInterface";
import Lists from '../json/data.json'

interface ItemListContextType {
    items: ItemInterface[];
    addItem: (id:number)=>void;
    increaseQuantity: (id:number)=>void;
    decreaseQuantity: (id:number)=>void;
    removeCartItem: (id:number)=>void;
    reset:()=>void;
}

const ItemListContext = createContext<ItemListContextType | undefined>(undefined);

const getData = () =>{
    const data = localStorage.getItem('items');
    if(data){
        return JSON.parse(data);
    }
    
    const newList = Lists.map((list,index)=>({...list,selected:false,quantity:0,id:index+1}));
    localStorage.setItem('items',JSON.stringify(newList));
    return newList;
}

const ItemList = ({children}:{children:ReactNode})=>{
    const [items,setItems] = useState<ItemInterface[]>([]);

    useEffect(()=>{
        const data = getData();
        setItems(data);
    },[]);

    const addItem = (id: number) => {
        setItems((prevItems: ItemInterface[]) =>{
            const temp = prevItems.map((item) =>
                item.id === id ? { ...item, selected: true,quantity:1 } : item
            )
            localStorage.setItem('items',JSON.stringify(temp));
            return temp
        }
        );
    };

    const increaseQuantity = (id:number) =>{
        setItems((prevItem)=>{
            const temp = prevItem.map((item)=> item.id === id? {...item,quantity:Math.max(0, item.quantity + 1)}:item)
            localStorage.setItem('items',JSON.stringify(temp));
            return temp;    
        }
        )

        localStorage.setItem('items',JSON.stringify(items));
    }

    const decreaseQuantity = (id: number) => {
        setItems((prevItems) =>{
           const temp = prevItems.map((item) =>
            item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity - 1) } // Prevent negative values
            : item
            
            )
            localStorage.setItem('items',JSON.stringify(temp))
            return temp;
        }
        );
    };

    const reset= ()=>setItems(prevItem=>prevItem.map(item=>({...item,selected:false,quantity:0})));

    const removeCartItem = (id:number)=>{
        setItems((prevItem:ItemInterface[])=>{
            const temp = prevItem.map((item)=>(item.id === id?{...item,selected:false,quantity:0}:item));
            localStorage.setItem('items',JSON.stringify(temp));
            return temp;
        })

      }

    return (
    <ItemListContext.Provider value={{ items,addItem,increaseQuantity,decreaseQuantity,removeCartItem,reset }}>
        {children}
    </ItemListContext.Provider>
    );
}

export { ItemListContext, ItemList }; 