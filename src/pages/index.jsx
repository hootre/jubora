import toast from "react-hot-toast";
import Loader from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Loader show />
      <button onClick={() => toast.success("hello toast!")}>Toast Me</button>
    </div>
  );
}
