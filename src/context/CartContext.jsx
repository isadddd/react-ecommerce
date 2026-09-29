import { createContext, useContext, useEffect, useReducer } from "react";
import { getDiscountedPrice } from "@/utils/price";
import { useAuth } from "@/context/AuthContext";

const CartContext = createContext(null);

const initialState = {
  cart: [],
  cartId: null,
  isCartOpen: false,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        cartId: action.payload.cartId,
        cart: action.payload.products,
      };

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
  const { user } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    if (!user?.id) return;

    fetch(`https://dummyjson.com/carts/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        const cart = data.carts[0];

        dispatch({
          type: "SET_CART",
          payload: {
            cartId: cart.id,
            products: cart.products || [],
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user?.id]);

  const addToCart = async (product) => {
    const existingProduct = state.cart.find((item) => item.id === product.id);

    const newQuantity = existingProduct ? existingProduct.quantity + 1 : 1;

    try {
      const res = await fetch(`https://dummyjson.com/carts/${state.cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merge: true,
          products: [
            {
              id: product.id,
              quantity: newQuantity,
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      const data = await res.json();

      console.log("Updated cart:", data);

      dispatch({
        type: "ADD_ITEM",
        payload: product,
      });
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const removeFromCart = async (productId) => {
    const updatedProducts = state.cart
      .filter((item) => item.id !== productId)
      .map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));

    try {
      const res = await fetch(`https://dummyjson.com/carts/${state.cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merge: false,
          products: updatedProducts,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to remove product");
      }

      const data = await res.json();

      console.log("Updated cart:", data);

      dispatch({
        type: "REMOVE_ITEM",
        payload: productId,
      });
    } catch (error) {
      console.error("Failed to remove product:", error);
    }
  };

  const increaseQuantity = async (productId) => {
    const product = state.cart.find((item) => item.id === productId);

    if (!product) return;

    const newQuantity = product.quantity + 1;

    try {
      const res = await fetch(`https://dummyjson.com/carts/${state.cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merge: true,
          products: [
            {
              id: productId,
              quantity: newQuantity,
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update cart");
      }

      const data = await res.json();

      console.log("Updated cart:", data);

      dispatch({
        type: "INCREASE_QUANTITY",
        payload: productId,
      });
    } catch (error) {
      console.error("Failed to increase quantity:", error);
    }
  };

  const decreaseQuantity = async (productId) => {
    const product = state.cart.find((item) => item.id === productId);

    if (!product) return;

    const newQuantity = product.quantity - 1;

    try {
      const res = await fetch(`https://dummyjson.com/carts/${state.cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merge: true,
          products: [
            {
              id: productId,
              quantity: newQuantity,
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update cart");
      }

      const data = await res.json();

      console.log("Updated cart:", data);

      dispatch({
        type: "DECREASE_QUANTITY",
        payload: productId,
      });
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
    }
  };

  const clearCart = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/carts/${state.cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merge: false,
          products: [],
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to clear cart");
      }

      const data = await res.json();

      console.log("Updated cart:", data);

      dispatch({
        type: "CLEAR_CART",
      });
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
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
