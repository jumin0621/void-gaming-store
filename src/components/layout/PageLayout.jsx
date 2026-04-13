import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useStore } from "../../store";

export default function PageLayout({ title, children }) {
	const cartItems = useStore((state) => state.cartItems);
	const wishlist = useStore((state) => state.wishlist);

	const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
	const wishlistCount = wishlist.length;

	return (
		<Wrapper>
			<Header>
				<Brand to="/">VOID GAMING STORE</Brand>

				<Nav>
					<NavLink to="/products">Products</NavLink>

					<NavIconLink to="/wishlist">
						Wishlist
						{wishlistCount > 0 ? <Badge>{wishlistCount}</Badge> : null}
					</NavIconLink>

					<NavIconLink to="/cart">
						Cart
						{cartCount > 0 ? <Badge>{cartCount}</Badge> : null}
					</NavIconLink>

					<NavLink to="/orders">Orders</NavLink>
				</Nav>
			</Header>

			<Main>
				{title ? <Title>{title}</Title> : null}
				{children}
			</Main>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	min-height: 100vh;
	background: #0a0a0a;
	color: #f5f5f5;
`;

const Header = styled.header`
	position: sticky;
	top: 0;
	z-index: 20;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	padding: 18px 24px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	background: rgba(10, 10, 10, 0.86);
	backdrop-filter: blur(10px);

	@media (max-width: 640px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const Brand = styled(Link)`
	color: #ffffff;
	text-decoration: none;
	font-size: 20px;
	font-weight: 800;
	letter-spacing: 0.04em;
`;

const Nav = styled.nav`
	display: flex;
	align-items: center;
	gap: 14px;
	flex-wrap: wrap;
`;

const BaseLink = styled(Link)`
	position: relative;
	display: inline-flex;
	align-items: center;
	gap: 8px;
	color: #d6d6d6;
	text-decoration: none;
	font-size: 14px;
	font-weight: 600;

	&:hover {
		color: #ffffff;
	}
`;

const NavLink = styled(BaseLink)``;

const NavIconLink = styled(BaseLink)`
	padding-right: 2px;
`;

const Badge = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 20px;
	height: 20px;
	padding: 0 6px;
	border-radius: 999px;
	background: #ffffff;
	color: #111111;
	font-size: 11px;
	font-weight: 800;
`;

const Main = styled.main`
	width: min(1200px, calc(100% - 32px));
	margin: 0 auto;
	padding: 32px 0 60px;
`;

const Title = styled.h1`
	margin: 0 0 24px;
	font-size: 32px;
	font-weight: 800;
	letter-spacing: -0.02em;
`;
