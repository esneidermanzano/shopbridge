import React, { useState, useEffect } from 'react';
import { firebaseApi } from '../api/firebase';

/*  =============== StoreContext
Component that uses Context React API.

This component provides a global store for the application.
to make status updates more efficient than just using props
It's quite similar to redux functionality
*/

export const Store = React.createContext();

const StoreContext = (props) => {
   const [items, setItems] = useState([]);

   const handleSetItems = (elements) => {
      setItems(elements);
   };

   const fetchItems = () => {
      fetch(firebaseApi)
         .then((res) =>
            res.json().then((data) => {
               let items = [];
               for (let key in data) {
                  items.push({
                     id: key,
                     name: data[key].name,
                     description: data[key].description,
                     price: data[key].price,
                     image: data[key].image ? data[key].image : null,
                  });
               }
               handleSetItems(items);
            })
         )
         .catch((err) => {});
   };

   useEffect(() => {
      fetchItems();
   }, []);

   return (
      <Store.Provider value={{ items, setItems, fetchItems }}>
         {props.children}
      </Store.Provider>
   );
};

export default StoreContext;
