import { createGlobalStyle } from "styled-components";

import RobotoRegular from './Roboto-Regular.woff'
import RobotoThin from './Roboto-Thin.woff'
import RobotoLight from './Roboto-Light.woff'
import RobotoBold from './Roboto-Bold.woff'
import BebasNeue from './BebasNeue-Regular.woff'
import PTSansBold from './PTSans-Bold.woff'

const FontStyles =  createGlobalStyle`
    @font-face {
        font-family: 'Roboto Regular';
        src: local('Roboto Regular'),
        url(${RobotoRegular}) format('woff');
    }

    @font-face {
        font-family: 'Roboto Thin';
        src: local('Roboto Thin'), 
        url(${RobotoThin}) format('woff') ;
    }

    @font-face {
        font-family: 'Roboto Light';
        src: local('Roboto Light'), 
        url(${RobotoLight}) format('woff') ;
    }

    @font-face {
        font-family: 'Roboto Bold';
        src: local('Roboto Bold'), 
        url(${RobotoBold}) format('woff') ;
    }

    @font-face {
        font-family: 'Bebas Neue';
        src: local('Bebas Neue'), 
        url(${BebasNeue}) format('woff');
    }

    @font-face {
        font-family: 'PTSans Bold';
        src: local('PTSans Bold'), 
        url(${PTSansBold}) format('woff');
    }
    
`;

export default FontStyles;