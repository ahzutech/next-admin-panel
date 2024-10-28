import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Pencil, Trash2, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ServicesPage() {
  const [services] = useState([
    {
      id: 1,
      name: "Web Development",
      category: "Development",
      price: "$999",
      status: "Active",
      date: "2024-03-20"
    },
    {
      id: 2,
      name: "UI/UX Design",
      category: "Design",
      price: "$799",
      status: "Draft",
      date: "2024-03-19"
    }
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Services</h1>
        <Link href="/admin/services/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Service
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    {service.name}
                  </div>
                </TableCell>
                <TableCell>{service.category}</TableCell>
                <TableCell>{service.price}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      service.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    )}
                  >
                    {service.status}
                  </span>
                </TableCell>
                <TableCell>{service.date}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/services/${service.id}`}>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}