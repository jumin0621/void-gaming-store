import styled from "@emotion/styled";
import { useStore } from "../../store";

const sortOptions = [
	{ label: "Latest", value: "LATEST" },
	{ label: "Low Price", value: "PRICE_ASC" },
	{ label: "High Price", value: "PRICE_DESC" },
	{ label: "Top Rated", value: "RATING_DESC" },
];

export default function ProductSortToggle() {
	const sortType = useStore((state) => state.sortType);
	const setSortType = useStore((state) => state.setSortType);

	return (
		<Wrap>
			{sortOptions.map((option) => (
				<SortButton
					key={option.value}
					type="button"
					$active={sortType === option.value}
					onClick={() => setSortType(option.value)}
				>
					{option.label}
				</SortButton>
			))}
		</Wrap>
	);
}

const Wrap = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
`;

const SortButton = styled.button`
	height: 40px;
	padding: 0 16px;
	border: 1px solid rgba(255, 255, 255, 0.08);
	border-radius: 999px;
	background: ${({ $active }) => ($active ? "#2a2a2a" : "#111111")};
	color: #ffffff;
	font-size: 14px;
	font-weight: 700;
	cursor: pointer;
`;
