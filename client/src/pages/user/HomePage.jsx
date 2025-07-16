import Header from '../../components/user/Header';
import Section1 from '../../components/user/home/Section1';
import Section2 from '../../components/user/home/Section2';
import Section3 from '../../components/user/home/Section3';
import Section4 from '../../components/user/home/Section4';
import BottomNav from '../../components/user/BottomNav';

function HomePage() {
  return(
    <>
    <Header></Header>
    <Section1></Section1>
    <Section2></Section2>
    <Section3></Section3>
    <Section4></Section4>
    <BottomNav></BottomNav>
    </>
  );
}

export default HomePage;