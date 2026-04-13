import styled from "@emotion/styled";
import { useStore } from "../../store";

const categories = [
	{ label: "All", value: "all" },
	{ label: "Mouse", value: "mouse" },
	{ label: "Keyboard", value: "keyboard" },
	{ label: "Headset", value: "headset" },
	{ label: "Controller", value: "controller" },
	{ label: "Deskmat", value: "deskmat" },
];

export default function ProductFilter() {
	const selectedCategory = useStore((state) => state.selectedCategory);
	const setCategory = useStore((state) => state.setCategory);

	return (
		<Wrap>
			{categories.map((category) => (
				<FilterButton
					key={category.value}
					type="button"
					$active={selectedCategory === category.value}
					onClick={() => setCategory(category.value)}
				>
					{category.label}
				</FilterButton>
			))}
		</Wrap>
	);
}

const Wrap = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
`;

const FilterButton = styled.button`
	height: 40px;
	padding: 0 16px;
	border: none;
	border-radius: 999px;
	background: ${({ $active }) => ($active ? "#ffffff" : "#1b1b1b")};
	color: ${({ $active }) => ($active ? "#111111" : "#ffffff")};
	font-size: 14px;
	font-weight: 700;
	cursor: pointer;
`;
