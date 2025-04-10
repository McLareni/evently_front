import Slider, { Settings } from 'react-slick';
import { nanoid } from '@reduxjs/toolkit';
import { CardData } from '@/pages/OrganizersPage';

import { MySliderBtn } from '../../topEvents/MySliderBtn';
import CommentCard from './CommentCard';



interface ReviewsProps {
  data: CardData[];
}


const Reviews: React.FC<ReviewsProps> = ({data}) => {
      const settings: Settings = {
        pauseOnHover: true,
        slidesToShow: 3.15,
        slidesToScroll: 3,
        speed: 2000,
        infinite: false,
        prevArrow: <MySliderBtn />,
        nextArrow: <MySliderBtn next />,
        arrows: true,
        pauseOnFocus: true,
        initialSlide: 0,
        lazyLoad: 'ondemand',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              arrows: false,
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 769,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '10%',
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
    return (
        <>
            <div className='mb-16'>
                <h1>Відгуки</h1>
                <div>
                    <Slider {...settings}>
                      {data?.map(item => (
                        <div key={nanoid()}>
                          <CommentCard item={item}/>
                        </div>
                      ))}
                    </Slider>
                </div>
            </div>
        </>
    )
}


export default Reviews