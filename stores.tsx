import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/CrudPage";

export const Route = createFileRoute("/_authenticated/stores")({
  component: () => (
    <CrudPage
      table="stores"
      title="Stores"
      description="Manage your store locations."
      fields={[
        { key: "name", label: "Store name", required: true },
        { key: "location", label: "Location / Address" },
        { key: "city", label: "City" },
        { key: "state", label: "State" },
      ]}
      columns={[
        { key: "name", label: "Name" },
        { key: "city", label: "City" },
        { key: "state", label: "State" },
        { key: "location", label: "Location" },
      ]}
    />
  ),
  head: () => ({ meta: [{ title: "Stores — Stockly" }] }),
});
