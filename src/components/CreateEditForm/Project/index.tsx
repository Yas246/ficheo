"use client";

import InputSelect from "@/components/Form/InputSelect";
import InputText from "@/components/Form/InputText";
import InputTextArea from "@/components/Form/InputTextArea";
import { Card } from "@/components/common/Card/Card";
import { Button } from "@/components/ui/button";
import projectApi from "@/services/project.service";
import useToast from "@/shared/helpers/useToast";
import { IProject } from "@/shared/models";
import { useFormik } from "formik";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { ProjectData } from "./data";
import ProjectSchemaValidation from "./validation";

export default function CreateEditProject({ id }: { id?: string }) {
  const { toastSuccess } = useToast();

  const router = useRouter();

  const [loading, setLoading] = React.useState({
    submit: false,
  });

  const [project, setProject] = React.useState<IProject>(
    JSON.parse(JSON.stringify(ProjectData))
  );

  function getProject() {
    id &&
      projectApi()
        .getProject(id)
        .then((response) => {
          setProject({
            ...project,
            ...response.data,
          });
        });
  }

  const { handleSubmit, handleChange, setFieldValue, values, errors } =
    useFormik({
      initialValues: project,
      validationSchema: ProjectSchemaValidation,
      onSubmit: async (values) => {
        setLoading({ ...loading, submit: true });
        await (id
          ? projectApi().updateProject(id, values)
          : projectApi().createProject(values)
        )
          .then((response) => {
            toastSuccess(response.message);
            router.push("/projects");
          })
          .finally(() => setLoading({ ...loading, submit: false }));
      },
    });

  const intermediateOutcomes = useMemo(() => {
    return values.logical_context?.intermediate_outcomes?.map((outcome) => {
      return { title: outcome.title };
    });
  }, [values.logical_context]);

  const DeleteButton = ({ onClick }: { onClick: () => void }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className="absolute  -top-3 -end-3 scale-50 hover:scale-100 cursor-pointer rounded-full bg-red p-2 hover:bg-red/80 duration-300"
      >
        <Trash2 size={16} className="text-white" />
      </button>
    );
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <div className="grid gap-4">
        <Card title="Informations générales">
          <div className="grid grid-cols-2 gap-4">
            <InputText
              name="title"
              label="Titre"
              value={values.title}
              onChange={handleChange}
              errors={errors.title}
            />
            <InputText
              name="duration"
              label="Durée (Jours)"
              type="number"
              value={values.duration}
              onChange={handleChange}
              errors={errors.duration}
            />
            <InputText
              name="client"
              label="Client"
              value={values.client}
              onChange={handleChange}
              errors={errors.client}
            />
            <InputText
              name="site"
              label="Site"
              value={values.site}
              onChange={handleChange}
              errors={errors.site}
            />
            <InputText
              name="technicien"
              label="Technicien"
              value={values.site}
              onChange={handleChange}
              errors={errors.site}
            />
          </div>
          <InputTextArea
            name="description"
            label="Desription de la mission"
            value={values.description}
            onChange={handleChange}
            errors={errors.description}
          />
        </Card>

        <Card title="Résumé exécutif">
          <InputTextArea
            name="overview"
            label="Résumé exécutif"
            value={values.overview}
            onChange={handleChange}
            errors={errors.overview}
          />
        </Card>
        <Card title="Objectif global">
          <InputTextArea
            name="global_objective"
            label="Objectif global"
            value={values.global_objective}
            onChange={handleChange}
            errors={errors.global_objective}
          />
        </Card>

        <Card title="Calendrier">
          <div className="space-y-2">
            {values.calendar &&
              values.calendar.length > 0 &&
              values.calendar.map((calendar, indexCalendar) => (
                <div
                  className="relative space-y-2 border rounded border-slate-300 p-1"
                  key={`calendar.${indexCalendar}`}
                  id={`calendar.${indexCalendar}.title`}
                >
                  <InputSelect
                    options={intermediateOutcomes}
                    optionLabel="title"
                    optionValue="title"
                    name={`calendar.${indexCalendar}.outcome`}
                    label="Résultat"
                    value={calendar.outcome}
                    setFieldValue={setFieldValue}
                    errors={errors}
                  />
                  {calendar &&
                    calendar.activities.map((activity, indexActivity) => (
                      <div
                        key={`calendar.${indexCalendar}.activities.${indexActivity}`}
                        className="grid gap-4 border border-slate-400 p-1 rounded relative"
                      >
                        <InputText
                          name={`calendar.${indexCalendar}.activities.${indexActivity}.title`}
                          label={`Titre`}
                          value={activity.title}
                          onChange={handleChange}
                          errors={errors}
                        />
                        {activity &&
                          activity.period.map((period, indexPeriod) => (
                            <div
                              key={indexPeriod}
                              className="grid grid-cols-2 gap-4 relative p-1 border border-slate-500 rounded"
                            >
                              <InputText
                                name={`calendar.${indexCalendar}.activities.${indexActivity}.period.${indexPeriod}.start_date`}
                                label={`Date de début`}
                                type="date"
                                value={period.start_date}
                                onChange={handleChange}
                                errors={errors}
                              />
                              <InputText
                                name={`calendar.${indexCalendar}.activities.${indexActivity}.period.${indexPeriod}.end_date`}
                                label={`Date de fin`}
                                type="date"
                                value={period.end_date}
                                onChange={handleChange}
                                errors={errors}
                              />
                              <DeleteButton
                                onClick={() =>
                                  setFieldValue(
                                    `calendar.${indexCalendar}.activities.${indexActivity}.period`,
                                    values.calendar[indexCalendar].activities[
                                      indexActivity
                                    ].period.filter((_, i) => i !== indexPeriod)
                                  )
                                }
                              />
                            </div>
                          ))}
                        <DeleteButton
                          onClick={() =>
                            setFieldValue(
                              `calendar.${indexCalendar}.activities`,
                              values.calendar[indexCalendar].activities.filter(
                                (_, i) => i !== indexActivity
                              )
                            )
                          }
                        />
                        <div className="flex justify-end">
                          <Button
                            variant="outline"
                            type="button"
                            onClick={() =>
                              setFieldValue(
                                `calendar.${indexCalendar}.activities.${indexActivity}.period`,
                                [
                                  ...values.calendar[indexCalendar].activities[
                                    indexActivity
                                  ].period,
                                  JSON.parse(
                                    JSON.stringify({
                                      start_date: "",
                                      end_date: "",
                                    })
                                  ),
                                ]
                              )
                            }
                          >
                            Ajouter une période
                          </Button>
                        </div>
                      </div>
                    ))}
                  <DeleteButton
                    onClick={() =>
                      setFieldValue(
                        "calendar",
                        values.calendar.filter((_, i) => i !== indexCalendar)
                      )
                    }
                  />
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() =>
                        setFieldValue(`calendar.${indexCalendar}.activities`, [
                          ...values.calendar[indexCalendar].activities,
                          JSON.parse(
                            JSON.stringify({
                              title: "",
                              period: [
                                {
                                  start_date: "",
                                  end_date: "",
                                },
                              ],
                            })
                          ),
                        ])
                      }
                    >
                      Ajouter une activité
                    </Button>
                  </div>
                </div>
              ))}
          </div>
          <div>
            <Button
              variant="secondary"
              type="button"
              onClick={() =>
                setFieldValue("calendar", [
                  ...values.calendar,
                  JSON.parse(
                    JSON.stringify({
                      outcome: "",
                      activities: [
                        {
                          title: "",
                          period: [
                            {
                              start_date: "",
                              end_date: "",
                            },
                          ],
                        },
                      ],
                    })
                  ),
                ])
              }
            >
              Ajouter un calendrier
            </Button>
          </div>
        </Card>
      </div>

      <div className="w-full flex justify-end">
        <Button
          onClick={() => handleSubmit()}
          type="submit"
          variant="default"
          loading={loading.submit}
          className="bg-green-700 text-white py-2 px-4 rounded"
        >
          Enregistrer
        </Button>
      </div>
    </form>
  );
}
