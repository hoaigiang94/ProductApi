using System.Threading.Tasks;
using System.Collections.Generic;

namespace ProductApi.Services
{
    public interface IProductService
    {
        public Task<List<Product>> GetProducts(string searchString);
        public Task<Product> GetProduct(int productId);
        public Task<Product> AddProduct(Product productItem);
        public Task<Product> UpdateProduct(int id, Product productItem);
        public Task<Product> DeleteProduct(Product product);
        public bool ProductExists(int id);
    }
}
