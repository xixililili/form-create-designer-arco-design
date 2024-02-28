<template>
  <div class="_fc_table_opt">
    <a-table :data="modelValue" border size="small" style="width: 100%">
      <template v-for="(col, idx) in column" :key="col.label + idx">
        <a-table-column :title="col.label">
          <template #cell="{ record: scope }">
            <a-input
              size="small"
              :modelValue="scope.row[col.key] || ''"
              @Update:modelValue="
                (n) => ((scope.row[col.key] = n), onInput(scope.row))
              "></a-input>
          </template>
        </a-table-column>
      </template>
      <a-table-column
        min-width="50"
        align="center"
        fixed="right"
        :label="t('tableOptions.handle')">
        <template #cell="{ record: scope }">
          <i class="fc-icon icon-delete" @click="del(scope.$index)"></i>
        </template>
      </a-table-column>
    </a-table>
    <a-button link type="primary" @click="add">
      <i class="fc-icon icon-add"></i> {{ t("tableOptions.add") }}
    </a-button>
  </div>
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
                    initial[v.key] = '';
                    return initial;
                }, {})
            );
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
