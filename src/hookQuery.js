import { useState, useEffect } from 'react';

/* =============== mediaQueryHook
This element is used to obtain information 
from the browser about the dimensions of the screen.
*/

const useMediaQuery = (query) => {
   const [matches, setMatches] = useState(false);

   useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
         setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      window.addEventListener('resize', listener);
      return () => window.removeEventListener('resize', listener);
   }, [matches, query]);

   return matches;
};

export default useMediaQuery;
