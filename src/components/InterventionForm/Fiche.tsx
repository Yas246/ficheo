"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useReactToPrint } from "react-to-print";

const Widget = () => {
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
    Autres: "",
    Comm: "",
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
  const formRef = useRef<HTMLDivElement>();
  const handlePrint = useReactToPrint({
    content: () => formRef.current,
  });

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
        <form className="grid grid-cols-2 gap-1 mt-0 mb-2">
          <div>
            <label className="block text-gray-700 font-bold">Client:</label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Site:</label>
            <input
              type="text"
              name="site"
              value={formData.site}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Bureau:</label>
            <input
              type="text"
              name="bureau"
              value={formData.bureau}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </form>
        <div className="mt-2 mb-2">
          <span className="font-bold">Type d'intervention : </span>
          <label>
            <input type="checkbox" /> Maintenance préventive programmée
          </label>
          <label>
            <input type="checkbox" className="ml-4" /> Intervention sur demande
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
            <label className="block text-gray-700 font-bold">
              Autre matériel:
            </label>
            <input
              type="text"
              name="autreMateriel"
              value={formData.autreMateriel}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Modèle:</label>
            <input
              type="text"
              name="modele"
              value={formData.modele}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">N° Série:</label>
            <input
              type="text"
              name="numSerie"
              value={formData.numSerie}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">OS:</label>
            <input
              type="text"
              name="os"
              value={formData.os}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Processeur:</label>
            <input
              type="text"
              name="processeur"
              value={formData.processeur}
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
              name="ram"
              value={formData.ram}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">
              Taille du disque dur:
            </label>
            <input
              type="text"
              name="disqueDur"
              value={formData.disqueDur}
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
              name="nomMachine"
              value={formData.nomMachine}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </form>
        <div>
          <div className="bg-green-700 text-white text-center py-2 mb-4">
            <h2 className="font-bold">Pannes et constats</h2>
          </div>
          <div className="col-span-2 ">
            <label className="block text-gray-700 font-bold">
              Panne déclarée:
            </label>
            <textarea
              name="panneDeclaree"
              value={formData.panneDeclaree}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="invisible-on-screen print:visible">
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎{" "}
          </div>

          <div className="col-span-2 mb-2">
            <label className="block text-gray-700 font-bold">
              Constat du technicien:
            </label>
            <textarea
              name="constatTechnicien"
              value={formData.constatTechnicien}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="bg-green-700 text-white text-center py-2 mb-4 mt-4">
          <h2 className="font-bold">VISA</h2>
        </div>
        <div className="mb-4">
          <div className="flex flex-wrap">
            <div className="underline font-bold">
              Observations de l'intervenant :
            </div>
            <label className="ml-4 mr-4">
              <input type="checkbox" /> Problème résolu
            </label>
            <label className="mr-4">
              <input type="checkbox" /> à déplacer
            </label>
            <label className="mr-4">
              <input type="checkbox" /> Nécessite la commande de pièces
            </label>
            <label className="mr-4">
              <input type="checkbox" /> non réparable
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
          <div className="flex">
            <div className="underline font-bold">
              Observations de l'utilisateur :
            </div>
            <label className="ml-4 mr-4">
              <input type="checkbox" /> Insatisfait
            </label>
            <label className="mr-4">
              <input type="checkbox" /> Satisfait
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
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-bold">
              Nom de l’intervenant:
            </label>
            <input
              type="text"
              name="nomIntervenant"
              value={formData.nomIntervenant}
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
              name="nomUtilisateur"
              value={formData.nomUtilisateur}
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
        className="mt-4 bg-green-700 text-white py-2 px-4 rounded"
      >
        Imprimer
      </button>
    </div>
  );
};

export default Widget;
