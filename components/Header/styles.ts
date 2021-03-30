import styled, { keyframes, css } from 'styled-components';

const navLinkFade = keyframes`
 from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

interface NavProps {
	Open: boolean;
}

interface NavLinkProps {
	Open: boolean;
	animationTiming: number;
}

export const Nav = styled.nav`
	position: fixed;
	top: 0;
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	min-height: 10vh;
	background-color: #ffffff;
	z-index: 99;
	box-shadow: 5px 0 10px 5px #888888;
`;

export const Navlogo = styled.div`
	color: #722fb7;
	font-size: 1.6875rem;
	font-family: 'Pacifico', cursive !important;
`;

export const Link = styled.li<NavLinkProps>`
	list-style: none;

	a {
		color: #722fb7;
		text-decoration: none;
		font-size: 1rem;
		letter-spacing: 1px;
		cursor: pointer;
		transition: all 200ms ease-in-out;
		&:hover {
			opacity: 0.5;
		}
	}

	${({ Open, animationTiming }) =>
		Open
			? css`
					animation: ${navLinkFade} ease forwards ${animationTiming}s;
			  `
			: css``};
`;

export const NavLinks = styled.ul<NavProps>`
	display: flex;
	justify-content: space-around;
	width: 45%;
	align-items: center;

	@media screen and (max-width: 1024px) {
		width: 60%;
	}

	@media screen and (max-width: 768px) {
		position: fixed;
		right: 0px;
		height: 90vh;
		top: 10vh;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 50%;

		${({ Open }) =>
			Open
				? css`
						transform: translateX(0%);
				  `
				: css`
						transform: translateX(100%);
				  `};

		transition: transform 0.5s ease-in;

		body {
			overflow-x: hidden;
		}

		li {
			opacity: 0;
		}
	}
`;

interface BurguerProps {
	Open: boolean;
}

export const Burguer = styled.div<BurguerProps>`
	display: none;

	div {
		width: 25px;
		height: 3px;
		background-color: #722fb7;
		margin: 5px;
		transition: all 0.3s ease;
	}

	@media screen and (max-width: 768px) {
		display: block !important;
		cursor: pointer;
	}

	${({ Open }) =>
		Open
			? css`
					.line1 {
						transform: rotate(-45deg) translate(-5px, 6px);
					}

					.line2 {
						opacity: 0;
					}

					.line3 {
						transform: rotate(45deg) translate(-5px, -6px);
					}
			  `
			: css``}
`;
