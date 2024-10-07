<template>
  <div class="product-page">
    <h1 class="text-lg font-bold mb-4">Product Management</h1>

    <!-- Add New Product Modal -->
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      @click="showModal = true"
    >
      Add New Product
    </button>

    <!-- Modal for adding a new product -->
    <div v-if="currentStep === 1">
      <!-- Step 1: Product Details -->
      <form @submit.prevent="nextStep">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Name</label>
          <input
            v-model="newProduct.name"
            type="text"
            class="w-full border px-2 py-1"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Category</label>
          <select
            v-model="newProduct.category"
            class="w-full border px-2 py-1"
            required
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.name"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Description</label>
          <input
            v-model="newProduct.description"
            type="text"
            class="w-full border px-2 py-1"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Stock</label>
          <input
            v-model="newProduct.stock"
            type="number"
            class="w-full border px-2 py-1"
            required
          />
        </div>
        <button type="submit" class="bg-blue-500 text-white py-1 px-4 rounded">
          Next
        </button>
      </form>
    </div>

    <div v-if="currentStep === 2">
      <!-- Step 2: Upload Images -->
      <h2 class="text-md font-semibold mb-4">Upload Images</h2>
      <input type="file" accept="image/*" @change="handleFileUpload" multiple />
      <div class="mt-2">
        <div v-for="image in newProduct.images" :key="image.name">
          {{ image.name }}
        </div>
      </div>
      <button
        @click="prevStep"
        class="bg-gray-500 text-white py-1 px-4 rounded"
      >
        Back
      </button>
      <button
        @click="nextStep"
        class="bg-blue-500 text-white py-1 px-4 rounded"
      >
        Next
      </button>
    </div>

    <div v-if="currentStep === 3">
      <!-- Step 3: Date and Time -->
      <h2 class="text-md font-semibold mb-4">Date and Time</h2>
      <input type="date" v-model="newProduct.date_time" required />

      <div class="flex justify-end mt-2 mb-2 space-x-2">
        <button
          @click="prevStep"
          class="bg-gray-500 text-white py-1 px-4 rounded"
        >
          Back
        </button>
        <button
          @click="addProduct"
          class="bg-blue-500 text-white py-1 px-4 rounded"
        >
          Add Product
        </button>
      </div>
    </div>

    <!-- Modal for editing a product -->
    <div
      v-if="showEditModal"
      class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 class="text-md font-semibold mb-4">Edit Product</h2>
        <form @submit.prevent="updateProduct">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Name</label>
            <input
              v-model="editedProduct.name"
              type="text"
              class="w-full border px-2 py-1"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Category</label>
            <input
              v-model="editedProduct.category"
              type="text"
              class="w-full border px-2 py-1"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Description</label>
            <input
              v-model="editedProduct.description"
              type="text"
              class="w-full border px-2 py-1"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Stock</label>
            <input
              v-model="editedProduct.stock"
              type="number"
              class="w-full border px-2 py-1"
              required
            />
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              class="bg-gray-500 text-white py-1 px-4 rounded mr-2"
              @click="showEditModal = false"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white py-1 px-4 rounded"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Products List -->
    <div v-if="products.data && products.data.length" class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th
              class="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b"
            >
              Name
            </th>
            <th
              class="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b"
            >
              Description
            </th>
            <th
              class="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b"
            >
              Category
            </th>
            <th
              class="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b"
            >
              Stock
            </th>
            <th
              class="px-4 py-2 text-center text-sm font-semibold text-gray-700 border-b"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr
            v-for="product in products.data"
            :key="product.id"
            class="hover:bg-gray-100"
          >
            <td class="px-4 py-1 border-b text-gray-800">{{ product.name }}</td>
            <td class="px-4 py-1 border-b text-gray-600">
              {{ product.description }}
            </td>
            <td class="px-4 py-1 border-b text-gray-500">
              {{ product.category }}
            </td>
            <td class="px-4 py-1 border-b text-gray-500">
              {{ product.stock }}
            </td>
            <td class="px-4 py-1 border-b text-gray-500">
              <button
                class="bg-green-500 text-white px-2 py-1 rounded mr-2"
                @click="editProduct(product)"
              >
                <i class="fa-solid fa-pen"></i>
                Edit
              </button>

              <button
                class="bg-red-500 text-white px-2 py-1 rounded"
                @click="confirmDelete(product.id)"
              >
                <i class="fa-solid fa-trash"></i>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination Links -->
      <div class="flex justify-between mt-4">
        <button
          @click="fetchProducts(products.prev_page_url)"
          :disabled="!products.prev_page_url"
          class="bg-gray-200 text-gray-600 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          @click="fetchProducts(products.next_page_url)"
          :disabled="!products.next_page_url"
          class="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">No products available.</div>

    <!-- Confirmation Dialog for Delete -->
    <div
      v-if="showConfirmDialog"
      class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 class="text-md font-semibold mb-4">
          Are you sure you want to delete this product?
        </h2>
        <div class="flex justify-end">
          <button
            class="bg-gray-500 text-white py-1 px-4 rounded mr-2"
            @click="showConfirmDialog = false"
          >
            Cancel
          </button>
          <button
            class="bg-red-500 text-white py-1 px-4 rounded"
            @click="deleteProduct(productIdToDelete)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();
const showModal = ref(false);
const showConfirmDialog = ref(false);
const showEditModal = ref(false);
const editedProduct = ref({});
const productIdToDelete = ref(null);
const products = ref([]);
const categories = ref([]);
const currentStep = ref(1);

const fetchCategories = async () => {
  try {
    const response = await axios.get("/api/categories", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    categories.value = response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const newProduct = ref({
  name: "",
  category: "",
  description: "",
  stock: 0,
  date_time: "",
  images: [],
});
const nextStep = () => {
  currentStep.value++;
};

const prevStep = () => {
  currentStep.value--;
};

const handleFileUpload = (event) => {
  const files = event.target.files;
  newProduct.value.images = Array.from(files);
};

const csrfToken = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content");

const fetchProducts = async (url = "api/products") => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        "X-CSRF-TOKEN": csrfToken,
      },
    });
    products.value = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// const addProduct = async () => {
//   try {
//     await axios.post("/api/products", newProduct.value, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
//       },
//     });
//     toast.success("Product added successfully!");
//     fetchProducts(); // Reload products after adding
//     newProduct.value = {
//       name: "",
//       category: "",
//       description: "",
//       stock: 0,
//       date_time: "",
//     }; // Reset form
//     showModal.value = false; // Close modal
//   } catch (error) {
//     toast.error("Failed to add product.");
//     console.error("Error adding product:", error);
//   }
// };
// const addProduct = async () => {
//   try {
//     console.log("New Product Data:", newProduct.value); // Log the data
//     const formData = new FormData();
//     formData.append('name', newProduct.value.name);
//     formData.append('category', newProduct.value.category);
//     formData.append('description', newProduct.value.description);
//     formData.append('stock', newProduct.value.stock);
//     const formattedDate = formatDate(newProduct.value.date_time);
//     formData.append('date_time', formattedDate);

//     newProduct.value.images.forEach((image) => {
//       formData.append('images[]', image);
//     });

//     await axios.post('/api/products', formData, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("auth_token")}`,

//       },
//     });
//     toast.success("Product added successfully!");

//     newProduct.value = { name: '', category: '', description: '', stock: 0, date_time: '', images: [] };
//     currentStep.value = 1;
//   } catch (error) {
//     console.error("Error adding product:", error);
//   }
// };
const addProduct = async () => {
  try {

    const formData = new FormData();
    formData.append("name", newProduct.value.name);
    formData.append("category", newProduct.value.category);
    formData.append("description", newProduct.value.description);
    formData.append("stock", newProduct.value.stock);

   
    formData.append("date_time", newProduct.value.date_time);

   
    newProduct.value.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image); 
    });

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

   
    await axios.post("/api/products", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        "X-CSRF-TOKEN": csrfToken,
      
      },
    });

    toast.success("Product added successfully!");

    newProduct.value = {
      name: "",
      category: "",
      description: "",
      stock: 0,
      date_time: "",
      images: [],
    };
    currentStep.value = 1;
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

const editProduct = (product) => {
  editedProduct.value = { ...product };
  showEditModal.value = true;
};

const updateProduct = async () => {
  try {
    await axios.put(
      `/api/products/${editedProduct.value.id}`,
      editedProduct.value,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    );
    toast.success("Product updated successfully!");
    fetchProducts();
    showEditModal.value = false;
  } catch (error) {
    toast.error("Failed to update product.");
    console.error("Error updating product:", error);
  }
};

const confirmDelete = (id) => {
  productIdToDelete.value = id;
  showConfirmDialog.value = true;
};

const deleteProduct = async (id) => {
  try {
    await axios.delete(`/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    toast.success("Product deleted successfully!");
    fetchProducts();
    showConfirmDialog.value = false;
  } catch (error) {
    toast.error("Failed to delete product.");
    console.error("Error deleting product:", error);
  }
};

onMounted(() => {
  fetchProducts();
  fetchCategories();
});
</script>

<style scoped>
.modal {
  display: flex;
}
</style>
