"use client";
import { EmptyImage } from "@/assets";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CardLoad from "@/components/Card/CardLoad";
import Pagination from "@/components/pagination/Pagination";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Utilisez `next/navigation` pour la nouvelle API de navigation
import { useEffect, useState } from "react";

import Image from "next/image";

const Fiches = () => {
  const [fiches, setFiches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchFiches = async (search = "", page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/fiches?search=${encodeURIComponent(
          search
        )}&page=${page}&sort=-created_at`
      );
      const data = await response.json();
      setFiches(data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Erreur lors de la récupération des fiches :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    console.log("Search term:", value);
    setSearchTerm(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search term on submit:", searchTerm);
    setCurrentPage(1);
    fetchFiches(searchTerm, 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchFiches(searchTerm, page);
  };

  useEffect(() => {
    fetchFiches();
  }, []);

  const handleFicheClick = (fiche) => {
    router.push(`/formulaire?ficheId=${fiche.id}`);
  };

  return (
    <div>
      <Breadcrumb pageName="Fiches" />

      <div className="flex justify-between">
        <form
          onSubmit={handleSearchSubmit}
          className="mb-4 flex justify-between items-center"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Rechercher des fiches..."
            className="p-2 border rounded-md flex-1 mr-2"
          />
          <div className="flex gap-4">
            <Button
              type="submit"
              className="p-2 bg-green-700 text-white hover:bg-green-700"
            >
              Rechercher
            </Button>
          </div>
        </form>

        <Button
          to="/tes"
          className="bg-green-700 text-white hover:bg-green-700"
        >
          Créer une Fiche
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((item) => <CardLoad key={item} />)
        ) : fiches.length > 0 ? (
          fiches.map((fiche) => (
            <div
              key={fiche.id}
              className="p-4 border rounded-md cursor-pointer"
              onClick={() => handleFicheClick(fiche)}
            >
              <h2 className="font-bold">Client: {fiche.ClientNom}</h2>
              <p>Intervenant: {fiche.NomIntervenant}</p>
              <p>Date: {fiche.Date}</p>
              <p>Site: {fiche.ClientSite}</p>
            </div>
          ))
        ) : (
          <div className="flex justify-center">
            <div>
              <Image src={EmptyImage} alt="empty" width={500} height={500} />
              <p className="text-center mt-4 font-semibold">
                Aucune fiche trouvée.
              </p>
            </div>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            total={totalPages}
            lastPage={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Fiches;
