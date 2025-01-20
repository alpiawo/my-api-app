import React from "react";
import { Navbar } from "./components/Navbar";
// import { fetchGuru, deleteGuru, addGuru, updateGuru } from "../src/services/api";
// 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/jurusan/Home";
// import GuruHome from "./pages/guru/GuruHome";
import KelasHome from "./pages/kelas/KelasHome";
// import PeraturanHome from "./pages/peraturan/PeraturanHome";
import SiswaHome from "./pages/siswa/SiswaHome";


const App = () => {
  return (
    <Router>
      <div className="navbar-header">
        <Navbar/>
      </div>
      <div className="p-4 ml-0 sm:ml-64">
        <Routes>
            <Route path="/jurusan" element={<Home />} />
            {/* <Route path="/guru" element={<GuruHome />} /> */}
            <Route path="/kelas" element={<KelasHome />} />
            {/* <Route path="/Peraturan" element={<PeraturanHome />} /> */}
            <Route path="/Siswa" element={<SiswaHome />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
