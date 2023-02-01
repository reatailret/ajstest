angular.module("app").factory("Tags", function () {
  const els = makeDefaulData();
  return {
    items: [...els],
    current: els.length ? els[0] : null,
    setCurrent: function (el) {
      this.current = el;
      console.log("SC");
    },
    create: function (title) {
      this.items.push({
        id: makeDataId(),
        title,
        tags: [],
        date: new Date().toISOString(),
      });
    },
  };
});
