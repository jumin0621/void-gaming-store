import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import ProductGrid from "../../components/product/ProductGrid";
import ProductFilter from "../../components/product/ProductFilter";
import ProductSortToggle from "../../components/product/ProductSortToggle";
import CategoryBanner from "../../components/product/CategoryBanner";
import CategoryBannerSkeleton from "../../components/product/CategoryBannerSkeleton";
import ProductGridSkeleton from "../../components/product/ProductGridSkeleton";
import { products } from "../../data/products";
import { useStore } from "../../store";
import { filterProducts } from "../../utils/filterProducts";

export default function ProductsPage() {
	const selectedCategory = useStore((state) => state.selectedCategory);
	const sortType = useStore((state) => state.sortType);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);

		const timer = window.setTimeout(() => {
			setIsLoading(false);
		}, 500);

		return () => window.clearTimeout(timer);
	}, [selectedCategory, sortType]);

	const filteredProducts = useMemo(() => {
		return filterProducts(products, selectedCategory, sortType);
	}, [selectedCategory, sortType]);

	const categoryLabel =
		selectedCategory === "all"
			? "All"
			: selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);

	return (
		<PageLayout title="Products">
			{isLoading ? (
				<CategoryBannerSkeleton />
			) : (
				<CategoryBanner category={selectedCategory} />
			)}

			<ControlSection>
				<ProductFilter />
				<ProductSortToggle />
			</ControlSection>

			<ResultText>
				{categoryLabel} · {filteredProducts.length} products
			</ResultText>

			{isLoading ? (
				<ProductGridSkeleton count={8} />
			) : (
				<ProductGrid products={filteredProducts} />
			)}
		</PageLayout>
	);
}

const ControlSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 14px;
	margin-bottom: 20px;
`;

const ResultText = styled.p`
	margin: 0 0 20px;
	color: #bcbcbc;
	font-size: 14px;
`;
