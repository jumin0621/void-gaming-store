export function filterProducts(products, selectedCategory, sortType) {
	let nextProducts = [...products];

	if (selectedCategory !== "all") {
		nextProducts = nextProducts.filter(
			(product) => product.category === selectedCategory,
		);
	}

	switch (sortType) {
		case "PRICE_ASC":
			nextProducts.sort((a, b) => a.price - b.price);
			break;
		case "PRICE_DESC":
			nextProducts.sort((a, b) => b.price - a.price);
			break;
		case "RATING_DESC":
			nextProducts.sort((a, b) => b.rating - a.rating);
			break;
		case "LATEST":
		default:
			nextProducts.sort((a, b) => b.id - a.id);
			break;
	}

	return nextProducts;
}
