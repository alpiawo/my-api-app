import React, { useEffect, useState } from "react";
import { HiMiniPlus, HiMiniPencilSquare, HiMiniTrash } from "react-icons/hi2";
import { fetchGuru, deleteGuru } from "../../services/api";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { addGuru, updateGuru } from '../../services/api'

const GuruHome = () => {
  const [Guru, setGuru] = useState([]);

  useEffect(() => {
    const loadGuru = async () => {
      try {
        const result = await fetchGuru();
        console.log("Respons dari API:", result); 
        setGuru(result);
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };
    loadGuru();
  }, []);

  const handleSubmit = async () => {
    const { value: formValues } = await Swal.fire({
        title: "Add Data Guru Baru",
        html: `
            <input id="swal-input1" class="swal2-input" placeholder="Nama Guru">
            <input id="swal-input2" class="swal2-input" placeholder="Alamat Guru">
            <input id="swal-input3" class="swal2-input" placeholder="Telp Guru">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Create",
        preConfirm: () => {
            const nama = document.getElementById("swal-input1").value;
            const alamat = document.getElementById("swal-input2").value;
            const telp = document.getElementById("swal-input3").value;

            if (!nama || !alamat || !telp) {
                Swal.showValidationMessage("Tolong isi nama Guru dengan benar!");
            }
            return {nama : nama, alamat : alamat, telp : telp};
        },
    });

    if (formValues) {
        try {
            const response = await addGuru(formValues);
            setGuru([...Guru, response]);
            Swal.fire("Berhasil", "Data berhasil ditambahkan!");
            console.log("Response:", response);
        } catch (error) {
            Swal.fire("Terjasi Kesalahan", "Gagal menambahkan data!", "error");
            console.error("Error:", error);
        }
    }
}

const handleEdit = async (id, currentNama, currentAlamat, currentTelp) => {
  const { value: formValues } = await Swal.fire({
      title: "Edit Data Guru",
      html: `
          <input id="swal-input1" class="swal2-input" value="${currentNama}" placeholder="Nama Guru">
          <input id="swal-input2" class="swal2-input" value="${currentAlamat}" placeholder="Alamat Guru">
          <input id="swal-input3" class="swal2-input" value="${currentTelp}" placeholder="Telp Guru">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
          const nama = document.getElementById("swal-input1").value;
          const alamat = document.getElementById("swal-input2").value;
          const telp = document.getElementById("swal-input3").value;
          if (!nama || !alamat || !telp) {
              Swal.showValidationMessage("Tolong isi data Guru dengan benar!");
          }
          return { nama : nama, alamat : alamat, telp : telp};
      },
  });

  if (formValues) {
      try {
          await updateGuru(id, formValues);
          setGuru(
              Guru.map((item) => 
                  item.id === id ? { ...item, nama: formValues.nama, alamat: formValues.alamat, telp: formValues.telp } : item
              )
          );
          Swal.fire("Berhasil", "Data berhasil diperbarui!", "success");
      } catch (error) {
          Swal.fire("Terjadi Kesalahan", "Gagal memperbarui data!", "error");
          console.error("Error:", error);
      }
  }
};

const handleDelete = (id) => {
    Swal.fire({
        title: 'Apakah anda ingin menghapus data ini?',
        text: 'Anda tidak akan bisa dikembalikan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Batal',
        confirmButtonText: 'Ya, Hapus data ini!'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteGuru(id);
            setGuru(Guru.filter((item) => item.id!== id));

            Swal.fire(
                'Berhasil dihapus!',
                `Data dengan ID ${id} Berhasil dihapus.`,
                'Berhasil'
            );
        }
    })
  }

  

const columns = [
    {name : 'Id', selector: (row) => row.id, sortable: true},
    {name: 'Nama Guru', selector: (row) => row.nama, sortable: true},
    {name: 'Alamat Guru', selector: (row) => row.alamat, sortable: true},
    {name: 'Telp Guru', selector: (row) => row.telp, sortable: true},
    {name: 'Actions', cell: (row) => (
        <div className="flex">
            <button className="p-2 rounded-md bg-orange-400 shadow-sm mr-3 hover:bg-orange-500 hover:shadow-lg" onClick={() => handleEdit(row.id, row.nama, row.alamat, row.telp)}>
                <HiMiniPencilSquare />
            </button>
            <button className="p-2 rounded-md bg-red-400 shadow-md hover:bg-red-500 hover:shadow-lg" onClick={() => handleDelete(row.id)} >
                <HiMiniTrash />
            </button>
        </div>
    ),},
];

  return (
    <div className="containe">
            <div className="mt-10 rounded-md shadow p-10">
            <p className="text-center mb-10 text-3xl font-bold">Data Guru</p>
            <button onClick={() => handleSubmit() } className="bg-emerald-600 mb-5 text-white flex justify-center items-center p-2 rounded-md">
                <HiMiniPlus className="text-2xl"/> Add Guru
            </button>
            <DataTable
                className="rounded"
                title="Karakter"
                columns={columns}
                data={Guru}
                pagination
                sortIcon={<span>&#9650;</span>}
                />
            </div>
        </div>
  );
};

export default GuruHome;
