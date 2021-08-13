import axios from "axios";

class AddComplex {
  constructor() {
    $(".jsAddComplexDayTime").on("click", this.changeDayTime.bind(this));
    $(".jsAddComplexForm").on("submit", function(e) {
      e.preventDefault();
    });
    $(".jsAddComplexName").on("keyup", this.nameEnterEvent.bind(this));
    $(".jsAddComplexQty").on("keyup", this.qtyEnterEvent.bind(this));
    $("body").on("click", ".add-order__filter-name-item", this.complexClickEvent.bind(this));
    $(".jsAddComplexSubmit").on("click", this.submitClickEvent.bind(this));
    $("body").on("input qty-changed", ".jsAddComplexItemQty", this.complexItemQty.bind(this));
    $(".jsAddComplexCloseCheckpoint").on("click", this.closeCheckpoint.bind(this));
    $(".jsAddComplexCheckpoint").on("click", this.openCheckpoint.bind(this));
    $(".jsAddComplexClearCheckpoint").on("click", this.clearCheckpoint.bind(this));
    $(".jsAddComplexSendCheckpoint").on("click", this.sendCheckpoint.bind(this));
  }
  changeDayTime(e) {
    e.preventDefault();
    var id = $(e.currentTarget).attr("href");
    $(e.currentTarget)
      .addClass("--active")
      .siblings()
      .removeClass("--active");
    $(id)
      .show()
      .siblings()
      .hide();
  }
  nameEnterEvent() {
    var name = $(".jsAddComplexName").val();
    $(".jsAddComplexName")
      .parent()
      .removeClass("--filled");
    this.checkIfFilled();
    axios.get($(".jsAddComplexForm").attr("data-name") + "?q=" + name).then(function(response) {
      var complexes = response.data.complexes;
      var complexesHtml = "";
      $(".jsAddComplexDropdown").html("");
      if (complexes.length) {
        complexes.forEach((element) => {
          complexesHtml += `<a href="#" class="add-order__filter-name-item" data-id="${element.id}">${element.name}</a>`;
        });
        $(".jsAddComplexDropdown")
          .append(complexesHtml)
          .show();
      } else {
        $(".jsAddComplexDropdown")
          .append('<div class="add-order__filter-name-empty">Не найдено</div>')
          .show();
      }
    });
  }
  complexClickEvent(e) {
    e.preventDefault();
    var id = $(e.currentTarget).attr("data-id");
    var name = $(e.currentTarget).text();
    $(".jsAddComplexID").val(id);
    $(".jsAddComplexName").val(name);
    $(".jsAddComplexDropdown").hide();
    $(".jsAddComplexName")
      .parent()
      .addClass("--filled");
    this.checkIfFilled();
  }
  qtyEnterEvent() {
    var qty = $(".jsAddComplexQty").val();
    if (parseInt(qty, 10) > 0) {
      $(".add-order__filter-fieldset.--qty ").addClass("--filled");
    } else {
      $(".add-order__filter-fieldset.--qty ").removeClass("--filled");
    }
    this.checkIfFilled();
  }
  checkIfFilled() {
    if ($(".add-order__filter-fieldset.--name").hasClass("--filled") && $(".add-order__filter-fieldset.--qty").hasClass("--filled")) {
      $(".jsAddComplexSubmit").removeAttr("disabled");
    } else {
      $(".jsAddComplexSubmit").attr("disabled", "disabled");
    }
  }
  submitClickEvent(e) {
    e.preventDefault();
    var request = {
      id: $(".jsAddComplexID").val(),
      qty: $(".jsAddComplexQty").val(),
    };
    axios.get($(".jsAddComplexForm").attr("data-add") + `?id=${request.id}&qty=${request.qty}`).then(function(response) {
      $(".dishes__table-name.--active").removeClass("--active");
      $(".dishes__table-full").hide();
      $(".add-order__filter-fieldset.--filled").removeClass("--filled");
      $(".jsAddComplexName").val("");
      $(".jsAddComplexQty").val("");

      var complexFull = response.data.complexFull;
      $(`.complex__items-wrapper [data-id="${complexFull.id}"]`)
        .addClass("--active")
        .find(".complex__item-qty-input")
        .val(complexFull.qty);

      var id = $(`.complex__items-wrapper [data-id="${complexFull.id}"]`)
        .closest(".complex__items")
        .attr("id");
      $(`.complex__tab-item[href="#${id}"]`).trigger("click");
    });
  }
  complexItemQty(e) {
    var id = $(e.currentTarget).attr("data-id");
    var qty = $(e.currentTarget).val() || $(e.currentTarget).text();
    qty = parseInt(qty, 10);
    if (qty > 0) {
      $(e.currentTarget)
        .closest(".complex__item")
        .addClass("--active");
    } else {
      $(e.currentTarget)
        .closest(".complex__item")
        .removeClass("--active");
    }
    console.log("Отправка изменений в количестве", { id, qty });
  }
  closeCheckpoint(e) {
    e.preventDefault();
    $(".add-order-checkpoint").fadeOut();
  }
  openCheckpoint(e) {
    e.preventDefault();
    var resultArr = [];

    // Собираем существующие элементы в массив
    $(".complex__items").each(function(ind, el) {
      resultArr.push([]);
      $(el)
        .find(".complex__item")
        .each(function(itemInd, itemEl) {
          if (
            $(itemEl)
              .find(".complex__item-qty-input")
              .val() > 0
          ) {
            resultArr[ind].push({
              id: $(itemEl).attr("data-id"),
              title: $(itemEl)
                .find(".complex__item-title")
                .text(),
              qty: $(itemEl)
                .find(".complex__item-qty-input")
                .val(),
              text: $(itemEl)
                .find(".complex__item-content")
                .html(),
            });
          }
        });
    });

    // Создаем из массива элементы в чекпоинте
    resultArr.forEach((el, ind) => {
      var itemsHtml = "";
      var $dayTime = $(".add-order-checkpoint__daytime").eq(ind);

      $dayTime.show();
      if (!el.length) {
        $dayTime.hide();
        return;
      }

      el.forEach((itemEl, itemInd) => {
        itemsHtml += `<div class="add-order-checkpoint__item" data-id="${itemEl.id}">
          <div class="add-order-checkpoint__item-cont">
            <div class="add-order-checkpoint__item-title">${itemEl.title}</div>
            <div class="add-order-checkpoint__item-text">${itemEl.text}</div>
          </div>
          <div class="add-order-checkpoint__item-qty">
            <a href="#" class="add-order-checkpoint__item-qty-btn" data-qty-minus>
              <img src="assets/dist/images/minus.svg" />
            </a>
            <div class="add-order-checkpoint__item-qty-val jsAddComplexItemQty" data-qty-val  data-id="${itemEl.id}">${itemEl.qty}</div>
            <a href="#" class="add-order-checkpoint__item-qty-btn" data-qty-plus>
              <img src="assets/dist/images/plus.svg" />
            </a>
          </div>
        </div>`;
      });
      $dayTime.find(".add-order-checkpoint__items").html(itemsHtml);
    });

    $(".add-order-checkpoint").fadeIn();
  }
  clearCheckpoint(e) {
    e.preventDefault();
    $(".complex__item-qty-input").val(0);
    $(".add-order-checkpoint").fadeOut();
    $(".complex__item.--active").removeClass("--active");
    console.log("Событие сброса");
  }
  sendCheckpoint(e) {
    e.preventDefault();
    console.log("Событие подтверждения");
    $(".add-order-checkpoint").fadeOut();
    $(".add-order-added").fadeIn();
  }
}

export default AddComplex;