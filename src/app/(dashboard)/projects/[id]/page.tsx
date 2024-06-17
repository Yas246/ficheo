"use client";

import PageLoad from "@/components/Loader/PageLoad";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import projectPlanApi from "@/services/project-plan.service";
import projectApi from "@/services/project.service";
import useToast from "@/shared/helpers/useToast";
import { IProject, IProjectPlan } from "@/shared/models";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Ellipsis, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Project({ params }: { params: { id: string } }) {
  const { id } = params;

  const router = useRouter();

  const { toastSuccess } = useToast();

  const [project, setProject] = useState<IProject | null>(null);

  const [projectPlans, setProjectPlans] = useState<IProjectPlan[]>([]);

  const [loading, setLoading] = useState({
    project: false,
    project_plan: false,
  });

  function getProjectPlans() {
    setLoading({
      ...loading,
      project_plan: true,
    });
    projectPlanApi()
      .searchProjectPlans({ project_id: id })
      .then((response) => {
        setProjectPlans(response.data);
      })
      .finally(() =>
        setLoading({
          ...loading,
          project_plan: false,
        })
      );
  }

  async function generateProjectPlan() {
    setLoading({
      ...loading,
      project_plan: true,
    });
    await projectPlanApi()
      .createProjectPlan({ project_id: id })
      .then((response) => {
        toastSuccess(response.message);
        getProjectPlans();
      })
      .finally(() =>
        setLoading({
          ...loading,
          project_plan: false,
        })
      );
  }

  function MenuOption(project: IProject) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-2">
          <DropdownMenuItem
            onClick={() => {
              router.push(`/generate-pip/${project.id}`);
            }}
            className="outline-0 w-full flex justify-start"
          >
            <div className="flex items-center space-x-2 cursor-pointer">
              <EyeIcon className="text-blue-500" size={18} />
              <span>Afficher</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  React.useEffect(() => {
    (() => {
      setLoading({
        ...loading,
        project: true,
      });
      projectApi()
        .getProject(id)
        .then((response) => {
          setProject(response.data);
        })
        .finally(() => {
          getProjectPlans();
          setLoading({
            ...loading,
            project: false,
          });
        });
    })();
  }, [id]);

  return loading.project ? (
    <PageLoad />
  ) : (
    <>
      {project && (
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg text-justify mb-4">{project.overview}</p>

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Client</h2>
            <p className="text-justify">{project.client}</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Site</h2>
            <p className="text-justify">{project.site}</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Technicien</h2>
            <p className="text-justify">{project.technicien}</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-justify">{project.description}</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Global Objective</h2>
            <p className="text-justify">{project.global_objective}</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Objectives</h2>
            <ul>
              {project.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Duration</h2>
            <p className="text-justify">{project.duration} Months</p>
          </div>

          {/* <div className="border-t border-b border-gray-200 py-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">Partners</h2>
                            {project.partners && project.partners.map((partner, index) => (
                                <div key={index}>
                                    {partner.managment_levels && partner.managment_levels.map((level, i) => (
                                        <div key={i}>
                                            <h3 className="text-lg font-semibold mt-4 mb-2">{level.title}</h3>
                                            {level.stakeholders.map((stakeholder, j) => (
                                                <div key={j}>
                                                    <h4 className="text-md font-semibold mt-2 mb-1">Stakeholder: {stakeholder.name.join(", ")}</h4>
                                                    <p className="text-justify">Abilities: {stakeholder.abilities.join(", ")}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div> */}
        </div>
      )}
    </>
  );
}
