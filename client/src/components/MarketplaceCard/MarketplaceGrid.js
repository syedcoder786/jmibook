import styled from 'styled-components';
import { fonts, usedFonts } from '../../constants/Fonts';
import { theme } from '../../constants/Theme';

const MarketplaceWrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 5% 5%;
  h1 {
    font-family: ${usedFonts.termina};
    font-size: ${fonts.heading2};
    margin-bottom: 2em;
    span {
      color: ${theme.lightYellow}
    }
  }
  .header, .body {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 90%;
    margin-bottom: 5%;
  }
  @media(min-width: 1024px) {
    .header {
      display: grid;
      justify-content: center;
      align-items: center;
      grid-template-columns: 50% 50%;
      gap: 2.4em;
      margin-bottom: 2.4em;
      .cardPack {
      }
    }
    .body {
      display: grid;
      justify-content: center;
      align-items: center;
      grid-template-columns: 33% 33% 33%;
      gap: 2.4em 1.6em;
    }
  }
`

export default MarketplaceWrapper;
