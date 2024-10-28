import { useState } from "react"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Save, ArrowLeft, ImagePlus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function EditService() {
  const router = useRouter()
  const { id } = router.query
  const isNew = id === "new"

  const [service, setService] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    status: "draft",
    features: "",
    image: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Saving service:", service)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/admin/services")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">
          {isNew ? "Add New Service" : "Edit Service"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                value={service.name}
                onChange={(e) =>
                  setService({ ...service, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="text"
                placeholder="$"
                value={service.price}
                onChange={(e) =>
                  setService({ ...service, price: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={service.category}
                onValueChange={(value) =>
                  setService({ ...service, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={service.status}
                onValueChange={(value) =>
                  setService({ ...service, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="rounded-lg border-2 border-dashed p-12 text-center">
                    <ImagePlus className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">
                        Upload service image
                      </p>
                    </div>
                  </div>
                  <Button type="button">Choose Image</Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Label htmlFor="features">Key Features</Label>
              <Textarea
                id="features"
                placeholder="Enter features (one per line)"
                className="min-h-[150px]"
                value={service.features}
                onChange={(e) =>
                  setService({ ...service, features: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            className="min-h-[200px]"
            value={service.description}
            onChange={(e) =>
              setService({ ...service, description: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/services")}
          >
            Cancel
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save Service
          </Button>
        </div>
      </form>
    </div>
  )
}