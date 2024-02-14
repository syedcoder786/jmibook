import styled from 'styled-components'

import { theme } from "../constants/Theme"

const BGGradiente = styled.span`
    background: ${theme.gradient};
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    -webkit-text-fill-color: transparent;
`

export default BGGradiente