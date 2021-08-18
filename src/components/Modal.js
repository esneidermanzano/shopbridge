import styles from '../styles/Modal.module.css';

/*  =============== Modal Component 
This compoenent is used to show ProductForm 
more elegant. To used it you need to pass by props a
state and fuction to handle how to show and hide it

toggle => function that hide or show this modal
*/

const Modal = (props) => {
   const handleToggleModal = () => {
      props.toggle(!props.show);
   };

   if (!props.show) {
      return '';
   }

   return (
      <div className={styles.overlay}>
         <div className={styles.modal}>
            <div className={styles['button-ctn']}>
               <button
                  data-testid="close-modal"
                  className={`fa fa-times ${styles.close}`}
                  onClick={handleToggleModal}
               ></button>
            </div>
            <div className={styles.children}>{props.children}</div>
         </div>
      </div>
   );
};

export default Modal;
