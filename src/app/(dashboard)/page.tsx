"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CardDataStats from "@/components/Card/CardDataStats";
import statApi from "@/services/stat.service";
import { IStats } from "@/shared/models";
import { LucideFile } from "lucide-react";
import React from "react";

export default function Dashboard() {
  const [projectStats, setProjectStats] = React.useState<IStats>({
    accepted: 0,
    canceled: 0,
    finished: 0,
    pending: 0,
  });

  const [projectPlanStats, setProjectPlanStats] = React.useState<IStats>({
    accepted: 0,
    canceled: 0,
    finished: 0,
    pending: 0,
  });

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    statApi()
      .projectsStats()
      .then((response) => {
        setProjectStats(response.data);
      })
      .finally(() => setLoading(false));

    statApi()
      .projectPlansStats()
      .then((response) => {
        setProjectPlanStats(response.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Breadcrumb pageName="Dashboard" />
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats
            title="Mission(s) acceptée(s)"
            total={projectStats.accepted}
            loading={loading}
          >
            <LucideFile className="fill-primary" />
          </CardDataStats>
          <CardDataStats
            title="Mission(s) terminée(s)"
            total={projectStats.finished}
            loading={loading}
          >
            <LucideFile className="fill-primary" />
          </CardDataStats>
          <CardDataStats
            title="Mission(s) annulée(s)"
            total={projectStats.canceled}
            loading={loading}
          >
            <LucideFile className="fill-primary" />
          </CardDataStats>
          <CardDataStats
            title="Mission(s) en cour(s)"
            total={projectStats.pending}
            loading={loading}
          >
            <LucideFile className="fill-primary" />
          </CardDataStats>
        </div>
      </div>
    </>
  );
}
