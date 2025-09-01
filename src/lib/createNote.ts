import api from "../api";

export const createNote = async (
  e: React.FormEvent,
  setContent: React.Dispatch<React.SetStateAction<string>>,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  getNotes: () => void,
  content: string,
  title: string
) => {
  e.preventDefault();
  try {
    const res = await api.post("/api/notes/", { content, title });
    if (res.status === 201) {
      console.log("note creation successful");
      setContent("");
      setTitle("");
    }
  } catch (error: any) {
    if (error.response) {
      console.log("Error data:", error.response.data); // backend error details
      console.log("Error status:", error.response.status);
    } else {
      console.log(error.message);
    }
  }
  getNotes(); // ✅ call it here
};
