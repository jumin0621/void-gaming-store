import styled from "@emotion/styled";
import Skeleton from "../common/Skeleton";

export default function CategoryBannerSkeleton() {
	return (
		<Wrap>
			<Inner>
				<Skeleton width="96px" height="12px" radius="999px" />
				<Skeleton width="280px" height="42px" radius="14px" />
				<Skeleton width="82%" height="18px" radius="10px" />
				<Skeleton width="68%" height="18px" radius="10px" />
			</Inner>
		</Wrap>
	);
}

const Wrap = styled.section`
	min-height: 280px;
	margin-bottom: 24px;
	border-radius: 28px;
	background: #111111;
	border: 1px solid rgba(255, 255, 255, 0.08);

	@media (max-width: 768px) {
		min-height: 220px;
	}
`;

const Inner = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 14px;
	min-height: inherit;
	max-width: 620px;
	padding: 32px;

	@media (max-width: 768px) {
		padding: 24px 20px;
	}
`;
