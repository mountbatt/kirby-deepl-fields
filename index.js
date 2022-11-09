(function() {
  "use strict";
  const DeeplField_vue_vue_type_style_index_0_lang = "";
  function normalizeComponent(scriptExports, render, staticRenderFns, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
    var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
    if (render) {
      options.render = render;
      options.staticRenderFns = staticRenderFns;
      options._compiled = true;
    }
    if (functionalTemplate) {
      options.functional = true;
    }
    if (scopeId) {
      options._scopeId = "data-v-" + scopeId;
    }
    var hook;
    if (moduleIdentifier) {
      hook = function(context) {
        context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
        if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
          context = __VUE_SSR_CONTEXT__;
        }
        if (injectStyles) {
          injectStyles.call(this, context);
        }
        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      };
      options._ssrRegister = hook;
    } else if (injectStyles) {
      hook = shadowMode ? function() {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        );
      } : injectStyles;
    }
    if (hook) {
      if (options.functional) {
        options._injectStyles = hook;
        var originalRender = options.render;
        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
    return {
      exports: scriptExports,
      options
    };
  }
  const _sfc_main = {
    props: {
      field_name: {
        type: String,
        required: true
      },
      page_id: {
        type: String,
        required: true
      },
      csrf: {
        type: String,
        required: true
      },
      api_key: {
        type: String,
        required: true
      },
      api_url: {
        type: String,
        required: true
      },
      label: String,
      required: Boolean,
      disabled: Boolean,
      inputtype: String,
      size: String,
      value: String,
      selected: String,
      default: {
        type: Object,
        default() {
          return {
            name: ""
          };
        }
      }
    },
    data() {
      const panel2 = document.querySelector(".k-panel");
      const current_language = panel2.dataset.language;
      const base_language = panel2.dataset.translation;
      return {
        error: null,
        button: {
          base_language,
          current_language,
          text: base_language + " \u2192 " + current_language
        }
      };
    },
    computed: {},
    methods: {
      importOriginalValue() {
        const csrf = this.csrf;
        fetch("../api/pages/" + this.page_id, {
          method: "GET",
          headers: {
            "X-CSRF": csrf
          }
        }).then((response) => response.json()).then((response) => {
          const page = response.data;
          this.$emit("input", page.content[this.field_name]);
        }).catch((error) => {
        });
      },
      async doTranslation(evt, value) {
        const panel2 = document.querySelector(".k-panel");
        const current_language = panel2.dataset.language;
        const base_language = panel2.dataset.translation;
        if (!evt) {
          alert("Error \u2026 No event");
          return;
        }
        try {
          const response = await fetch(
            this.api_url + "?auth_key=" + this.api_key + "&preserve_formatting=1split_sentences=1&text=" + encodeURIComponent(this.value) + "&target_lang=" + current_language + "&source_lang=" + base_language
          );
          const data = await response.json();
          console.log(data);
          this.error = null;
          this.value = data.translations[0].text;
          this.$emit("input", data.translations[0].text);
          if (data.translations[0].text) {
          } else {
            this.error = data.message;
            console.log(data.message);
          }
        } catch (err) {
        }
      },
      setValue(value) {
        this.error = null;
        this.$emit("input", value);
      }
    }
  };
  var _sfc_render = function render() {
    var _vm = this, _c = _vm._self._c;
    return _c("k-field", { staticClass: "k-deepl-field", attrs: { "required": _vm.required, "disabled": _vm.disabled, "label": _vm.label } }, [_c("k-input", { staticClass: "k-deepl-input", attrs: { "size": _vm.size, "theme": "field", "type": _vm.inputtype, "value": _vm.value }, on: { "input": function($event) {
      return _vm.setValue($event, "value");
    } } }), _c("k-button", { directives: [{ name: "show", rawName: "v-show", value: _vm.button.current_language != _vm.button.base_language, expression: "button.current_language != button.base_language" }], staticClass: "k-field-help deepl-button", attrs: { "icon": "import", "tooltip": _vm.$t("mountbatt.deepl.importhelp") }, on: { "click": _vm.importOriginalValue } }, [_vm._v(_vm._s(_vm.$t("mountbatt.deepl.import")) + " \xBB" + _vm._s(_vm.button.base_language.toUpperCase()) + "\xAB")]), _c("k-button", { directives: [{ name: "show", rawName: "v-show", value: _vm.button.current_language != _vm.button.base_language, expression: "button.current_language != button.base_language" }], staticClass: "k-field-help deepl-button", attrs: { "icon": "refresh", "tooltip": _vm.$t("mountbatt.deepl.translatenow") }, on: { "click": _vm.doTranslation } }, [_vm._v(_vm._s(_vm.button.text.toUpperCase()))])], 1);
  };
  var _sfc_staticRenderFns = [];
  _sfc_render._withStripped = true;
  var __component__ = /* @__PURE__ */ normalizeComponent(
    _sfc_main,
    _sfc_render,
    _sfc_staticRenderFns,
    false,
    null,
    null,
    null,
    null
  );
  __component__.options.__file = "/Users/tobiasbattenberg/Documents/GitHub/kirby-deepl-fields/src/components/DeeplField.vue";
  const DeeplField = __component__.exports;
  panel.plugin("mountbatt/deepl", {
    fields: {
      deepl: DeeplField
    }
  });
})();
