import { product_list } from '@/data/product-list';
import { Product } from '@/entities/product';
import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  productList: Product[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  loadProductListFromLocalStorage: () => void;
}

export const useCartStore = create<CartState>((set, get) => {
  const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : {
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };
  };

  const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(get()));
  };


  const cart = loadCartFromLocalStorage();

  return {
    ...cart,
    addItem: (item) => {
      const items = get().items;
      const existingItem = items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        items.push({ ...item, quantity: 1 });
      }

      set((state) => ({
        ...state,
        items: [...items],
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + item.price,
      }));

      saveCartToLocalStorage();
    },
    removeItem: (id) => {
      const items = get().items.filter((item) => item.id !== id);
      const removedItem = get().items.find((item) => item.id === id);

      if (removedItem) {
        set((state) => ({
          ...state,
          items,
          totalItems: state.totalItems - removedItem.quantity,
          totalPrice: state.totalPrice - removedItem.price * removedItem.quantity,
        }));

        saveCartToLocalStorage();
      }
    },
    increaseQuantity: (id) => {
      const items = get().items;
      const item = items.find((i) => i.id === id);

      if (item) {
        item.quantity += 1;
        set((state) => ({
          ...state,
          items: [...items],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + item.price,
        }));

        saveCartToLocalStorage();
      }
    },
    decreaseQuantity: (id) => {
      const items = get().items;
      const item = items.find((i) => i.id === id);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        set((state) => ({
          ...state,
          items: [...items],
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - item.price,
        }));

        saveCartToLocalStorage();
      } else {
        get().removeItem(id);
      }
    },
  };
});