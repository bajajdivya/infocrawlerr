import Navbar from "./Components/Navbar";
import Description from "./Components/Description";
import Card from "./Components/Card";
import { data } from "./Data/data";
import useMediaQuery from "./Hooks/useMediaQuery";

function App() {
  const isMobile = useMediaQuery("(min-width: 800px)");

  const cardData = data.map((ele, index) => {
    return (
      <Card
        key={index}
        title={ele.title}
        logo={ele.logo}
        routelink={ele.routelink}
      />
    );
  });
  return (
    <div
      className={`w-screen ${
        isMobile ? "h-screen" : "h-max gap-y-8"
      } flex flex-col justify-evenly `}
    >
      <div className="flex flex-col justify-evenly items-center h-max">
        <Navbar />
        <Description />
      </div>
      <div
        className={`flex ${
          isMobile ? "flex-row" : "flex-col gap-y-10"
        } justify-evenly items-center`}
      >
        {cardData}
      </div>
    </div>
  );
}

export default App;
