"use client";
import { EmptyImage } from "@/assets";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CardLoad from "@/components/Card/CardLoad";
import Pagination from "@/components/pagination/Pagination";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Utilisez `next/navigation` pour la nouvelle API de navigation
import { useEffect, useState } from "react";

const MaintenanceReports = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchReports = async (search = "", page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/maintenance-reports`,
        {
          params: {
            search,
            page,
          },
        }
      );
      const data = response.data;
      setReports(data.data);
      setTotalPages(data.last_page);
    } catch (error) {
      console.error("Erreur lors de la récupération des rapports :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchReports(searchTerm, 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchReports(searchTerm, page);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div>
      <Breadcrumb pageName="Rapports de Maintenance" />
      <div className="flex justify-between mb-4">
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Rechercher des rapports..."
            className="p-2 border rounded-md flex-1 mr-2"
          />
          <Button
            type="submit"
            className="p-2 bg-green-700 text-white hover:bg-green-700"
          >
            Rechercher
          </Button>
        </form>
        <Button
          className="bg-green-700 text-white hover:bg-green-700"
          onClick={() => router.push("/toast")}
        >
          Créer un Rapport
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((item) => <CardLoad key={item} />)
        ) : reports.length > 0 ? (
          reports.map((report) => (
            <div
              key={report.id}
              className="p-4 border rounded-md cursor-pointer"
              onClick={() => router.push(`/rapport/${report.id}`)}
            >
              <div className="flex items-center mb-2">
                <Image src="/rapport.png" alt="icon" width={20} height={20} />
                <h2 className="ml-2 font-bold">{report.technician_name}</h2>
              </div>
              <p>Client: {report.client}</p>
              <p>Date: {new Date(report.created_at).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <div className="flex justify-center">
            <div>
              <Image src={EmptyImage} alt="empty" width={500} height={500} />
              <p className="text-center mt-4 font-semibold">
                Aucun rapport trouvé.
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

export default MaintenanceReports;
