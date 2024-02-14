import styled, { keyframes } from 'styled-components';

import { theme } from '../../constants/Theme';
import { fonts } from '../../constants/Fonts';

const animacaoTilt = keyframes`
    from {transform: perspective(1000px) rotateY(15deg)}
    to {transform:  perspective(1000px) rotateY(-15deg)}
`;

const CardWrapper = styled.div`
	display: flex;
	flex-direction: column;

	background-color: ${theme.neutral100};
	border: 1px solid ${theme.neutral80};

	.soldOut {
		cursor: not-allowed;
		background-color: ${theme.darkRed};
	}

	.icons {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 90%;
		position: absolute;
		z-index: 99;

		.soldOff {
			p {
				display: flex;
				align-items: center;
				gap: 0.2em;
				padding: 2px 8px;

				color: ${theme.error};
				background-color: ${theme.darkRed};
			}
		}
		.featured {
			p {
				display: flex;
				align-items: center;
				gap: 0.2em;
				padding: 2px 8px;

				color: ${theme.lightYellow};
				background-color: ${theme.darkRed};
			}
		}
		.rare {
			p {
				display: flex;
				align-items: center;
				gap: 0.2em;
				padding: 2px 8px;

				color: ${theme.lightYellow};
				background-color: ${theme.darkYellow};
			}
		}

		@media (min-width: 1024px) {
			width: auto;
			display: flex;
			justify-content: start;
			align-items: center;
			gap: 0.5em;
			margin: 1em 0 0 0.5em;
		}
	}

	.card {
		display: flex;
		justify-content: center;
		div {
			width: 100%;
			animation-name: ${({ animado }) =>
				animado ? animacaoTilt : 'none'};
			animation-duration: 2s;
			animation-fill-mode: backwards;
			animation-direction: alternate;
			animation-timing-function: ease-in-out;
			animation-iteration-count: infinite;
		}

		img {
			width: 100%;
		}
	}

	.infos {
		margin: 2em 1em 0.2em 1em;
		h4 {
			font-size: ${fonts.heading4};
			font-weight: 500;
		}

		.priceAndStock {
			display: flex;
			justify-content: space-between;
			align-items: center;

			margin: 1em 0;

			font-size: ${fonts.N};

			.price {
				color: ${theme.lightYellow};
			}

			.stock {
				color: ${theme.neutral20};
			}
		}

		hr {
			border: 1px solid ${theme.neutral80};
			opacity: 0.3;
		}

		@media (min-width: 1024px) {
			margin: 1em 1em 0.2em 1em;
		}
	}

	.footer {
		display: flex;
		flex-direction: column;
		align-items: center;

		margin: 0.5em 1em;

		a {
			transition: 0.5s ease-in-out;

			cursor: ${({ saleSoon }) => (saleSoon ? 'not-allowed' : 'pointer')};
			text-align: center;
			text-decoration: none;
			font-size: ${theme.N};
			font-weight: 600;

			width: 100%;
			padding: 0.8em;
			margin-bottom: 0.8em;

			background-color: ${theme.brandYellow};
			color: ${theme.neutral100};

			&:hover {
				background-color: ${({ saleSoon }) =>
					saleSoon ? '' : theme.lightYellow};
			}
		}

		p {
			display: flex;
			align-items: center;
			span {
				margin-right: 0.2em;
				color: ${theme.lightYellow};
			}
		}

		@media (min-width: 1024px) {
			margin: 1em;
		}
	}
`;

export default CardWrapper;
