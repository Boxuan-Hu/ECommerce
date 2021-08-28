import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number;
  currentCategoryName: string;
  searchMode: boolean

  constructor(private ProductService : ProductService, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      // get the id para string. convert string to a numer using the + symbol
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
      // get the "name" param string
      this.currentCategoryName = String(this.route.snapshot.paramMap.get('name'));
    } else {
      // default id is 1
      this.currentCategoryId = 1
      this.currentCategoryName = 'Books';
    }

    this.ProductService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleSearchProducts() {

    const theKeyword: string = String(this.route.snapshot.paramMap.get('keyword'));

    this.ProductService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
