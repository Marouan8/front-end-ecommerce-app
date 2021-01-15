import { CartItem } from './../../common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Product } from 'src/app/common/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product();
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      ()=> {
        this.handleProductDetails()
      }
    )
  }

  handleProductDetails() {

    // get the "id" param string. convert string to a number using the "+" symbol
    //const theProductId: number = +this.route.snapshot.paramMap.get('id');
    const theProductId: number = +this.route.snapshot.params['id'];
    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  addToCart() {
    const cartItem = new CartItem(this.product)
    this.cartService.addToCart(cartItem)
  }
}
