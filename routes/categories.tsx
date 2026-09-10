import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/CrudPage";

export const Route = createFileRoute("/categories")({
  component: () => (
    <CrudPage
      table="categories"
      title="Categories"
      description="Group products into categories."
      fields={[
        { key: "name", label: "Category name", required: true },
        { key: "description", label: "Description", type: "textarea" },
      ]}
      columns={[
        { key: "name", label: "Name" },
        { key: "description", label: "Description" },
      ]}
    />
  ),
  head: () => ({ meta: [{ title: "Categories — Stockly" }] }),
});
