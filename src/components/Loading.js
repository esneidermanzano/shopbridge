import styles from '../styles/Loading.module.css';

/*  =============== Loading effect for more pleasure */

const Loading = () => {
   return (
      <div className={styles.container}>
         <div className={styles['lds-ring']}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
         </div>
      </div>
   );
};

export default Loading;
