
        const tryRequire = (path) => {
        	try {
        	const image = require(`${path}`);
        	return image
        	} catch (err) {
        	return false
        	}
        };

        export default {
        
	questionMark: require('./questionMark.png'),
	DirectorHomePage_Rectangle16: tryRequire('./DirectorHomePage_Rectangle16.png') || require('./questionMark.png'),
	DirectorHomeMenu_Rectangle16: tryRequire('./DirectorHomeMenu_Rectangle16.png') || require('./questionMark.png'),
	HomePage_Rectangle54: tryRequire('./HomePage_Rectangle54.png') || require('./questionMark.png'),
	CouponBuyPage_logo: tryRequire('./CouponBuyPage_logo.png') || require('./questionMark.png'),
	sideMenu_Vector: tryRequire('./sideMenu_Vector.png') || require('./questionMark.png'),
	DirectorHomePage_Rectangle17: tryRequire('./DirectorHomePage_Rectangle17.png') || require('./questionMark.png'),
	DirectorHomeMenu_Rectangle17: tryRequire('./DirectorHomeMenu_Rectangle17.png') || require('./questionMark.png'),
	VolunteerHomePage_Vector: tryRequire('./VolunteerHomePage_Vector.png') || require('./questionMark.png'),
	EditDirectorPage_Rectangle11: tryRequire('./EditDirectorPage_Rectangle11.png') || require('./questionMark.png'),
	EditDirectorPage_Rectangle14: tryRequire('./EditDirectorPage_Rectangle14.png') || require('./questionMark.png'),
	VolunteerSideMenu_btnClose: tryRequire('./VolunteerSideMenu_btnClose.png') || require('./questionMark.png'),
	OutletRegistration_Rectangle72: tryRequire('./OutletRegistration_Rectangle72.png') || require('./questionMark.png'),
}