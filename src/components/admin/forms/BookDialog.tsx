import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookParams } from "@/types";

interface BookDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (book: BookParams) => void;
  initialData?: BookParams;
}

const BookDialog: React.FC<BookDialogProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<BookParams>(
    initialData || {
      title: "",
      author: "",
      genre: "",
      rating: 0,
      coverUrl: "",
      coverColor: "",
      description: "",
      totalCopies: 0,
      videoUrl: "",
      summary: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>{initialData ? "Edit Book" : "Add Book"}</h2>
        <form>
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
          <input name="author" value={formData.author} onChange={handleChange} placeholder="Author" />
          <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" />
          <input name="rating" type="number" value={formData.rating} onChange={handleChange} placeholder="Rating" />
          <input name="coverUrl" value={formData.coverUrl} onChange={handleChange} placeholder="Cover URL" />
          <input name="coverColor" value={formData.coverColor} onChange={handleChange} placeholder="Cover Color" />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
          <input name="totalCopies" type="number" value={formData.totalCopies} onChange={handleChange} placeholder="Total Copies" />
          <input name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="Video URL" />
          <textarea name="summary" value={formData.summary} onChange={handleChange} placeholder="Summary" />
        </form>
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    </div>
  );
};

export default BookDialog;