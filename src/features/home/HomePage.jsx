import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import ProductGrid from "../../components/product/ProductGrid";
import ProductGridSkeleton from "../../components/product/ProductGridSkeleton";
import { products } from "../../data/products";
import { useStore } from "../../store";
import { bannerImages } from "../../assets/images/banners";

const categories = [
	{ label: "Mouse", value: "mouse" },
	{ label: "Keyboard", value: "keyboard" },
	{ label: "Headset", value: "headset" },
	{ label: "Controller", value: "controller" },
	{ label: "Deskmat", value: "deskmat" },
];

export default function HomePage() {
	const navigate = useNavigate();
	const setCategory = useStore((state) => state.setCategory);
	const [isLoading, setIsLoading] = useState(true);

	const featuredProducts = products.slice(0, 4);

	useEffect(() => {
		const timer = window.setTimeout(() => {
			setIsLoading(false);
		}, 500);

		return () => window.clearTimeout(timer);
	}, []);

	const handleMoveCategory = (category) => {
		setCategory(category);
		navigate("/products");
	};

	return (
		<PageLayout>
			<HeroSection>
				<HeroInner>
					<HeroText>
						<Eyebrow>VOID GAMING STORE</Eyebrow>
						<HeroTitle>Built for Play. Styled for Impact.</HeroTitle>
						<HeroDescription>
							게이밍 마우스, 키보드, 헤드셋, 컨트롤러까지 감도 높은 셀렉션으로
							구성한 미니 이커머스 포트폴리오입니다.
						</HeroDescription>

						<ButtonGroup>
							<PrimaryLink to="/products" onClick={() => setCategory("all")}>
								Shop All
							</PrimaryLink>
							<SecondaryLink to="/wishlist">View Wishlist</SecondaryLink>
						</ButtonGroup>
					</HeroText>
				</HeroInner>
			</HeroSection>

			<Section>
				<SectionTitle>Categories</SectionTitle>

				<CategoryGrid>
					{categories.map((category) => (
						<CategoryCard
							key={category.value}
							type="button"
							onClick={() => handleMoveCategory(category.value)}
						>
							<CategoryLabel>{category.label}</CategoryLabel>
							<CategoryHint>Explore gear</CategoryHint>
						</CategoryCard>
					))}
				</CategoryGrid>
			</Section>

			<Section>
				<SectionTitle>Featured Products</SectionTitle>
				{isLoading ? (
					<ProductGridSkeleton count={4} />
				) : (
					<ProductGrid products={featuredProducts} />
				)}
			</Section>
		</PageLayout>
	);
}

const Section = styled.section`
	margin-top: 42px;

	@media (max-width: 768px) {
		margin-top: 34px;
	}
`;

const HeroSection = styled.section`
	overflow: hidden;
	position: relative;
	margin-bottom: 12px;
	border-radius: 28px;
	background:
		linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.08),
			rgba(255, 255, 255, 0.02)
		),
		radial-gradient(
			circle at top right,
			rgba(255, 255, 255, 0.14),
			transparent 34%
		),
		#111111;
	border: 1px solid rgba(255, 255, 255, 0.08);

	@media (max-width: 768px) {
		border-radius: 24px;
	}
`;

const HeroInner = styled.div`
	min-height: 420px;
	padding: 40px;
	display: flex;
	align-items: center;
	background-image:
		linear-gradient(
			to right,
			rgba(17, 17, 17, 0.88) 0%,
			rgba(17, 17, 17, 0.62) 42%,
			rgba(17, 17, 17, 0.18) 68%,
			rgba(17, 17, 17, 0.04) 100%
		),
		url(${bannerImages.heroMain});
	background-size: cover;
	background-position: center right;
	background-repeat: no-repeat;

	@media (max-width: 768px) {
		min-height: 360px;
		padding: 28px 22px;
		background-position: center;
	}

	@media (max-width: 480px) {
		min-height: 320px;
		padding: 22px 18px;
	}
`;

const HeroText = styled.div`
	max-width: 720px;
`;

const Eyebrow = styled.p`
	margin: 0 0 10px;
	color: #c9c9c9;
	font-size: 12px;
	font-weight: 800;
	letter-spacing: 0.18em;
	text-transform: uppercase;
`;

const HeroTitle = styled.h1`
	margin: 0 0 14px;
	color: #ffffff;
	font-size: clamp(30px, 6vw, 62px);
	line-height: 1.05;
	letter-spacing: -0.04em;
`;

const HeroDescription = styled.p`
	max-width: 560px;
	margin: 0;
	color: #d0d0d0;
	font-size: 16px;
	line-height: 1.7;

	@media (max-width: 480px) {
		font-size: 14px;
		line-height: 1.65;
	}
`;

const ButtonGroup = styled.div`
	display: flex;
	gap: 12px;
	margin-top: 24px;

	@media (max-width: 480px) {
		flex-direction: column;
	}
`;

const BaseLink = styled(Link)`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 140px;
	height: 48px;
	padding: 0 18px;
	border-radius: 14px;
	text-decoration: none;
	font-weight: 700;
`;

const PrimaryLink = styled(BaseLink)`
	background: #ffffff;
	color: #111111;
`;

const SecondaryLink = styled(BaseLink)`
	background: #1d1d1d;
	color: #ffffff;
`;

const SectionTitle = styled.h2`
	margin: 0 0 18px;
	font-size: 24px;
	font-weight: 800;
	letter-spacing: -0.02em;

	@media (max-width: 480px) {
		font-size: 22px;
		margin-bottom: 16px;
	}
`;

const CategoryGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(5, minmax(0, 1fr));
	gap: 16px;

	@media (max-width: 960px) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	@media (max-width: 640px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
`;

const CategoryCard = styled.button`
	min-height: 130px;
	padding: 18px;
	border: 1px solid rgba(255, 255, 255, 0.08);
	border-radius: 22px;
	background:
		linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.05),
			rgba(255, 255, 255, 0.02)
		),
		#121212;
	text-align: left;
	color: #ffffff;
	cursor: pointer;
	transition:
		transform 0.18s ease,
		border-color 0.18s ease;

	&:hover {
		transform: translateY(-3px);
		border-color: rgba(255, 255, 255, 0.18);
	}

	@media (max-width: 480px) {
		min-height: 108px;
		padding: 16px;
		border-radius: 18px;
	}
`;

const CategoryLabel = styled.h3`
	margin: 0 0 8px;
	font-size: 20px;

	@media (max-width: 480px) {
		font-size: 18px;
	}
`;

const CategoryHint = styled.p`
	margin: 0;
	color: #bdbdbd;
	font-size: 14px;

	@media (max-width: 480px) {
		font-size: 13px;
	}
`;
