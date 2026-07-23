import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/CrudPage";

export const Route = createFileRoute("/_authenticated/suppliers")({
  component: () => (
    <CrudPage
      table="suppliers"
      title="Suppliers"
      description="Keep track of who you buy from."
      fields={[
        { key: "name", label: "Supplier name", required: true },
        { key: "contact_person", label: "Contact person" },
        { key: "email", label: "Email", type: "email" },
        { key: "phone", label: "Phone", type: "tel" },
        { key: "address", label: "Address", type: "textarea" },
      ]}
      columns={[
        { key: "name", label: "Name" },
        { key: "contact_person", label: "Contact" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
      ]}
    />
  ),
  head: () => ({ meta: [{ title: "Suppliers — Stockly" }] }),
});
