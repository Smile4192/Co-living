import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slick-wrapper.css';

interface IArrow {
  className?: string;
  style?: object;
  onClick?: () => void;
}

function SampleNextArrow(props: IArrow) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', right: 0, zIndex: 1 }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: IArrow) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', left: 0, zIndex: 1 }}
      onClick={onClick}
    />
  );
}

export default function SlickWrapper({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  const settings = {
    lazyLoad: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // appendDots: (dots) => (
    //   <div
    //     style={{
    //       position: 'absolute',
    //       top: 0,
    //       left: 0
    //     }}
    //   >
    //     <ul style={{ margin: '0px', padding: 0 }}> {dots} </ul>
    //   </div>
    // ),
    // customPaging: (i) => (
    //   <div
    //     style={{
    //       width: '30px',
    //     }}
    //   >
    //     {i + 1}
    //   </div>
    // ),
  };
  return <Slider {...settings}>{children}</Slider>;
}
