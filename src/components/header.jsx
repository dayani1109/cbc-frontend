import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-accent h-[100px] text-white px-[10px]">
      <div className="w-full h-full flex relative">
        <img
          src="/logor.png"
          className="h-full absolute w-[110px] left-0 object-cover"
        />
        <div className="h-full flex justify-center items-center w-full gap-[40px] text-lg">
          <Link to="/">Home</Link>
          <Link to="/products">Learning Materials</Link>
          <Link to="/about">Performance</Link>
          <Link to="/contact">Time Table</Link>
          <Link to="/contact">Quizzes/Assessment</Link>
          <Link to="/contact">Feedback</Link>
          <Link to="/contact">Announcement</Link>
        </div>
      </div>
    </header>
  );
}
