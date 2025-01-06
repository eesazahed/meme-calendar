import { NextPage } from "next";
import nameOfMonthId from "../utils/nameOfMonthId";
import { VoteOptionType } from "../types";

interface Props {
  calendar: VoteOptionType[];
}

const CalendarGrid: NextPage<Props> = ({ calendar }) => {
  const months = Array.from({ length: 12 }, (_, index) => {
    return calendar.find((item) => item.monthId === index) || null;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 justify-items-center mx-auto max-w-screen-xl">
      {months.map((item, index) => (
        <div
          key={index}
          className={`relative rounded-lg shadow-lg h-[250px] w-[250px] overflow-hidden ${
            item &&
            "transition-transform transform hover:scale-[1.05] cursor-pointer duration-500 hover:shadow-[0px_0px_5px_1px_rgba(0,255,255,0.8)]"
          }`}
          style={{
            backgroundImage: item ? `url(/api/images/${item.image})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          onClick={() =>
            item ? (window.location.href = `/vote/${item.id}`) : null
          }
        >
          <div
            className={`${
              !item && "bg-gray-700"
            } text-white h-full p-4 flex flex-col justify-between relative z-10`}
          >
            <div className="font-bold text-xl">{nameOfMonthId(index)}</div>
            {item ? (
              <>
                <div className="font-bold text-xl">{item.title}</div>
              </>
            ) : (
              <p className="text-center text-sm text-gray-500">no data</p>
            )}
          </div>

          {item && (
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;
