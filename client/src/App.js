import {BrowserRouter,Route} from "react-router-dom";
import SignIn from "./Components/SignIn";

function App() {
    return (<BrowserRouter>
           <Route path='/signIn' render={()=><SignIn />} />
        </BrowserRouter>
    )
}

export default App;
