<template lang='pug'>
  #productManager
    .title 產品管理
    b-row.mb-5
      b-col(cols="3")
        b-form-select(v-model='categorySelect' :options='categoryoptions')
      b-col(cols="3")
        b-form-select(v-model='sellSelect' :options='selloptions')
      b-col.text-right.p-0(cols="6")
        b-button.addPro(id="show-btn" @click="showModel(true)") + 新增商品
    b-modal#bv-modal-example.w-50(size='lg' v-model="show" ref="my-modal" hide-header hide-footer)
      form(@submit.prevent='submit')
      .modelTitle(v-if="iscreate") 新增商品
      .modelTitle(v-else) 編輯商品
      b-row.w-90.m-auto.form-group
        b-col.d-flex.justify-content-between.mb-3(cols="12" v-if="this.iscreate")
          img-inputer(
                  v-if="this.iscreate"
                  v-model="tempProduct.images"
                  placeholder="請選擇圖片"
                  bottom-text="點擊或拖曳更換圖片"
                  :max-size="1024"
                  exceedSizeText="檔案大小不能超過"
                  accept="image/*"
                )
          b-form-select#categorySelect.w-25.py-0(v-model='selected' :options='options')
        b-col.d-flex.mt-2(cols="12")
          b-row
            b-col.d-flex.justify-content-between(cols="12")
              label(for='name') 產品名稱
                input#name.ml-3(type='text' placeholder='輸入' v-model='tempProduct.name')
              b-form-select#categorySelect.w-25.py-0(v-model='selected' :options='options' v-if="!iscreate")
            b-col(cols="12")
              label(for='price') 產品價錢
                input#price.ml-3(type='text' placeholder='輸入' v-model='tempProduct.price')
        b-col.d-flex.mb-1(cols="12")
          label.mr-3(for='textarea') 產品描述
          b-form-textarea#textarea.w-75(v-model='tempProduct.description' placeholder='輸入' rows='1' max-rows='6')
        b-col.d-flex.my-1(cols="12")
          label.mr-3(for='ingredient') 產品材料
          b-form-textarea#ingredient.w-75(type='ingredient' placeholder='輸入' v-model='tempProduct.ingredient')
        b-col(cols="12").mt-1
          .b-row.align-items-center
            .b-col(cols="12")
              label.mr-3(for='allergy') 過敏材料
              input#allergy.w-75(type='allergy' placeholder='輸入' v-model='tempProduct.allergy')
            .b-col(cols="12")
              label.mr-3(for='period') 賞味天數
              input#period.w-75(type='period' placeholder='輸入' v-model='tempProduct.period')
        b-col#radio.mt-2.mb-4.d-flex(cols="12")
          b-form-group.mr-3(label='是否上架')
          .d-flex.flex-column.justify-content-start
            b-form-radio(v-model='tempProduct.sell' value='上架') 上架
            b-form-radio(v-model='tempProduct.sell' value='未上架') 未上架
      #modal-footer.d-flex.justify-content-center.mb-4
        b-button.confirmBtn.mr-5(v-if="this.iscreate" id="show-btn" variant='success' @click="create") 新增
        b-button.confirmBtn.mr-5(v-if="!this.iscreate" id="show-btn" variant='success' @click="edit") 確認
        b-button.cancelBtn(id="show-btn" variant='primary' @click="closeModel") 取消
    b-row.firstcolborder
      b-col.d-flex.justify-content-center(cols="6").
        商品資訊
      b-col.d-flex.justify-content-center(cols="3").
        狀態
      b-col.d-flex.justify-content-center(cols="2").
        編輯
      b-col.d-flex.justify-content-center(cols="1").
        刪除
    b-row.colBorder(v-for='(product, index) in filterproducts' :key='product._id')
      b-col.d-flex.justify-content-center(cols="3")
        img.img(:src='product.imageUrl')
      b-col.d-flex.flexColumn(cols="3")
        .proBig {{ product.name }}
        .proSmall NT$ {{ product.price }}
      b-col.d-flex.justify-content-center(cols="3")
        span.sellColorNormal(:class='{\'sellColor\': product.sell === "上架"}') {{ product.sell }}
      b-col.d-flex.justify-content-center(cols="2")
        b-btn.editbtn(variant="success"  @click="showModel(false, product)")
          font-awesome-icon(:icon="['fas', 'edit']")
      b-col.d-flex.justify-content-center(cols="1")
        b-btn.delbtn(variant="danger" @click="delProduct(product, index)")
          font-awesome-icon(:icon="['fas', 'trash-alt']")
    b-modal#confirmModel(size='sm' v-model="showConfirm" ref="my-modal" centered hide-header hide-footer)
      p.text-center 確定要刪除此資料嗎?
      #modal-footer.d-flex.justify-content-center.my-4
          b-button.confirmBtn.mr-5(id="show-btn" variant='success' @click="delConfirm") 確認
          b-button.cancelBtn(id="show-btn" variant='primary' @click="closedelModel") 取消
</template>

<style lang="scss" scoped>
@import "../assets/scss/all.scss";
.title {
  margin-bottom: 5%;
  letter-spacing: .15rem;
  line-height: 1rem;
  text-align: center;
  color: #785651;
  font-weight: 500;
  font-size: 1.1rem;
}
.modelTitle {
  margin: 3% 0;
  letter-spacing: .15rem;
  line-height: 2.5rem;
  text-align: center;
  color: #785651;
  font-weight: 500;
  font-size: 1.2rem;
}
.w-90 {
  width: 90%;
}
#categorySelect {
  text-align: right;
  width: 50%;
}
//- hr {
//-   width: 100%;
//-   border-top: 3px solid #a8a57c;
//-   opacity: .3;
//- }
.custom-select {
  border: none;
  color: #785651;
  &:focus {
    border: none;
    box-shadow: none;
  }
}
.sellColorNormal {
  color: #af5b4e;
  font-weight: 500;
}
.sellColor {
  color: #a8a57c;
  font-weight: 500;
}
.addPro {
  background: #c5c4a6;
  border: none;
  font-weight: 400;
  height: 100%;
  transition: .6s;
  &:hover {
    background: #a8a57c !important;
  }
  &:active {
    transform: scale(.9);
  }
  &:focus {
    box-shadow: none !important;
  }
}
.colBorder {
  align-items: center;
  height: 12rem;
  border-bottom: 3px solid rgba(198,197,166,0.2);
  transition: .6s;
  &:hover{
    border-bottom: 3px solid rgba(198,197,166,0.8);
  }
}
.firstcolborder {
  margin-top: 3rem;
  align-items: center;
  font-size: .9rem;
  color: #785651;
  height: 3rem;
  border-bottom: 3px solid rgba(198,197,166,0.8);
}
.img {
  height: 6rem;
  object-fit: contain;
}
.flexColumn {
  line-height: 1.3rem;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.proBig {
  color: #785651;
  font-weight: 400;
  letter-spacing: 0.15rem;
  font-size: 1rem;
}
.proSmall {
  font-size: .8em;
  padding-top: .3rem;
  color: #af5b4e;
  letter-spacing: 0rem;
}
.editbtn,
.delbtn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 60%;
  background: transparent;
  color: #785651;
  border: none;
  transition: .6s;
  &:focus {
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
  }
  &:active {
    color: #785651 !important;
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
  }
  &:hover {
    transform: scale(1.2);
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
  }
}
.confirmBtn,
.cancelBtn {
  width: 30%;
  height: 3rem;
}
.cancelBtn {
  background: #785651;
  border: none;
  font-weight: 300;
  transition: .8s;
  &:hover {
    background: #7856519c !important;
  }
  &:active {
    transform: scale(.9);
  }
  &:focus {
    box-shadow: none !important;
  }
}
.confirmBtn {
  background: #a8a57c;
  border: none;
  font-weight: 300;
  transition: .8s;
  &:hover {
    background: #c5c4a6 !important;
  }
  &:active {
    transform: scale(.9);
  }
  &:focus {
    box-shadow: none !important;
  }
}
label,
#radio {
  font-size: 1rem;
  color: #785651
}
#textarea::placeholder,
#price::placeholder,
#name::placeholder,
#ingredient::placeholder,
#allergy::placeholder,
#period::placeholder {
  font-size: .8rem;
  color: #7856515d;
}
#textarea,
#price,
#name,
#ingredient,
#allergy,
#period,
#textarea:focus,
#price:focus,
#name:focus,
#ingredient:focus,
#allergy:focus,
#period:focus {
  padding-left: .2rem;
  color: #785651;
  border:1px solid #7856519c;
  border-radius: .2rem;
  box-shadow: none;
}
label {
  font-size: 1rem;
}
.custom-radio {
  font-size: .95rem;
}
.input {
  line-height: 1.2rem;
  margin-bottom: 1.2rem;
}
</style>

<script>
export default {
  name: 'productManager',
  data () {
    return {
      iscreate: false,
      show: false,
      showConfirm: false,
      tempdelpro: {},
      products: [],
      tempProduct: {},
      tempIndex: 0,
      selected: null,
      categorySelect: '所有類別',
      sellSelect: '全部',
      options: [
        { value: null, text: '選擇類別' },
        { value: '吐司類', text: '吐司類' },
        { value: '歐式麵包類', text: '歐式麵包類' },
        { value: '新品上市類', text: '新品上市類' },
        { value: '其他', text: '其他' }
      ],
      categoryoptions: [
        { value: '所有類別', text: '所有類別' },
        { value: '吐司類', text: '吐司類' },
        { value: '歐式麵包類', text: '歐式麵包類' },
        { value: '新品上市類', text: '新品上市類' },
        { value: '其他', text: '其他' }
      ],
      selloptions: [
        { value: '全部', text: '全部' },
        { value: '上架', text: '上架' },
        { value: '未上架', text: '未上架' }
      ]
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/products/')
      .then(res => {
        this.products = res.data.result
        for (const p of this.products) {
          const productSrc = `${process.env.VUE_APP_API}/products/images/${p.images}`
          p.imageUrl = productSrc
        }
      })
  },
  methods: {
    create () {
      this.tempProduct.category = this.selected
      if (this.tempProduct.images.size > 1024 * 1024) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '圖片太大'
        })
      } else if (!this.tempProduct.images.type.includes('image')) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '檔案格式錯誤'
        })
      } else {
        const fd = new FormData()
        fd.append('name', this.tempProduct.name)
        fd.append('price', this.tempProduct.price)
        fd.append('sell', this.tempProduct.sell)
        fd.append('description', this.tempProduct.description)
        fd.append('ingredient', this.tempProduct.ingredient)
        fd.append('allergy', this.tempProduct.allergy)
        fd.append('period', this.tempProduct.period)
        fd.append('category', this.selected)
        fd.append('images', this.tempProduct.images)

        this.axios.post(process.env.VUE_APP_API + '/products/', fd)
          .then(res => {
            if (res.data.success) {
              res.data.result.src = process.env.VUE_APP_API + '/products/images/' + res.data.result.images
              this.show = false
              this.tempProduct.imageUrl = res.data.result.src
              this.products.push(this.tempProduct)
              this.tempProduct = {}
              this.selected = null
            } else {
              this.$swal({
                icon: 'error',
                title: '錯誤',
                text: res.data.message
              })
            }
          })
          .catch(err => {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: err.response.data.message
            })
          })
      }
    },
    edit () {
      this.tempProduct.category = this.selected
      this.axios.patch(process.env.VUE_APP_API + '/products/' + this.tempProduct._id, this.tempProduct)
        .then(res => {
          if (res.data.success) {
            const product = this.products.find((item) => {
              return item._id === this.tempProduct._id
            })
            product.description = this.tempProduct.description
            product.name = this.tempProduct.name
            product.price = this.tempProduct.price
            product.ingredient = this.tempProduct.ingredient
            product.allergy = this.tempProduct.allergy
            product.period = this.tempProduct.period
            product.category = this.selected
            this.$set(product, 'sell', this.tempProduct.sell)
            this.show = false
            console.log(product)
          } else {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: res.data.message
            })
          }
        })
        .catch(err => {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: err.response.data.message
          })
        })
    },
    closedelModel () {
      this.showConfirm = false
    },
    delConfirm () {
      this.axios.delete(process.env.VUE_APP_API + '/products/' + this.tempdelpro._id)
        .then(res => {
          if (res.data.success) {
            this.products.splice(this.tempIndex, 1)
            this.showConfirm = false
            this.tempdelpro = {}
            this.tempIndex = 0
          } else {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: res.data.message
            })
          }
        })
        .catch(err => {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: err.response.data.message
          })
        })
    },
    delProduct (product, index) {
      this.tempdelpro = product
      this.tempIndex = index
      this.showConfirm = true
    },
    showModel (iscreate, product) {
      if (iscreate) {
        this.tempProduct = {}
        this.show = true
        this.iscreate = true
      } else {
        this.tempProduct = Object.assign({}, product)
        this.selected = this.tempProduct.category
        this.iscreate = false
        this.show = true
      }
    },
    closeModel () {
      this.show = false
      this.tempProduct = {}
      this.selected = null
    }
  },
  computed: {
    filterproducts () {
      return this.products.filter((item) => {
        if (this.categorySelect === '所有類別' && this.sellSelect === '全部') {
          return item
        } else if (this.categorySelect === '所有類別' && this.sellSelect !== '全部') {
          return item.sell === this.sellSelect
        } else if (this.categorySelect !== '所有類別' && this.sellSelect === '全部') {
          return item.category === this.categorySelect
        } else {
          return item.category === this.categorySelect && item.sell === this.sellSelect
        }
      })
    }
  }
}
</script>
