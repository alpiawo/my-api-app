import axios from "axios";

const API_URL = "https://localhost:7106/api/";

// Fungsi untuk mengambil semua jurusan
export const fetchJurusan = async () => {
  try {
    const response = await axios.get(API_URL+'Jurusan');
    return response.data;
  } catch (error) {
    console.error("Error fetching jurusan:", error);
    throw error;
  }
};

// Fungsi untuk menambah jurusan baru
export const addJurusan = async (jurusan) => {
  try {
    const response = await axios.post(API_URL+'Jurusan', jurusan);
    return response.data;
  } catch (error) {
    console.error("Error adding jurusan:", error);
    throw error;
  }
};

// Fungsi untuk mengupdate jurusan
export const updateJurusan = async (id, jurusan) => {
  try {
    const response = await axios.put(`${API_URL}Jurusan/${id}`, jurusan);
    return response.data;
  } catch (error) {
    console.error("Error updating jurusan:", error);
    throw error;
  }
};

// Fungsi untuk menghapus jurusan
export const deleteJurusan = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}Jurusan/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting jurusan:", error);
    throw error;
  }
};

export const fetchGuru = async () => {
  try {
    const response = await axios.get(API_URL + 'Guru');
    return response.data;
  } catch (error) {
    console.error("Error fetching guru:", error);
    throw error;
  }
};

// Page Guru //

// Fungsi untuk menambah guru baru
export const addGuru = async (guru) => {
  try {
    const response = await axios.post(API_URL+'Guru', guru);
    return response.data;
  } catch (error) {
    console.error("Error adding guru:", error);
    throw error;
  }
};

// Fungsi untuk mengupdate guru

export const updateGuru = async (id, guru) => {
  try {
    const response = await axios.put(`${API_URL}Guru/${id}`, guru);
    return response.data;
  } catch (error) {
    console.error("Error updating guru:", error);
    throw error;
  }
};

// Fungsi untuk menghapus guru
export const deleteGuru = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}Guru/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting guru:", error);
    throw error;
  }
};




// Kelas Page //
export const fetchKelas = async () => {
  try {
    const response = await axios.get(API_URL+'Kelas');
    return response.data;
  } catch (error) {
    console.error("Error fetching kelas:", error);
    throw error;
  }
};

// Fungsi untuk menambah kelas baru
export const addKelas = async (kelas) => {
  try {
    const response = await axios.post(API_URL+'Kelas', kelas);
    return response.data;
  } catch (error) {
    console.error("Error adding kelas:", error);
    throw error;
  }
};

// Fungsi untuk mengupdate kelas
export const updateKelas = async (id, kelas) => {
  try {
    const response = await axios.put(`${API_URL}Kelas/${id}`, kelas);
    return response.data;
  } catch (error) {
    console.error("Error updating kelas:", error);
    throw error;
  }
};

// Fungsi untuk menghapus kelas
export const deleteKelas = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}Kelas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting kelas:", error);
    throw error;
  }
};

// Page Peraturan

export const fetchPeraturan = async () => {
  try {
    const response = await axios.get(API_URL+'Peraturan');
    return response.data;
  } catch (error) {
    console.error("Error fetching peraturan:", error);
    throw error;
  }
};

// Fungsi untuk menambah peraturan baru
export const addPeraturan = async (peraturan) => {
  try {
    const response = await axios.post(API_URL + 'Peraturan', peraturan);
    return response.data;
  } catch (error) {
    console.error("Error adding peraturan:", error);
    throw error;
  }
};

// Fungsi untuk mengupdate peraturan
export const updatePeraturan = async (id, peraturan) => {
  try {
    const response = await axios.put(`${API_URL}Peraturan/${id}`, peraturan);
    return response.data;
  } catch (error) {
    console.error("Error updating peraturan:", error);
    throw error;
  }
};

// Fungsi untuk menghapus peraturan
export const deletePeraturan = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}Peraturan/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting peraturan:", error);
    throw error;
  }
};



// Siswa Page // 
export const fetchSiswa = async () => {
  try {
    const response = await axios.get(API_URL + 'Siswa');
    return response.data;
  } catch (error) {
    console.error("Error fetching siswa:", error);
    throw error;
  }
};

// Fungsi untuk menambah siswa baru
export const addSiswa = async (siswa) => {
  try {
    const response = await axios.post(API_URL + 'Siswa', siswa);
    return response.data;
  } catch (error) {
    console.error("Error adding siswa:", error);
    throw error;
  }
};

// Fungsi untuk mengupdate siswa
export const updateSiswa = async (id, siswa) => {
  try {
    const response = await axios.put(`${API_URL}Siswa/${id}`, siswa);
    return response.data;
  } catch (error) {
    console.error("Error updating siswa:", error);
    throw error;
  }
};

// Fungsi untuk menghapus siswa
export const deleteSiswa = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}Siswa/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting siswa:", error);
    throw error;
  }
};
