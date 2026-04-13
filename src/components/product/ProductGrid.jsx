import styled from "@emotion/styled";
import ProductCard from "./ProductCard";
import EmptyState from "../common/EmptyState";

export default function ProductGrid({ products }) {
	if (!products?.length) {
		return (
			<EmptyState
				title="조건에 맞는 상품이 없어요"
				description="다른 카테고리를 선택하거나 정렬 옵션을 바꿔서 다시 살펴보세요."
				actionLabel="전체 상품 보기"
				actionTo="/products"
			/>
		);
	}

	return (
		<Grid>
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
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
