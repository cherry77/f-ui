"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const vue = require("vue");
const withInstall = (main, extra) => {
  main.install = (app) => {
    for (const comp of [main, ...Object.values(extra != null ? extra : {})]) {
      app.component(comp.name, comp);
    }
  };
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      main[key] = comp;
    }
  }
  return main;
};
class DownUIError extends Error {
  constructor(m) {
    super(m);
    this.name = "DownUIError";
  }
}
function throwError(scope, m) {
  throw new DownUIError(`[${scope}] ${m}`);
}
const _sfc_main$6 = vue.defineComponent({
  name: "f-button",
  setup(props) {
    const content = vue.ref("message");
    return {
      content
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("button", null, "1111111111111" + vue.toDisplayString(_ctx.content), 1);
}
const Button = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
const FButton = withInstall(Button);
const menuProps = {
  mode: {
    type: String,
    default: "vertical"
  },
  defaultActive: {
    type: String,
    default: ""
  },
  defaultOpeneds: {
    type: Array,
    default: () => []
  },
  collapsed: {
    type: Boolean,
    default: void 0
  },
  collapsedWidth: {
    type: Number,
    default: 48
  },
  iconSize: {
    type: Number,
    default: 20
  },
  collapsedIconSize: {
    type: Number,
    default: 24
  },
  rootIndent: Number,
  indent: {
    type: Number,
    default: 32
  },
  labelField: {
    type: String,
    default: "label"
  },
  keyField: {
    type: String,
    default: "key"
  },
  childrenField: {
    type: String,
    default: "children"
  },
  defaultExpandAll: Boolean,
  disabled: Boolean
};
const prefixCls$2 = "d-menu";
const _sfc_main$5 = vue.defineComponent({
  name: "DMenu",
  props: menuProps,
  emits: ["on-select", "on-open-change"],
  setup(props, { emit }) {
    const instance = vue.getCurrentInstance();
    console.log("==========", instance);
    const activeName = vue.ref(props.defaultActive);
    const items = vue.ref({});
    const subMenus = vue.ref({});
    const openedMenus = vue.ref([]);
    const classes = vue.computed(() => {
      return [
        `${prefixCls$2}`,
        {
          [`${prefixCls$2}-${props.mode}`]: props.mode
        }
      ];
    });
    const initMenu = () => {
      const activeItem = activeName.value && items.value[activeName.value];
      if (!activeItem || props.collapsed)
        return;
      const namePath = activeItem.namePath;
      namePath.forEach((name) => {
        const subMenu = subMenus.value[name];
        subMenu && openMenu(name, subMenu.namePath);
      });
    };
    const openMenu = (name, namePath) => {
      if (openedMenus.value.includes(name))
        return;
      openedMenus.value.push(name);
      emit("on-open-change", name, namePath);
    };
    const closeMenu = (name, namePath) => {
      const i = openedMenus.value.indexOf(name);
      if (i !== -1) {
        openedMenus.value.splice(i, 1);
      }
      emit("on-open-change", name, namePath);
    };
    const handleMenuItemClick = (menuItem) => {
      const { name } = menuItem;
      if (name === void 0)
        return;
      activeName.value = name;
      emit("on-select", name);
    };
    const handleSubMenuClick = ({
      name,
      namePath
    }) => {
      const isOpened = openedMenus.value.includes(name);
      isOpened ? closeMenu(name, namePath) : openMenu(name, namePath);
    };
    vue.watch(
      () => props.defaultActive,
      (currentActive) => {
        updateActiveName(currentActive);
      }
    );
    {
      const addSubMenu = (item) => {
        subMenus.value[item.name] = item;
      };
      const removeSubMenu = (item) => {
        delete subMenus.value[item.name];
      };
      const addMenuItem = (item) => {
        items.value[item.name] = item;
      };
      const removeMenuItem = (item) => {
        delete items.value[item.name];
      };
      vue.provide(
        "rootMenu",
        vue.reactive({
          items,
          subMenus,
          activeName,
          props,
          openedMenus,
          openMenu,
          closeMenu,
          addMenuItem,
          removeMenuItem,
          addSubMenu,
          removeSubMenu,
          handleMenuItemClick,
          handleSubMenuClick
        })
      );
      vue.provide(
        `subMenu:${instance.uid}`,
        vue.reactive({
          addSubMenu,
          removeSubMenu
        })
      );
    }
    vue.onMounted(() => {
      initMenu();
    });
    return {
      classes,
      handleMenuItemClick
    };
  }
});
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("ul", {
    class: vue.normalizeClass(_ctx.classes)
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 2);
}
const Menu = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
const menuItemProps = {
  name: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
};
function useMenu(instance, currentName) {
  const namePath = vue.computed(() => {
    let parent = instance.parent;
    const path = [currentName.value];
    while (parent.type.name !== "DMenu") {
      if (parent.props.name)
        path.unshift(parent.props.name);
      parent = parent.parent;
    }
    return path;
  });
  const parentMenu = vue.computed(() => {
    let parent = instance.parent;
    while (parent && !["DMenu", "DSubMenu"].includes(parent.type.name)) {
      parent = parent.parent;
    }
    return parent;
  });
  const paddingStyle = vue.computed(() => {
    let parent = instance.parent;
    let padding = 20;
    while (parent && parent.type.name !== "DMenu") {
      if (parent.type.name === "DSubMenu") {
        padding += 20;
      }
      parent = parent.parent;
    }
    return { paddingLeft: `${padding}px` };
  });
  return {
    namePath,
    parentMenu,
    paddingStyle
  };
}
const prefixCls$1 = "d-menu";
const COMPONENT_NAME$1 = "DMenuItem";
const _sfc_main$4 = vue.defineComponent({
  name: COMPONENT_NAME$1,
  props: menuItemProps,
  setup(props, { emit }) {
    const instance = vue.getCurrentInstance();
    const rootMenu = vue.inject("rootMenu");
    if (!rootMenu)
      throwError(COMPONENT_NAME$1, "can not inject root menu");
    const { parentMenu, paddingStyle, namePath } = useMenu(
      instance,
      vue.toRef(props, "name")
    );
    const subMenu = vue.inject(`subMenu:${parentMenu.value.uid}`);
    if (!subMenu)
      throwError(COMPONENT_NAME$1, "can not inject sub menu");
    const item = vue.reactive({
      name: props.name,
      namePath,
      active: props.name === rootMenu.activeName
    });
    const classes = vue.computed(() => {
      return [
        `${prefixCls$1}-item`,
        {
          "is-active": props.name === rootMenu.activeName,
          "is-disabled": props.disabled
        }
      ];
    });
    const handleClick = () => {
      if (!props.disabled) {
        rootMenu.handleMenuItemClick({
          name: props.name,
          namePath: namePath.value
        });
        emit("click", item);
      }
    };
    vue.onMounted(() => {
      rootMenu.addMenuItem(item);
    });
    return {
      classes,
      handleClick,
      paddingStyle
    };
  }
});
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("li", {
    class: vue.normalizeClass(_ctx.classes),
    style: vue.normalizeStyle(_ctx.paddingStyle),
    onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => _ctx.handleClick && _ctx.handleClick(...args), ["stop"]))
  }, [
    vue.renderSlot(_ctx.$slots, "default"),
    vue.renderSlot(_ctx.$slots, "title")
  ], 6);
}
const MenuItem = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const _sfc_main$3 = vue.defineComponent({
  name: "CollapseTransition",
  props: {
    name: {
      type: String,
      require: true
    }
  },
  setup() {
    return {
      on: {
        beforeEnter(el) {
          if (!el.dataset)
            el.dataset = {};
          el.dataset.oldPaddingTop = el.style.paddingTop;
          el.dataset.oldPaddingBottom = el.style.paddingBottom;
          el.style.maxHeight = 0;
          el.style.paddingTop = 0;
          el.style.paddingBottom = 0;
        },
        enter(el) {
          el.dataset.oldOverflow = el.style.overflow;
          if (el.scrollHeight !== 0) {
            el.style.maxHeight = `${el.scrollHeight}px`;
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
          } else {
            el.style.maxHeight = 0;
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
          }
          el.style.overflow = "hidden";
        },
        afterEnter(el) {
          el.style.maxHeight = "";
          el.style.overflow = el.dataset.oldOverflow;
        },
        beforeLeave(el) {
          if (!el.dataset)
            el.dataset = {};
          el.dataset.oldPaddingTop = el.style.paddingTop;
          el.dataset.oldPaddingBottom = el.style.paddingBottom;
          el.dataset.oldOverflow = el.style.overflow;
          el.style.maxHeight = `${el.scrollHeight}px`;
          el.style.overflow = "hidden";
        },
        leave(el) {
          if (el.scrollHeight !== 0) {
            el.style.maxHeight = 0;
            el.style.paddingTop = 0;
            el.style.paddingBottom = 0;
          }
        },
        afterLeave(el) {
          el.style.maxHeight = "";
          el.style.overflow = el.dataset.oldOverflow;
          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
        }
      }
    };
  }
});
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock(vue.Transition, vue.mergeProps({ name: _ctx.name }, vue.toHandlers(_ctx.on)), {
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16, ["name"]);
}
const CollapseTransition = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const prefixCls = "d-sub-menu";
const COMPONENT_NAME = "DSubMenu";
const _sfc_main$2 = vue.defineComponent({
  name: COMPONENT_NAME,
  components: {
    CollapseTransition
  },
  props: {
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const instance = vue.getCurrentInstance();
    const { parentMenu, namePath, paddingStyle } = useMenu(
      instance,
      vue.toRef(props, "name")
    );
    const items = vue.ref({});
    const subMenus = vue.ref({});
    const rootMenu = vue.inject("rootMenu");
    if (!rootMenu)
      throwError(COMPONENT_NAME, "can not inject root menu");
    const subMenu = vue.inject(`subMenu:${parentMenu.value.uid}`);
    if (!subMenu)
      throwError(COMPONENT_NAME, "can not inject sub menu");
    const opened = vue.computed(() => rootMenu.openedMenus.includes(props.name));
    const active = vue.computed(() => {
      let isActive = false;
      Object.values(items.value).forEach((item2) => {
        if (item2.active) {
          isActive = true;
        }
      });
      Object.values(subMenus.value).forEach((subItem) => {
        if (subItem.active) {
          isActive = true;
        }
      });
      return isActive;
    });
    const item = vue.reactive({ name: props.name, namePath, active });
    const classes = vue.computed(() => {
      return [`${prefixCls}`];
    });
    const iconClass = vue.computed(() => {
      return ["d-icon-arrow-down", `${prefixCls}-icon`];
    });
    const handleClick = () => {
      rootMenu.handleSubMenuClick({
        name: props.name,
        namePath: namePath.value,
        active: false
      });
    };
    {
      const addSubMenu = (item2) => {
        subMenus.value[item2.name] = item2;
      };
      const removeSubMenu = (item2) => {
        delete subMenus.value[item2.name];
      };
      vue.provide(`subMenu:${instance.uid}`, {
        addSubMenu,
        removeSubMenu
      });
    }
    vue.onMounted(() => {
      rootMenu.addSubMenu(item);
      subMenu.addSubMenu(item);
    });
    return {
      handleClick,
      opened,
      classes,
      prefixCls,
      iconClass,
      paddingStyle
    };
  }
});
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CollapseTransition = vue.resolveComponent("CollapseTransition");
  return vue.openBlock(), vue.createElementBlock("li", {
    class: vue.normalizeClass(_ctx.classes)
  }, [
    vue.createElementVNode("div", {
      class: vue.normalizeClass([_ctx.prefixCls + "__title"]),
      style: vue.normalizeStyle(_ctx.paddingStyle),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "title")
    ], 6),
    vue.createVNode(_component_CollapseTransition, { name: "slide" }, {
      default: vue.withCtx(() => [
        vue.withDirectives(vue.createElementVNode("ul", {
          class: vue.normalizeClass([_ctx.prefixCls])
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 2), [
          [vue.vShow, _ctx.opened]
        ])
      ]),
      _: 3
    })
  ], 2);
}
const SubMenu = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const _sfc_main$1 = vue.defineComponent({
  name: "DRecursiveMenu",
  components: {
    MenuItem,
    SubMenu
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const name = vue.computed(() => {
      return props.item.name;
    });
    return {
      name
    };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MenuItem = vue.resolveComponent("MenuItem");
  const _component_DRecursiveMenu = vue.resolveComponent("DRecursiveMenu");
  const _component_SubMenu = vue.resolveComponent("SubMenu");
  return !_ctx.item.children ? (vue.openBlock(), vue.createBlock(_component_MenuItem, {
    key: _ctx.item.name,
    name: _ctx.name
  }, {
    default: vue.withCtx(() => [
      vue.createTextVNode(vue.toDisplayString(_ctx.item.name), 1)
    ]),
    _: 1
  }, 8, ["name"])) : (vue.openBlock(), vue.createBlock(_component_SubMenu, {
    key: 1,
    name: _ctx.name
  }, {
    title: vue.withCtx(() => [
      vue.createTextVNode(vue.toDisplayString(_ctx.item.name), 1)
    ]),
    default: vue.withCtx(() => [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.item.children, (child) => {
        return vue.openBlock(), vue.createBlock(_component_DRecursiveMenu, {
          key: child.name,
          item: child
        }, null, 8, ["item"]);
      }), 128))
    ]),
    _: 1
  }, 8, ["name"]));
}
const RecursiveMenu = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = vue.defineComponent({
  name: "DSimpleMenu",
  components: {
    Menu,
    RecursiveMenu
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_RecursiveMenu = vue.resolveComponent("RecursiveMenu");
  const _component_Menu = vue.resolveComponent("Menu");
  return vue.openBlock(), vue.createBlock(_component_Menu, null, {
    default: vue.withCtx(() => [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.items, (item) => {
        return vue.openBlock(), vue.createBlock(_component_RecursiveMenu, {
          key: item.name,
          item
        }, null, 8, ["item"]);
      }), 128))
    ]),
    _: 1
  });
}
const SimpleMenu = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const DMenu = withInstall(Menu, {
  MenuItem,
  SubMenu,
  RecursiveMenu
});
const DMenuItem = withInstall(MenuItem);
const DSubMenu = withInstall(SubMenu);
const DSimpleMenu = withInstall(SimpleMenu);
exports.DMenu = DMenu;
exports.DMenuItem = DMenuItem;
exports.DSimpleMenu = DSimpleMenu;
exports.DSubMenu = DSubMenu;
exports.FButton = FButton;
