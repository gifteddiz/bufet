import AOS from 'aos';
import "aos/dist/aos.css";

class ScrollAnimation {
	constructor() {
		AOS.init({
			duration: 1200
		});
	}
}

export default ScrollAnimation;