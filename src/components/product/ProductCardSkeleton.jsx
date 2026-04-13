import styled from "@emotion/styled";
import Skeleton from "../common/Skeleton";

export default function ProductCardSkeleton() {
	return (
		<Card>
			<ThumbWrap>
				<Skeleton height="100%" radius="0" />
			</ThumbWrap>

			<Content>
				<Skeleton width="72px" height="12px" radius="999px" />
				<Skeleton width="88%" height="20px" radius="10px" />
				<Skeleton width="48%" height="24px" radius="10px" />

				<ActionRow>
					<Skeleton width="100%" height="44px" radius="12px" />
					<Skeleton width="48px" height="44px" radius="12px" />
				</ActionRow>
			</Content>
		</Card>
	);
}

const Card = styled.div`
	overflow: hidden;
	border: 1px solid rgba(255, 255, 255, 0.08);
	border-radius: 22px;
	background: #121212;
`;

const ThumbWrap = styled.div`
	aspect-ratio: 1 / 1;
	background: #1a1a1a;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 16px;
`;

const ActionRow = styled.div`
	display: flex;
	gap: 10px;
`;
