import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/CrudPage";

export const Route = createFileRoute("/_authenticated/brands")({
  component: () => (
    <CrudPage
      table="brands"
      title="Brands"
      description="Manage the brands you carry."
      fields={[
        { key: "name", label: "Brand name", required: true },
        { key: "description", label: "Description", type: "textarea" },
      ]}
      columns={[
        { key: "name", label: "Name" },
        { key: "description", label: "Description" },
      ]}
    />
  ),
  head: () => ({ meta: [{ title: "Brands — Stockly" }] }),
});
