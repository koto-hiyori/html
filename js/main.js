new Vue({
  el: "#app",
  data: {
    items: [], // 配列items
  },
  // 外部ファイルはmountedメソッドで開く定義を行う
  // created と mountedどちらでもよい
  created() {
    fetch("data.json")
      .then((response) => response.json()) // 取得したデータをJSONとして変換

      .then((data) => {
        this.items = data.itemList; // 右辺がjsonのデータ、JSON内のitemをVueのデータを代入
      })
      .catch((error) => {
        // 読み込み失敗時のエラー処理
        console.error(error);
      });
  },
});

$(document).ready(function () {
  // Smooth Scrolling
  $("a.nav-link").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - 80,
        },
        800,
      );
    }
  });
  $(".top-slide").slick({
    dots: true,
    arrow: true,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "15%",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
        },
      },
    ],
  });

  // ここから「https://artsbe.jp/blog/scroll-add-class/」のコードを参照
  const target = document.querySelectorAll(".js-target");

  //オプション設定
  const options = {
    root: null,
    rootMargin: "-20% 0px",
    threshold: 0,
  };

  //Intersection Observerの呼び出し
  const observer = new IntersectionObserver(callback, options);
  target.forEach((tgt) => {
    observer.observe(tgt);
  });

  //要素が交差したときの指示
  function callback(entries) {
    entries.forEach((entry) => {
      const target = entry.target;
      if (entry.isIntersecting) {
        target.classList.add("is-active");
      }
    });
  }
});
