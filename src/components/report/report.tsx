"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const MaintenanceReportForm = () => {
  const [technicianName, setTechnicianName] = useState("");
  const [numberOfSheets, setNumberOfSheets] = useState("");
  const [client, setClient] = useState("");
  const [site, setSite] = useState("");
  const [report, setReport] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/maintenance-reports",
        {
          technicianName,
          numberOfSheets,
          client,
          site,
          report,
        }
      );

      setMessage("Rapport de maintenance créé avec succès.");
      setTechnicianName("");
      setNumberOfSheets("");
      setClient("");
      setSite("");
      setReport("");
    } catch (error) {
      setMessage("Erreur lors de la création du rapport de maintenance.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md"
    >
      <div className="mb-4">
        <label
          htmlFor="technicianName"
          className="block text-sm font-medium text-gray-700"
        >
          Nom du technicien
        </label>
        <input
          type="text"
          id="technicianName"
          value={technicianName}
          onChange={(e) => setTechnicianName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="numberOfSheets"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre de fiches
        </label>
        <input
          type="number"
          id="numberOfSheets"
          value={numberOfSheets}
          onChange={(e) => setNumberOfSheets(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="client"
          className="block text-sm font-medium text-gray-700"
        >
          Client
        </label>
        <input
          type="text"
          id="client"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="site"
          className="block text-sm font-medium text-gray-700"
        >
          Site
        </label>
        <input
          type="text"
          id="site"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="report"
          className="block text-sm font-medium text-gray-700"
        >
          Rapports
        </label>
        <ReactQuill value={report} onChange={setReport} className="mt-1" />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-700 text-white hover:bg-green-700 rounded"
      >
        Soumettre
      </button>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </form>
  );
};

export default MaintenanceReportForm;
