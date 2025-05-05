import { Controller } from "@hotwired/stimulus";
import $ from 'jquery';
import 'slick-carousel';
export default class extends Controller {
    static targets = ["slider"];

    connect() {
        $(this.sliderTarget).slick({
            slidesToShow: 2,
            centerMode: true,
            variableWidth: true,
            slidesToScroll: 1,
            autoplay: false,
            arrows: false,
            dots: true,
            autoplaySpeed: 2000,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 1,
                        centerMode: true,
                        variableWidth: true,
                    }
                },
            ]
        });
    }
}
