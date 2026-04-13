import styled from "@emotion/styled";

export default function Skeleton({
	width = "100%",
	height = "16px",
	radius = "12px",
}) {
	return <Block $width={width} $height={height} $radius={radius} />;
}

const shimmer = `
  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const Block = styled.div`
	${shimmer};
	width: ${({ $width }) => $width};
	height: ${({ $height }) => $height};
	border-radius: ${({ $radius }) => $radius};
	background: linear-gradient(
		90deg,
		rgba(255, 255, 255, 0.05) 0%,
		rgba(255, 255, 255, 0.12) 50%,
		rgba(255, 255, 255, 0.05) 100%
	);
	background-size: 200% 100%;
	animation: shimmer 1.5s linear infinite;
`;
