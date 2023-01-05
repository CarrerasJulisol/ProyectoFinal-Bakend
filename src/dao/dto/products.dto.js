export class ProductDTO {
    constructor(product){
        this.name = product.name;
        this.price = product.price;
        this.stock = product.stock;
        this.image = product.image||"https://i.ibb.co/KWGnKd9/imagen.png";
        this.category = product.category
        this.subCategory = product.subCategory
    }
}
