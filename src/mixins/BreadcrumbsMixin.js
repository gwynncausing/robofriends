export default {
  data: function () {
    return {
      route: [],
    };
  },
  watch: {
    $route: {
      handler() {
        var a = this.$route.matched;
        this.route = [];
        console.log("route: ", this.$route);
        for (var i = 0; i < a.length; i++) {
          var object = {
            text: a[i].meta.name,
            href: a[i].components.default.name,
            disabled: false,
          };
          if (i == a.length - 1) object.disabled = true;
          if (a[i].meta.name != undefined) this.route.push(object);
        }
      },
      immediate: true,
    },
  },
};
