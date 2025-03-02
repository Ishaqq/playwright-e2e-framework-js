class DashboardPage{
    constructor(page){
        this.page=page;
        this.products = page.locator(".card-body");
        this.productNames=page.locator(".card-body b");
    }

    async selectProduct(productToSelect){
        const productName="ZARA COAT 3";
        await this.productNames.first().waitFor();
        const titles = await this.productNames.allTextContents();
        console.log(titles); 
        const count = await this.products.count();
        for (let i = 0; i < count; ++i) {
         const product=await this.productNames.nth(i).textContent();
         console.log(product);
         console.log(productToSelect);
        //    if ( product === productName) {
        //       //add to cart
        //       await this.products.nth(i).locator("text= Add To Cart").click();
        //       break;
        //    }
           if (productToSelect.includes(product)) { // ✅ Check if product is in list
             await this.products.nth(i).locator("text= Add To Cart").click();
           }
    }

    // for (const productName of productNames) {  // Loop through each product name
    //     for (let i = 0; i < productName.count; i++) {
    //         const product = await this.products.locator('b').nth(i).textContent();
            
    //         if (product.trim() === productName) {  // Match text
    //             await this.products.nth(i).locator("text=Add To Cart").click();
    //             console.log(`Added ${productName} to cart`);
    //             break;  // Move to next product
    //         }
    //     }
    // }
}
}

module.exports = { DashboardPage };