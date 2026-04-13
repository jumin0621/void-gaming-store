import styled from "@emotion/styled";
import { bannerImages } from "../../assets/images/banners";

const categoryCopy = {
	all: {
		eyebrow: "VOID GAMING STORE",
		title: "All Gaming Gear",
		description:
			"게이밍 마우스, 키보드, 헤드셋, 컨트롤러, 데스크매트까지 한 곳에서 살펴보세요.",
	},
	mouse: {
		eyebrow: "MOUSE",
		title: "Precision in Motion",
		description:
			"초경량 설계와 빠른 반응 속도로 플레이에 집중할 수 있는 게이밍 마우스 셀렉션입니다.",
	},
	keyboard: {
		eyebrow: "KEYBOARD",
		title: "Built for Fast Input",
		description:
			"타건감과 반응성을 모두 고려한 기계식 게이밍 키보드를 만나보세요.",
	},
	headset: {
		eyebrow: "HEADSET",
		title: "Hear Every Detail",
		description:
			"몰입감 있는 사운드와 선명한 음성 전달을 위한 게이밍 헤드셋 컬렉션입니다.",
	},
	controller: {
		eyebrow: "CONTROLLER",
		title: "Control with Confidence",
		description:
			"그립감과 정밀도를 모두 챙긴 컨트롤러로 안정적인 플레이를 경험해보세요.",
	},
	deskmat: {
		eyebrow: "DESKMAT",
		title: "Complete Your Setup",
		description: "넓고 안정적인 플레이 환경을 위한 데스크매트 셀렉션입니다.",
	},
};

export default function CategoryBanner({ category = "all" }) {
	const currentCopy = categoryCopy[category] || categoryCopy.all;
	const currentImage =
		bannerImages.categories[category] || bannerImages.categories.all;

	return (
		<Wrap $image={currentImage}>
			<Overlay>
				<Eyebrow>{currentCopy.eyebrow}</Eyebrow>
				<Title>{currentCopy.title}</Title>
				<Description>{currentCopy.description}</Description>
			</Overlay>
		</Wrap>
	);
}

const Wrap = styled.section`
	overflow: hidden;
	position: relative;
	min-height: 280px;
	margin-bottom: 24px;
	border-radius: 28px;
	background-image:
		linear-gradient(
			to right,
			rgba(10, 10, 10, 0.9) 0%,
			rgba(10, 10, 10, 0.58) 42%,
			rgba(10, 10, 10, 0.2) 68%,
			rgba(10, 10, 10, 0.08) 100%
		),
		url(${({ $image }) => $image});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	border: 1px solid rgba(255, 255, 255, 0.08);

	@media (max-width: 768px) {
		min-height: 220px;
	}
`;

const Overlay = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: inherit;
	max-width: 620px;
	padding: 32px;

	@media (max-width: 768px) {
		padding: 24px 20px;
	}
`;

const Eyebrow = styled.p`
	margin: 0 0 10px;
	color: #d2d2d2;
	font-size: 12px;
	font-weight: 800;
	letter-spacing: 0.18em;
	text-transform: uppercase;
`;

const Title = styled.h2`
	margin: 0 0 12px;
	color: #ffffff;
	font-size: clamp(28px, 4vw, 44px);
	line-height: 1.08;
	letter-spacing: -0.03em;
`;

const Description = styled.p`
	margin: 0;
	color: #d0d0d0;
	font-size: 15px;
	line-height: 1.7;
`;
