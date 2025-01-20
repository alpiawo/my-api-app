import React, { useEffect, useState } from "react";
import { HiMiniPlus, HiMiniPencilSquare, HiMiniTrash } from "react-icons/hi2";
import { fetchSiswa, addSiswa, updateSiswa, deleteSiswa, fetchKelas, fetchPeraturan, fetchGuru } from "../../services/api";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

const SiswaHome = () => {
  const [siswa, setSiswa] = useState([]);
  const [kelasOptions, setKelasOptions] = useState([]);
  const [peraturanOptions, setPeraturanOptions] = useState([]);
  const [guruOptions, setGuruOptions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const siswaData = await fetchSiswa();
        setSiswa(siswaData);

        const kelasData = await fetchKelas();
        setKelasOptions(kelasData);

        const peraturanData = await fetchPeraturan();
        setPeraturanOptions(peraturanData);

        const guruData = await fetchGuru();
        setGuruOptions(guruData);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data:", error);
      }
    };
    loadData();
  }, []);

  const handleSubmit = async (data) => {
    const { value: formValues } = await Swal.fire({
      title: "Tambah Data Siswa Baru",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Nama Siswa">
        <input id="swal-input2" class="swal2-input" placeholder="NIS">
        <input id="swal-input3" class="swal2-input" placeholder="Alamat">
        <select id="swal-input4" class="swal2-input">
          <option value="">Pilih Kelas</option>
          ${kelasOptions.map(option => `<option value="${option.id}" ${option.id === data.kelasId ? 'selected' : ''}>${option.nama}</option>`).join('')}
        </select>
        <select id="swal-input5" class="swal2-input">
          <option value="">Pilih Pelanggaran</option>
          ${peraturanOptions.map(option => `<option value="${option.id}" ${option.id === data.pelanggaranId ? 'selected' : ''}>${option.nama}</option>`).join('')}
        </select>
        <select id="swal-input6" class="swal2-input">
          <option value="">Pilih Guru</option>
          ${guruOptions.map(option => `<option value="${option.id}" ${option.id === data.guruPencatatId ? 'selected' : ''}>${option.nama}</option>`).join('')}
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Create",
      preConfirm: () => {
        const nama = document.getElementById("swal-input1").value;
        const nis = document.getElementById("swal-input2").value;
        const alamat = document.getElementById("swal-input3").value;
        const kelasId = document.getElementById("swal-input4").value;
        const pelanggaranId = document.getElementById("swal-input5").value;
        const guruPencatatId = document.getElementById("swal-input6").value;
  
        if (!nama || !nis || !alamat || !kelasId || !pelanggaranId || !guruPencatatId) {
          Swal.showValidationMessage("Tolong isi semua field dengan benar!");
        }
        return { nama, nis, alamat, kelasId, pelanggaranId, guruPencatatId };
      },
    });
  
    if (formValues) {
      try {
        const response = await addSiswa(formValues);
        setSiswa([...siswa, response]);
        Swal.fire("Berhasil", "Data siswa berhasil ditambahkan!", "success");
      } catch (error) {
        Swal.fire("Terjadi Kesalahan", "Gagal menambahkan data siswa!", "error");
      }
    }
  };

  const handleEdit = async (id, data) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Data Siswa",
      html: `
        <input id="swal-input1" class="swal2-input" value="${data.nama}" placeholder="Nama Siswa">
        <input id="swal-input2" class="swal2-input" value="${data.nis}" placeholder="NIS">
        <input id="swal-input3" class="swal2-input" value="${data.alamat}" placeholder="Alamat">
        <select id="swal-input4" class="swal2-input">
          <option value="">Pilih Kelas</option>
          ${kelasOptions.map(option => `<option value="${option.id}" ${option.id === data.kelasId ? 'selected' : ''}>${option.nama}</option>`).join('')}
        </select>
        <select id="swal-input5" class="swal2-input">
          <option value="">Pilih Pelanggaran</option>
          ${peraturanOptions.map(option => `<option value="${option.id}" ${option.id === data.pelanggaranId ? 'selected' : ''}>${option.nama}</option>`).join('')}
        </select>
        <select id="swal-input6" class="swal2-input">
          <option value="">Pilih Guru</option>
          ${guruOptions.map(option => `<option value="${option.id}" ${option.id === data.guruPencatatId ? 'selected' : ''}>${option.nama}</option>`).join('')}
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        const nama = document.getElementById("swal-input1").value;
        const nis = document.getElementById("swal-input2").value;
        const alamat = document.getElementById("swal-input3").value;
        const kelasId = document.getElementById("swal-input4").value;
        const pelanggaranId = document.getElementById("swal-input5").value;
        const guruPencatatId = document.getElementById("swal-input6").value;

        if (!nama || !nis || !alamat || !kelasId || !pelanggaranId || !guruPencatatId) {
          Swal.showValidationMessage("Tolong isi semua field dengan benar!");
        }
        return { nama, nis, alamat, kelasId, pelanggaranId, guruPencatatId };
      },
    });

    if (formValues) {
      try {
        const updatedSiswa = await updateSiswa(id, formValues);
        setSiswa(siswa.map(s => (s.id === id ? updatedSiswa : s)));
        Swal.fire("Berhasil", "Data siswa berhasil diperbarui!", "success");
      } catch (error) {
        Swal.fire("Terjadi Kesalahan", "Gagal memperbarui data siswa!", "error");
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await deleteSiswa(id);
        setSiswa(siswa.filter(s => s.id !== id));
        Swal.fire("Berhasil", "Data siswa berhasil dihapus!", "success");
      } catch (error) {
        Swal.fire("Terjadi Kesalahan", "Gagal menghapus data siswa!", "error");
      }
    }
  };

  const columns = [
    { name: "Id", selector: row => row.id, sortable: true },
    { name: "Nama", selector: row => row.nama, sortable: true },
    { name: "NIS", selector: row => row.nis, sortable: true },
    { name: "Alamat", selector: row => row.alamat, sortable: true },
    { 
      name: "Kelas", 
      selector: row => kelasOptions.find(kelas => kelas.id === row.kelasId)?.nama || "Tidak ditemukan", 
      sortable: true,
    },
    { 
      name: "Pelanggaran", 
      selector: row => peraturanOptions.find(peraturan => peraturan.id === row.pelanggaranId)?.nama || "-", 
      sortable: true,
    },
    { 
      name: "Guru Pencatat", 
      selector: row => guruOptions.find(guru => guru.id === row.guruPencatatId)?.nama || "-", 
      sortable: true,
    },
    {
      name: "Actions",
      cell: row => (
        <div className="flex">
          <button className="p-2 rounded-md bg-orange-400 shadow-sm mr-3 hover:bg-orange-500 hover:shadow-lg" onClick={() => handleEdit(row.id, row)}>
            <HiMiniPencilSquare />
          </button>
          <button className="p-2 rounded-md bg-red-400 shadow-md hover:bg-red-500 hover:shadow-lg" onClick={() => handleDelete(row.id)}>
            <HiMiniTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="mt-10 rounded-md shadow p-10">
        <p className="text-center mb-10 text-3xl font-bold">Data Siswa</p>
        <button onClick={handleSubmit} className="bg-emerald-600 mb-5 text-white flex justify-center items-center p-2 rounded-md">
          <HiMiniPlus className="text-2xl" /> Add Siswa
        </button>
        <DataTable
          className="rounded"
          title="Siswa"
          columns={columns}
          data={siswa}
          pagination
          sortIcon={<span>&#9650;</span>}
        />
      </div>
    </div>
  );
};

export default SiswaHome;
