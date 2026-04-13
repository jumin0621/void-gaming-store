import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import ProductActions from "./ProductActions";
import { formatPrice } from "../../utils/formatPrice";

export default function ProductCard({ product }) {
	const navigate = useNavigate();

	const handleMoveDetail = () => {
		navigate(`/product/${product.id}`);
	};

	return (
		<Card onClick={handleMoveDetail}>
			<ThumbnailWrap>
				<Thumbnail src={product.thumbnail} alt={product.name} />
				{product.isBest ? <Badge>BEST</Badge> : null}
				{product.isNew ? <Badge $secondary>NEW</Badge> : null}
			</ThumbnailWrap>

			<Content>
				<Meta>
					<Brand>{product.brand}</Brand>
					<Rating>★ {product.rating}</Rating>
				</Meta>

				<Name>{product.name}</Name>
				<Price>{formatPrice(product.price)}원</Price>

				<ProductActions product={product} />
			</Content>
		</Card>
	);
}

const Card = styled.article`
	overflow: hidden;
	border: 1px solid rgba(255, 255, 255, 0.08);
	border-radius: 22px;
	background: #121212;
	cursor: pointer;
	transition:
		transform 0.2s ease,
		border-color 0.2s ease,
		box-shadow 0.2s ease;

	&:hover {
		transform: translateY(-4px);
		border-color: rgba(255, 255, 255, 0.18);
		box-shadow: 0 16px 32px rgba(0, 0, 0, 0.24);
	}
`;

const ThumbnailWrap = styled.div`
	position: relative;
	aspect-ratio: 1 / 1;
	background: #1a1a1a;
`;

const Thumbnail = styled.img`
	width: 100%;
	height: 100%;
	display: block;
	object-fit: cover;
`;

const Badge = styled.span`
	position: absolute;
	top: ${({ $secondary }) => ($secondary ? "48px" : "14px")};
	left: 14px;
	display: inline-flex;
	align-items: center;
	height: 28px;
	padding: 0 10px;
	border-radius: 999px;
	background: ${({ $secondary }) => ($secondary ? "#2d2d2d" : "#ffffff")};
	color: ${({ $secondary }) => ($secondary ? "#ffffff" : "#111111")};
	font-size: 12px;
	font-weight: 800;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 16px;

	@media (max-width: 480px) {
		gap: 10px;
		padding: 13px;
	}
`;

const Meta = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
`;

const Brand = styled.span`
	color: #9b9b9b;
	font-size: 13px;
	font-weight: 700;
	letter-spacing: 0.04em;
`;

const Rating = styled.span`
	color: #d8d8d8;
	font-size: 13px;
	font-weight: 700;
`;

const Name = styled.h3`
	margin: 0;
	color: #ffffff;
	font-size: 17px;
	line-height: 1.45;

	@media (max-width: 480px) {
		font-size: 15px;
		line-height: 1.4;
	}
`;

const Price = styled.p`
	margin: 0;
	color: #ffffff;
	font-size: 20px;
	font-weight: 800;

	@media (max-width: 480px) {
		font-size: 18px;
	}
`;
