export const getSidebarConfig = (currentPage) => {
  // 所有页面的侧边栏配置
  const sidebarConfigs = {
    // 背景概述
    "yq-Background.html": [
      { title: "背景", file: "1-C-composition_of_state_organs", active: true },
      { title: "时间轴", file: "1-A-timer_shaft" },
    ],
    // 政党选举及官员任免
    "yq-Vote and appoint and remove.html": [
      { title: "政党", file: "1-C-composition_of_state_organs", active: true },
      { title: "自治区委员会", file: "1-B-autonomous_region_committee" }
    ],
    // 国家机关组成
    "yq-Composition of state organs.html": [
      { title: "国家机关组成", file: "1-C-composition_of_state_organs", active: true },
      { title: "最高执行委员会", file: "1-C-supreme_executive_committee" },
      { title: "共和党全国委员会", file: "1-C-national_committee_of_republican_party" },
      { title: "行政院", file: "1-C-administration" },
      { title: "国议院", file: "1-C-national_affairs_council" },
      { title: "自治区委员会", file: "1-C-autonomous_region_committee" }
    ],
    // 最高领导机构
    "yq-The supreme leadership body.html": [
      { title: "最高执行委员会", file: "1-D-supreme_executive_committee", active: true },
      { title: "地方执行委员会", file: "1-D-local_executive_committee" },
      { title: "行政机构（政府）", file: "1-D-administrative_machinery" },
      { title: "自治区委员会", file: "1-D-autonomous_region_committee" }
    ],
  };

  // 获取当前页面的配置，如果没有则使用默认配置
  return sidebarConfigs[currentPage] || [
    { title: "默认项", file: "default-file" }
  ];
};