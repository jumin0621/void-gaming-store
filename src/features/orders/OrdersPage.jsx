import styled from "@emotion/styled";
import PageLayout from "../../components/layout/PageLayout";
import EmptyState from "../../components/common/EmptyState";
import { useStore } from "../../store";
import { formatPrice } from "../../utils/formatPrice";

export default function OrdersPage() {
	const orders = useStore((state) => state.orders);
	const deleteOrder = useStore((state) => state.deleteOrder);

	return (
		<PageLayout title="Orders">
			{!orders.length ? (
				<EmptyState
					title="아직 주문 내역이 없어요"
					description="장바구니에서 구매를 진행하면 주문 내역이 이곳에 저장됩니다."
					actionLabel="장바구니 보기"
					actionTo="/cart"
				/>
			) : (
				<OrderList>
					{orders.map((order) => (
						<OrderCard key={order.id}>
							<OrderHeader>
								<div>
									<OrderTitle>주문번호 {order.id}</OrderTitle>
									<OrderDate>
										{new Date(order.createdAt).toLocaleString("ko-KR")}
									</OrderDate>
								</div>

								<DeleteButton
									type="button"
									onClick={() => deleteOrder(order.id)}
								>
									주문 삭제
								</DeleteButton>
							</OrderHeader>

							<ItemList>
								{order.items.map((item) => (
									<Item key={`${order.id}-${item.id}`}>
										<Thumb src={item.thumbnail} alt={item.name} />

										<ItemInfo>
											<Brand>{item.brand}</Brand>
											<Name>{item.name}</Name>
											<Meta>
												수량 {item.quantity} · {formatPrice(item.price)}원
											</Meta>
										</ItemInfo>

										<ItemTotal>
											{formatPrice(item.price * item.quantity)}원
										</ItemTotal>
									</Item>
								))}
							</ItemList>

							<TotalRow>
								<span>Total</span>
								<strong>{formatPrice(order.totalPrice)}원</strong>
							</TotalRow>
						</OrderCard>
					))}
				</OrderList>
			)}
		</PageLayout>
	);
}

const OrderList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const OrderCard = styled.article`
	padding: 20px;
	border-radius: 22px;
	background: #121212;
	border: 1px solid rgba(255, 255, 255, 0.08);

	@media (max-width: 640px) {
		padding: 16px;
		border-radius: 18px;
	}
`;

const OrderHeader = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 16px;
	margin-bottom: 18px;

	@media (max-width: 640px) {
		flex-direction: column;
		margin-bottom: 16px;
	}
`;

const OrderTitle = styled.h2`
	margin: 0 0 6px;
	font-size: 18px;
	line-height: 1.4;
	word-break: break-all;

	@media (max-width: 640px) {
		font-size: 16px;
	}
`;

const OrderDate = styled.p`
	margin: 0;
	color: #a9a9a9;
	font-size: 14px;

	@media (max-width: 640px) {
		font-size: 13px;
	}
`;

const DeleteButton = styled.button`
	height: 40px;
	padding: 0 14px;
	border: none;
	border-radius: 12px;
	background: #242424;
	color: #ffffff;
	cursor: pointer;

	@media (max-width: 640px) {
		height: 36px;
		border-radius: 10px;
		font-size: 13px;
	}
`;

const ItemList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 14px;
`;

const Item = styled.div`
	display: grid;
	grid-template-columns: 88px minmax(0, 1fr) auto;
	gap: 14px;
	align-items: center;

	@media (max-width: 640px) {
		grid-template-columns: 72px minmax(0, 1fr);
		gap: 12px;
	}
`;

const Thumb = styled.img`
	width: 100%;
	aspect-ratio: 1 / 1;
	border-radius: 14px;
	object-fit: cover;

	@media (max-width: 640px) {
		border-radius: 12px;
	}
`;

const ItemInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6px;
	min-width: 0;
`;

const Brand = styled.p`
	margin: 0;
	color: #999999;
	font-size: 12px;
	font-weight: 800;
	letter-spacing: 0.1em;
`;

const Name = styled.h3`
	margin: 0;
	font-size: 16px;
	line-height: 1.4;
	word-break: keep-all;

	@media (max-width: 640px) {
		font-size: 14px;
	}
`;

const Meta = styled.p`
	margin: 0;
	color: #bcbcbc;
	font-size: 14px;

	@media (max-width: 640px) {
		font-size: 13px;
	}
`;

const ItemTotal = styled.strong`
	font-size: 15px;

	@media (max-width: 640px) {
		grid-column: 2 / 3;
		font-size: 14px;
	}
`;

const TotalRow = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 16px;
	margin-top: 20px;
	padding-top: 18px;
	border-top: 1px solid rgba(255, 255, 255, 0.08);

	span {
		font-size: 14px;
	}

	strong {
		font-size: 18px;
	}

	@media (max-width: 640px) {
		margin-top: 16px;
		padding-top: 14px;

		span {
			font-size: 13px;
		}

		strong {
			font-size: 16px;
		}
	}
`;
