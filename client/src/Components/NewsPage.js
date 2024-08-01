/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { data } from "../Data/data";
import NewsCard from "./NewsCard";
// import useMediaQuery from "../Hooks/useMediaQuery";
export default function NewsPage(props) {
  // const isMobile = useMediaQuery("(min-width:800px)");
  const [dataFetched, setDataFetched] = useState([]);
  console.log(props.dataName);
  const remainingChannel = data.filter(
    (obj) => obj.title.toLowerCase() !== props.dataName
  );
  console.log(remainingChannel);
  function fetchData() {
    const link = `/${props.dataName}`;
    console.log(link);
    fetch(link)
      .then((response) => {
        return response.json();
      })
      .then((dataRes) => {
        console.log(dataRes);
        setDataFetched(dataRes.result);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);
  const content = dataFetched.map((ele, index) => {
    return (
      <NewsCard
        key={index}
        heading={ele.Heading}
        paragraph={ele.Paragraph}
        sentiment={ele.Sentiment}
        polarity={ele.Polarity}
        link={ele.Link}
      />
    );
  });
  const channels = remainingChannel.map((ele, index) => {
    return (
      <div className="text-white text-xl h-max p-2 bg-cyan-500" key={index}>
        {ele.title}
      </div>
    );
  });
  return (
    <div className="flex flex-col h-max justify-evenly gap-y-8 items-center">
      <Navbar />
      <div className="flex justify-around w-[100%]">{channels}</div>
      <div className="flex flex-col  items-center gap-y-8">{content}</div>
    </div>
  );
}
