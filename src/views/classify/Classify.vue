<template>
  <div class="classify">
    <classify-search v-if="$store.state.isClassifyShow"></classify-search>
    <classify-list v-if="$store.state.isClassifyShow"></classify-list>
    <span class="loading" v-if="!$store.state.isClassifyShow"></span>
  </div>
</template>

<script>
import { get } from "@/utils/http";
import { mapState } from "vuex";
import ClassifySearch from "@/components/comp-classifysearch.vue";
import ClassifyList from "@/components/comp-classifylist.vue";

export default {
  components: {
    ClassifySearch,
    ClassifyList,
  },
  computed: {
    ...mapState(["classify"]),
  },
  methods: {
    init() {
      let getData = (res) => {
        return new Promise((resolve, reject) => {
          if (res) {
            resolve(res);
          }
        });
      };
      get("http://47.115.51.185/api/category")
        .then((response) => {
          let res = response.data;
          if (res.status == 200) {
            let data = res.data;
            this.$store.dispatch("setClassifyShowAsync", true);
            return getData(data);
          }
        })
        .then((data) => {
          let arr = [];
          data.forEach((item) => {
            let obj = {};
            obj.id = item.id;
            obj.name = item.cate_name;
            obj.children = item.children;
            obj.src = item.pic;
            arr.push(obj);
          });
          this.$store.dispatch("classify/setAsideAsync", arr);
          return getData(data);
        })
    },
  },
  created() {
    this.init();
  },
  beforeRouteEnter(to, from, next) {
    document.title = to.meta.title;
    next();
  },
}
</script>

<style lang="less">
@import "../../assets/less/variable.less";
.classify {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 60px;
  box-sizing: border-box;
  & > div:nth-child(1) {
    padding: 0 @padding3;
  }
  & > div:nth-child(2) {  
    flex: 1;
  }

  .loading{
    display: block;
    width: 120px;
    height: 120px;
    background: url(../../assets/loader.gif) no-repeat 0 0/cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

