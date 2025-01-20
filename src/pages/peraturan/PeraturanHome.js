import React, { useEffect, useState } from "react";
import { HiMiniPlus, HiMiniPencilSquare, HiMiniTrash } from "react-icons/hi2";
import { fetchPeraturan, deletePeraturan } from "../../services/api";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { addPeraturan, updatePeraturan } from '../../services/api'

const PeraturanHome = () => {
  const [Peraturan, setPeraturan] = useState([]);

  useEffect(() => {
    const loadPeraturan = async () => {
      try {
        const result = await fetchPeraturan();
        console.log("Respons dari API:", result); 
        setPeraturan(result);
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };
    loadPeraturan();
  }, []);

  const handleSubmit = async () => {
    const { value: formValues } = await Swal.fire({
        title: "Add Data Peraturan Baru",
        html: `
            <input id="swal-input1" class="swal2-input" placeholder="Nama Peraturan">
            <input id="swal-input2" class="swal2-input" placeholder="Deskripsi Peraturan">
            <input id="swal-input3" class="swal2-input" placeholder="Poin Peraturan">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Create",
        preConfirm: () => {
            const nama = document.getElementById("swal-input1").value;
            const deskripsi = document.getElementById("swal-input2").value;
            const poin = document.getElementById("swal-input3").value;

            if (!nama || !poin || !deskripsi) {
                Swal.showValidationMessage("Tolong isi nama Peraturan dengan benar!");
            }
            return {nama : nama, poin : poin, deskripsi : deskripsi};
        },
    });

    if (formValues) {
        try {
            const response = await addPeraturan(formValues);
            setPeraturan([...Peraturan, response]);
            Swal.fire("Berhasil", "Data berhasil ditambahkan!");
            console.log("Response:", response);
        } catch (error) {
            Swal.fire("Terjasi Kesalahan", "Gagal menambahkan data!", "error");
            console.error("Error:", error);
        }
    }
}

const handleEdit = async (id, currentNama, currentDeskripsi, currentPoin) => {
  const { value: formValues } = await Swal.fire({
      title: "Edit Data Peraturan",
      html: `
          <input id="swal-input1" class="swal2-input" value="${currentNama}" placeholder="Nama Peraturan">
          <input id="swal-input2" class="swal2-input" value="${currentDeskripsi}" placeholder="Deskripssi Peraturan">
          <input id="swal-input3" class="swal2-input" value="${currentPoin}" placeholder="Poin Peraturan">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
          const nama = document.getElementById("swal-input1").value;
          const deskripsi = document.getElementById("swal-input2").value;
          const poin = document.getElementById("swal-input3").value;
          if (!nama || !deskripsi || !poin) {
              Swal.showValidationMessage("Tolong isi data Peraturan dengan benar!");
          }
          return { nama : nama, deskripsi : deskripsi, poin : poin};
      },
  });

  if (formValues) {
      try {
          await updatePeraturan(id, formValues);
          setPeraturan(
              Peraturan.map((item) => 
                  item.id === id ? { ...item, nama: formValues.nama, deskripsi: formValues.deskripsi, poin: formValues.poin } : item
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
            deletePeraturan(id);
            setPeraturan(Peraturan.filter((item) => item.id!== id));

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
    {name: 'Nama Peraturan', selector: (row) => row.nama, sortable: true},
    {name: 'Deskripsi Peraturan', selector: (row) => row.deskripsi, sortable: true},
    {name: 'Poin Peraturan', selector: (row) => row.poin, sortable: true},
    {name: 'Actions', cell: (row) => (
        <div className="flex">
            <button className="p-2 rounded-md bg-orange-400 shadow-sm mr-3 hover:bg-orange-500 hover:shadow-lg" onClick={() => handleEdit(row.id, row.nama, row.deskripsi, row.poin)}>
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
            <p className="text-center mb-10 text-3xl font-bold">Data Peraturan</p>
            <button onClick={() => handleSubmit() } className="bg-emerald-600 mb-5 text-white flex justify-center items-center p-2 rounded-md">
                <HiMiniPlus className="text-2xl"/> Add Peraturan
            </button>
            <DataTable
                className="rounded"
                title="Karakter"
                columns={columns}
                data={Peraturan}
                pagination
                sortIcon={<span>&#9650;</span>}
                />
            </div>
        </div>
  );
};

export default PeraturanHome;
