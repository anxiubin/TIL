var eventBus = new Vue()

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img v-bind:src="image" alt="socks">
            </div>

            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>

                <info-tabs :shipping="shipping" :details="details"></info-tabs>

                <div v-for="(variant, index) in variants" 
                     v-bind:key="variant.variantId"
                     class="color-box"
                     v-bind:style="{ backgroundColor: variant.variantColor }"
                     @mouseover="updateProduct(index)">
                </div>

                <button v-on:click="addToCart" 
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock }">
                        Add to Cart
                </button>

                <button v-on:click="removeFromCart" 
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock }">
                        Remove From Cart
                </button>

            </div>

            <product-tabs :reviews="reviews"></product-tabs>

        </div>
    `,
    data() {
        return {
            product: 'Socks',
            brand: 'VUE',
            selectedVariant: 0,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId:2234,
                    variantColor: "Green",
                    variantImage: "./greensocks.jpg",
                    variantQuantity: 10
                },
                {
                    variantId:2235,
                    variantColor: "Blue",
                    variantImage: "./bluesocks.jpg",
                    variantQuantity: 0
                }
            ],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if(this.premium) {
                return "Free"
            }
            return 2.99
        }
    },
    mounted(){
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }

})

Vue.component('product-review', {
    template: `
      <form class="review-form" @submit.prevent="onSubmit">
      
        <p class="error" v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </p>

        <p>
          <label for="name">Name:</label>
          <input id="name" v-model="name">
        </p>
        
        <p>
          <label for="review">Review:</label>      
          <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>
            
        <p>
          <input type="submit" value="Submit">  
        </p>    
      
    </form>
    `,
    data() {
      return {
        name: null,
        review: null,
        rating: null,
        errors: []
      }
    },
    methods: {
      onSubmit() {
        this.errors = []
        if(this.name && this.review && this.rating) {
          let productReview = {
            name: this.name,
            review: this.review,
            rating: this.rating
          }
          eventBus.$emit('review-submitted', productReview)
          this.name = null
          this.review = null
          this.rating = null
        } else {
          if(!this.name) this.errors.push("Name required.")
          if(!this.review) this.errors.push("Review required.")
          if(!this.rating) this.errors.push("Rating required.")
        }
      }
    }
  })

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <span class="tab"
                :class="{ activeTab: selectedTab === tab}"
                v-for="(tab,index) in tabs"
                :key="index"
                @click="selectedTab = tab">
                {{ tab }}
            </span>

            <product-review v-show="selectedTab === 'Make a Review'">
            </product-review>

            <div v-show="selectedTab === 'Reviews'">
                    <p v-if="!reviews.length">There are no reviews yet.</p>
                    <ul v-else>
                        <li v-for="(review, index) in reviews" :key="index">
                            <p>Name: {{ review.name }}</p>
                            <p>Rating:{{ review.rating }}</p>
                            <p>{{ review.review }}</p>
                        </li>
                    </ul>
            </div>

        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }
})

Vue.component('info-tabs', {
    props: {
        shipping: {
            required: true
        },
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <div>

        <ul>
        <span class="tab"
              :class="{ activeTab: selectedTab === tab }"
              v-for="(tab, index) in tabs"
              @click="selectedTab = tab"
              :key="tab">
        {{ tab }}
        </span>
        </ul>

        <div v-show="selectedTab === 'Shipping'">
            <p>{{ shipping }}</p>
        </div>
        <div v-show="selectedTab === 'Details'">
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
        </div>  
    
    </div>
    `,
    data() {
        return {
            tabs: ['Shipping', 'Details'],
            selectedTab: 'Shipping'
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeItem(id) {
            for(let i = this.cart.length-1; i >= 0; i--){
                if(this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        }
    }
})