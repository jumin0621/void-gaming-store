import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/layout/PageLayout";
import EmptyState from "../../components/common/EmptyState";
import { useStore } from "../../store";
import { formatPrice } from "../../utils/formatPrice";

export default function WishlistPage() {
	const navigate = useNavigate();

	const wishlist = useStore((state) => state.wishlist);
	const toggleWishlist = useStore((state) => state.toggleWishlist);
	const addToCart = useStore((state) => state.addToCart);

	const handleMoveDetail = (id) => {
		navigate(`/product/${id}`);
	};

	return (
		<PageLayout title="Wishlist">
			{!wishlist.length ? (
				<EmptyState
					title="찜한 상품이 없어요"
					description="마음에 드는 상품에 하트를 눌러두면 이곳에서 다시 확인할 수 있어요."
					actionLabel="상품 둘러보기"
					actionTo="/products"
				/>
			) : (
				<Grid>
					{wishlist.map((item) => (
						<Card key={item.id}>
							<ThumbWrap onClick={() => handleMoveDetail(item.id)}>
								<Thumb src={item.thumbnail} alt={item.name} />
							</ThumbWrap>

							<Content>
								<Brand>{item.brand}</Brand>
								<Name onClick={() => handleMoveDetail(item.id)}>
									{item.name}
								</Name>
								<Price>{formatPrice(item.price)}원</Price>

								<ActionRow>
									<CartButton type="button" onClick={() => addToCart(item)}>
										장바구니
									</CartButton>

									<DeleteButton
										type="button"
										onClick={() => toggleWishlist(item)}
									>
										삭제
									</DeleteButton>
								</ActionRow>
							</Content>
						</Card>
					))}
				</Grid>
			)}
		</PageLayout>
	);
}

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 20px;

	@media (max-width: 960px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	@media (max-width: 640px) {
		grid-template-columns: 1fr;
		gap: 16px;
	}
`;

const Card = styled.article`
	overflow: hidden;
	border-radius: 22px;
	background: #121212;
	border: 1px solid rgba(255, 255, 255, 0.08);

	@media (max-width: 640px) {
		display: grid;
		grid-template-columns: 96px minmax(0, 1fr);
		gap: 12px;
		padding: 12px;
		border-radius: 18px;
	}
`;

const ThumbWrap = styled.div`
	cursor: pointer;
`;

const Thumb = styled.img`
	width: 100%;
	aspect-ratio: 1 / 1;
	display: block;
	object-fit: cover;
	border-radius: 0;

	@media (max-width: 640px) {
		border-radius: 12px;
	}
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 16px;

	@media (max-width: 640px) {
		gap: 8px;
		padding: 0;
		min-width: 0;
	}
`;

const Brand = styled.p`
	margin: 0;
	color: #9c9c9c;
	font-size: 12px;
	font-weight: 800;
	letter-spacing: 0.1em;
`;

const Name = styled.h3`
	margin: 0;
	font-size: 18px;
	cursor: pointer;
	line-height: 1.4;
	word-break: keep-all;

	@media (max-width: 640px) {
		font-size: 15px;
	}
`;

const Price = styled.p`
	margin: 0;
	font-size: 18px;
	font-weight: 800;

	@media (max-width: 640px) {
		font-size: 16px;
	}
`;

const ActionRow = styled.div`
	display: flex;
	gap: 10px;
	margin-top: 2px;
`;

const BaseButton = styled.button`
	height: 44px;
	border: none;
	border-radius: 12px;
	font-weight: 700;
	cursor: pointer;

	@media (max-width: 640px) {
		height: 40px;
		border-radius: 10px;
		font-size: 13px;
	}
`;

const CartButton = styled(BaseButton)`
	flex: 1;
	background: #ffffff;
	color: #111111;
`;

const DeleteButton = styled(BaseButton)`
	width: 84px;
	background: #242424;
	color: #ffffff;

	@media (max-width: 640px) {
		width: 68px;
	}
`;
