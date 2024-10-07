<template>
    <div class="w-full p-2 ">
        <h2 class="font-semibold text-lg">DASHBOARD</h2>

        <div class="grid grid-cols-1 gap-2 px-2 mt-4 sm:grid-cols-4">
            <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div class="p-4 bg-green-400">
                    <i class="fas fa-bag-shopping text-white text-2xl p-2"></i>
                </div>
                <div class="px-4 text-gray-700">
                    <h3 class="text-sm tracking-wider">Total Products</h3>
                    <p class="text-xl text-blue-600 font-semibold">{{ totalProducts }}</p>
                </div>
            </div>
            <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div class="p-4 bg-blue-400">
                    <i class="fas fa-bag-shopping text-white text-2xl p-2"></i>
                </div>
                <div class="px-4 text-gray-700">
                    <h3 class="text-sm tracking-wider">Highest Stock Product</h3>
                    <p class="text-sm text-blue-600 font-semibold">{{ highestStockProduct?.name }} ({{ highestStockProduct?.stock }})</p>
                </div>
            </div>
            <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div class="p-4 bg-indigo-400">
                    <i class="fas fa-bag-shopping text-white text-2xl p-2"></i>
                </div>
                <div class="px-4 text-gray-700">
                    <h3 class="text-sm tracking-wider">Lowest Stock Product</h3>
                    <p class="text-sm text-blue-600 font-semibold">{{ lowestStockProduct?.name }} ({{ lowestStockProduct?.stock }})</p>
                </div>
            </div>
            <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div class="p-4 bg-red-400">
                    <i class="fas fa-bag-shopping text-white text-2xl p-2"></i>
                </div>
                <div class="px-4 text-gray-700">
                    <h3 class="text-sm tracking-wider">Top Product Category</h3>
                    <p class="text-sm text-blue-600 font-semibold">{{ topCategory?.category }} ({{ topCategory?.count }} products)</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'; 

const totalProducts = ref(0);
const highestStockProduct = ref(null);
const lowestStockProduct = ref(null);
const topCategory = ref(null);

const fetchProductStatistics = async () => {
  try {
 
    const token = localStorage.getItem('auth_token');

    const response = await axios.get('/api/product-stats', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

   
    totalProducts.value = response.data.total_products;
    highestStockProduct.value = response.data.highest_stock_product;
    lowestStockProduct.value = response.data.lowest_stock_product;
    topCategory.value = response.data.top_category;
  } catch (error) {
    console.error('Error fetching product stats:', error);
  }
};


onMounted(() => {
    fetchProductStatistics();
});
</script>

<style lang="scss" scoped>

</style>