<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-modal
      ref="modal"
      v-if="Object.keys(modalData).length > 0"
      :title="modalData.snippet.title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @cancel="handleCancel"
      footer=""
    >
      <iframe
        v-if="visible"
        width="100%"
        height="315"
        :src="`https://www.youtube.com/embed/${modalData.id.videoId}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </a-modal>
    <a-layout-header>
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1"> <h1 id="title">Vuetube</h1> </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0"> </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <a-form layout="inline" :form="form" @submit="handleSubmit">
          <a-form-item>
            <a-input
              v-decorator="[
                'search',
                {
                  rules: [{ required: true, message: 'this field is required' }]
                }
              ]"
              placeholder="search"
            />
          </a-form-item>
          <a-form-item label="number of results">
            <a-select
              v-decorator="[
                'results',

                {
                  initialValue: '8',
                  rules: [{ message: 'Please select your gender!' }]
                }
              ]"
              placeholder="Select a option and change input text above"
              style="width: 120px"
            >
              <a-select-option value="8">
                8
              </a-select-option>
              <a-select-option value="16">
                16
              </a-select-option>
              <a-select-option value="24">
                24
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">
              <a-icon type="search" />
            </a-button>
          </a-form-item>
        </a-form>

        <a-list
          id="list"
          v-if="videos.length > 0"
          item-layout="vertical"
          size="large"
          :pagination="pagination"
          :data-source="videos"
          :loading="loading"
        >
          <div slot="footer"><b>ant design vue</b> footer part</div>
          <a-list-item
            :loading="loading"
            slot="renderItem"
            key="item.title"
            slot-scope="item"
          >
            <a-skeleton :loading="loading" v-if="loading" />
            <template v-else>
              <img
                slot="extra"
                width="272"
                alt="logo"
                :src="item.snippet.thumbnails.medium.url"
                :loading="loading"
              />
              <a-list-item-meta
                :loading="loading"
                :description="item.snippet.description"
              >
                <a @click="showModal(item)" slot="title" :href="item.href">{{
                  item.snippet.title
                }}</a>
              </a-list-item-meta>
            </template>
          </a-list-item>
        </a-list>
      </div>
    </a-layout-content>

    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script>
import requestServices from "../services/requestServices";
export default {
  name: "Videos",
  props: {
    msg: String
  },
  data() {
    return {
      modalData: {},
      visible: false,
      confirmLoading: false,
      pagination: {
        pageSize: 4
      },
      loading: true,
      formLayout: "horizontal",
      videos: [],
      form: this.$form.createForm(this, { name: "coordinated" })
    };
  },
  created() {},
  methods: {
    async searchVideo(values) {
      this.loading = true;
      const { search, results } = values;
      this.videos = [];
      const data = await requestServices.getSearchVideos({ search, results });
      this.videos = data.items;
      if (this.videos.length > 0) {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.searchVideo(values);
        }
      });
    },
    showModal(item) {
      this.visible = true;
      this.modalData = item;
    },
    handleOk() {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel() {
      this.visible = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
#title {
  font-size: -webkit-xxx-large;
  color: white;
}
.ant-layout-header {
  height: 100px;
  padding: 0 50px;
  line-height: 64px;
  background: #001529;
}
.gutter >>> .ant-row > div {
  background: transparent;
  border: 0;
  margin-top: 50px;
}

#list {
  margin-top: 50px;
}
</style>
