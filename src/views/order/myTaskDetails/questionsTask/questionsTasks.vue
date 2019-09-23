<template>
  <div>
    <user-header :title="'提交问答任务截图'"></user-header>
    <div v-if="task">
      <div class="questionsTask-box">
        <div class="product-details">
          <div style="width: 30%">
            <img style="max-width: 100%,padding-right: 0.5rem " :src="task.goodspic" alt="产品主图" />
          </div>
          <p style="width: 70% ">{{task.goodsname}}</p>
        </div>

        <div class="taskList">
          <div v-if="task.questype===1">
            <p class="centerTitle">商家自己发布的问题列表</p>
            <p class="zhongs">（我选中的问题是）：{{task.check_question}}</p>
            <div style="width: 100%; word-break: keep-all; overflow: auto;marginLeft: 0.9rem">
              <p v-for="(item,ind) in task.quescontent" :key="ind">{{item}}</p>
            </div>
          </div>
          <div v-else>
            <p class="centerTitle">淘宝发布的问题</p>
            <p style="padding: 0.5rem 0; fontSize: 1rem">{{task.question_content}}</p>
          </div>
        </div>
        <p class="fontTu">一、商家给定的答案截图</p>
        <div style="background:#fff;padding:10px;">
          <img class="photos_a" :src="task.answer_pic_content" alt="答案截图" @click="showBig=true" />
        </div>
        <p class="fontTu">二、请按照商家给的答案回答提问并分享链接!</p>
        <group style="margin-top:0;">
          <x-input
            v-model.trim="question.answer_link"
            style="padding:5px"
            placeholder="在此输入对应淘宝问答链接"
          />
        </group>
        <group>
          <x-button class="btn-buy" type="primary" @click.native="applyQuestionOk">点击提交商家审核</x-button>
        </group>
      </div>
    </div>
    <x-dialog v-model.trim="showBig" class="dialog-demo">
      <div class="img-box">
        <img :src="task.answer_pic_content" alt="要求大图" style="max-width:100%" />
      </div>
      <div @click="showBig=false">
        <span class="vux-close">X</span>
      </div>
    </x-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      task: null,
      isShow: false,
      showBig: false,
      question: {
        order_id: "",
        answer_link: ""
      }
    };
  },
  mounted() {
    this.getQuestionTask();
  },
  methods: {
    async getQuestionTask() {
      const result = await this.axios.post("/api/task/askTaskTwo", {
        order_id: this.$route.params.id
      });
      this.task = result.data || {};
    },
    async applyQuestionOk() {
      if (!this.question.answer_link) {
        return this.$vux.toast.text("请输入淘宝问答链接");
      }
      const result = await this.axios.post("/api/task/sublink", {
        order_id: this.$route.params.id,
        answer_link: this.question.answer_link
      });
      this.$vux.toast.show({
        text: "提交成功",
        type: "success"
      });
      setTimeout(() => {
        this.$router.back();
      }, 1500);
    }
  }
};
</script>
<style>
@import "./questionsTask.css";
</style>
