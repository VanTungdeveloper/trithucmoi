import ClientHeader from "./components/ClientHeader/index.jsx"
import ClientFooter from "./components/ClientFooter/index.jsx";
import ClientContent from "./components/ClientContent/index.jsx";


function HomeClient() {
  return (
    <div className='ClientHome'>
        <ClientHeader />
        <div className='ClientContent'>
          <ClientContent />
        </div>
        <ClientFooter />
    </div>
  );
}

export default HomeClient;
