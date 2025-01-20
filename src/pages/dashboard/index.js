import { 
    HiAcademicCap,
    HiClipboard,
    HiMiniUser,
    HiMiniUserGroup
 } from "react-icons/hi2";
 import { Link } from "react-router-dom";
import React, {useState, useEffect} from "react";
import { fetchGuru, fetchJurusan, fetchKelas, fetchSiswa } from "../../services/api";

const Dashboard = () => {
    const [countJurusan, setCountJurusan] = useState(0);
    const [countKelas, setCountKelas] = useState(0);
    const [countGuru, setCountGuru] = useState(0);
    const [countSiswa, setCountSiswa] = useState(0);



    useEffect(() => {
        const loadCountJurusan = async () => {
            try {
                const response = await fetchJurusan(); 
                setCountJurusan(response.length);  
            } catch (e) {
                console.error("Error fetching data:", e);
            }
        };
        const loadCountKelas = async () => {
            try {
                const response = await fetchKelas(); 
                setCountKelas(response.length);  
            } catch (e) {
                console.error("Error fetching data:", e);
            }
        };
        const loadCountGuru = async () => {
            try {
                const response = await fetchGuru(); 
                setCountGuru(response.length);  
            } catch (e) {
                console.error("Error fetching data:", e);
            }
        };
        const loadCountSiswa = async () => {
            try {
                const response = await fetchSiswa(); 
                setCountSiswa(response.length);  
            } catch (e) {
                console.error("Error fetching data:", e);
            }
        };
        loadCountJurusan();
        loadCountKelas();
        loadCountGuru();
        loadCountSiswa();
    }, []);

    return (
        <div className="container">
            <div className="countBar flex justify-around">
                <div className="rounded-xl shadow-md bg-teal-600 p-10 px-20 text-center">
                    <div className="flex items-center">
                        <HiAcademicCap className="text-slate-50 text-4xl"/>
                        <p className="text-4xl text-slate-50 font-bold">{countJurusan}</p>
                    </div>
                    <p className="text-2xl text-slate-50">Jurusan</p>
                </div>

                <div className="rounded-xl shadow-md bg-yellow-400 p-10 px-20 text-center">
                    <div className="flex items-center">
                        <HiClipboard className="text-slate-50 text-4xl"/>
                        <p className="text-4xl text-slate-50 font-bold">{countKelas}</p>
                    </div>
                    <p className="text-2xl text-slate-50">Kelas</p>
                </div>

                <div className="rounded-xl shadow-md bg-orange-500 p-10 px-20 text-center">
                    <div className="flex items-center">
                        <HiMiniUser className="text-slate-50 text-4xl"/>
                        <p className="text-4xl text-slate-50 font-bold">{countGuru}</p>
                    </div>
                    <p className="text-2xl text-slate-50">Guru</p>
                </div>

                <div className="rounded-xl shadow-md bg-cyan-700 p-10 px-20 text-center">
                    <div className="flex items-center">
                        <HiMiniUserGroup className="text-slate-50 text-4xl"/>
                        <p className="text-4xl text-slate-50 font-bold">{countSiswa}</p>
                    </div>
                    <p className="text-2xl text-slate-50">Siswa</p>
                </div>
            </div>

            <div className="mt-10 p-5 mx-10 bg-gray-100 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Pelanggaran Siswa</h2>
                <p className="text-center text-gray-600">
                    Manajemen Pelanggaran Siswa -  Mini projek kelompok 3.
                </p>
                <div className="flex justify-center mt-5">
                    <Link to={'/'} className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all">
                        Lihat Detail
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
