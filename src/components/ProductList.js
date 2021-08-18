import React, { useState, useContext } from 'react';
import { Store } from '../store/StoreContext';
import { deleteItem } from '../api/firebase';
import Modal from './Modal';
import ProductForm from './ProductForm';
import styles from '../styles/ProductList.module.css';

/*  =============== ProductList
Complete componenet to list, delete and update products.

This component doesn't need props as it's data 
is obtained by glogal Store. If your purpose is to
update a product, ProductForm is called and it handle 
the rest operations

items => array: contains items to show
fetchItems => function: call api to reload itews
*/

const ProductList = () => {
   const [showModal, setShowModal] = useState(false);
   const [productToEdit, setProductToEdit] = useState(null);
   const { items, fetchItems } = useContext(Store);

   const handleDeleteItem = async (item) => {
      const confirm = window.confirm(
         `You're about to delete ${item.name}, \n ¿Are you sure you want to continue?`
      );
      if (confirm) {
         try {
            const result = await deleteItem(item.id);
            if (!result) throw new Error("Couldn't delete the item");
            fetchItems();
            alert(`Item ${item.name}, was deleted`);
         } catch (err) {
            console.log(err.message);
            alert("Couldn't delete the item, please reload page");
         }
      }
   };

   const handleUpdateProduct = (item) => {
      setProductToEdit(item);
      setShowModal(true);
   };

   if (!items.length) {
      return <p>There aren't any products</p>;
   }

   return (
      <div className={styles['product-list']}>
         <h1>Edit Products</h1>
         <table>
            <thead>
               <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th style={{ textAlign: 'center' }}> Image</th>
                  <th>Summary</th>
                  <th>Price</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
               </tr>
            </thead>
            <tbody>
               {items.map((item, i) => (
                  <React.Fragment key={`product${i}`}>
                     <tr>
                        <td>{i + 1}</td>
                        <td>{item.name}</td>
                        <td style={{ textAlign: 'center' }}>
                           <i
                              className={`fa ${
                                 item.image ? 'fa-check' : 'fa-times'
                              } `}
                           ></i>
                        </td>
                        <td className={styles['text-column']}>
                           {item.description}
                        </td>
                        <td>{item.price}</td>
                        <td style={{ textAlign: 'center' }}>
                           <button
                              value={i}
                              onClick={() => handleUpdateProduct(item)}
                              className={`fa fa-pen ${styles.button} `}
                           />
                           <button
                              onClick={() => handleDeleteItem(item)}
                              className={`fa fa-times ${styles.button} ${styles.delete}`}
                           />
                        </td>
                     </tr>
                  </React.Fragment>
               ))}
            </tbody>
         </table>
         <Modal show={showModal} toggle={setShowModal}>
            <ProductForm
               isUpdate={true}
               product={productToEdit}
               toggle={setShowModal}
            />
         </Modal>
      </div>
   );
};

export default ProductList;
