import { createContext, useContext, useEffect, useReducer } from "react";
import { getDiscountedPrice } from "@/utils/price";

const CartContext = createContext(null);

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  isCartOpen: false,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id,
      );

      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.payload,
            quantity: 1,
          },
        ],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    case "OPEN_CART":
      return {
        ...state,
        isCartOpen: true,
      };

    case "CLOSE_CART":
      return {
        ...state,
        isCartOpen: false,
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const addToCart = (product) => {
    dispatch({
      type: "ADD_ITEM",
      payload: product,
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: productId,
    });
  };

  const increaseQuantity = (productId) => {
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: productId,
    });
  };

  const decreaseQuantity = (productId) => {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: productId,
    });
  };

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  const openCart = () => {
    dispatch({
      type: "OPEN_CART",
    });
  };

  const closeCart = () => {
    dispatch({
      type: "CLOSE_CART",
    });
  };

  const totalItems = state.cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = state.cart.reduce(
    (total, item) =>
      total +
      getDiscountedPrice(item.price, item.discountPercentage) * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        isCartOpen: state.isCartOpen,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
