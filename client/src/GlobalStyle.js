import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --font-size-small: 18px;
    --font-size-medium: 25px;
    --font-size-big: 40px;
  }

  body {
    padding: 0;
    font-family: 'Oswald', sans-serif;
    color: black;
  }
  h2,h3,h4{
    text-transform: uppercase;
    font-weight:400;
  }
  p{
    font-family:'Roboto', sans-serif;
    text-transform: none;
  }
  /* Create a re-usable grid for page layout consistency */
  .grid {
    display: grid;

    /* The grid can be overridden with customizations per page, example cart page */
    &.cart_page {
      grid-template-columns: 33fr 66fr;
      @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
      }
      @media (max-width: 480px) {
        display: flex;
        .grid__left {
          flex: 1;
          .product__image {
            max-width: 80%;
          }
        }
        .grid__right {
          flex: 1;
        }
      }
    }

    /* Add media queries to grid so that it is responsive */
    grid-template-columns: repeat(4, minmax(0, 1fr));
    @media (max-width: 1024px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (max-width: 480px) {
      grid-template-columns: repeat(1, 1fr);
    }
    gap: 10px;
    max-width: 1280px;
    margin: 0 auto;
  }

  /* Create re-usable flex containers for page layout consistency */
  section {
    display: flex;
    margin-bottom: 20px;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    &.home--page{
      position: relative;
    }
    &._spacearound {
      justify-content: space-around !important;
    }
    @media (max-width: 480px) {
      &.m-0 {
        margin: 0;
      }
    }
  }

  .column {
    &.product__details--left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      @media (min-width: 481px) {
        min-height: 500px;
      }
      align-items: center;
    }
    &.product__details--right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 500px;
    }
    &.p-0 {
      padding: 0;
    }
    &.b-0 {
      border: none;
    }
    @media (max-width: 768px) {
      &.m-0 {
        margin: 0 !important;
      }
    }
  }

  .column,
  .column_left,
  .column_right {
    flex: 1;
    padding: 30px;
  }

  /* Target all the column classes so that they share common properties and values */
  section[class^="_"] {
    justify-content: space-between;
    .column,
    .column_left,
    .column_right {
      flex: inherit;
    }
  }

  section._25 {
    .column {
      width: 24%;
    }
  }

  section._25_75 {
    .column_left {
      width: 24%;
    }
    .column_right {
      width: 72%;
    }
  }

  section._33 {
    .column {
      width: 32%;
    }
  }

  section._50 {
    .column {
      width: 48%;
    }
  }

  section._33_66 {
    .column_left {
      width: 32%;
    }
    .column_right {
      width: 64%;
    }
  }

  section._66_33 {
    .column_left {
      width: 64%;
      @media (min-width: 481px) and (max-width: 768px) {
        width: 58%;
      }
    }
    .column_right {
      &.cart__page {
        @media (max-width: 480px) {
          padding-top: 0;
        }
      }
      width: 32%;
      @media (min-width: 481px) and (max-width: 768px) {
        padding-left: 0px;
        width: 38%;
      }
    }
  }

  .section {
    display: flex;
    max-width: 1280px;
    margin: 0 auto;
    .section__left {
      flex: 1;
    }
    .section__right {
      flex: 1;
    }
    &.section--home-page {
      .section__left {
        background-color: #ededed;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        @media (max-width: 480px) {
          padding: 35% 30%;
        }
      }
    }
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  /* http://meyerweb.com/eric/tools/css/reset/
    v2.0 | 20110126
    License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav {
    display: block;
  }

  ol, ul {
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

  body {
    line-height: 1.25;
  }

  @media (max-width: 480px){
    :root {
      section {
        display: block;
        .column,
        .column_left,
        .column_right {
          margin-bottom: 20px;
          width: 100%;
        }
      }
      .section {
        flex-direction: column;
      }
    }
  }
`;
