import SplitWithImage from "./2-cols-with-img";
import GridListWithHeading from "./grid-listing";
import Hero from "./hero";
import SimpleThreeColumns from "./simple-3-columns";
import SimpleCardWrapper from "./simple-card-wrapper";

const Home = () => {
  return (
    <>
      <Hero />
      <SplitWithImage />
      <SimpleThreeColumns />
      <GridListWithHeading />
      <SimpleCardWrapper />
    </>
  );
};

export default Home;
