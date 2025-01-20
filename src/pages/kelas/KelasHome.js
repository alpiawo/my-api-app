import React, { useEffect, useState } from "react";
import { HiMiniPlus, HiMiniPencilSquare, HiMiniTrash } from "react-icons/hi2";
import { fetchKelas, deleteKelas, fetchJurusan } from "../../services/api";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { addKelas, updateKelas } from '../../services/api'

const KelasHome = () => {
  const [Kelas, setKelas] = useState([]);
  const [Jurusan, setJurusan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const loadKelas = async () => {
      try {
        const result = await fetchKelas();
        setKelas(result);
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };
    const loadJurusan = async () => {
      try {
        const result = await fetchJurusan();
        setJurusan(result);
      } catch (err) {
        console.error("Terjadi kesalahan:", err);
      }
    }
    loadKelas();
    loadJurusan();
  },
    []);

    const handleSubmit = async () => {
      const { value: formValues } = await Swal.fire({
        title: "Add Data Kelas Baru",
        html: `
            <input id="swal-input1" class="swal2-input" placeholder="Nama Kelas">
        `,
        input: "select",
        inputOptions: Object.fromEntries(
            Jurusan.map((jurusan) => [jurusan.id, jurusan.nama])
        ),
        inputPlaceholder: "Pilih Jurusan",
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Create",
        customClass: {
            input: 'custom-select-style'
        },
        preConfirm: () => {
            const nama = document.getElementById("swal-input1").value;
            const idJurusan = Swal.getInput().value;
  
            if (!nama || !idJurusan) {
                Swal.showValidationMessage("Tolong isi semua field dengan benar!");
            }
            return { nama, idJurusan };
        },
      });
  
      if (formValues) {
        try {
          const response = await addKelas(formValues);
          setKelas([...Kelas, response]);
          Swal.fire("Berhasil", "Data berhasil ditambahkan!");
        } catch (error) {
          Swal.fire("Terjadi Kesalahan", "Gagal menambahkan data!", "error");
          console.error("Error:", error);
        }
      }
  };
  
  const handleEdit = async (id, currentNama, currentIdJurusan) => {
      const { value: formValues } = await Swal.fire({
        title: "Edit Data Kelas",
        html: `
            <input id="swal-input1" class="swal2-input" value="${currentNama}" placeholder="Nama Kelas">
        `,
        input: "select",
        inputOptions: Object.fromEntries(
            Jurusan.map((jurusan) => [jurusan.id, jurusan.nama])
        ),
        inputValue: currentIdJurusan,
        inputPlaceholder: "Pilih Jurusan",
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Update",
        customClass: {
            input: 'custom-select-style'
        },
        preConfirm: () => {
            const nama = document.getElementById("swal-input1").value;
            const idJurusan = Swal.getInput().value;
  
            if (!nama || !idJurusan) {
                Swal.showValidationMessage("Tolong isi semua field dengan benar!");
            }
            return { nama, idJurusan };
        },
      });
  
      if (formValues) {
        try {
          await updateKelas(id, formValues);
          setKelas(
            Kelas.map((item) =>
              item.id === id ? { ...item, nama: formValues.nama, idJurusan: formValues.idJurusan } : item
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
      text: 'Data tidak akan bisa dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Batal',
      confirmButtonText: 'Ya, Hapus data ini!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteKelas(id);
        setKelas(Kelas.filter((item) => item.id !== id));

        Swal.fire(
          'Berhasil dihapus!',
          `Data dengan ID ${id} Berhasil dihapus.`,
          'Berhasil'
        );
      }
    })
  }



  const columns = [
    { name: 'Id', selector: (row) => row.id, sortable: true },
    { name: 'Nama Kelas', selector: (row) => row.nama, sortable: true },
    {
      name: 'Jurusan',
      selector: (row) => {
        const jurusan = Jurusan.find(j => j.id === row.idJurusan);
        return jurusan ? jurusan.nama : 'Tidak Ditemukan';
      },
      sortable: true
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex">
          <button
            className="p-2 rounded-md bg-orange-400 shadow-sm mr-3 hover:bg-orange-500 hover:shadow-lg"
            onClick={() => handleEdit(row.id, row.nama, row.idJurusan)}
          >
            <HiMiniPencilSquare />
          </button>
          <button
            className="p-2 rounded-md bg-red-400 shadow-md hover:bg-red-500 hover:shadow-lg"
            onClick={() => handleDelete(row.id)}
          >
            <HiMiniTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="mt-10 rounded-md shadow p-10">
        <p className="text-center mb-10 text-3xl font-bold">Data Kelas</p>
        <button onClick={() => handleSubmit()} className="bg-emerald-600 mb-5 text-white flex justify-center items-center p-2 rounded-md">
          <HiMiniPlus className="text-2xl" /> Add Kelas
        </button>
        <DataTable
          className="rounded"
          title="Karakter"
          columns={columns}
          data={Kelas}
          pagination
          sortIcon={<span>&#9650;</span>}
        />
      </div>
    </div>
  );
};

export default KelasHome;
