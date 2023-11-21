"use client";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { defaultTheme } from "@/style/theme";
import StyledComponentsRegistry from "./lib/registry";
import Head from "./head";
import Header from "./_components/header";
import { useIsMobile } from "./hooks/useIsMobile";
import { StoreProvider } from "@/redux/storeProvider";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  @font-face {
font-family: 'UhBeeSe_hyun';
src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_five@.2.0/UhBeeSe_hyun.woff') format('woff');
font-weight: normal;
font-style: normal;
}
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  /* font: inherit; */
  vertical-align: baseline;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  font-stretch: condensed;
  line-height: 1.2;
  background-color: transparent;
}
a {
  text-decoration:none;
  color:inherit;
}
p, li, h1, h2, h3{
  transform : rotate(0.04deg); 
}
`;
const Background = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  --dot-bg: #fff5e3;
  --dot-color: #cc7777;
  --dot-size: 2px;
  --dot-space: 40px;
  background: linear-gradient(
        90deg,
        var(--dot-bg) calc(var(--dot-space) - var(--dot-size)),
        transparent 1%
      )
      center / var(--dot-space) var(--dot-space),
    linear-gradient(
        var(--dot-bg) calc(var(--dot-space) - var(--dot-size)),
        transparent 1%
      )
      center / var(--dot-space) var(--dot-space),
    var(--dot-color);
`;

const AppWrap = styled.div`
  width: 430px;
  max-height: 914px;
  height: 100%;
  padding: 20px;
  background-color: #646464;
  border-radius: 20px;
  border: solid 0.7px;
  box-sizing: border-box;
`;

const AppInner = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  .mainImg {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      position: relative !important;
      object-fit: contain;
    }
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  return (
    <html lang="kr">
      <body>
        <StoreProvider>
          <StyledComponentsRegistry>
            <ThemeProvider theme={defaultTheme}>
              <GlobalStyle />
              <Background>
                {isMobile ? (
                  <AppInner>
                    <Head />
                    <Header />
                    <div>{children}</div>
                  </AppInner>
                ) : (
                  <AppWrap>
                    <AppInner>
                      <Head />
                      <Header />
                      <div>{children}</div>
                    </AppInner>
                  </AppWrap>
                )}
                {/* <AppWrap>
                <AppInner>
                  <Head />
                  <Header />
                  <div>{children}</div>
                </AppInner>
              </AppWrap> */}
              </Background>
            </ThemeProvider>
          </StyledComponentsRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
