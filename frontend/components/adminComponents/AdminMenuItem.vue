<template>
  <li :style="`padding-left: ${itemPadLeft + 20}px`">
    <div class="listMainItem">
      <div class="menuHider" @click="$emit('click', element)">
        <span v-if="element.children && element.children.length>0">
          <i :class="'fa'+ (element.hide ? ' fa-chevron-right': ' fa-chevron-down') " />
        </span>
      </div>
      <el-checkbox
        v-model="element.selected"
        @change="$emit('change', element)"
      >
        {{ index+1 }}. {{ element.label }}
      </el-checkbox>
    </div>
    <div v-if="element.children && element.children.length>0">
      <template v-for="(item, index2) in element.children">
        <admin-menu-item
          v-if="!element.hide"
          :itemPadLeft="itemPadLeft + 1"
          :element="item"
          :index="index2"
          :key="item.id"
          @click="$emit('click', $event)"
          @change="$emit('change', $event)"
        />
      </template>
    </div>
  </li>
</template>
<script>
export default {
  name: 'AdminMenuItem',
  props: {
    itemPadLeft: { type: Number, default: 0 },
    element: { type: Object, default: () => { return null } },
    index: { type: Number, default: 0 }
  }
}
</script>
