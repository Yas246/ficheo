"use client";

import { EmptyImage } from "@/assets";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CardLoad from "@/components/Card/CardLoad";
import { CardPip } from "@/components/Card/CardPip";
import InputText from "@/components/Form/InputText";
import Pagination from "@/components/pagination/Pagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import projectApi from "@/services/project.service";
import { IProject } from "@/shared/models";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { CircleX, Ellipsis, EyeIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function Project() {
  const router = useRouter();

  const [projects, setProjects] = React.useState<IProject[]>([]);

  const [loading, setLoading] = React.useState(false);

  const [searchOptions, setSearchOptions] = React.useState({
    title: "",
    per_page: 9,
    page: 1,
    total: 0,
    last_page: 0,
  });

  function MenuOption(project: IProject) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-2">
          <DropdownMenuItem
            onClick={() => {
              router.push(`/projects/${project.id}`);
            }}
            className="outline-0 w-full flex justify-start"
          >
            <div className="flex items-center space-x-2 cursor-pointer">
              <EyeIcon className="text-blue-500" size={18} />
              <span>Afficher</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/projects/update/${project.id}`);
            }}
            className="outline-0 w-full flex justify-start"
          >
            <div className="flex items-center space-x-2 cursor-pointer">
              <CircleX className="text-red" size={18} />
              <span>Clôturer</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  function searchProjects(page?: number) {
    setLoading(true);
    searchOptions.page = page ? page : 1;
    projectApi()
      .searchProjects(searchOptions)
      .then((response) => {
        setProjects(response.data);
        setSearchOptions({
          ...searchOptions,
          total: response.meta.total,
          last_page: response.meta.last_page,
        });
      })
      .finally(() => setLoading(false));
  }

  React.useEffect(() => {
    (() => {
      searchProjects();
    })();
  }, []);

  return (
    <div>
      <Breadcrumb pageName="Missions" />

      <div className="flex justify-between">
        <InputText
          name="title"
          placeholder="Rechercher..."
          value={searchOptions.title}
          onChange={(e) =>
            setSearchOptions({ ...searchOptions, title: e.target.value })
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchProjects();
            }
          }}
        />
        <div className="flex gap-4">
          <Button
            onClick={() => searchProjects()}
            className="bg-green-700 text-white hover:bg-green-700"
          >
            <Loader2 size={20} className={loading ? "animate-spin" : ""} />
          </Button>

          <Button
            to="/projects/create"
            className="bg-green-700 text-white hover:bg-green-700"
          >
            Créer une Mission
          </Button>
        </div>
      </div>

      <div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? [1, 2, 3, 4, 5, 6].map((item) => <CardLoad key={item} />)
            : projects.map((project) => (
                <CardPip
                  key={project.id}
                  project={project}
                  menuOptions={MenuOption(project)}
                />
              ))}
        </div>
        {projects.length === 0 && !loading && (
          <div className="flex justify-center">
            <div>
              <Image src={EmptyImage} alt="empty" width={500} height={500} />
              <p className="text-center mt-4 font-semibold">Aucune Mission</p>
            </div>
          </div>
        )}
        {searchOptions.total > searchOptions.per_page && (
          <div className="flex justify-center">
            <Pagination
              currentPage={searchOptions.page}
              total={searchOptions.total}
              lastPage={searchOptions.last_page}
              onPageChange={searchProjects}
            />
          </div>
        )}
      </div>
    </div>
  );
}
