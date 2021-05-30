import "slick-carousel";
class How {
  constructor() {
    $(".how__carousel").slick({
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: false,
      dots: true,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }
}
export default How;
