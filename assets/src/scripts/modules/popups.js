import 'magnific-popup';

class Popups {

	constructor() {
		this.init();
	}

	init() {
		$('.jsPopup').magnificPopup({
      type: 'inline',
      fixedContentPos: false,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      mainClass: 'my-mfp-slide-bottom'
    });
    
    $('.jsImagePopup').magnificPopup({
      type: 'image',
      mainClass: 'mfp-no-margins mfp-with-zoom',
      zoom: {
        enabled: true,
        duration: 300 
      }
    });
    
    $('.jsIframePopup').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
    
      fixedContentPos: false
    });
    
    $('.jsGallery').each(function(){
      $(this).magnificPopup({
        delegate: 'a', 
        type: 'image',
        mainClass: 'mfp-with-zoom',
        zoom: {
          enabled: true,
          duration: 300,
          easing: 'ease-in-out',
          opener: function(openerElement) {
            return openerElement.is('img') ? openerElement : openerElement.find('img');
          }
        },
        gallery: {
          enabled:true
        }
      });
    });
    
    $('.jsClosePopup').click(function(e){
      e.preventDefault();
      $.magnificPopup.close();
    });
    
    $('body').on('click','.gallery a', function(e){
      e.preventDefault();
      var src = $(this).find('img').attr('src');
      $.magnificPopup.open({
        items: {
          src: src
        },
        type: 'image'
      }, 0);
    });
	}
}

export default Popups;
