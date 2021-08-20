import axios from "axios";

class AddComplex {
  constructor() {
    $(".jsAddComplexDiet").on("change", this.changeDiet.bind(this));
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
    $(".add-order-added__btn.btn-1").on("click", this.closeAddedPopup.bind(this));

    // Сохраняем значения количества чтобы потом знать какой число было до
    $('.jsAddComplexItemQty').each(function(ind, el){
      var qty = $(el).val() || $(el).text();
      $(el).attr('data-old', qty);
    })

    // Устанавливаем значение диеты в зависимости от query
    const urlParams = new URLSearchParams(window.location.search);
    this.diet = urlParams.get('diet');
    $('.jsAddComplexDiet').val(this.diet);
  }
  changeDiet(e){
    var val = $(e.currentTarget).val();
    if(val===''){
      window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname;
    } else {
      window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + '?diet=' + val;
    }
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
    var urlString = $(".jsAddComplexForm").attr("data-name") + "?q=" + name;
    if(this.diet) urlString += '&diet='+this.diet;
    $(".jsAddComplexName")
      .parent()
      .removeClass("--filled");
    this.checkIfFilled();
    axios.get(urlString).then(function(response) {
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

    $(".dishes__table-name.--active").removeClass("--active");
    $(".dishes__table-full").hide();
    $(".add-order__filter-fieldset.--filled").removeClass("--filled");
    $(".jsAddComplexName").val("");
    $(".jsAddComplexQty").val("");

    $(`.complex__items-wrapper [data-id="${request.id}"]`)
      .addClass("--active")
      .find(".complex__item-qty-input")
      .val(request.qty)
      .trigger("qty-changed");

    var daytime_id = $(`.complex__items-wrapper [data-id="${request.id}"]`)
      .closest(".complex__items")
      .attr("id");
    $(`.complex__tab-item[href="#${daytime_id}"]`).trigger("click");
  }
  complexItemQty(e) {
    var id = $(e.currentTarget).attr("data-id");
    var qty = $(e.currentTarget).val() || $(e.currentTarget).text();
    var oldQty = parseInt($(e.currentTarget).attr('data-old'), 10);
    $(e.currentTarget).attr('data-old', qty);
    qty = parseInt(qty, 10);
    if (qty > 0) {
      $(e.currentTarget)
        .closest(".complex__item")
        .addClass("--active");
        if( oldQty === 0 ){
          axios.get(`/local/api/bufetchica/complex/addComplex.php?id=${id}&qty=${qty}`).then(function(response) {
            console.log("Добавление комплекса");
          });
        } else {
          axios.get(`/local/api/bufetchica/complex/updComplexQnt.php?id=${id}&qty=${qty}`).then(function(response) {
            console.log("Обновление количества");
          });
        }
      
    } else {
      $(e.currentTarget)
        .closest(".complex__item")
        .removeClass("--active");
      axios.get(`/local/api/bufetchica/complex/removeComplex.php?id=${id}`).then(function(response) {
        console.log("Удаление комплекса");
      });
    }
  }
  closeCheckpoint(e) {
    e.preventDefault();
    $(".add-order-checkpoint").fadeOut();
  }
  openCheckpoint(e) {
    e.preventDefault();
    $(e.currentTarget).addClass('--disabled');
    axios.get(`/local/api/bufetchica/complex/getOrder.php`).then(function(response) {
      $(e.currentTarget).removeClass('--disabled');
      var resultArr = response.data;
      
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
                <img src="/bufet/assets/dist/images/minus.svg" />
              </a>
              <div class="add-order-checkpoint__item-qty-val jsAddComplexItemQty" data-qty-val  data-id="${itemEl.id}">${itemEl.qty}</div>
              <a href="#" class="add-order-checkpoint__item-qty-btn" data-qty-plus>
                <img src="/bufet/assets/dist/images/plus.svg" />
              </a>
            </div>
          </div>`;
        });
        $dayTime.find(".add-order-checkpoint__items").html(itemsHtml);
      });

      $(".add-order-checkpoint").fadeIn();
    });

    
  }
  clearCheckpoint(e) {
    e.preventDefault();
    $(".complex__item-qty-input").val(0);
    $(".add-order-checkpoint").fadeOut();
    $(".complex__item.--active").removeClass("--active");
    axios.get(`/local/api/bufetchica/complex/removeAllComplexes.php`).then(function(response) {
      console.log("Событие сброса");
    });
  }
  sendCheckpoint(e) {
    e.preventDefault();
    axios.get(`/local/api/bufetchica/complex/orderComplexConfirm.php`).then(function(response) {
      console.log("Событие подтверждения");
    });
    $(".add-order-checkpoint").fadeOut();
    $(".add-order-added").fadeIn();
  }
  closeAddedPopup(e) {
    e.preventDefault();
    $(".add-order-added").fadeOut();
  }
}

export default AddComplex;
