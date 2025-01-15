class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(productData) {
        const product = { id: this.nextId++, ...productData };
        this.products.push(product);
        return product;
    }

    getProducts() {
        return this.products;
    }

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            return this.products.splice(index, 1)[0];
        }
        return null;
    }
}

export default new ProductManager();
