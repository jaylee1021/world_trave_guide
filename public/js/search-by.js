function populate(s1, s2, regions, subregions, currencies) {
    let region = JSON.parse(regions);
    let subregion = JSON.parse(subregions);
    let currency = JSON.parse(currencies);
    console.log(region);
    const optionArray = [];
    let select1 = document.getElementById(s1);
    let select2 = document.getElementById(s2);
    select2.innerHTML = '';
    switch (select1.value) {
        case 'region':
            for (let x = 0; x < region.length; x++) {
                optionArray.push(region[x]);
            }
            break;

        // for (let option in region) {
        //         optionArray.push(option);
        //     }
        //     break;
        case 'subregion':
            for (let x = 0; x < subregion.length; x++) {
                optionArray.push(subregion[x]);
            }
            break;
        case 'currency':
            for (let x = 0; x < currency.length; x++) {
                optionArray.push(currency[x]);
            }
            break;
    }
    for (let x = 0; x < optionArray.length; x++) {
        let newOption = document.createElement('option');
        newOption.value = optionArray[x];
        newOption.innerHTML = optionArray[x];
        select2.options.add(newOption);
    }
}