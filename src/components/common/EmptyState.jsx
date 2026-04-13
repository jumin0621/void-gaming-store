import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export default function EmptyState({
	title = "비어 있습니다",
	description = "아직 표시할 내용이 없습니다.",
	actionLabel,
	actionTo,
}) {
	return (
		<Wrap>
			<IconWrap>
				<Circle />
				<CircleSmall />
			</IconWrap>

			<Title>{title}</Title>
			<Description>{description}</Description>

			{actionLabel && actionTo ? (
				<ActionLink to={actionTo}>{actionLabel}</ActionLink>
			) : null}
		</Wrap>
	);
}

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 14px;
	min-height: 320px;
	padding: 40px 20px;
	border: 1px solid rgba(255, 255, 255, 0.08);
	border-radius: 28px;
	background:
		radial-gradient(circle at top, rgba(255, 255, 255, 0.05), transparent 48%),
		#111111;
	text-align: center;
`;

const IconWrap = styled.div`
	position: relative;
	width: 68px;
	height: 68px;
`;

const Circle = styled.div`
	position: absolute;
	inset: 0;
	border-radius: 50%;
	background: linear-gradient(
		180deg,
		rgba(255, 255, 255, 0.12),
		rgba(255, 255, 255, 0.03)
	);
	border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CircleSmall = styled.div`
	position: absolute;
	top: 22px;
	left: 22px;
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background: #ffffff;
	opacity: 0.9;
`;

const Title = styled.h2`
	margin: 0;
	color: #ffffff;
	font-size: 24px;
	font-weight: 800;
	letter-spacing: -0.02em;
`;

const Description = styled.p`
	max-width: 420px;
	margin: 0;
	color: #bdbdbd;
	font-size: 15px;
	line-height: 1.7;
`;

const ActionLink = styled(Link)`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 148px;
	height: 46px;
	padding: 0 18px;
	border-radius: 14px;
	background: #ffffff;
	color: #111111;
	text-decoration: none;
	font-size: 14px;
	font-weight: 800;
`;
