<template>
  <div v-if="$store.state.isOrderListShow">
    <order-item
      v-for="item in $store.state.personal.orderList"
      :key="item.add_time"
      :citem="item"
    ></order-item>
  </div>
</template>

<script>
import OrderItem from "@/components/comp-userorderItem";
export default {
  data() {
    return {
      page: 1,
      limit: 20,
      orderList: [],
    };
  },
  components: {
    OrderItem,
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getList();
    },
    getList() {
      let token = this.$store.state.token;
      axios({
        method: "GET",
        url: `http://47.115.51.185/api/order/list`,
        params: {
          page: this.page,
          limit: this.limit,
          type: 1,
        },
        headers: {
          "Authori-zation": "Bearer " + token,
        },
      }).then((data) => {
        if (data.data.status == 200) {
          let times = this.$store.state.detail.times;
          times++;
          this.$store.dispatch("detail/setTimesAsync", times);
          this.orderList = [...this.orderList, ...data.data.data];
          this.$store.dispatch("personal/setOrderListAsync", this.orderList);
        }
      });
    },
  },
  watch: {
    "$store.state.detail.page"() {
      if (this.$store.state.detail.page != 1) {
        this.page = this.$store.state.detail.page;
        this.$store.dispatch("detail/setGetPageAsync", false);
        this.getList();
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("detail/setTimesAsync", 0);
    this.$store.dispatch("setOrderListShowAsync", false);
    this.$store.dispatch("detail/setPageAsync", 1);
    this.$store.dispatch("detail/setGetPageAsync", true);
    next();
  },
};
</script>