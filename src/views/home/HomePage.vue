<template>
  <PageWrapper>
    <div class="menu-bar">
      <a-menu class="page-menu" mode="horizontal" :selectedKeys="[activeMenu]" @click="handleMenuClick">
        <a-menu-item v-for="item in menuItems" :key="item.key">
          {{ item.label }}
        </a-menu-item>
      </a-menu>
      <a-button class="refresh-button" @click="refreshCurrentPage">
        <template #icon><ReloadOutlined /></template>
        刷新当前页面
      </a-button>
    </div>

    <component :is="activeComponent" :key="`${selectedMenu}-${refreshKey}`" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { ReloadOutlined } from '@ant-design/icons-vue';
  import { computed, ref } from 'vue';
  import DataSynthMonitor from '/@/views/demo/sys/finDataSynthSecurity/DataSynthMonitor.vue';
  import DataSynthTask from '/@/views/demo/sys/finDataSynthSecurity/DataSynthTask.vue';
  import BlockChainMonitor from '/@/views/demo/sys/finDataSynthSecurity/BlockChainMonitor.vue';
  import EvidencePreserve from '/@/views/demo/sys/finDataSynthSecurity/EvidencePreserve.vue';

  type MenuKey = 'dataSynthMonitor' | 'dataSynthTask' | 'blockChainMonitor' | 'evidencePreserve';

  const selectedMenu = ref<MenuKey>('dataSynthMonitor');
  const refreshKey = ref(0);

  const menuItems: Array<{ key: MenuKey; label: string }> = [
    { key: 'dataSynthMonitor', label: '数据合成监控' },
    { key: 'dataSynthTask', label: '数据合成任务' },
    { key: 'blockChainMonitor', label: '区块链监控' },
    { key: 'evidencePreserve', label: '存证溯源' },
  ];

  const componentMap = {
    dataSynthMonitor: DataSynthMonitor,
    dataSynthTask: DataSynthTask,
    blockChainMonitor: BlockChainMonitor,
    evidencePreserve: EvidencePreserve,
  };

  const activeMenu = computed(() => selectedMenu.value);
  const activeComponent = computed(() => componentMap[selectedMenu.value]);

  const handleMenuClick = ({ key }: { key: string | number }) => {
    const menuKey = String(key);
    if (menuKey in componentMap) selectedMenu.value = menuKey as MenuKey;
  };

  const refreshCurrentPage = () => {
    refreshKey.value += 1;
  };
</script>

<style lang="scss" scoped>
  .menu-bar {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    background: #fff;
  }

  .page-menu {
    flex: 1;
  }

  .refresh-button {
    margin: 0 16px;
  }
</style>
