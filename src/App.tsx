import { useContext } from 'react'
import ItemInterface from './interface/ItemInterface';
import './App.css'
import { ItemListContext } from './context/Items'
import Card from './components/Card';
import Cart from './components/Cart';
import Model from './components/Model';

function App() {
  const context = useContext(ItemListContext);
  
  if (!context) {
    throw new Error("ItemListContext must be used within ItemListProvider");
  }

  const { items } = context;

  return (
    <div className='App'>
      <div className='sm:grid sm:grid-cols-[1fr_20%] sm:gap-4 sm:space-y-0 space-y-8'>
        <section>
          <header className='text-4xl text-rose-900 font-bold mb-6 space-y-5 sm:space-y-0'>Deserts</header>
          <main className='sm:grid sm:grid-cols-3 sm:gap-4 md:gap-6 sm:space-y-0 space-y-8'>
          {items && items.map((item:ItemInterface)=>{
            return <Card item={item} key={item.id} />
          })
          }
          </main>
        </section>
        <section>
          <Cart />
        </section>
      </div>
      <Model />
    </div>
  )
}

export default App
