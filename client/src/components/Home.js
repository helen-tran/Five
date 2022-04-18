import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Home = () => {
  /* Use srcSet so that the Hero Image is responsive, on mobile phones we load a square Hero image */
  const HERO_IMG_WIDE = "/assets/hero_image_wide.jpg";
  const navigate = useNavigate();
  return (
    <>
      <section className="m-0 home--page">
        <div className="column p-0 b-0 m-0">
          <Header1TextWrapper>
            <Header1Text1>New Arrivals</Header1Text1>
            <Header1Text2>Quality Watches & Wearables</Header1Text2>
            <ButtonStyled onClick={() => navigate("/products")}>
              Shop Now
            </ButtonStyled>
          </Header1TextWrapper>

          <picture>
            <source media="(min-width: 481px)" srcSet={HERO_IMG_WIDE}></source>
            <HeroImage src="/assets/hero_image_square.jpg"></HeroImage>
          </picture>
        </div>
      </section>
      <section className="_50 _spacearound m-0">
        <div className="column p-0 b-0 m-0">
          <Container className="left-container">
            <LeftImage></LeftImage>
          </Container>
        </div>
        <div className="column p-0 b-0 m-0">
          <Container className="right-container">
            <RightImage></RightImage>
          </Container>
        </div>
      </section>
      <div className="section section--home-page">
        <div className="section__left">
          <Header3Text1>CAPTURE YOUR PERFECT MOMENT WITH OUR</Header3Text1>
          <Header3Text2>ENTERTAINMENT GAGDETS</Header3Text2>
        </div>
        <div className="section__right">
          <RightImageBottom src="/assets/sony.jpg"></RightImageBottom>
        </div>
      </div>
    </>
  );
};

const LeftImage = styled.span`
  background-image: url("/assets/medicine_ball.jpg");
  float: right;
`;

const RightImage = styled.span`
  float: left;
  background-image: url("/assets/stretching.jpg");
`;

const RightImageBottom = styled.img`
  width: 100%;
`;

const Container = styled.div`
  @media (max-width: 768px) {
    display: flex;
    margin-bottom: 20px;
  }
  @media (max-width: 480px) {
    justify-content: center !important;
  }

  &.right-container {
    justify-content: left;
  }

  &.left-container {
    justify-content: right;
    @media (max-width: 480px) {
      margin-top: 20px;
    }
  }

  span {
    min-height: 650px;
    @media (max-width: 1024px) {
      min-height: 550px;
    }
    @media (max-width: 768px) {
      min-height: 450px;
    }
    @media (max-width: 640px) {
      min-height: 360px;
    }
    @media (max-width: 480px) {
      background-position: center;
      min-height: 275px;
    }
    width: 80%;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;
const Header1TextWrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  flex-direction: column;
  top: 50%;
  transform: translateY(-50%);
`;
const Header1Text1 = styled.h1`
  color: white;
  text-transform: uppercase;
  font-size: var(--font-size-big);
  margin-left: 30px;
  font-weight: normal;
  @media (max-width: 768px) {
    font-size: var(--font-size-medium);
  }
  @media (max-width: 480px) {
    display: none;
  }
`;
const Header1Text2 = styled.h3`
  color: white;
  text-transform: uppercase;
  font-size: var(--font-size-medium);
  margin-left: 30px;
  @media (max-width: 768px) {
    font-size: var(--font-size-small);
  }
  @media (max-width: 480px) {
    display: none;
  }
`;
const ButtonStyled = styled.button`
  font-family: "Oswald";
  text-transform: uppercase;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  margin-left: 30px;
  margin-top: 30px;
  border: none;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 480px) {
    display: none;
  }
`;
const Header3Text1 = styled.h3`
  font-weight: normal;
`;
const Header3Text2 = styled.h3`
  font-size: 32px;
`;
const HeroImage = styled.img`
  width: 100%;
`;

export default Home;
