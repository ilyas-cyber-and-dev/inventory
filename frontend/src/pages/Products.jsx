import { useEffect, useState } from "react";
import { Search, Plus, Edit2, Trash2, Loader2, Package, AlertTriangle, BadgeDollarSign } from "lucide-react";
import api from "../services/api";

// UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    description: "",
    price: "",
    stock: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    sku: "",
    description: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add product handler
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        sku: formData.sku,
        description: formData.description || null,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
      };

      await api.post("/products", payload);
      setShowAddModal(false);
      setFormData({ name: "", sku: "", description: "", price: "", stock: "" });
      window.location.reload(); // Reload after add
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to add product");
    }
  };

  // Edit click handler
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditFormData({
      name: product.name || "",
      sku: product.sku || "",
      description: product.description || "",
      price: product.price !== undefined && product.price !== null ? product.price.toString() : "",
      stock: product.stock !== undefined && product.stock !== null ? product.stock.toString() : "",
    });
  };

  // Update product handler
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: editFormData.name,
        sku: editFormData.sku,
        description: editFormData.description || null,
        price: parseFloat(editFormData.price),
        stock: parseInt(editFormData.stock, 10),
      };

      await api.put(`/products/${editingProduct.id}`, payload);
      setEditingProduct(null);
      window.location.reload(); // Reload after edit
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update product");
    }
  };

  // Delete product handler
  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      window.location.reload(); // Reload after delete
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  // Stats calculation
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, curr) => acc + curr.stock, 0);
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 10).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  // Filtered products
  const filteredProducts = products.filter((product) => {
    const search = searchQuery.toLowerCase();
    return (
      product.name?.toLowerCase().includes(search) ||
      product.sku?.toLowerCase().includes(search) ||
      product.description?.toLowerCase().includes(search)
    );
  });

  const getStockBadge = (stock) => {
    if (stock === 0) {
      return <Badge variant="danger">Out of Stock</Badge>;
    }
    if (stock <= 10) {
      return <Badge variant="warning">Low Stock ({stock})</Badge>;
    }
    return <Badge variant="success">In Stock ({stock})</Badge>;
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Title & Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products Management</h1>
          <p className="text-muted-foreground text-sm">
            Manage your store inventory, SKU records, prices, and stock counts.
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="rounded-xl flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="rounded-2xl">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Products</p>
              <h3 className="text-2xl font-bold">{loading ? "..." : totalProducts}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <BadgeDollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Items Stock</p>
              <h3 className="text-2xl font-bold">{loading ? "..." : totalStock}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="h-10 w-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Low Stock items</p>
              <h3 className="text-2xl font-bold">{loading ? "..." : lowStockCount}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="h-10 w-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
              <Trash2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Out of Stock</p>
              <h3 className="text-2xl font-bold">{loading ? "..." : outOfStockCount}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="rounded-2xl shadow-sm border border-border">
        <CardHeader className="pb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle>Inventory Items</CardTitle>
            <CardDescription>
              A complete database list of all available items in stock.
            </CardDescription>
          </div>
          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, SKU..."
              className="pl-9 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground text-sm">Loading product database...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
              <Package className="h-12 w-12 text-muted-foreground/50 mb-3" />
              <h3 className="text-lg font-semibold">No products found</h3>
              <p className="text-muted-foreground text-sm max-w-sm mt-1">
                {searchQuery ? "No matching products were found for your search query." : "You haven't added any products yet. Get started by clicking 'Add Product' above."}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">#{product.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">{product.name}</span>
                        {product.description && (
                          <span className="text-xs text-muted-foreground line-clamp-1 max-w-[300px]">
                            {product.description}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{product.sku}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(product.price)}</TableCell>
                    <TableCell>{getStockBadge(product.stock)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(product)}
                          className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add Product Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent onClose={() => setShowAddModal(false)} className="rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Create a new entry in your stock inventory. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddProduct} className="space-y-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="add-name">Product Name *</Label>
              <Input
                id="add-name"
                type="text"
                placeholder="e.g. Wireless Mouse"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="add-sku">SKU Code *</Label>
              <Input
                id="add-sku"
                type="text"
                placeholder="e.g. MOUSE-WL-001"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="add-desc">Description</Label>
              <Textarea
                id="add-desc"
                placeholder="Brief description of the product features..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="add-price">Price (USD) *</Label>
                <Input
                  id="add-price"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="add-stock">Initial Stock *</Label>
                <Input
                  id="add-stock"
                  type="number"
                  placeholder="0"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  required
                />
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setShowAddModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl">
                Save Product
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Product Modal */}
      <Dialog open={editingProduct !== null} onOpenChange={(open) => !open && setEditingProduct(null)}>
        <DialogContent onClose={() => setEditingProduct(null)} className="rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Modify details for product #{editingProduct?.id}. Update counts or parameters.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdateProduct} className="space-y-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Product Name *</Label>
              <Input
                id="edit-name"
                type="text"
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-sku">SKU Code *</Label>
              <Input
                id="edit-sku"
                type="text"
                value={editFormData.sku}
                onChange={(e) => setEditFormData({ ...editFormData, sku: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-desc">Description</Label>
              <Textarea
                id="edit-desc"
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price (USD) *</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={editFormData.price}
                  onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-stock">Stock *</Label>
                <Input
                  id="edit-stock"
                  type="number"
                  min="0"
                  value={editFormData.stock}
                  onChange={(e) => setEditFormData({ ...editFormData, stock: e.target.value })}
                  required
                />
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setEditingProduct(null)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Products;