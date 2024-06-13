"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CardDataStats from "@/components/Card/CardDataStats";
import PageLoad from "@/components/Loader/PageLoad";
import statApi from "@/services/stat.service";
import useTestApi from "@/services/test.service";
import { IStats } from "@/shared/models";
import { LucideFile, LucideFileArchive } from "lucide-react";
import React from "react";

export default function Dashboard() {
  const { projectsStats, projectPlansStats } = useTestApi()

  const { data: projectStats, isLoading: loading } = projectsStats()

  const { data: projectPlanStats } = projectPlansStats()

  return (
    <>
      <Breadcrumb pageName="Dashboard" />

      {
        loading ? <PageLoad /> : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
              <CardDataStats title="Projets acceptés" total={projectStats.accepted} loading={loading} >
                <LucideFile className="cfill-primary" />
              </CardDataStats>
              <CardDataStats title="Projets terminés" total={projectStats.finished} loading={loading} >
                <LucideFile className="fill-primary" />
              </CardDataStats>
              <CardDataStats title="Projets annulés" total={projectStats.canceled} loading={loading} >
                <LucideFile className="fill-primary" />
              </CardDataStats>
              <CardDataStats title="Projets en cours" total={projectStats.pending} loading={loading} >
                <LucideFile className="fill-primary" />
              </CardDataStats>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
              <CardDataStats title="PiPs acceptés" total={projectPlanStats.accepted} loading={loading} >
                <LucideFileArchive className="fill-primary" />
              </CardDataStats>
              <CardDataStats title="PiPs terminés" total={projectPlanStats.finished} loading={loading} >
                <LucideFileArchive className="fill-primary" />
              </CardDataStats>
              <CardDataStats title="PiPs annulés" total={projectPlanStats.canceled} loading={loading} >
                <LucideFileArchive className="fill-primary" />
              </CardDataStats>
              <CardDataStats title="PiPs en cours" total={projectPlanStats.pending} loading={loading} >
                <LucideFileArchive className="fill-primary" />
              </CardDataStats>
            </div>
          </div>
        )
      }
    </>
  );
}
