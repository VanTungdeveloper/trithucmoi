import './Home.css';
import AdminHeader from './components/AdminHeader';
import SideMenu from './components/SideMenu';
import PageContent from './components/PageContent';
import AdminFooter from './components/AdminFooter';

const HomeAdmin = () => {
  return (
    <div className='Home'>
      <AdminHeader />
      <div className='SideMenuAndPageContent'>
          <SideMenu></SideMenu>
          <PageContent></PageContent>
      </div>
      <AdminFooter />
    </div>
  )
}

export default HomeAdmin;