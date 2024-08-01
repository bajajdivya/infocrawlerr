import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Card(props) {
  const navigate = useNavigate();

  const submitHandler = () => {
    navigate(props.routelink);
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100vh" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", bounce: 0.3 }}
    >
      <div className="flex hover:scale-110 shadow-[0_10px_20px_rgba(210,215,211,_0.4)] rounded-xl">
        <div className="h-80 w-72 bg-gradient-to-r from-slate-200 to-gray-300 flex flex-col justify-center items-center rounded-xl flex-wrap">
          <img
            src={require(`../Images/${props.logo}`)}
            alt="logo"
            className="h-48 w-48 object-contain"
          />
          <div
            onClick={submitHandler}
            className="bg-gradient-to-r from-indigo-900 to-fuchsia-700 border-2 border-white rounded-lg  h-10 w-36 cursor-pointer  text-center flex items-center justify-center hover:opacity-60"
          >
            <div className="text-white font-normal text-lg font-poppins">
              {props.title}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
