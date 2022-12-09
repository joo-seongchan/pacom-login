import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const Style = createGlobalStyle`
${reset}

*{
    box-sizing: border-box;
}

a{
    text-decoration: none;
    color: black;
}
`;
