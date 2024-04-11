<template>
  <a-card class="_fc_table_opt">
    <a-table :data="modelValue" size="small" style="width: 100%">
      <template #columns>
        <a-table-column
          :title="col.label"
          :data-index="col.key"
          v-for="(col, idx) in column"
          :key="col.label + idx">
          <template #cell="{ record }">
            <a-input
              size="small"
              v-model="record[col.key]"
              @update:model-value="
                (n) => ((record[col.key] = n), onInput(record))
              " />
          </template>
        </a-table-column>
        <a-table-column
          :width="50"
          align="center"
          fixed="right"
          :title="t('tableOptions.handle')">
          <template #cell="{ rowIndex }">
            <i class="fc-icon icon-delete" @click="del(rowIndex)"></i>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <a-space fill>
      <a-button link type="primary" @click="add">
        <i class="fc-icon icon-add"></i> {{ t("tableOptions.add") }}
      </a-button>
    </a-space>
  </a-card>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'TableOptions',
    inheritAttrs: false,
    props: {
        modelValue: [Object, Array, String],
    },
    inject: ['designer'],
    data() {
        return {
            column: [
                {label: 'label', key: 'label'},
                {label: 'value', key: 'value'},
            ],
            t: this.designer.setupState.t,
        };
    },
    created() {
        if (!Array.isArray(this.modelValue)) {
            this.$emit('input', []);
        }
    },
    methods: {
        onInput(item) {
            if (item.label !== undefined && item.value !== undefined) {
                this.input();
            }
        },
        input() {
            this.$emit('update:modelValue', this.modelValue);
        },
        add() {
            this.modelValue.push(
                this.column.reduce((initial, v) => {
                    initial[v.key] = `选项${this.modelValue.length+1}`;
                    return initial;
                }, {})
            );
            this.input();
        },
        del(idx) {
            this.modelValue.splice(idx, 1);
            this.input(this.modelValue);
        },
    },
});
</script>

<style scoped>
._fc_table_opt {
  width: 100%;
}
</style>
