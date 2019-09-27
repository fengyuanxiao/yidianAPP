<template>
  <div>
    <user-header :title="'我的问答任务详情'"></user-header>
    <div v-if="task">
      <div class="questionsTask-box">
        <h2>注意：此类任务需要商家审核，如商家审核未通过做了该任务没有佣金</h2>
        <div class="product-details">
          <div style="width: 30%">
            <img style="max-width: '100%',padding-right: '0.5rem' " :src="task.goodspic" alt="产品主图" />
          </div>
          <p style="width: '70%' ">{{task.goodsname}}</p>
        </div>
        <p class="lookShili" @click="isShow=true">查看示例图>></p>
        <div class="taskList">
          <div>
            <p class="centerTitle">商家需要回答的问题列表：(请选择互动消息中收到的问答)</p>
            <group title="注：如有问题文字过长请左右拖动查看">
              <checklist
                :options="task.quescontent"
                v-model.trim="question.check_question"
                :max="1"
              ></checklist>
            </group>
          </div>
          <div>
            <!-- <p class="centerTitle"></p> -->
            <group title="淘宝互动消息中收到对应商品的问答：">
              <x-input
                style="font-size:0.875rem;"
                title
                v-model.trim="question.question_content"
                placeholder="请手动输入收到的问答"
              />
            </group>
          </div>
        </div>
        <p class="fontTu">请在淘宝互动消息中查找收到的该商品的问答并截图上传!</p>
        <div class="upic">
          <div class="uadd">+</div>
          <img
            v-if="question.question_pic_content.length"
            :src="question.question_pic_content[0]"
            alt
          />
          <!-- 图片 -->
          <input
            @change="uploadPhoto($event,0)"
            ref="tu1"
            type="file"
            class="ufile"
            accept="image/*"
          />
        </div>
      </div>
      <group style="margin: 0 10px 20px;">
        <x-button @click.native="applyQuestion" class="btn-buy" type="primary">点击提交商家审核</x-button>
      </group>
    </div>

    <!-- <Modal
          title="示例图"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText={"知道了"}
          cancelText={"关闭"}
        >
          <img class="shilitu" src={require("../../../img/wenda.png")} alt="问答任务示例图" />
    </Modal>-->
    <x-dialog v-model.trim="isShow" class="demoDialog">
      <div class="img-box">
        <img class="shilitu" src="@/assets/img/wenda.png" alt="问答任务示例图" />
      </div>
      <div @click="isShow=false">
        <span class="vux-close">X</span>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import { Checklist } from "vux";

export default {
  components: {
    Checklist
  },
  data() {
    return {
      task: null,
      isShow: false,
      question: {
        task_id: "",
        check_question: [],
        question_content: "",
        question_pic_content: []
      }
    };
  },
  mounted() {
    this.getQuestionTask();
  },
  methods: {
    async getQuestionTask() {
      const result = await this.axios.post("/api/task/asktaskOne", {
        task_id: this.$route.params.id
      });
      this.task = result.data || {};
    },
    async uploadPhoto(e, ind) {
      const url = await this.$utils.tools.base64Img(e);
      if (url === "big") {
        this.$vux.toast.text("图片不能超过10M");
      } else {
        this.$set(this.question, "question_pic_content", [url]);
      }
      // console.log(this.images);
    },
    async applyQuestion() {
      if (!this.question.check_question.length) {
        return this.$vux.toast.text("请选择自己收到的问题");
      }
      if (!this.question.question_content) {
        return this.$vux.toast.text("请输入提交的问题");
      }
      if (!this.question.question_pic_content.length) {
        return this.$vux.toast.text("请上传收到的问题截图");
      }
      const result = await this.axios.post("/api/task/addOrder", {
        task_id: this.$route.params.id,
        check_question: this.question.check_question.join(","),
        question_content: this.question.question_content,
        question_pic_content: this.question.question_pic_content
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
