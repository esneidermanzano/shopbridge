import { useState, useContext, useRef } from 'react';
import { Store } from '../store/StoreContext';
import { saveProduct, uploadImage, updateItem } from '../api/firebase';
import Loading from './Loading';
import styles from '../styles/ProductForm.module.css';

/*  =============== ProductFrom
Complete componenet to create and edit product.

- To use this component you need to include it without props
if your goal is to create products.
- To update a product use props flag isUpdate={true}
and complete information as product and toggle.
-Toggle fucntion is ised to show this component in modal component,
so be sure you pass it properly, otherwise it would need a refactor

toggle => function: that hide or show this modal
product => object: contains product to edit
isUpdate => boolean: turn on update mode
*/

const ProductFrom = ({ isUpdate, product, toggle }) => {
   const [name, setName] = useState(isUpdate ? product.name : '');
   const [price, setPrice] = useState(isUpdate ? product.price : 0);
   const [description, setDescription] = useState(
      isUpdate ? product.description : ''
   );
   const [image, setImage] = useState(isUpdate ? product.image : null);
   const [loading, setLoading] = useState(false);
   const { fetchItems } = useContext(Store);
   const inputFileRef = useRef();

   const handleProductName = (event) => {
      if (
         /^[a-z0-9-]+$/.test(
            event.target.value.replace(/\s/g, '').toLowerCase()
         )
      ) {
         setName(event.target.value.trim());
      }
   };

   const handleProductPrice = (event) => {
      setPrice(event.target.value.replace(/^0+/, ''));
   };

   const handleProductDesc = (event) => {
      if (
         /^[a-z0-9-()!?¿:.]+$/.test(
            event.target.value.replace(/\s/g, '').toLowerCase()
         )
      ) {
         setDescription(event.target.value.trim());
      }
   };

   const handleUploadImage = (event) => {
      let image = event.target.files[0];
      if (image.size < 5100000) {
         setImage(image);
      } else {
         alert('The image is larger than 5MB');
      }
   };

   const handleDeleteImage = () => {
      inputFileRef.current.files = null;
      setImage(null);
   };

   const getProductdata = (imageUrl) => {
      const data = {
         name,
         price,
         description,
         image: imageUrl ? imageUrl : image,
      };
      return data;
   };

   const cleanState = () => {
      setName('');
      setPrice(0);
      setDescription('');
      setImage(null);
   };

   const handleSubmitProduct = async (event) => {
      event.preventDefault();
      setLoading(true);
      try {
         let imageUrl = null;

         if (image) {
            imageUrl = await uploadImage(image);
            if (!imageUrl) {
               throw new Error('Cannot upload image to firebase');
            }
         }

         const data = getProductdata(imageUrl);
         const response = await saveProduct(data);

         if (!response.ok) {
            throw new Error(
               `Problems trying to submit data!, image ref :/images/${image.name}`
            );
         }
         await fetchItems();
         alert('The product was created succesfully');
         cleanState();
      } catch (err) {
         console.log(err.message);
         alert("something went wrong, we're working to solve it soon!");
      }
      setLoading(false);
   };

   const handleEditProdut = async (event) => {
      event.preventDefault();
      setLoading(true);
      try {
         let imageUrl = null;
         if (product.image !== image) {
            if (image) {
               imageUrl = await uploadImage(image);
               if (!imageUrl) {
                  throw new Error('Cannot upload image to firebase');
               }
            }
         }

         const data = getProductdata(imageUrl);
         const result = await updateItem(data, product.id);
         if (!result) {
            throw new Error('could not update product');
         } else {
            fetchItems();
            setLoading(false);
            alert('Product was updated');
            toggle(false);
         }
      } catch (err) {
         console.log(err.message);
         setLoading(false);
         alert("Product couldn't be deleted!, we're solving the issue");
      }
   };

   return (
      <div className={styles['product-form']}>
         <h1>{isUpdate ? 'Update Product ' : 'Create a Product'} </h1>
         <form onSubmit={isUpdate ? handleEditProdut : handleSubmitProduct}>
            <label htmlFor="product-name">Product Name</label>
            <input
               disabled={loading}
               value={name}
               id="product-name"
               type="text"
               required
               onChange={handleProductName}
            />

            <label htmlFor="product-price">Price</label>
            <input
               disabled={loading}
               value={price}
               id="product-price"
               type="number"
               min="1"
               step="0.01"
               onChange={handleProductPrice}
            />

            <label htmlFor="product-desc">Description</label>
            <textarea
               disabled={loading}
               value={description}
               id="product-desc"
               rows="4"
               cols="50"
               required
               onChange={handleProductDesc}
            />
            <br />
            <br />

            <label
               className={`${styles['load-img-button']} ${
                  loading && styles.disabled
               }`}
               htmlFor="select-file"
            >
               <span>Upload image</span>
               <i className="fas fa-upload"></i>
            </label>
            <div className={styles['image-span']}>
               <span>Image should be less than 5MB*</span>
            </div>

            <br />
            <input
               disabled={loading}
               ref={inputFileRef}
               accept="image/png,image/jpeg, image/jpg,image/gif"
               type="file"
               name="img"
               onChange={handleUploadImage}
               id="select-file"
            />
            <div className={styles['img-cstn']}>
               {image && (
                  <div className={styles['img-ctn']}>
                     <button
                        data-testid="delete-img"
                        type="button"
                        value="1"
                        className={`fa fa-times ${styles['img-delete']}`}
                        onClick={handleDeleteImage}
                     />
                     <img
                        alt=""
                        src={
                           isUpdate
                              ? image instanceof File
                                 ? URL.createObjectURL(image)
                                 : image
                              : URL.createObjectURL(image)
                        }
                     />
                  </div>
               )}
            </div>

            {loading ? (
               <Loading />
            ) : (
               <button data-testid="submit-btn" id={styles.submit}>
                  {isUpdate ? 'UPDATE' : 'ADD PRODUCT'}
               </button>
            )}
         </form>
      </div>
   );
};

export default ProductFrom;
