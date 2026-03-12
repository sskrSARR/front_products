import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

type ProductFormData = Omit<Product, 'id'> & { id?: number | null };

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = false;
  error: string = '';
  showForm: boolean = false;
  editingId: number | null = null;

  formData: ProductFormData = {
    designation: '',
    price: 0,
    quantity: 0,
    reference: ''
  };

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';
    this.productService.getAll().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Erreur lors du chargement des produits';
        console.error(err);
        this.loading = false;
      }
    });
  }

  openForm(product?: Product): void {
    if (product) {
      this.editingId = product.id;
      this.formData = { ...product } as ProductFormData;
    } else {
      this.editingId = null;
      this.formData = {
        designation: '',
        price: 0,
        quantity: 0,
        reference: ''
      } as ProductFormData;
    }
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editingId = null;
  }

  saveProduct(): void {
    if (!this.formData.designation || this.formData.price <= 0) {
      this.error = 'Veuillez remplir tous les champs correctement';
      return;
    }

    if (this.editingId) {
      this.productService.update(this.editingId, this.formData as Product).subscribe({
        next: () => {
          this.loadProducts();
          this.closeForm();
        },
        error: (err: any) => {
          this.error = 'Erreur lors de la mise à jour';
          console.error(err);
        }
      });
    } else {
      this.productService.create(this.formData as Product).subscribe({
        next: () => {
          this.loadProducts();
          this.closeForm();
        },
        error: (err: any) => {
          this.error = 'Erreur lors de la création';
          console.error(err);
        }
      });
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.productService.delete(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err: any) => {
          this.error = 'Erreur lors de la suppression';
          console.error(err);
        }
      });
    }
  }
}
