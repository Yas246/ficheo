"use client";

import jsPDF from "jspdf";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import "tailwindcss/tailwind.css";

const Fiche = () => {
  const [formData, setFormData] = useState({
    client: "",
    date: "",
    site: "",
    bureau: "",
    typeIntervention: "",
    typeMateriel: "",
    autreMateriel: "",
    modele: "",
    numSerie: "",
    os: "",
    processeur: "",
    ram: "",
    disqueDur: "",
    nomMachine: "",
    panneDeclaree: "",
    constatTechnicien: "",
    travauxEffectues: "",
    observationsIntervenant: "",
    observationsUtilisateur: "",
    commentairesUtilisateur: "",
    nomIntervenant: "",
    signatureIntervenant: "",
    nomUtilisateur: "",
    signatureUtilisateur: "",
  });

  const sigCanvasIntervenant = useRef({});
  const sigCanvasUtilisateur = useRef({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearSignature = (canvas) => {
    canvas.current.clear();
  };
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("FICHE D’INTERVENTION TECHNIQUE", 10, 10);
    doc.text(`Client: ${formData.client}`, 10, 20);
    doc.text(`Date: ${formData.date}`, 10, 30);
    doc.text(`Site: ${formData.site}`, 10, 40);
    doc.text(`Bureau: ${formData.bureau}`, 10, 50);
    doc.text(`Type d'intervention: ${formData.typeIntervention}`, 10, 60);
    doc.text(`Type de matériel: ${formData.typeMateriel}`, 10, 70);
    doc.text(`Autre matériel: ${formData.autreMateriel}`, 10, 80);
    doc.text(`Modèle: ${formData.modele}`, 10, 90);
    doc.text(`N° Série: ${formData.numSerie}`, 10, 100);
    doc.text(`OS: ${formData.os}`, 10, 110);
    doc.text(`Processeur: ${formData.processeur}`, 10, 120);
    doc.text(`Capacité de la RAM: ${formData.ram}`, 10, 130);
    doc.text(`Taille du disque dur: ${formData.disqueDur}`, 10, 140);
    doc.text(`Nom de la machine: ${formData.nomMachine}`, 10, 150);
    doc.text(`Panne déclarée: ${formData.panneDeclaree}`, 10, 160);
    doc.text(`Constat du technicien: ${formData.constatTechnicien}`, 10, 170);
    doc.text(`Travaux effectués: ${formData.travauxEffectues}`, 10, 180);
    doc.text(
      `Observations de l’intervenant: ${formData.observationsIntervenant}`,
      10,
      190
    );
    doc.text(
      `Observations de l’utilisateur: ${formData.observationsUtilisateur}`,
      10,
      200
    );
    doc.text(
      `Commentaires de l’utilisateur: ${formData.commentairesUtilisateur}`,
      10,
      210
    );
    doc.text(`Nom de l’intervenant: ${formData.nomIntervenant}`, 10, 220);
    doc.addImage(
      sigCanvasIntervenant.current.getTrimmedCanvas().toDataURL("image/png"),
      "PNG",
      10,
      250,
      50,
      20
    );
    doc.text(`Nom de l’utilisateur: ${formData.nomUtilisateur}`, 10, 240);
    doc.addImage(
      sigCanvasUtilisateur.current.getTrimmedCanvas().toDataURL("image/png"),
      "PNG",
      10,
      280,
      50,
      20
    );
    doc.save("intervention-sheet.pdf");
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Fiche d'intervention</h1>
      <form className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Client:</label>
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Site:</label>
          <input
            type="text"
            name="site"
            value={formData.site}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Bureau:</label>
          <input
            type="text"
            name="bureau"
            value={formData.bureau}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Type d'intervention:</label>
          <select
            name="typeIntervention"
            value={formData.typeIntervention}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select</option>
            <option value="Maintenance préventive programmée">
              Maintenance préventive programmée
            </option>
            <option value="Intervention sur demande">
              Intervention sur demande
            </option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Type de matériel:</label>
          <select
            name="typeMateriel"
            value={formData.typeMateriel}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select</option>
            <option value="Desktop">Desktop</option>
            <option value="Laptop">Laptop</option>
            <option value="Imprimante">Imprimante</option>
            <option value="Scanner">Scanner</option>
            <option value="Copieur">Copieur</option>
            <option value="Autres">Autres (à préciser)</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Autre matériel:</label>
          <input
            type="text"
            name="autreMateriel"
            value={formData.autreMateriel}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Modèle:</label>
          <input
            type="text"
            name="modele"
            value={formData.modele}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">N° Série:</label>
          <input
            type="text"
            name="numSerie"
            value={formData.numSerie}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">OS:</label>
          <input
            type="text"
            name="os"
            value={formData.os}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Processeur:</label>
          <input
            type="text"
            name="processeur"
            value={formData.processeur}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Capacité de la RAM:</label>
          <input
            type="text"
            name="ram"
            value={formData.ram}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Taille du disque dur:</label>
          <input
            type="text"
            name="disqueDur"
            value={formData.disqueDur}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Nom de la machine:</label>
          <input
            type="text"
            name="nomMachine"
            value={formData.nomMachine}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700">Panne déclarée:</label>
          <textarea
            name="panneDeclaree"
            value={formData.panneDeclaree}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700">Constat du technicien:</label>
          <textarea
            name="constatTechnicien"
            value={formData.constatTechnicien}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700">Travaux effectués:</label>
          <textarea
            name="travauxEffectues"
            value={formData.travauxEffectues}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700">
            Observations de l’intervenant:
          </label>
          <textarea
            name="observationsIntervenant"
            value={formData.observationsIntervenant}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700">
            Observations de l’utilisateur:
          </label>
          <textarea
            name="observationsUtilisateur"
            value={formData.observationsUtilisateur}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700">
            Commentaires de l’utilisateur:
          </label>
          <textarea
            name="commentairesUtilisateur"
            value={formData.commentairesUtilisateur}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Nom de l’intervenant:</label>
          <input
            type="text"
            name="nomIntervenant"
            value={formData.nomIntervenant}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Nom de l’utilisateur:</label>
          <input
            type="text"
            name="nomutilisateur"
            value={formData.nomUtilisateur}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">
            Signature de l'intervenant:
          </label>
          <SignatureCanvas
            penColor="blue"
            ref={sigCanvasIntervenant}
            canvasProps={{
              className:
                "signature-canvas bg-gray-100 border border-gray-300 rounded-md",
            }}
          />
          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={() => clearSignature(sigCanvasIntervenant)}
              className="rounded w-1/2 bg-red text-white hover:bg-red"
            >
              Clear Signature
            </button>
          </div>
        </div>
        <div>
          <label className="block text-gray-700">
            Signature de l’utilisateur:
          </label>
          <SignatureCanvas
            penColor="blue"
            ref={sigCanvasUtilisateur}
            canvasProps={{
              className:
                "signature-canvas bg-gray-100 border border-gray-300 rounded-md",
            }}
          />
          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={() => clearSignature(sigCanvasUtilisateur)}
              className="rounded w-1/2 bg-red text-white hover:bg-red"
            >
              Clear Signature
            </button>
          </div>
        </div>
        <div className="col-span-2">
          <button
            type="button"
            onClick={generatePDF}
            className=" rounded mt-4 w-full p-2 bg-green-800 text-white hover:bg-green-700"
          >
            Generate PDF
          </button>
        </div>
      </form>
    </div>
  );
};

export default Fiche;
