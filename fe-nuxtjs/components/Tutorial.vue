<template>
  <div>
    <div style="width: 80%; margin: auto; margin-top: 100px">
      <b-button
        variant="outline-primary"
        v-bind:disabled="showButton"
        @click="createModal"
        >Create</b-button
      >
      <b-table striped hover :items="items" :fields="fields">
        <template #cell(actions)="row">
          <div>
            <b-button
              size="sm"
              variant="primary"
              @click="editCustomer(row.item)"
              >Edit</b-button
            >
            <b-button
              size="sm"
              variant="danger"
              @click="deleteCustomer(row.item)"
              >Delete</b-button
            >
          </div>
        </template>
      </b-table>
    </div>
    <div>
      <b-modal id="bv-modal-example" hide-footer ref="bv-modal">
        <template #modal-title> Using <code>$bvModal</code> Methods </template>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group v-if="showId"
            id="input-group-0"
            label="id:"
            label-for="input-0"
          >
            <b-form-input
              id="input-1"
              v-model="form.id"
              placeholder="Enter id"
              readonly
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="company name:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.company_name"
              placeholder="Enter company name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Your Name 1:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.contact_firstname"
              placeholder="contact_firstname"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Your Name 2:"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              v-model="form.contact_lastname"
              placeholder="Enter contact_lastname"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-4"
            label="Your Name 3:"
            label-for="input-4"
          >
            <b-form-input
              id="input-4"
              v-model="form.contact_email"
              placeholder="Enter contact_email"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary" v-if="showAdd">Submit</b-button>
          <b-button @click="updateCustomer" variant="primary" v-if="showEdit">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<
<script>
import axios from "axios";
export default {
  name: "Tutorial",
  data() {
    return {
      fields: [
        {
          key: "id",
          label: "id",
          sortable: false,
        },
        {
          key: "company_name",
          label: "Company Name",
          sortable: false,
        },
        {
          key: "contact_name",
          label: "Contact Name",
          sortable: false,
        },
        {
          key: "contact_email",
          label: "Contact E-Mail",
          sortable: false,
        },       
        "actions",
      ],
      items: [],
      //   numberOfCustomers: 0,
      //   activeCustomers: 0,
      //   activeCustomersData: [],
      //   customerId: 0,
      //   companySearchTerm: "",
      //   tableHeader: "",
      //   showSuccessAlert: false,
      //   alertMessage: "",
      showButton : false,
      form: {
          company_name: '',
          contact_firstname: '',
          contact_lastname:'',
          contact_email:''
        },
      showId: false,
      showAdd: false,
      showEdit: false
    };
  },
  mounted() {
    this.getAllCustomer();
  },
  methods: {
    getAllCustomer() {
      axios
        .get("http://localhost:8080/users/")
        .then((response) => {
          let data = response.data;
          let newData = data.map(
            ({
              id,
              company_name,
              contact_firstname,
              contact_lastname,
              contact_email,
            }) => ({
              id: id,
              company_name: company_name,
              contact_name: contact_firstname + " " + contact_lastname,
              contact_email: contact_email,
            })
          );

          this.items = newData;
        })
        .catch((e) => {
          alert(e);
        });
    },
    onSubmit(event) {
        event.preventDefault();
        axios
        .post("http://localhost:8080/users/",this.form)
        .then((response) => {
          this.$refs['bv-modal'].hide();
          this.getAllCustomer();
        })
        .catch((e) => {
          alert(e);
        });
      },
    onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.company_name = '';
        this.form.contact_firstname = '';
        this.form.contact_lastname = '';
        this.form.contact_email = '';
      },
      deleteCustomer(item){
        alert(item.id);
        axios
            .delete("http://localhost:8080/users", { data: { id: item.id } })
            .then((response) => {
              this.getAllCustomer();
            })
            .catch((e) => {
              alert(e);
            });
          },
      editCustomer(item){
        this.showAdd = false;
        this.showEdit = true;
        this.$refs['bv-modal'].show();
        axios
        .get(`http://localhost:8080/users/${item.id}`)
        .then((response) => {
          console.log(response)
          let data = response.data;
          this.showId=true;
          this.form.id = data.id;
          this.form.company_name = data.company_name;
          this.form.contact_firstname = data.contact_firstname;
          this.form.contact_lastname = data.contact_lastname;
          this.form.contact_email = data.contact_email;
        })
        .catch((e) => {
          alert(e);
        });
    },
    createModal(){
      this.$refs['bv-modal'].show();
      this.showId=false;
      this.showEdit= false;
      this.showAdd=true;
      this.form.company_name = '';
      this.form.contact_firstname = '';
      this.form.contact_lastname = '';
      this.form.contact_email = '';
    },
    updateCustomer(){
      
      axios
        .put(`http://localhost:8080/users/${this.form.id}`,this.form)
        .then((response) => {
            this.$refs['bv-modal'].hide();
            this.getAllCustomer();
        })
        .catch((e) => {
          alert(e);
        });
    }
  },
    
};
</script>

<style lang="scss" scoped></style>