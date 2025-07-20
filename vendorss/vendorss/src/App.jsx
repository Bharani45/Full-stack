import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VendorRegister from './pages/VendorRegister';
import VendorLogin from './pages/VendorLogin';
import VendorDashboard from './pages/VendorDashboard';

function App() {
  const backendurl = 'http://localhost:4000';
  const [vendorToken, setVendorToken] = useState(localStorage.getItem("vendorToken"));
  const navi = useNavigate();

  return (
    <Routes>
      <Route path="/vendor-register" element={<VendorRegister backendurl={backendurl} navi={navi} />} />
      <Route path="/vendor-login" element={<VendorLogin backendurl={backendurl} setVendorToken={setVendorToken} navi={navi} />} />
      <Route path="/vendor/dashboard" element={<VendorDashboard vendorToken={vendorToken} />} />
    </Routes>
  );
}
