using System;
using ProductApi.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ProductApi.Services
{
    public class ProductService : IProductService
    {
        private readonly ProductContext _context;

        public ProductService(ProductContext context)
        {
            _context = context;
        }
        public async Task<List<Product>> GetProducts(string searchString)
        {
            var products = from p in _context.Products
                           select p;

            if (!String.IsNullOrEmpty(searchString))
            {
                products = products.Where(p => (p.Id + ' ' + p.Name + ' ' + p.Price).Contains(searchString));
            }
            return await products.ToListAsync();
        }

        public async Task<Product> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            return product;
        }

        public async Task<Product> AddProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<Product> UpdateProduct(int id, Product product){
            _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<Product> DeleteProduct(Product product){
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }

    }
}
