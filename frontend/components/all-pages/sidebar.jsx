import passportIcon from '../../assets/passport-icon.svg';
import speechBubbleIcon from '../../assets/speechbubble-icon.svg';
import saveIcon from '../../assets/save-icon.svg';
import calculatorIcon from '../../assets/calculator-icon.svg';
import profileIcon from '../../assets/userProfile-icon.svg';
import searchIcon from '../../assets/search-icon.svg';
import GlobalScholar from '../../assets/GlobalScholar-logo.svg';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserAsyncAction } from '../../redux/user/user-slice';
import tw from 'tailwind-styled-components';
import { ImSearch } from 'react-icons/im';
import { MdOutlineForum, MdOutlineAddBox } from 'react-icons/md';
import { BsCalculatorFill, BsPersonCircle } from 'react-icons/bs';
import { FaCity } from 'react-icons/fa';
import { ImBooks } from 'react-icons/im';

const NavigationContainer = tw.div`
  text-white
  font-bold 
  sm:flex 
  hover:cursor-pointer
`;

const SidebarNavigationLinkTitle = tw.div`
  hidden 
  sm:block 
  text-sm 
  sm:text-xl 
  text-right 
  p-2 hover:text-blue-300 
  hover:underline 
  underline-offset-4
`;

const SideBar = () => {
  const { userInfo, loggedIn, userToken, loading, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const currentPath = window.location.pathname;
  const navigate = useNavigate();
  useEffect(() => {
    if (success && !loggedIn) {
      navigate('/login');
    }
    if (loggedIn === false && userInfo.username !== '') {
      dispatch(getUserAsyncAction(userInfo.username));
    }
  }, [success, loggedIn, userInfo]);
  //state management (what states will we need?)
  return (
    <div className="flex flex-row sm:flex-col pl-3 h-24 sm:h-full sm:w-64 w-full fixed sm:sticky bottom-0 gap-4 bg-blue-rgba z-10">
      {/* logo  */}
      <div
        className="w-full sm:flex justify-center mb-5  text-white text-lg indent-1 hidden sm:visible"
        onClick={() => navigate('/')}
      >
        <img
          src={GlobalScholar}
          alt="logo"
          className="flex mr-3.5 cursor-pointer"
          width={150}
          height={150}
        ></img>
      </div>

      {/* links */}
      <div className="w-full flex sm:grid items-center justify-between m-4  sm:gap-8">
        <NavigationContainer onClick={() => navigate('/')}>
          {/* <img src={searchIcon} width={40} height={100}/> */}
          <ImSearch size={36} className="my-auto" />
          <SidebarNavigationLinkTitle>Search</SidebarNavigationLinkTitle>
        </NavigationContainer>
        <NavigationContainer onClick={() => navigate('/city')}>
          <FaCity size={36} className="my-auto" />
          <SidebarNavigationLinkTitle>City</SidebarNavigationLinkTitle>
        </NavigationContainer>
        <NavigationContainer onClick={() => navigate('/program')}>
          <ImBooks size={36} className="my-auto" />
          <SidebarNavigationLinkTitle>Program</SidebarNavigationLinkTitle>
        </NavigationContainer>
        <NavigationContainer onClick={() => navigate('/newpost')}>
          <MdOutlineAddBox size={36} className="my-auto" />
          <SidebarNavigationLinkTitle>Make Post</SidebarNavigationLinkTitle>
        </NavigationContainer>
        <NavigationContainer onClick={() => navigate('/price-estimator')}>
          <BsCalculatorFill size={36} className="my-auto" />
          <SidebarNavigationLinkTitle>Calculator</SidebarNavigationLinkTitle>
        </NavigationContainer>
        <NavigationContainer
          onClick={() => navigate(`/profile/${userInfo.username}`)}
        >
          {userInfo.avatar_url ? (
            <img
              src={userInfo.avatar_url}
              alt="/public/default.png"
              className="rounded-full h-[36px] w-[36px] my-auto"
            />
          ) : (
            <BsPersonCircle size={36} />
          )}
          <SidebarNavigationLinkTitle>Profile</SidebarNavigationLinkTitle>
        </NavigationContainer>
      </div>
    </div>
  );
};

export default SideBar;
