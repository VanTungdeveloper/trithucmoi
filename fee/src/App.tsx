import Foote from "./layout/components/footer";
import NavBar from "./layout/components/header";
import HomeClient from "./pages/client";

function App() {
  return (
    <>
      <NavBar />
        <HomeClient />
      <Foote />
    </>
  );
}

export default App;
