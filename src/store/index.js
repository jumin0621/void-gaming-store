import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
	persist(
		(set, get) => ({
			cartItems: [],
			wishlist: [],
			orders: [],
			selectedCategory: "all",
			sortType: "LATEST",

			addToCart: (product) => {
				const exists = get().cartItems.find((item) => item.id === product.id);

				if (exists) {
					set({
						cartItems: get().cartItems.map((item) =>
							item.id === product.id
								? { ...item, quantity: item.quantity + 1 }
								: item,
						),
					});
				} else {
					set({
						cartItems: [...get().cartItems, { ...product, quantity: 1 }],
					});
				}
			},

			removeFromCart: (id) => {
				set({
					cartItems: get().cartItems.filter((item) => item.id !== id),
				});
			},

			increaseQuantity: (id) => {
				set({
					cartItems: get().cartItems.map((item) =>
						item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
					),
				});
			},

			decreaseQuantity: (id) => {
				const nextItems = get()
					.cartItems.map((item) =>
						item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
					)
					.filter((item) => item.quantity > 0);

				set({ cartItems: nextItems });
			},

			clearCart: () => {
				set({ cartItems: [] });
			},

			toggleWishlist: (product) => {
				const exists = get().wishlist.some((item) => item.id === product.id);

				set({
					wishlist: exists
						? get().wishlist.filter((item) => item.id !== product.id)
						: [...get().wishlist, product],
				});
			},

			setCategory: (category) => {
				set({ selectedCategory: category });
			},

			setSortType: (sortType) => {
				set({ sortType });
			},

			resetFilter: () => {
				set({
					selectedCategory: "all",
					sortType: "LATEST",
				});
			},

			createOrder: () => {
				const cartItems = get().cartItems;

				if (!cartItems.length) return;

				const totalPrice = cartItems.reduce(
					(acc, item) => acc + item.price * item.quantity,
					0,
				);

				const order = {
					id: `order-${Date.now()}`,
					items: cartItems,
					totalPrice,
					createdAt: new Date().toISOString(),
				};

				set({
					orders: [order, ...get().orders],
					cartItems: [],
				});
			},

			deleteOrder: (orderId) => {
				set({
					orders: get().orders.filter((order) => order.id !== orderId),
				});
			},
		}),
		{
			name: "void-store",
		},
	),
);
