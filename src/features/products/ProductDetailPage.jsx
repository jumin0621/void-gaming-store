import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../components/layout/PageLayout";
import { products } from "../../data/products";
import { formatPrice } from "../../utils/formatPrice";
import { useStore } from "../../store";

export default function ProductDetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();

	const addToCart = useStore((state) => state.addToCart);
	const toggleWishlist = useStore((state) => state.toggleWishlist);
	const wishlist = useStore((state) => state.wishlist);
	const createOrder = useStore((state) => state.createOrder);
	const clearCart = useStore((state) => state.clearCart);

	const product = useMemo(
		() => products.find((item) => String(item.id) === String(id)),
		[id],
	);

	const [selectedImage, setSelectedImage] = useState("");

	useEffect(() => {
		if (product?.thumbnail) {
			setSelectedImage(product.thumbnail);
		}
	}, [product]);

	if (!product) {
		return (
			<PageLayout title="Product Detail">
				<EmptyState>상품을 찾을 수 없습니다.</EmptyState>
			</PageLayout>
		);
	}

	const isWished = wishlist.some((item) => item.id === product.id);

	const handleBuyNow = () => {
		clearCart();
		addToCart(product);
		createOrder();
		navigate("/orders");
	};

	const galleryImages = [product.thumbnail, ...(product.images || [])].filter(
		(image, index, arr) => arr.indexOf(image) === index,
	);

	return (
		<PageLayout title="Product Detail">
			<DetailWrap>
				<Gallery>
					<MainImage
						src={selectedImage || product.thumbnail}
						alt={product.name}
					/>

					<ThumbList>
						{galleryImages.map((image, index) => (
							<Thumb
								key={`${product.id}-${index}`}
								$active={image === selectedImage}
								onClick={() => setSelectedImage(image)}
							>
								<ThumbImage src={image} alt={`${product.name}-${index + 1}`} />
							</Thumb>
						))}
					</ThumbList>
				</Gallery>

				<InfoSection>
					<Brand>{product.brand}</Brand>
					<Name>{product.name}</Name>
					<Price>{formatPrice(product.price)}원</Price>
					<Description>{product.description}</Description>

					<InfoBox>
						<InfoTitle>Specs</InfoTitle>
						<SpecList>
							{Object.entries(product.specs).map(([key, value]) => (
								<SpecItem key={key}>
									<span>{key}</span>
									<strong>{value}</strong>
								</SpecItem>
							))}
						</SpecList>
					</InfoBox>

					<ActionRow>
						<CartButton type="button" onClick={() => addToCart(product)}>
							장바구니 담기
						</CartButton>

						<WishButton
							type="button"
							$active={isWished}
							onClick={() => toggleWishlist(product)}
						>
							{isWished ? "찜 해제" : "찜하기"}
						</WishButton>
					</ActionRow>

					<BuyNowButton type="button" onClick={handleBuyNow}>
						바로 구매
					</BuyNowButton>
				</InfoSection>
			</DetailWrap>
		</PageLayout>
	);
}

const DetailWrap = styled.section`
	display: grid;
	grid-template-columns: minmax(0, 1.1fr) minmax(340px, 0.9fr);
	gap: 32px;

	@media (max-width: 900px) {
		grid-template-columns: 1fr;
		gap: 24px;
	}

	@media (max-width: 480px) {
		gap: 20px;
	}
`;

const Gallery = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;

	@media (max-width: 480px) {
		gap: 12px;
	}
`;

const MainImage = styled.img`
	width: 100%;
	aspect-ratio: 1 / 1;
	display: block;
	object-fit: cover;
	border-radius: 24px;
	background: #171717;

	@media (max-width: 480px) {
		border-radius: 18px;
	}
`;

const ThumbList = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 12px;

	@media (max-width: 480px) {
		gap: 8px;
	}
`;

const Thumb = styled.button`
	overflow: hidden;
	padding: 0;
	border: 1px solid
		${({ $active }) =>
			$active ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.08)"};
	border-radius: 16px;
	background: #171717;
	cursor: pointer;

	@media (max-width: 480px) {
		border-radius: 12px;
	}
`;

const ThumbImage = styled.img`
	width: 100%;
	aspect-ratio: 1 / 1;
	display: block;
	object-fit: cover;
`;

const InfoSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 14px;

	@media (max-width: 480px) {
		gap: 12px;
	}
`;

const Brand = styled.p`
	margin: 0;
	color: #9c9c9c;
	font-size: 13px;
	font-weight: 800;
	letter-spacing: 0.12em;

	@media (max-width: 480px) {
		font-size: 12px;
	}
`;

const Name = styled.h2`
	margin: 0;
	font-size: 34px;
	line-height: 1.15;

	@media (max-width: 768px) {
		font-size: 30px;
	}

	@media (max-width: 480px) {
		font-size: 24px;
		line-height: 1.2;
	}
`;

const Price = styled.p`
	margin: 0;
	font-size: 30px;
	font-weight: 800;

	@media (max-width: 768px) {
		font-size: 26px;
	}

	@media (max-width: 480px) {
		font-size: 22px;
	}
`;

const Description = styled.p`
	margin: 0;
	color: #c8c8c8;
	font-size: 16px;
	line-height: 1.7;

	@media (max-width: 480px) {
		font-size: 14px;
		line-height: 1.65;
	}
`;

const InfoBox = styled.div`
	margin-top: 8px;
	padding: 20px;
	border-radius: 20px;
	background: #121212;
	border: 1px solid rgba(255, 255, 255, 0.08);

	@media (max-width: 480px) {
		margin-top: 4px;
		padding: 16px;
		border-radius: 16px;
	}
`;

const InfoTitle = styled.h3`
	margin: 0 0 16px;
	font-size: 18px;

	@media (max-width: 480px) {
		margin-bottom: 12px;
		font-size: 16px;
	}
`;

const SpecList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 12px;
	margin: 0;
	padding: 0;
	list-style: none;

	@media (max-width: 480px) {
		gap: 10px;
	}
`;

const SpecItem = styled.li`
	display: flex;
	justify-content: space-between;
	gap: 16px;
	color: #d6d6d6;

	span {
		text-transform: capitalize;
		color: #9f9f9f;
		font-size: 14px;
	}

	strong {
		color: #ffffff;
		font-size: 14px;
		text-align: right;
	}

	@media (max-width: 480px) {
		gap: 12px;

		span,
		strong {
			font-size: 13px;
		}
	}
`;

const ActionRow = styled.div`
	display: flex;
	gap: 12px;
	margin-top: 8px;

	@media (max-width: 480px) {
		gap: 10px;
		flex-direction: column;
	}
`;

const BaseButton = styled.button`
	height: 52px;
	padding: 0 18px;
	border: none;
	border-radius: 14px;
	font-size: 15px;
	font-weight: 800;
	cursor: pointer;

	@media (max-width: 480px) {
		height: 48px;
		border-radius: 12px;
		font-size: 14px;
	}
`;

const CartButton = styled(BaseButton)`
	flex: 1;
	background: #ffffff;
	color: #111111;
`;

const WishButton = styled(BaseButton)`
	min-width: 120px;
	background: ${({ $active }) => ($active ? "#ff4d7a" : "#1d1d1d")};
	color: #ffffff;

	@media (max-width: 480px) {
		min-width: auto;
		width: 100%;
	}
`;

const BuyNowButton = styled.button`
	width: 100%;
	height: 54px;
	margin-top: 2px;
	border: none;
	border-radius: 14px;
	background: #2a2a2a;
	color: #ffffff;
	font-size: 15px;
	font-weight: 800;
	cursor: pointer;

	@media (max-width: 480px) {
		height: 50px;
		border-radius: 12px;
		font-size: 14px;
	}
`;

const EmptyState = styled.div`
	padding: 48px 20px;
	border-radius: 20px;
	background: #111111;
	color: #bcbcbc;
	text-align: center;
`;
