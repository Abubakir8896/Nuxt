<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { FwbPagination } from 'flowbite-vue'


const currentPage = ref(1)
const products = ref([]);
const limit = ref(10);
const skip = ref(0);
const error = ref(null);
const loading = ref(false);
const title = ref('');
const totalPages = ref(10);

const fetchProducts = () => {
    loading.value = true;
    const skipValue = (currentPage.value - 1) * limit.value;
    axios.get(`https://dummyjson.com/products?limit=${limit.value}&skip=${skip.value}`)
        .then(res => {
            products.value = [...products.value, ...res.data.products];
            skip.value += limit.value;
        })
        .catch(err => {
            error.value = err;
        })
        .finally(() => {
            loading.value = false;
        });
};

const loadMore = () => {
  currentPage.value += 1;
  fetchProducts();
};
onMounted(fetchProducts);

const searchProducts = (title) => {
    loading.value = true;
    axios.get(`https://dummyjson.com/products/search?q=${title}`)
        .then(res => {
            products.value = []
            products.value = [...products.value, ...res.data.products];
        })
        .catch(err => {
            error.value = err;
        })
        .finally(() => {
            loading.value = false;
        });
}
</script>

<template>
    <div class="mt-[30px] container">
        <h1 class="fond-[Roboto] text-[black] text-[48px]">Products</h1>
        <div class="mt-[20px] flex justify-center">
            <input class="w-[550px] p-[10px] rounded-[5px] border-[2px] border-[black] text-[black]" type="text"
                placeholder="Search Product" v-model="title" @input="searchProducts(title)">
        </div>
        <div class="h-[80px]"></div>
        <Loading v-if="loading" />
        <div v-else-if="error" class="text-center py-5 text-red-500">
            Error loading products
        </div>
        <div>
            <div class="grid lg:grid-cols-4 gap-5 gris-cols-2">
                <nuxt-link :to="{ name: 'products-id', params: { id: product.id } }"
                    class="bg-white p-5 rounded shadow-md hover:shadow-lg transition-shadow duration-300"
                    v-for="product in products" :key="product.id">
                    <img :src="product.thumbnail" alt="" class="w-full h-48 object-cover rounded mb-3" />
                    <h1 class="text-2xl font-medium line-clamp-1 my-3">
                        {{ product.title }}
                    </h1>
                    <p class="line-clamp-2 mb-3">{{ product.description }}</p>
                    <h1 class="text-xl font-semibold">${{ product.price }}</h1>
                </nuxt-link>
            </div>
            <div class="flex items-center justify-center py-4">
                <fwb-pagination v-model="currentPage" :total-pages="totalPages" show-icons @on-next="loadMore"></fwb-pagination>
            </div>
        </div>
    </div>
</template>