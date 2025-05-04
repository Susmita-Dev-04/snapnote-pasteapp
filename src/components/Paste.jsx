import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { FaEdit, FaEye, FaTrash, FaCopy, FaShareAlt } from "react-icons/fa";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center p-5">
      {/* Search Input */}
      <input
        className="p-2 rounded-2xl w-full max-w-2xl mt-5 border border-gray-500 bg-gray-900 text-white"
        type="search"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Paste List */}
      <div className="flex flex-col gap-4 mt-5 w-full max-w-3xl">
        {filteredData.length > 0 &&
          filteredData.map((paste) => (
            <div
              key={paste?._id}
              className="border bg-gray-900 text-white p-4 rounded-md shadow-lg"
            >
              {/* Title with underline */}
              <h2 className="text-xl font-bold border-b border-white pb-2">
                {paste.title}
              </h2>

              {/* Content */}
              <p className="mt-3 text-gray-300">{paste.content}</p>

              {/* Button Section */}
              <div className="flex justify-around items-center bg-gray-800 p-3 mt-4 rounded-md">
                <a href={`/?pasteId=${paste?._id}`} className="text-blue-400">
                  <FaEdit size={20} title="Edit" />
                </a>
                <a href={`/pastes/${paste?._id}`} className="text-green-400">
                  <FaEye size={20} title="View" />
                </a>
                <button onClick={() => handleDelete(paste?._id)}>
                  <FaTrash size={20} className="text-red-500" title="Delete" />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to Clipboard!");
                  }}
                >
                  <FaCopy size={20} className="text-yellow-400" title="Copy" />
                </button>
                <button
                  onClick={() => {
                    const pasteUrl = `${window.location.origin}/pastes/${paste?._id}`;
                    const shareText = `${paste.title}\n\n${paste.content}\n\nRead more: ${pasteUrl}`;

                    if (navigator.share) {
                      navigator
                        .share({
                          title: paste.title,
                          text: shareText,
                          url: pasteUrl,
                        })
                        .then(() => console.log("Shared successfully"))
                        .catch((error) => console.log("Error sharing:", error));
                    } else {
                      navigator.clipboard.writeText(shareText);
                      toast.success("Paste details copied to clipboard!");
                    }
                  }}
                >
                  <FaShareAlt
                    size={20}
                    className="text-blue-300"
                    title="Share"
                  />
                </button>
              </div>

              {/* Date */}
              <p className="text-sm text-gray-500 mt-2">{paste.createdAt}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Paste;
