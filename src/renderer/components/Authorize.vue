<template>
  <div id="authorize">
    <div>
      <el-header>
        <el-row>
          <el-col :span="24" class="close">
            <el-button type="text" icon="el-icon-close" @click="close" class="close-button"> </el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <div class="authorization-url">
          <p>{{ $t('authorize.manually_1') }}</p>
          <p>{{ $t('authorize.manually_2') }}</p>
          <p class="url">{{ $route.query.url }}</p>
        </div>
        <el-form
          ref="form"
          :model="authorizeForm"
          label-width="120px"
          label-position="top"
          class="authorize-form"
          v-on:submit.prevent="authorizeSubmit"
        >
          <p v-if="sns === 'misskey'">{{ $t('authorize.misskey_label') }}</p>
          <el-form-item :label="$t('authorize.code_label')" v-else>
            <el-input v-model="authorizeForm.code"></el-input>
          </el-form-item>
          <!-- Dummy form to guard submitting with enter -->
          <el-form-item class="hidden">
            <el-input></el-input>
          </el-form-item>
          <el-form-item class="submit">
            <el-button type="secondary" @click="authorizeSubmit" v-loading="submitting" element-loading-background="rgba(0, 0, 0, 0.8)">
              {{ $t('authorize.submit') }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'authorize',
  props: {
    url: {
      type: String,
      default: ''
    },
    sns: {
      type: String,
      default: 'mastodon'
    }
  },
  data() {
    return {
      authorizeForm: {
        code: null
      },
      submitting: false
    }
  },
  mounted() {
    console.log(this.url)
  },
  methods: {
    authorizeSubmit() {
      this.submitting = true
      this.$store
        .dispatch('Authorize/submit', {
          code: this.authorizeForm.code,
          sns: this.sns
        })
        .finally(() => {
          this.submitting = false
        })
        .then(id => {
          this.$router.push({ path: `/${id}/home` })
        })
        .catch(err => {
          if (err.name === 'DuplicateRecordError') {
            this.$message({
              message: this.$t('message.authorize_duplicate_error'),
              type: 'error'
            })
          } else {
            this.$message({
              message: this.$t('message.authorize_error'),
              type: 'error'
            })
          }
        })
    },
    close() {
      return this.$router.push({ path: '/', query: { redirect: 'home' } })
    }
  }
}
</script>

<style lang="scss" scoped>
#authorize /deep/ {
  background-color: #92c44e;
  color: #ffffff;
  text-align: center;
  min-height: 100%;

  .close {
    text-align: right;

    .close-button {
      font-size: 24px;
    }
  }

  .authorization-url {
    margin: 0 auto 64px;
    max-width: 80%;

    .url {
      font-weight: bold;
      color: #696969;
      word-wrap: break-word;
    }
  }

  .authorize-form {
    width: 500px;
    margin: 0 auto;
  }

  .el-form-item__label {
    color: #f0f3f9;
  }

  .el-input__inner {
    background-color: #373d48;
    color: #ffffff;
    border: 0;
  }

  .hidden {
    display: none;
  }
}
</style>
