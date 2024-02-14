import styled from 'styled-components'

import {theme} from '../constants/Theme'

const BoataoEstilizado = styled.button`
    background-color: ${theme.neutral100};
    color: ${theme.neutral0};
    border: 1px solid ${theme.default};
    width: 3em;
    height: 3em;
    cursor: pointer;

    padding: .5em;
    margin: .2em;
`

export default BoataoEstilizado;