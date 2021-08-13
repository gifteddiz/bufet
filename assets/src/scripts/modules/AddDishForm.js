import axios from "axios";

class AddDishForm {
  constructor() {
    $(".jsAddDishForm").on("submit", function(e) {
      e.preventDefault();
    });
    $(".jsAddDishName").on("keyup", this.nameEnterEvent.bind(this));
    $(".jsAddDishQty").on("keyup", this.qtyEnterEvent.bind(this));
    $("body").on("click", ".add-order__filter-name-item", this.dishClickEvent.bind(this));
    $(".jsAddDishSubmit").on("click", this.submitClickEvent.bind(this));
    $("body").on("click", ".dishes__table-remove", this.removeDish.bind(this));
    $(".jsAddDishRemoveAll").on("click", this.removeAll.bind(this));
    $("body").on("qty-changed", ".dishes__table-qty-val", this.dishQtyChanged.bind(this));
    $(".jsAddDishSend").on("click", this.send.bind(this));
    $("body").on("click", ".jsAddDishCloseOrderAdded", this.closeOrderAdded.bind(this));
  }
  nameEnterEvent() {
    var name = $(".jsAddDishName").val();
    $(".jsAddDishName")
      .parent()
      .removeClass("--filled");
    this.checkIfFilled();
    axios.get($(".jsAddDishForm").attr("data-name") + "?q=" + name).then(function(response) {
      var dishes = response.data.dishes;
      var dishesHtml = "";
      $(".jsAddDishDropdown").html("");
      if (dishes.length) {
        dishes.forEach((element) => {
          dishesHtml += `<a href="#" class="add-order__filter-name-item" data-id="${element.id}">${element.name}</a>`;
        });
        $(".jsAddDishDropdown")
          .append(dishesHtml)
          .show();
      } else {
        $(".jsAddDishDropdown")
          .append('<div class="add-order__filter-name-empty">Не найдено</div>')
          .show();
      }
    });
  }
  dishClickEvent(e) {
    e.preventDefault();
    var id = $(e.currentTarget).attr("data-id");
    var name = $(e.currentTarget).text();
    $(".jsAddDishID").val(id);
    $(".jsAddDishName").val(name);
    $(".jsAddDishDropdown").hide();
    $(".jsAddDishName")
      .parent()
      .addClass("--filled");
    this.checkIfFilled();
  }
  qtyEnterEvent() {
    var qty = $(".jsAddDishQty").val();
    if (parseInt(qty, 10) > 0) {
      $(".add-order__filter-fieldset.--qty ").addClass("--filled");
    } else {
      $(".add-order__filter-fieldset.--qty ").removeClass("--filled");
    }
    this.checkIfFilled();
  }
  checkIfFilled() {
    if ($(".add-order__filter-fieldset.--name").hasClass("--filled") && $(".add-order__filter-fieldset.--qty").hasClass("--filled")) {
      $(".jsAddDishSubmit").removeAttr("disabled");
    } else {
      $(".jsAddDishSubmit").attr("disabled", "disabled");
    }
  }
  submitClickEvent(e) {
    e.preventDefault();
    var request = {
      id: $(".jsAddDishID").val(),
      qty: $(".jsAddDishQty").val(),
    };
    axios.get($(".jsAddDishForm").attr("data-add") + `?id=${request.id}&qty=${request.qty}`).then(function(response) {
      $(".dishes__table-name.--active").removeClass("--active");
      $(".dishes__table-full").hide();
      $(".add-order__filter-fieldset.--filled").removeClass("--filled");
      $(".jsAddDishName").val("");
      $(".jsAddDishQty").val("");

      var dishFull = response.data.dishFull;
      var itemHtml = `<div class="dishes__table-row" data-id="${dishFull.id}">
        <div class="dishes__table-cell">
          <a href="#" class="dishes__table-name --active">${dishFull.name}</a>
        </div>
        <div class="dishes__table-cell">
          <div class="dishes__table-qty">
            <a href="#" class="dishes__table-qty-btn" data-qty-minus="">
              <img src="/local/templates/bufet_2.0-bufetchica/assets/dist/images/minus.svg">
            </a>
            <div class="dishes__table-qty-val" data-qty-val="">${dishFull.qty}</div>
            <a href="#" class="dishes__table-qty-btn" data-qty-plus="">
              <img src="/local/templates/bufet_2.0-bufetchica/assets/dist/images/plus.svg">
            </a>
          </div>
        </div>
        <div class="dishes__table-cell">
          <a href="#" class="dishes__table-remove">
            <img src="/local/templates/bufet_2.0-bufetchica/assets/dist/images/cross.svg">
          </a>
        </div>
      </div>
      <div class="dishes__table-full" data-id="${dishFull.id}">
        <div class="dishes__table-full-text">
          ${dishFull.text}
        </div>
      </div>`;
      $(`.dishes__table [data-id="${dishFull.id}"]`).remove();
      $(".dishes__table-row:first-of-type").after(itemHtml);
      $(".add-order.--empty").hide();
      $(".add-order.--filled").show();
    });
    // <div class="dishes__table-full-allergen">Аллергены: ${dishFull.allergen}</div>
  }
  removeDish(e) {
    e.preventDefault();
    var id = $(e.currentTarget)
      .closest(".dishes__table-row")
      .attr("data-id");
    $(`.dishes__table [data-id="${id}"]`).remove();
    if ($(".dishes__table [data-id]").length === 0) {
      $(".add-order.--filled").hide();
      $(".add-order.--empty").show();
    }
    axios.get(`/local/api/removeDish.php?id=${id}`).then(function(response) {
      console.log("Удаление блюда");
    });
  }
  removeAll(e) {
    e.preventDefault();
    $(".dishes__table [data-id]").remove();
    $(".add-order.--filled").hide();
    $(".add-order.--empty").show();
    axios.get(`/local/api/removeAllDishes.php`).then(function(response) {
      console.log("Удаление всех блюд");
    });
  }
  dishQtyChanged(e) {
    var qty = $(e.currentTarget).text();
    var id = $(e.currentTarget)
      .closest(".dishes__table-row")
      .attr("data-id");
    axios.get(`/local/api/updDishQnt.php?id=${id}&qty=${qty}`).then(function(response) {
      console.log("Сохранение изменения количества");
    });
  }
  send(e) {
    e.preventDefault();
    axios.get(`/local/api/orderDishConfirm.php`).then(function(response) {
      console.log("Подтверждение заказа");
    });
    $(".add-order-added").fadeIn();
  }
  closeOrderAdded(e) {
    e.preventDefault();
    $(".add-order-added").fadeOut();
  }
}
export default AddDishForm;
