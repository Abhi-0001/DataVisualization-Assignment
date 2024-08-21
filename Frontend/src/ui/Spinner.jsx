import styled, { css, keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const sizes = {
  small: css`
    width: 2.4rem;
    margin: 0rem 0.1rem;
  `,
  large: css`
    width: 6.2rem;
    margin: 4.8rem auto;
  `,
};

const Spinner = styled.div`
  width: 6.2rem;
  margin: 4.8rem auto;

  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, var(#16a34a) 94%, #0000) top/10px
      10px no-repeat,
    conic-gradient(#0000 30%, var(#16a34a));
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  animation: ${rotate} 1.5s infinite linear;
`;

export default Spinner;
