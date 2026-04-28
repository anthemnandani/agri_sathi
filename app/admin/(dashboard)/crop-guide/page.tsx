"use client"

import { useState } from "react"
import {
  Leaf,
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Droplets,
  Sun,
  Calendar,
  Thermometer,
  Filter,
  Download,
  Bug,
  Sprout
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cropGuide } from "@/lib/admin-data"

export default function AdminCropGuidePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [seasonFilter, setSeasonFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedCrop, setSelectedCrop] = useState<typeof cropGuide[0] | null>(null)

  const filteredCrops = cropGuide.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         crop.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSeason = seasonFilter === "all" || crop.season === seasonFilter
    const matchesCategory = categoryFilter === "all" || crop.category === categoryFilter
    return matchesSearch && matchesSeason && matchesCategory
  })

  const getSeasonBadge = (season: string) => {
    switch (season) {
      case "kharif":
        return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50"><Droplets className="h-3 w-3 mr-1" />Kharif</Badge>
      case "rabi":
        return <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/50"><Sun className="h-3 w-3 mr-1" />Rabi</Badge>
      case "zaid":
        return <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/50"><Thermometer className="h-3 w-3 mr-1" />Zaid</Badge>
      default:
        return <Badge variant="outline">{season}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "cereals":
        return <Badge variant="outline" className="text-amber-600 border-amber-200">Cereals</Badge>
      case "pulses":
        return <Badge variant="outline" className="text-green-600 border-green-200">Pulses</Badge>
      case "vegetables":
        return <Badge variant="outline" className="text-emerald-600 border-emerald-200">Vegetables</Badge>
      case "fruits":
        return <Badge variant="outline" className="text-red-600 border-red-200">Fruits</Badge>
      case "oilseeds":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-200">Oilseeds</Badge>
      case "spices":
        return <Badge variant="outline" className="text-orange-600 border-orange-200">Spices</Badge>
      default:
        return <Badge variant="outline">{category}</Badge>
    }
  }

  const handleView = (crop: typeof cropGuide[0]) => {
    setSelectedCrop(crop)
    setIsViewModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Crop Guide</h1>
          <p className="text-muted-foreground">Manage crop information and best practices</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Crop
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Crops</p>
                <p className="text-2xl font-bold">{cropGuide.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                <Droplets className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kharif Crops</p>
                <p className="text-2xl font-bold">{cropGuide.filter(c => c.season === "kharif").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                <Sun className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rabi Crops</p>
                <p className="text-2xl font-bold">{cropGuide.filter(c => c.season === "rabi").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                <Sprout className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">{new Set(cropGuide.map(c => c.category)).size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search crops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={seasonFilter} onValueChange={setSeasonFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Seasons</SelectItem>
                  <SelectItem value="kharif">Kharif</SelectItem>
                  <SelectItem value="rabi">Rabi</SelectItem>
                  <SelectItem value="zaid">Zaid</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cereals">Cereals</SelectItem>
                  <SelectItem value="pulses">Pulses</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="oilseeds">Oilseeds</SelectItem>
                  <SelectItem value="spices">Spices</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crops Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crop Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Season</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Water Need</TableHead>
                <TableHead>Diseases</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCrops.map((crop) => (
                <TableRow key={crop.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                        <Leaf className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium">{crop.name}</p>
                        <p className="text-xs text-muted-foreground italic">{crop.scientificName}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getCategoryBadge(crop.category)}</TableCell>
                  <TableCell>{getSeasonBadge(crop.season)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {crop.duration}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Droplets className="h-3 w-3 text-blue-500" />
                      {crop.waterRequirement}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Bug className="h-3 w-3 text-red-500" />
                      <span className="text-sm">{crop.diseases.length} known</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleView(crop)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Crop Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-emerald-600" />
              {selectedCrop?.name}
            </DialogTitle>
            <DialogDescription className="italic">{selectedCrop?.scientificName}</DialogDescription>
          </DialogHeader>
          {selectedCrop && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {getSeasonBadge(selectedCrop.season)}
                {getCategoryBadge(selectedCrop.category)}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-medium">{selectedCrop.duration}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Water Need</p>
                  <p className="font-medium">{selectedCrop.waterRequirement}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Soil Type</p>
                  <p className="font-medium">{selectedCrop.soilType}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Temperature Range</h4>
                <p className="text-sm text-muted-foreground">{selectedCrop.temperature}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Bug className="h-4 w-4 text-red-500" />
                  Common Diseases
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCrop.diseases.map((disease, index) => (
                    <Badge key={index} variant="outline" className="text-red-600 border-red-200">
                      {disease}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Best Practices</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {selectedCrop.bestPractices.map((practice, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      {practice}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>Close</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Crop
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Crop Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Crop</DialogTitle>
            <DialogDescription>Add crop information to the guide</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Crop Name</Label>
                <Input placeholder="e.g., Wheat" />
              </div>
              <div className="space-y-2">
                <Label>Scientific Name</Label>
                <Input placeholder="e.g., Triticum aestivum" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cereals">Cereals</SelectItem>
                    <SelectItem value="pulses">Pulses</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="fruits">Fruits</SelectItem>
                    <SelectItem value="oilseeds">Oilseeds</SelectItem>
                    <SelectItem value="spices">Spices</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Season</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kharif">Kharif</SelectItem>
                    <SelectItem value="rabi">Rabi</SelectItem>
                    <SelectItem value="zaid">Zaid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input placeholder="e.g., 120-150 days" />
              </div>
              <div className="space-y-2">
                <Label>Water Requirement</Label>
                <Input placeholder="e.g., Medium" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Soil Type</Label>
              <Input placeholder="e.g., Loamy, well-drained soil" />
            </div>
            <div className="space-y-2">
              <Label>Common Diseases (comma separated)</Label>
              <Input placeholder="e.g., Rust, Smut, Blight" />
            </div>
            <div className="space-y-2">
              <Label>Best Practices</Label>
              <Textarea placeholder="Enter best practices..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">Add Crop</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
