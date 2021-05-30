class Hamburger {

	constructor() {
		this.hamburger = $( '.hamburger' );
		this.menu = $( '.header__nav' );
		this.menuItem = $( '.header__nav-item' );

		this.listeners();
	}

	listeners() {
		this.hamburger.on('click', ()=>this.hamburgerClick.call(this));
		this.menuItem.on('click', ()=>this.hamburgerClick.call(this));
	}

	hamburgerClick( e ) {
		this.hamburger.toggleClass('--active');
		this.menu.toggleClass('--visible');
	}

}

export default Hamburger;