import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="">
      <h3>Home</h3>
      <Link to="/create">Create</Link>
      <Link to="/about">About</Link>
      <Link to="/detail">Detail</Link>
    </div>
  )
}
