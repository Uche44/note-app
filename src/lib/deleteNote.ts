import api from "../api";

export const deleteNote = async (id: number, getNotes: () => void) => {
  try {
    const res = await api.delete(`/api/notes/delete/${id}/`);
    if (res.status === 204) {
      console.log("deletion successful");
    }
  } catch (error) {
    console.log(error);
  }
  getNotes();
};
