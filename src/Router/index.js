import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import DirectorHomePage from '../Components/DirectorHomePage';
import VolunteerSignUp from '../Components/VolunteerSignUp';
import VolunteerHomePage from '../Components/VolunteerHomePage';
import HomePage from '../Components/HomePage';
import LoginPage from '../Components/LoginPage';
import EditDirectorPage from '../Components/EditDirectorPage';
import VolunteerPickUpPage from '../Components/VolunteerPickUpPage';
import VolunteerExchange from '../Components/VolunteerExchange';
import VolunteerDiscardLoss from '../Components/VolunteerDiscardLoss';
import VolunteerDelivery from '../Components/VolunteerDelivery';
import OutletRegistration from '../Components/OutletRegistration';
import CouponBuyPage from '../Components/CouponBuyPage';
import SignUpMessage from '../Components/SignUpMessage';
import EditVolunteerProfile from '../Components/EditVolunteerProfile';
import CouponBuyMessage from '../Components/CouponBuyMessage';
import PaymentFailedMessage from '../Components/PaymentFailedMessage';
import SideMenu from '../Components/sideMenu';
import CheckedYesLabelYesStateDefault from '../Components/CheckedYesLabelYesStateDefault';
import SetPasswordPage from '../Components/SetPasswordPage'
import ForgotPassword from '../Components/ForgotPassword';
import PasswordSupply from '../Components/PasswordSupply';
import ForgotPswEmail from '../Components/ForgetPswMessage';

const RouterDOM = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/directorhomepage"><DirectorHomePage /></Route>
				<Route exact path="/volunteersignup"><VolunteerSignUp /></Route>
				<Route exact path="/volunteerhomepage"><VolunteerHomePage /></Route>
				<Route exact path="/"><HomePage /></Route>
				<Route exact path="/loginpage"><LoginPage /></Route>
				<Route exact path="/forgotpassword"><ForgotPassword /></Route>
				<Route exact path="/forgotpswemail"><ForgotPswEmail /></Route>
				<Route exact path="/passwordsupply"><PasswordSupply /></Route>
				<Route exact path="/editdirectorpage"><EditDirectorPage /></Route>
				<Route exact path="/volunteerpickuppage"><VolunteerPickUpPage /></Route>
				<Route exact path="/volunteerexchange"><VolunteerExchange /></Route>
				<Route exact path="/volunteerdiscardloss"><VolunteerDiscardLoss /></Route>
				<Route exact path="/volunteerdelivery"><VolunteerDelivery /></Route>
				<Route exact path="/outletregistration"><OutletRegistration /></Route>
				<Route exact path="/couponbuypage"><CouponBuyPage /></Route>
				<Route exact path="/signupmessage"><SignUpMessage /></Route>
				<Route exact path="/editvolunteerprofile"><EditVolunteerProfile /></Route>
				<Route exact path="/couponbuymessage"><CouponBuyMessage /></Route>
				<Route exact path="/paymentfailedmessage"><PaymentFailedMessage /></Route>
				<Route exact path="/sidemenu"><SideMenu /></Route>
				<Route exact path="/checkedyeslabelyesstatedefault"><CheckedYesLabelYesStateDefault /></Route>
				<Route exact path="/setpassword"><SetPasswordPage/></Route>
			</Switch>
		</Router>
	);
}
export default RouterDOM;
