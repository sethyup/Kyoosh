const dropList = document.querySelectorAll("form select");

for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list){
        // selecting SGD by default as FROM currency and NPR as TO currency
        let selected = i == 0 ? currency_code == "SGD" ? "selected" : "" : currency_code == "KRW" ? "selected" : "";
        // creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
}
