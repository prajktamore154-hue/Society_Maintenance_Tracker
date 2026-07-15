import { useState } from "react";

export default function CreateNotice({ onSubmit }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [important, setImportant] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title,
      description,
      important,
    });

    setTitle("");
    setDescription("");
    setImportant(false);
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">

      <h2 className="text-2xl font-bold mb-5">
        Create Notice
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          className="w-full border rounded-lg p-3"
          placeholder="Notice Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full border rounded-lg p-3"
          rows="4"
          placeholder="Notice Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={important}
            onChange={(e) =>
              setImportant(e.target.checked)
            }
          />

          <span className="font-medium text-red-600">
            Mark as Important
          </span>

        </label>

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Publish Notice
        </button>

      </form>

    </div>
  );
}