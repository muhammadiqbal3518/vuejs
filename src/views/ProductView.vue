<template>
  <SideBar :role="roleId" />
  <div class="mdc-layout-grid">
    <div class="row mb-3">
      <div class="col-12 col-md-3 col-lg-1">
        <!-- <RouterLink to="/product-add" class="btn btn-success">Create</RouterLink> -->
        <button
          type="button"
          class="btn btn-success form-control mb-3"
          @click="showModal()"
        >
          Create
        </button>
      </div>
      <div class="col-12 col-md-9 col-lg-11">
        <input
          type="text"
          v-model="keyword"
          :onchange="searchItem()"
          class="form-control mb-3"
          placeholder="Search Here"
        />
      </div>
    </div>
    <div class="mdc-layout-grid__inner">
      <div
        class="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-12"
      >
        <div class="mdc-card p-0">
          <h6 class="card-title card-padding pb-0 text-center">Product List</h6>
          <div class="table-responsive">
            <table class="table table-hoverable">
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">Item</th>
                  <th class="text-left">Price</th>
                  <th class="text-center">Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in filteredItems" :key="index">
                  <td class="text-left">{{ index + 1 }}</td>
                  <td class="text-left">{{ item.name }}</td>
                  <td class="text-left">Rp {{ item.price }}</td>
                  <td class="text-center">
                    <img
                      v-if="item.image"
                      height="100px"
                      width="100px"
                      :src="url + item.image"
                      class="img"
                    />
                    <img
                      v-else
                      height="100px"
                      width="100px"
                      src="@/assets/image/default_image-1024.webp"
                      class="img"
                    />
                  </td>
                  <td>
                    <button
                      class="btn btn-sm btn-primary"
                      type="button"
                      @click="editModal(item.id)"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <form @submit.prevent="createProduct()">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create Product</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="mb-3">
                  <label for="productName" class="form-label"
                    >Product name</label
                  >
                  <input
                    type="text"
                    v-model="name"
                    class="form-control"
                    id="productName"
                  />
                </div>
                <div class="mb-3">
                  <label for="productPrice" class="form-label"
                    >Product Price</label
                  >
                  <input
                    type="number"
                    v-model="price"
                    class="form-control"
                    id="productPrice"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" for="image">Product Image</label>
                  <input
                    type="file"
                    @change="imageChanged($event)"
                    class="form-control"
                    id="image"
                    accept="image/jpeg, image/png"
                  />
                  <small class="text-danger"
                    >*Accepted file only JPG and PNG</small
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="processing"
            >
              {{ processing ? "Saving ..." : "Submit" }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div
    class="modal fade"
    id="updateModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <form @submit.prevent="updateProduct(itemData.id)">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Product</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="mb-3">
                  <label for="productName" class="form-label"
                    >Product name</label
                  >
                  <input
                    type="text"
                    v-model="itemData.name"
                    class="form-control"
                    id="productName"
                  />
                </div>
                <div class="mb-3">
                  <label for="productPrice" class="form-label"
                    >Product Price</label
                  >
                  <input
                    type="number"
                    v-model="itemData.price"
                    class="form-control"
                    id="productPrice"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" for="image">Product Image</label>
                  <input
                    type="file"
                    @change="imageChanged($event)"
                    class="form-control"
                    id="image"
                    accept="image/jpeg, image/png"
                  />
                  <small class="text-danger"
                    >*Accepted file only JPG and PNG</small
                  >
                  <div class="mx-3 my-3">
                    <p>Current Image</p>
                    <img
                      v-if="itemData.image"
                      height="100px"
                      width="100px"
                      :src="url + itemData.image"
                      class="img"
                    />
                    <img
                      v-else
                      height="100px"
                      width="100px"
                      src="@/assets/image/default_image-1024.webp"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="processing"
            >
              {{ processing ? "Saving ..." : "Submit" }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="modal fade" id="loadingModal" tabindex="-1"aria-labelledby="exampleModalLabel"
    aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="background-color:rgba(255, 255, 255, 0); border:none;">
            <div class="modal-body">
            <div class="row">
                <div class="col-12">
                <div class="text-center">
                  <lord-icon
                      src="https://cdn.lordicon.com/okdadkfx.json"
                      trigger="loop"
                      style="width:250px;height:250px">
                  </lord-icon>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import router from "@/router";
import SideBar from "@/components/SideBar.vue";
import Swal from "sweetalert2";
export default {
  components: {
    SideBar,
  },
  data() {
    return {
      userName: "",
      roleId: "",
      items: [],
      filteredItems: [],
      url: "https://sub.mykavling.store/public/public/items/",
      keyword: "",
      name: "",
      price: "",
      file: "",
      processing: false,
      productId: "",
      itemData: "",
    };
  },
  mounted() {
    document.title = "Product";
    this.userName = localStorage.getItem("name");
    this.roleId = localStorage.getItem("role_id");
    if (!this.userName) {
      router.push({ name: "login" });
    }
    if (this.roleId != 4) {
      router.push({ name: "home" });
    }
    this.getItems();
  },
  methods: {
    getItems() {
      $("#loadingModal").modal("show");
      axios
        .get("https://sub.mykavling.store/api/item", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.items = response.data.data;
        })
        .catch(function (error) {
          if (error.response.status == 401) {
            localStorage.removeItem("email");
            localStorage.removeItem("name");
            localStorage.removeItem("role_id");
            localStorage.removeItem("token");
            router.push({ name: "login" });
          }
          console.log(error);
          console.log("Error Fetch Items");
        }).finally(() => {
          $("#loadingModal").modal("hide");
        });
    },
    searchItem() {
      this.filteredItems = this.items.filter((item) =>
        item.name.toLowerCase().includes(this.keyword.toLowerCase())
      );
    },
    editModal(id) {
      this.productId = id;
      $("#updateModal").modal("show");
      axios
        .get("https://sub.mykavling.store/api/item/" + this.productId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.itemData = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    updateProduct(id) {
      if (this.itemData.name == "" || this.itemData.price == "") {
        Swal.fire({
          title: "Validation Error",
          text: "Name & Price is Required",
          icon: "error",
        });
        return;
      }
      let formData = new FormData();
      formData.append("name", this.itemData.name);
      formData.append("price", this.itemData.price);
      formData.append("image_file", this.file);
      formData.append("_method", "patch");
      this.processing = true;
      axios
        .post("https://sub.mykavling.store/api/item/" + id, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          router.push({ name: "product" });
          Swal.fire({
            title: "Process Success",
            text: "Berhasil Update Data Product",
            icon: "success",
          });
          this.file = "";
          this.name = "";
          this.price = "";
          this.getItems();
          $("#updateModal").modal("hide");
        })
        .catch(function (error) {
          if (error.response.status == 401) {
            localStorage.removeItem("email");
            localStorage.removeItem("name");
            localStorage.removeItem("role_id");
            localStorage.removeItem("token");
            router.push({ name: "login" });
          }
          console.log(error);
          console.log("Error While Fetching Items");
        })
        .finally(() => (this.processing = false));
    },
    showModal() {
      $("#exampleModal").modal("show");
    },
    createProduct() {
      if (this.name == "" || this.price == "") {
        Swal.fire({
          title: "Validation Error",
          text: "Name & Price is Required",
          icon: "error",
        });
        return;
      }

      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("price", this.price);
      formData.append("image_file", this.file);
      this.processing = true;

      axios
        .post("https://sub.mykavling.store/api/item", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          Swal.fire({
            title: "Process Success",
            text: "Berhasil Menambahkan Data Product",
            icon: "success",
          });
          this.file = "";
          this.name = "";
          this.price = "";
          this.getItems();
          $("#exampleModal").modal("hide");
        })
        .catch(function (error) {
          if (error.response.status == 401) {
            localStorage.removeItem("email");
            localStorage.removeItem("name");
            localStorage.removeItem("role_id");
            localStorage.removeItem("token");
            router.push({ name: "login" });
          }
          console.log(error);
          console.log("Error While Fetching Items");
        })
        .finally(() => (this.processing = false));
    },
    imageChanged(e) {
      let file = e.target.files[0];
      this.file = file;
    },
  },
};
</script>
