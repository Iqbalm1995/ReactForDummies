import { useState } from "react";
import reactLogo from "./assets/react.svg";
import FlexContent from "./components/HeaderContent";
import SidebarWithHeader from "./components/LayoutMain";
import MidContent from "./components/MidContent";
import MidContentAlt from "./components/MidContentAlt";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <FlexContent />
      <MidContentAlt />
    </div>
  );
}

export default App;
