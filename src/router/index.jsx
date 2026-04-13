import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../features/home/HomePage";
import ProductsPage from "../features/products/ProductsPage";
import ProductDetailPage from "../features/products/ProductDetailPage";
import CartPage from "../features/cart/CartPage";
import OrdersPage from "../features/orders/OrdersPage";
import WishlistPage from "../features/wishlist/WishlistPage";

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/products" element={<ProductsPage />} />
				<Route path="/product/:id" element={<ProductDetailPage />} />
				<Route path="/cart" element={<CartPage />} />
				<Route path="/orders" element={<OrdersPage />} />
				<Route path="/wishlist" element={<WishlistPage />} />
			</Routes>
		</BrowserRouter>
	);
}
