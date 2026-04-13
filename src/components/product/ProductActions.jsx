import styled from "@emotion/styled";
import { useStore } from "../../store";

export default function ProductActions({ product }) {
	const addToCart = useStore((state) => state.addToCart);
	const toggleWishlist = useStore((state) => state.toggleWishlist);
	const wishlist = useStore((state) => state.wishlist);

	const isWished = wishlist.some((item) => item.id === product.id);

	const handleCartClick = (event) => {
		event.stopPropagation();
		addToCart(product);
	};

	const handleWishClick = (event) => {
		event.stopPropagation();
		toggleWishlist(product);
	};

	return (
		<ActionRow>
			<CartButton type="button" onClick={handleCartClick}>
				Add to Cart
			</CartButton>
			<WishButton type="button" onClick={handleWishClick} $active={isWished}>
				{isWished ? "♥" : "♡"}
			</WishButton>
		</ActionRow>
	);
}

const ActionRow = styled.div`
	display: flex;
	gap: 10px;

	@media (max-width: 480px) {
		gap: 8px;
	}
`;

const BaseButton = styled.button`
	border: none;
	border-radius: 12px;
	cursor: pointer;
	font-weight: 700;
	transition:
		transform 0.18s ease,
		opacity 0.18s ease;

	&:hover {
		transform: translateY(-1px);
	}
`;

const CartButton = styled(BaseButton)`
	flex: 1;
	padding: 12px 14px;
	background: #ffffff;
	color: #111111;

	@media (max-width: 480px) {
		padding: 11px 12px;
		font-size: 13px;
	}
`;

const WishButton = styled(BaseButton)`
	width: 48px;
	min-width: 48px;
	background: ${({ $active }) => ($active ? "#ff4d7a" : "#1c1c1c")};
	color: #ffffff;

	@media (max-width: 480px) {
		width: 44px;
		min-width: 44px;
		font-size: 14px;
	}
`;
