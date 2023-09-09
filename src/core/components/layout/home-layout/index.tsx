import Content from "./content";
import Footer from "./footer";
import Nav from "./nav";

const HomeLayout = (): JSX.Element => {
  return (
    <>
      <Nav />
      <Content />
      <Footer />
    </>
  );
};

export default HomeLayout;
