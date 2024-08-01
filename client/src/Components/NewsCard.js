import useMediaQuery from "../Hooks/useMediaQuery";

export default function NewsCard(props) {
  const isMobile = useMediaQuery("(min-width:800px)");
  let sentimentColor;
  if (props.sentiment === "Neutral") {
    sentimentColor = "text-blue-200";
  } else if (props.sentiment === "Positive") {
    sentimentColor = "text-green-500";
  } else {
    // eslint-disable-next-line no-unused-vars
    sentimentColor = "text-red-500";
  }
  return (
    <div
      className={`border-2 flex flex-col p-4 justify-between h-max ${
        isMobile ? "w-[70%]" : " "
      }`}
    >
      <div className="text-white  text-3xl font-poppins ">{props.heading}</div>
      <div className=" text-white text-xl font-grotesque">
        {props.paragraph}
      </div>
      <div className="flex justify-between">
        <div className="text-white">
          Sentiment :<span className={sentimentColor}>{props.sentiment}</span>
        </div>

        <a href={props.link} target="__blank" className="text-white italic">
          Full Article Here
        </a>
      </div>
    </div>
  );
}
