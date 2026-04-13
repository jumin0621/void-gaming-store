import styled from "@emotion/styled";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductGridSkeleton({ count = 8 }) {
	return (
		<Grid>
			{Array.from({ length: count }).map((_, index) => (
				<ProductCardSkeleton key={index} />
			))}
		</Grid>
	);
}

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	gap: 20px;

	@media (max-width: 1024px) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	@media (max-width: 768px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	@media (max-width: 480px) {
		gap: 14px;
	}
`;
