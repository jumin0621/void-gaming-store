import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/layout/PageLayout";
import EmptyState from "../../components/common/EmptyState";
import { useStore } from "../../store";
import { formatPrice } from "../../utils/formatPrice";

export default function CartPage() {
	const navigate = useNavigate();

	const cartItems = useStore((state) => state.cartItems);
	const removeFromCart = useStore((state) => state.removeFromCart);
	const increaseQuantity = useStore((state) => state.increaseQuantity);
	const decreaseQuantity = useStore((state) => state.decreaseQuantity);
	const createOrder = useStore((state) => state.createOrder);

	const totalPrice = cartItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);

	const handleCheckout = () => {
		if (!cartItems.length) return;
		createOrder();
		navigate("/orders");
	};

	return (
		<PageLayout title="Cart">
			{!cartItems.length ? (
				<EmptyState
					title="장바구니가 비어 있어요"
					description="마음에 드는 게이밍 기어를 담아두면 여기에서 한 번에 확인할 수 있어요."
					actionLabel="상품 보러가기"
					actionTo="/products"
				/>
			) : (
				<Layout>
					<ItemList>
						{cartItems.map((item) => (
							<ItemCard key={item.id}>
								<Thumb src={item.thumbnail} alt={item.name} />

								<ItemContent>
									<TopRow>
										<div>
											<Brand>{item.brand}</Brand>
											<Name>{item.name}</Name>
										</div>

										<DeleteButton
											type="button"
											onClick={() => removeFromCart(item.id)}
										>
											삭제
										</DeleteButton>
									</TopRow>

									<Price>{formatPrice(item.price)}원</Price>

									<BottomRow>
										<QuantityRow>
											<QtyButton
												type="button"
												onClick={() => decreaseQuantity(item.id)}
											>
												-
											</QtyButton>

											<QuantityValue>{item.quantity}</QuantityValue>

											<QtyButton
												type="button"
												onClick={() => increaseQuantity(item.id)}
											>
												+
											</QtyButton>
										</QuantityRow>

										<SubPrice>
											합계 {formatPrice(item.price * item.quantity)}원
										</SubPrice>
									</BottomRow>
								</ItemContent>
							</ItemCard>
						))}
					</ItemList>

					<SummaryCard>
						<SummaryTitle>Order Summary</SummaryTitle>

						<SummaryRow>
							<span>Items</span>
							<strong>{cartItems.length}</strong>
						</SummaryRow>

						<SummaryRow>
							<span>Total</span>
							<strong>{formatPrice(totalPrice)}원</strong>
						</SummaryRow>

						<CheckoutButton type="button" onClick={handleCheckout}>
							구매하기
						</CheckoutButton>
					</SummaryCard>
				</Layout>
			)}
		</PageLayout>
	);
}

const Layout = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1fr) 320px;
	gap: 24px;

	@media (max-width: 960px) {
		grid-template-columns: 1fr;
	}
`;

const ItemList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const ItemCard = styled.article`
	display: grid;
	grid-template-columns: 120px minmax(0, 1fr);
	gap: 16px;
	align-items: flex-start;
	padding: 16px;
	border-radius: 22px;
	background: #121212;
	border: 1px solid rgba(255, 255, 255, 0.08);

	@media (max-width: 640px) {
		grid-template-columns: 84px minmax(0, 1fr);
		gap: 12px;
		padding: 14px;
		border-radius: 18px;
	}
`;

const Thumb = styled.img`
	width: 100%;
	aspect-ratio: 1 / 1;
	border-radius: 16px;
	object-fit: cover;

	@media (max-width: 640px) {
		border-radius: 12px;
	}
`;

const ItemContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	min-width: 0;
`;

const TopRow = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 12px;
`;

const Brand = styled.p`
	margin: 0 0 4px;
	color: #999999;
	font-size: 12px;
	font-weight: 800;
	letter-spacing: 0.1em;
`;

const Name = styled.h3`
	margin: 0;
	font-size: 18px;
	line-height: 1.4;
	word-break: keep-all;

	@media (max-width: 640px) {
		font-size: 15px;
	}
`;

const Price = styled.p`
	margin: 0;
	font-weight: 700;
	font-size: 16px;

	@media (max-width: 640px) {
		font-size: 15px;
	}
`;

const BottomRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;

	@media (max-width: 640px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const QuantityRow = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const QtyButton = styled.button`
	width: 34px;
	height: 34px;
	border: none;
	border-radius: 10px;
	background: #232323;
	color: #ffffff;
	font-size: 18px;
	cursor: pointer;

	@media (max-width: 640px) {
		width: 32px;
		height: 32px;
		font-size: 16px;
	}
`;

const QuantityValue = styled.span`
	min-width: 24px;
	text-align: center;
	font-weight: 700;
`;

const SubPrice = styled.p`
	margin: 0;
	color: #bbbbbb;
	font-size: 14px;

	@media (max-width: 640px) {
		font-size: 13px;
	}
`;

const DeleteButton = styled.button`
	flex-shrink: 0;
	height: 36px;
	padding: 0 12px;
	border: none;
	border-radius: 10px;
	background: #242424;
	color: #ffffff;
	cursor: pointer;
	font-size: 13px;

	@media (max-width: 640px) {
		height: 32px;
		padding: 0 10px;
		font-size: 12px;
	}
`;

const SummaryCard = styled.aside`
	height: fit-content;
	padding: 20px;
	border-radius: 22px;
	background: #121212;
	border: 1px solid rgba(255, 255, 255, 0.08);

	@media (max-width: 640px) {
		padding: 16px;
		border-radius: 18px;
	}
`;

const SummaryTitle = styled.h2`
	margin: 0 0 16px;
	font-size: 20px;

	@media (max-width: 640px) {
		font-size: 18px;
	}
`;

const SummaryRow = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 16px;
	margin-bottom: 14px;

	span,
	strong {
		font-size: 14px;
	}
`;

const CheckoutButton = styled.button`
	width: 100%;
	height: 50px;
	margin-top: 8px;
	border: none;
	border-radius: 14px;
	background: #ffffff;
	color: #111111;
	font-weight: 800;
	cursor: pointer;

	@media (max-width: 640px) {
		height: 46px;
		border-radius: 12px;
		font-size: 14px;
	}
`;
