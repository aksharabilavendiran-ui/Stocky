import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, AlertTriangle, IndianRupee, Boxes, Tag, Grid3x3, Truck, Store } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — Stockly" }] }),
});

function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const [products, brands, categories, suppliers, stores] = await Promise.all([
        supabase.from("products").select("id, name, stock_quantity, price, low_stock_threshold"),
        supabase.from("brands").select("id", { count: "exact", head: true }),
        supabase.from("categories").select("id", { count: "exact", head: true }),
        supabase.from("suppliers").select("id", { count: "exact", head: true }),
        supabase.from("stores").select("id", { count: "exact", head: true }),
      ]);
      const prods = products.data ?? [];
      const totalStock = prods.reduce((s, p) => s + (p.stock_quantity ?? 0), 0);
      const stockValue = prods.reduce((s, p) => s + Number(p.price ?? 0) * (p.stock_quantity ?? 0), 0);
      const lowStock = prods.filter((p) => (p.stock_quantity ?? 0) <= (p.low_stock_threshold ?? 0));
      return {
        productCount: prods.length,
        brandCount: brands.count ?? 0,
        categoryCount: categories.count ?? 0,
        supplierCount: suppliers.count ?? 0,
        storeCount: stores.count ?? 0,
        totalStock,
        stockValue,
        lowStock,
      };
    },
  });

  const stats: { label: string; value: string | number; icon: any; to: string; accent?: boolean }[] = [
    { label: "Products", value: data?.productCount ?? 0, icon: Package, to: "/products" },
    { label: "Total stock units", value: data?.totalStock ?? 0, icon: Boxes, to: "/products" },
    { label: "Stock value", value: `₹${(data?.stockValue ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`, icon: IndianRupee, to: "/products" },
    { label: "Low stock alerts", value: data?.lowStock.length ?? 0, icon: AlertTriangle, to: "/products", accent: true },
  ];

  const orgs = [
    { label: "Brands", value: data?.brandCount ?? 0, icon: Tag, to: "/brands" },
    { label: "Categories", value: data?.categoryCount ?? 0, icon: Grid3x3, to: "/categories" },
    { label: "Suppliers", value: data?.supplierCount ?? 0, icon: Truck, to: "/suppliers" },
    { label: "Stores", value: data?.storeCount ?? 0, icon: Store, to: "/stores" },
  ] as const;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your inventory business.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} to={s.to}>
            <Card className="transition hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.accent ? "bg-destructive/10 text-destructive" : "bg-brand-soft text-primary"}`}>
                  <s.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "—" : s.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Business setup</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {orgs.map((s) => (
            <Link key={s.label} to={s.to}>
              <Card className="transition hover:shadow-md">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-primary">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                    <div className="text-lg font-semibold">{isLoading ? "—" : s.value}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-4 w-4 text-destructive" /> Low stock items
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : data?.lowStock.length === 0 ? (
            <p className="text-sm text-muted-foreground">All products are well stocked. 🎉</p>
          ) : (
            <ul className="divide-y">
              {data?.lowStock.map((p) => (
                <li key={p.id} className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium">{p.name}</span>
                  <Badge variant="destructive">{p.stock_quantity} left</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
