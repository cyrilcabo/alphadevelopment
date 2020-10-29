//Material components
import Grid from '@material-ui/core/Grid';

//Utils
import React from 'react';

//Custom components
import Navbar from './Navigation/navbar';
import NavDrawer from './Navigation/navdrawer';
import Footer from './Footer/footer';
import Routes from './Routes/routes';

//Utility components
import ScrollToTop from './Utils/scrolltotop';
import SVGDefs from './Utils/svgdefs';

//React-router
import {BrowserRouter as Router} from 'react-router-dom';

interface NavLink {
  name: string;
  link: string;
}

const App = ():JSX.Element  => {
  const [active, setActive]: [boolean, Function] = React.useState(false);
  const handleActive = ():void => setActive(active ?false :true);

  React.useEffect(() => {
    const handleScroll = (e: Event):void => {
      setActive(false);
      window.removeEventListener('scroll', handleScroll);
    }
    if (active) window.addEventListener('scroll', handleScroll);
  }, [active]);

  const navs:NavLink[] = [
    {
      name: "Home",
      link: "/"
    },
    {
      name: "Products",
      link: "/products",
    },
    {
      name: "About",
      link: "/about",
    }
  ];
  return (
    <Router>
      <ScrollToTop>
        <Grid item xs={12}>
            <SVGDefs />
            <Navbar navs={navs} handleActive={handleActive}/>
             <NavDrawer active={active} handleActive={handleActive} navs={navs} />
            <Routes />
            <Footer navs={navs} />
        </Grid>
      </ScrollToTop>
    </Router>
  );
}

export default App;