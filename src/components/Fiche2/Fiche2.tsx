"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useReactToPrint } from "react-to-print";

const Widget = () => {
  const [formData, setFormData] = useState({
    ClientNom: "",
    Date: "",
    ClientSite: "",
    ClientBureau: "",
    TypeIntervention: "",
    TypeMateriel: "",
    AutreMateriel: "",
    Modele: "",
    NumeroSerie: "",
    OS: "",
    Processeur: "",
    CapaciteRAM: "",
    TailleDisqueDur: "",
    NomMachine: "",
    PanneDeclaree: "",
    ConstatTechnicien: "",
    ProblemeResolu: false,
    DeplacerDiagnostic: false,
    NecessiteCommandePieces: false,
    NonReparable: false,
    Autres: "",
    Comm: "",
    NomIntervenant: "",
    SignatureIntervenant: "",
    NomUtilisateur: "",
    SignatureUtilisateur: "",
    ObservationsIntervenant: "",
    ObservationsUtilisateur: "",
    CommentairesUtilisateur: "",
  });

  const sigCanvasIntervenant = useRef(null);
  const sigCanvasUtilisateur = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const clearSignature = (canvas) => {
    canvas.current.clear();
  };

  const formRef = useRef<HTMLDivElement>();
  const handlePrint = useReactToPrint({
    content: () => formRef.current,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    // Convert signatures to base64
    const SignatureIntervenant = sigCanvasIntervenant.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    const SignatureUtilisateur = sigCanvasUtilisateur.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

    const dataToSend = {
      ...formData,
      SignatureIntervenant,
      SignatureUtilisateur,
    };

    console.log("Data to send:", dataToSend);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/fiche", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show an error message)
    }
  };
  const handleTypeInterventionChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      TypeIntervention: value,
    }));
  };
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-zinc-800 text-blue dark:text-white border border-zinc-300 dark:border-zinc-700">
      <div ref={formRef} className="a4">
        <div className="flex items-center mb-4">
          <Image
            width={989}
            height={113}
            src="/tete.svg"
            alt="Logo"
            className="w-auto h-auto"
            priority
          />
        </div>
        <div className="bg-green-700 text-white text-center py-2 mb-4">
          <h2 className="font-bold">FICHE D'INTERVENTION TECHNIQUE</h2>
        </div>
        <form
          className="grid grid-cols-2 gap-1 mt-0 mb-2"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-gray-700 font-bold">Client:</label>
            <input
              type="text"
              name="ClientNom"
              value={formData.ClientNom}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Date:</label>
            <input
              type="date"
              name="Date"
              value={formData.Date}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Site:</label>
            <input
              type="text"
              name="ClientSite"
              value={formData.ClientSite}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Bureau:</label>
            <input
              type="text"
              name="ClientBureau"
              value={formData.ClientBureau}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </form>
        <div className="mt-2 mb-2">
          <span className="font-bold">Type d'intervention :</span>
          <label>
            <input
              type="checkbox"
              name="TypeIntervention"
              value="Maintenance préventive"
              checked={formData.TypeIntervention === "Maintenance préventive"}
              onChange={handleTypeInterventionChange}
            />{" "}
            Maintenance préventive
          </label>
          <label>
            <input
              type="checkbox"
              name="TypeIntervention"
              value="Intervention sur demande"
              checked={formData.TypeIntervention === "Intervention sur demande"}
              onChange={handleTypeInterventionChange}
              className="ml-4"
            />{" "}
            Intervention sur demande
          </label>
        </div>
        <div className="bg-green-700 text-white text-center py-2 mb-4">
          <h2 className="font-bold">Matériel ou Equipement</h2>
        </div>
        <form className="grid grid-cols-2 gap-1 mt-0 mb-2">
          <div>
            <label className="block text-gray-700 font-bold">
              Type de matériel:
            </label>
            <select
              name="TypeMateriel"
              value={formData.TypeMateriel}
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
            <label className="block text-gray-700 font-bold">
              Autre matériel:
            </label>
            <input
              type="text"
              name="AutreMateriel"
              value={formData.AutreMateriel}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Modèle:</label>
            <input
              type="text"
              name="Modele"
              value={formData.Modele}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">N° Série:</label>
            <input
              type="text"
              name="NumeroSerie"
              value={formData.NumeroSerie}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">OS:</label>
            <input
              type="text"
              name="OS"
              value={formData.OS}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Processeur:</label>
            <input
              type="text"
              name="Processeur"
              value={formData.Processeur}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Capacité de la RAM:
            </label>
            <input
              type="text"
              name="CapaciteRAM"
              value={formData.CapaciteRAM}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Capacité du disque dur:
            </label>
            <input
              type="text"
              name="TailleDisqueDur"
              value={formData.TailleDisqueDur}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Nom de la machine:
            </label>
            <input
              type="text"
              name="NomMachine"
              value={formData.NomMachine}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </form>
        <div className="bg-green-700 text-white text-center py-2 mb-4">
          <h2 className="font-bold">Diagnostic</h2>
        </div>
        <form className="grid grid-cols-1 gap-1 mt-0 mb-2">
          <div>
            <label className="block text-gray-700 font-bold">
              Panne déclarée par l'utilisateur:
            </label>
            <textarea
              name="PanneDeclaree"
              value={formData.PanneDeclaree}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Constat du technicien:
            </label>
            <textarea
              name="ConstatTechnicien"
              value={formData.ConstatTechnicien}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </form>
        <div className="bg-green-700 text-white text-center py-2 mb-4">
          <h2 className="font-bold">Intervention</h2>
        </div>
        <form className="grid grid-cols-1 gap-1 mt-0 mb-2">
          <div>
            <label className="block text-gray-700 font-bold">
              Travaux effectués:
            </label>
            <textarea
              name="TravauxEffectues"
              value={formData.TravauxEffectues}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </form>
        <div className="bg-green-700 text-white text-center py-2 mb-4">
          <h2 className="font-bold">VISA</h2>
        </div>
        <div className="mb-4">
          <div className="flex flex-wrap">
            <div className="underline font-bold">
              Observations de l'intervenant :
            </div>
            <label className="ml-4">
              <input
                type="checkbox"
                name="ProblemeResolu"
                checked={formData.ProblemeResolu}
                onChange={handleChange}
              />{" "}
              Problème résolu
            </label>
            <label className="ml-4">
              <input
                type="checkbox"
                name="DeplacerDiagnostic"
                checked={formData.DeplacerDiagnostic}
                onChange={handleChange}
              />{" "}
              à déplacer
            </label>
            <label className="ml-4">
              <input
                type="checkbox"
                name="NecessiteCommandePieces"
                checked={formData.NecessiteCommandePieces}
                onChange={handleChange}
              />{" "}
              Nécessite la commande de pièces
            </label>
            <label className="ml-4">
              <input
                type="checkbox"
                name="NonReparable"
                checked={formData.NonReparable}
                onChange={handleChange}
              />{" "}
              non réparable
            </label>
            <div className="flex mt-2">
              <input
                type="text"
                name="Autres"
                value={formData.Autres}
                onChange={handleChange}
                placeholder="Autres"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="underline font-bold">
            Observations de l'utilisateur :
          </div>
          <label className="ml-4">
            <input
              type="checkbox"
              name="Insatisfait"
              checked={formData.Insatisfait}
              onChange={handleChange}
            />{" "}
            Insatisfait
          </label>
          <label className="ml-4">
            <input
              type="checkbox"
              name="Satisfait"
              checked={formData.Satisfait}
              onChange={handleChange}
            />{" "}
            Satisfait
          </label>
        </div>
        <div className="mt-2">
          <div>
            <textarea
              name="Comm"
              value={formData.Comm}
              onChange={handleChange}
              placeholder="Commentaires de l'utilisateur"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-bold">
              Nom de l’intervenant:
            </label>
            <input
              type="text"
              name="NomIntervenant"
              value={formData.NomIntervenant}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Nom de l’utilisateur:
            </label>
            <input
              type="text"
              name="NomUtilisateur"
              value={formData.NomUtilisateur}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={() => clearSignature(sigCanvasIntervenant)}
                className="block text-gray-700 font-bold"
              >
                Signature de l'intervenant:
              </button>
            </div>
            <SignatureCanvas
              penColor="blue"
              canvasProps={{
                height: 200,
                className:
                  "sigCanvas w-full bg-gray-100 border border-gray-300 rounded-md",
              }}
              ref={(ref) => (sigCanvasIntervenant.current = ref)}
            />
          </div>
          <div>
            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={() => clearSignature(sigCanvasUtilisateur)}
                className="block text-gray-700 font-bold"
              >
                Signature de l’utilisateur:
              </button>
            </div>
            <SignatureCanvas
              penColor="blue"
              canvasProps={{
                height: 200,
                className:
                  "sigCanvas w-full bg-gray-100 border border-gray-300 rounded-md",
              }}
              ref={(ref) => (sigCanvasUtilisateur.current = ref)}
            />
          </div>
        </div>
        <div>
          <Image
            width={989}
            height={113}
            src="/pied.svg"
            alt="Logo"
            className="ml-5 w-auto h-auto"
            priority
          />
        </div>
      </div>
      <button
        onClick={handlePrint}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
      >
        Print
      </button>
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-green-500 text-white py-2 px-4 rounded-md mt-4"
      >
        Submit
      </button>
    </div>
  );
};

export default Widget;
