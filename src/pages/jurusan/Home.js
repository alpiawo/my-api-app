import React, { useEffect, useState } from "react";
import { HiMiniPlus, HiMiniPencilSquare, HiMiniTrash } from "react-icons/hi2";
import { fetchJurusan, deleteJurusan } from "../../services/api";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addJurusan, updateJurusan } from '../../services/api'

const Home = () => {
  const [jurusan, setJurusan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadJurusan = async () => {
      console.log("Mulai mengambil data...");
      try {
        const result = await fetchJurusan();
        console.log("Respons dari API:", result); 
        setJurusan(result);
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };
    loadJurusan();
  }, []);

  const handleSubmit = async () => {
    const { value: formValues } = await Swal.fire({
        title: "Add Data Jurusan Baru",
        html: `
            <input id="swal-input1" class="swal2-input" placeholder="Nama Jurusan">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Create",
        preConfirm: () => {
            const nama = document.getElementById("swal-input1").value;
            if (!nama) {
                Swal.showValidationMessage("Tolong isi nama jurusan dengan benar!");
            }
            return {nama};
        },
    });

    if (formValues) {
        try {
            const response = await addJurusan(formValues);
            setJurusan([...jurusan, response]);
            Swal.fire("Berhasil", "Data berhasil ditambahkan!");
            console.log("Response:", response);
        } catch (error) {
            Swal.fire("Terjasi Kesalahan", "Gagal menambahkan data!", "error");
            console.error("Error:", error);
        }
    }
}

const handleEdit = async (id, currentNama) => {
  const { value: formValues } = await Swal.fire({
      title: "Edit Data Jurusan",
      html: `
          <input id="swal-input1" class="swal2-input" value="${currentNama}" placeholder="Nama Jurusan">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
          const nama = document.getElementById("swal-input1").value;
          if (!nama) {
              Swal.showValidationMessage("Tolong isi nama jurusan dengan benar!");
          }
          return { nama };
      },
  });

  if (formValues) {
      try {
          await updateJurusan(id, formValues);
          setJurusan(
              jurusan.map((item) => 
                  item.id === id ? { ...item, nama: formValues.nama } : item
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
            deleteJurusan(id);
            setJurusan(jurusan.filter((item) => item.id!== id));

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
    {name: 'Nama Jurusan', selector: (row) => row.nama, sortable: true},
    {name: 'Actions', cell: (row) => (
        <div className="flex">
            <button className="p-2 rounded-md bg-orange-400 shadow-sm mr-3 hover:bg-orange-500 hover:shadow-lg" onClick={() => handleEdit(row.id, row.nama)}>
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
            <p className="text-center mb-10 text-3xl font-bold">Data Jurusan</p>
            <button onClick={() => handleSubmit() } className="bg-emerald-600 mb-5 text-white flex justify-center items-center p-2 rounded-md">
                <HiMiniPlus className="text-2xl"/> Add Jurusan
            </button>
            <DataTable
                className="rounded"
                title="Karakter"
                columns={columns}
                data={jurusan}
                pagination
                sortIcon={<span>&#9650;</span>}
                />
            </div>
        </div>
  );
};

export default Home;
