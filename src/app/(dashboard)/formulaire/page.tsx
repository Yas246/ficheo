"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useReactToPrint } from "react-to-print";

const Formulaire = () => {
  const [ficheData, setFicheData] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const ficheId = searchParams.get("ficheId");

  const sigCanvasIntervenant = useRef(null);
  const sigCanvasUtilisateur = useRef(null);

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTypeInterventionChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      TypeIntervention: value,
    }));
  };

  const formRef = useRef<HTMLDivElement>();
  const handlePrint = useReactToPrint({
    content: () => formRef.current,
  });

  const loadImageFromBase64 = (base64) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
      image.src = base64;
    });
  };
  useEffect(() => {
    if (ficheData) {
      // Charger la signature de l'intervenant
      if (ficheData.SignatureIntervenant) {
        loadImageFromBase64(ficheData.SignatureIntervenant).then((image) => {
          const canvas = sigCanvasIntervenant.current.getCanvas();
          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        });
      }

      // Charger la signature de l'utilisateur
      if (ficheData.SignatureUtilisateur) {
        loadImageFromBase64(ficheData.SignatureUtilisateur).then((image) => {
          const canvas = sigCanvasUtilisateur.current.getCanvas();
          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        });
      }
    }
  }, [ficheData]);

  useEffect(() => {
    if (ficheId) {
      const fetchFicheData = async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/fiches/${ficheId}`
          );
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données");
          }
          const data = await response.json();
          setFicheData(data);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des données de la fiche :",
            error
          );
        } finally {
          setLoading(false);
        }
      };

      fetchFicheData();
    }
  }, [ficheId]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!ficheData) {
    return <div>Aucune fiche trouvée.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-zinc-800 text-blue dark:text-white border border-zinc-300 dark:border-zinc-700">
      <div ref={formRef} className="a4">
        <div className="flex items-center mb-4">
          <img
            src="/tete.svg"
            alt="Description de l'image"
            style={{ width: "100%", height: "auto" }} // Vous pouvez ajuster les styles selon vos besoins
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
              name="ClientNom"
              value={ficheData?.ClientNom}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Date:</label>
            <input
              type="date"
              name="Date"
              value={ficheData?.Date}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Site:</label>
            <input
              type="text"
              name="ClientSite"
              value={ficheData?.ClientSite}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Bureau:</label>
            <input
              type="text"
              name="ClientBureau"
              value={ficheData?.ClientBureau}
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
              checked={ficheData?.TypeIntervention === "Maintenance préventive"}
              onChange={handleTypeInterventionChange}
            />{" "}
            Maintenance préventive
          </label>
          <label>
            <input
              type="checkbox"
              name="TypeIntervention"
              value="Intervention sur demande"
              checked={
                ficheData?.TypeIntervention === "Intervention sur demande"
              }
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
              value={ficheData?.TypeMateriel}
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
              value={ficheData?.AutreMateriel}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Modèle:</label>
            <input
              type="text"
              name="Modele"
              value={ficheData?.Modele}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">N° Série:</label>
            <input
              type="text"
              name="NumeroSerie"
              value={ficheData?.NumeroSerie}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">OS:</label>
            <input
              type="text"
              name="OS"
              value={ficheData?.OS}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Processeur:</label>
            <input
              type="text"
              name="Processeur"
              value={ficheData?.Processeur}
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
              value={ficheData?.CapaciteRAM}
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
              value={ficheData?.TailleDisqueDur}
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
              value={ficheData?.NomMachine}
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
              value={ficheData?.PanneDeclaree}
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
              value={ficheData?.ConstatTechnicien}
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
              value={ficheData?.TravauxEffectues}
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
                checked={ficheData?.ProblemeResolu}
                onChange={handleChange}
              />{" "}
              Problème résolu
            </label>
            <label className="ml-4">
              <input
                type="checkbox"
                name="DeplacerDiagnostic"
                checked={ficheData?.DeplacerDiagnostic}
                onChange={handleChange}
              />{" "}
              à déplacer
            </label>
            <label className="ml-4">
              <input
                type="checkbox"
                name="NecessiteCommandePieces"
                checked={ficheData?.NecessiteCommandePieces}
                onChange={handleChange}
              />{" "}
              Nécessite la commande de pièces
            </label>
            <label className="ml-4">
              <input
                type="checkbox"
                name="NonReparable"
                checked={ficheData?.NonReparable}
                onChange={handleChange}
              />{" "}
              non réparable
            </label>
            <div className="flex mt-2">
              <input
                type="text"
                name="Autres"
                value={ficheData?.Autres}
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
              checked={ficheData?.Insatisfait}
              onChange={handleChange}
            />{" "}
            Insatisfait
          </label>
          <label className="ml-4">
            <input
              type="checkbox"
              name="Satisfait"
              checked={ficheData?.Satisfait}
              onChange={handleChange}
            />{" "}
            Satisfait
          </label>
        </div>
        <div className="mt-2">
          <div>
            <textarea
              name="Comm"
              value={ficheData?.Comm}
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
              value={ficheData?.NomIntervenant}
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
              value={ficheData?.NomUtilisateur}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="pt-2 flex justify-center">
              <button type="button" className="block text-gray-700 font-bold">
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
              ref={(ref) => {
                if (ref && ficheData?.SignatureIntervenant) {
                  const canvas = ref.getCanvas();
                  const ctx = canvas.getContext("2d");
                  const image = new Image();
                  image.onload = () =>
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                  image.src = ficheData?.SignatureIntervenant;
                }
              }}
            />
          </div>
          <div>
            <div className="pt-2 flex justify-center">
              <button type="button" className="block text-gray-700 font-bold">
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
              ref={(ref) => {
                if (ref && ficheData?.SignatureUtilisateur) {
                  const canvas = ref.getCanvas();
                  const ctx = canvas.getContext("2d");
                  const image = new Image();
                  image.onload = () =>
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                  image.src = ficheData?.SignatureUtilisateur;
                }
              }}
            />
          </div>
        </div>
        <div>
          <img
            src="/pied.svg"
            alt="Description de l'image"
            style={{ width: "100%", height: "auto" }} // Vous pouvez ajuster les styles selon vos besoins
          />
        </div>
      </div>
      <button
        onClick={handlePrint}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
      >
        Print
      </button>
    </div>
  );
};

export default Formulaire;
