import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { WishlistContext } from './contexts/WishlistContext';
import { CartContext } from './contexts/CartContext';
import { AuthContext } from './contexts/AuthContext';

import { useAuth } from './hooks/useAuth';
import { useWishList } from './hooks/useWishList';
import { useCart } from './hooks/useCart';
import axios from 'axios';


function App() {

  function getToken() {
    if (localStorage.getItem('token')) {
      const accessToken = localStorage.getItem('token') || '';
      return accessToken;
    }
    return '';
  }

  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL + 'api';
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  axios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${getToken()}`;
      return config;
    },
    (error) => {
      return error;
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    }
    , (error) => {

      if (error.response.data?.message) {
        throw error;
      } else {
        toast.error(error.message);
        throw error;
      }

    }

  );

  const { user, Login, Logout, token } = useAuth();
  const {
    wishList,
    addToWishlist,
    removeFromWishlist,
    inWishlist,
    removeAll,
    getProduct
  } = useWishList();

  const { cart, addToCart, removeFromCart, emptyCart, getProductsQuantity, getCartItemsCount, getTotalPrice, changeQuantity } = useCart();

  return (
    <div className="grid-col flex min-h-screen flex-col font-poppins">
      <AuthContext.Provider value={{ isLoggedIn: !!user, user, Login, Logout, token }}>
        <WishlistContext.Provider value={{
          wishList,
          addToWishlist,
          removeFromWishlist,
          inWishlist,
          removeAll,
          getProduct
        }}>
          <CartContext.Provider value={{ products: cart, addToCart, removeFromCart, emptyCart, getProductsQuantity, getCartItemsCount, getTotalPrice, changeQuantity }}>
            <BrowserRouter>
              {/* <Header /> */}
              <div className="flex-1">
                <Router />
              </div>
              {/* <FloatingWhatsApp />
              <FloatingMessenger />
              <Footer /> */}
            </BrowserRouter>
          </CartContext.Provider>
        </WishlistContext.Provider>
      </AuthContext.Provider>
      <ToastContainer />
    </div >
  );
}

export default App;
