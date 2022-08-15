import './App.scss';

import {useRoutes} from "./router";
import {Routes} from "react-router-dom";

function App() {
  // const isOrdering = useSelector(state => state.main.isOrdering)
  // const isAdmin = useSelector(state => state.main.isAdmin)

  const routes = useRoutes(false, false)

  return (
    <Routes>
      { routes }
    </Routes>
  )
}

export default App;
